/* Canon reader offer. Lost Books subscribers get the Canon at $13.99 one time through Wed Dec 2,
   11:59pm ET (Fatih 2026-11-17, the broadcast promise). Everyone else sees the evergreen $27.99.
   /welcome/ (where every subscriber lands) or ?offer=canon sets a local flag; while the flag is
   set and the window is open, every [data-canon-price] shows the struck full price next to the
   offer, and the Canon checkout link swaps to the $13.99 Stripe link. After the deadline this
   does nothing and the pages fall back to their static $27.99 copy. */
(function () {
  var ENDS = 1796273940000; // Wed Dec 2 2026 11:59pm ET (matches scripts/deactivate_canon_promo.py)
  if (Date.now() >= ENDS) return;
  var FULL = 'https://buy.stripe.com/7sY28sf076NY26XgdyeZ200';
  var OFFER = 'https://buy.stripe.com/4gMdRa9FN2xIdPFe5qeZ207';
  var KEY = 'he_canon_offer';
  try {
    if (location.pathname.indexOf('/welcome') === 0 || /[?&]offer=canon\b/.test(location.search)) {
      localStorage.setItem(KEY, '1');
    }
    if (!localStorage.getItem(KEY)) return;
  } catch (e) { return; }

  document.querySelectorAll('a[href^="' + FULL + '"]').forEach(function (a) { a.href = OFFER; });
  document.querySelectorAll('[data-canon-price]').forEach(function (el) {
    el.innerHTML = '<s style="opacity:0.55;">$27.99</s> $13.99';
  });
  document.querySelectorAll('[data-canon-deadline]').forEach(function (el) { el.hidden = false; });
})();
