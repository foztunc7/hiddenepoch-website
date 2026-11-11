/* HiddenEpoch attribution helper.
 *
 * The problem this solves: GA4 (G-GEBZWHLQSK) captures the source on the landing page_view,
 * but the money moves were invisible because (a) UTMs were not persisted past the first page,
 * and (b) a Stripe purchase completes on buy.stripe.com, a different domain GA4 cannot see.
 *
 * What this does, with no build step (the site is static HTML):
 *   1. On landing, store any utm_* from the URL in a first-party cookie (90d, last non-direct
 *      touch wins) so the lead event and the Resend contact carry the real source/medium/campaign.
 *   2. Expose HEAttr.get() for stored attribution and HEAttr.clientId(cb) for the GA4 client id.
 *   3. Decorate every buy.stripe.com link with client_reference_id = the GA4 client id, so the
 *      Stripe webhook can send a GA4 Measurement Protocol `purchase` for that same client and GA4
 *      joins the sale to the session that already holds the source. One id is enough; GA4 keeps the
 *      attribution, we do not have to smuggle the UTMs through Stripe.
 *
 * Load this AFTER the gtag snippet on any page in the funnel.
 */
(function () {
  var GA_ID = 'G-GEBZWHLQSK';
  var COOKIE = 'he_attr';
  var UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];

  function readCookie(name) {
    var m = document.cookie.match('(?:^|; )' + name + '=([^;]*)');
    return m ? decodeURIComponent(m[1]) : '';
  }
  function writeCookie(name, value, days) {
    var exp = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = name + '=' + encodeURIComponent(value) + ';expires=' + exp + ';path=/;SameSite=Lax';
  }

  // 1. Capture UTMs from the current URL into the cookie (last touch that actually carries a source).
  function capture() {
    var q = new URLSearchParams(window.location.search);
    var incoming = {};
    var hasSource = false;
    UTM_KEYS.forEach(function (k) {
      var v = q.get(k);
      if (v) { incoming[k] = v; if (k === 'utm_source') hasSource = true; }
    });
    if (hasSource) {
      incoming._ts = Date.now();
      try { writeCookie(COOKIE, JSON.stringify(incoming), 90); } catch (e) {}
      return incoming;
    }
    try { return JSON.parse(readCookie(COOKIE) || '{}'); } catch (e) { return {}; }
  }

  var stored = capture();

  function get() { return stored || {}; }

  // 2. GA4 client id. gtag('get', ...) is async; fall back to parsing the _ga cookie if gtag is slow.
  function clientIdFromCookie() {
    var raw = readCookie('_ga'); // GA1.1.1234567890.1234567890
    if (!raw) return '';
    var parts = raw.split('.');
    return parts.length >= 4 ? parts[2] + '.' + parts[3] : '';
  }
  function clientId(cb) {
    var done = false;
    function finish(id) { if (!done) { done = true; cb(id || ''); } }
    try {
      if (typeof gtag === 'function') {
        gtag('get', GA_ID, 'client_id', function (id) { finish(id); });
        setTimeout(function () { finish(clientIdFromCookie()); }, 600); // guard if the callback never fires
        return;
      }
    } catch (e) {}
    finish(clientIdFromCookie());
  }

  // 3. Stamp the GA4 client id onto Stripe links so the webhook can attribute the purchase.
  function decorateStripeLinks() {
    clientId(function (cid) {
      if (!cid) return;
      document.querySelectorAll('a[href*="buy.stripe.com"]').forEach(function (a) {
        try {
          var u = new URL(a.href);
          if (!u.searchParams.get('client_reference_id')) {
            u.searchParams.set('client_reference_id', cid);
            a.href = u.toString();
          }
        } catch (e) {}
      });
    });
  }

  // Decorate now and again just before any Stripe link is clicked, so links added or rewritten
  // later (e.g. canon-launch.js) are still stamped.
  function wire() {
    decorateStripeLinks();
    document.addEventListener('click', function (e) {
      var a = e.target && e.target.closest ? e.target.closest('a[href*="buy.stripe.com"]') : null;
      if (a) {
        try {
          var u = new URL(a.href);
          if (!u.searchParams.get('client_reference_id')) {
            var cid = clientIdFromCookie();
            if (cid) { u.searchParams.set('client_reference_id', cid); a.href = u.toString(); }
          }
        } catch (e2) {}
      }
    }, true);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', wire);
  } else {
    wire();
  }

  window.HEAttr = { get: get, clientId: clientId };
})();
