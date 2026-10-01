/* Golden book email-capture popup. Self-contained: include this script (and book-popup.css) on any page.
   Posts to the same /.netlify/functions/subscribe endpoint as every other form (Resend audience "Hidden Epoch Inner Circle"). */
(function () {
  var KEY = 'he_book_popup_v1';
  var DELAY_MS = 3000;
  var store;
  try { store = window.localStorage; store.getItem(KEY); } catch (e) { return; }
  if (store.getItem(KEY)) return;

  var el, lastFocus, timer;

  function build() {
    el = document.createElement('div');
    el.className = 'bp';
    el.hidden = true;
    el.innerHTML =
      '<div class="bp-back"></div>' +
      '<div class="bp-card" role="dialog" aria-modal="true" aria-labelledby="bp-title">' +
        '<button type="button" class="bp-x" aria-label="Close">&times;</button>' +
        '<div class="bp-stage" aria-hidden="true">' +
          '<div class="bp-rays"></div><div class="bp-glow"></div>' +
          '<div class="bp-bounce"><div class="bp-book">' +
            '<div class="bp-pages"><i></i><i></i><i></i><i></i><i></i><i></i></div>' +
            '<div class="bp-cover">' +
              '<svg viewBox="0 0 64 64" fill="none" stroke="#4a3708" stroke-width="3"><path d="M4 32C14 16 50 16 60 32 50 48 14 48 4 32Z"/><circle cx="32" cy="32" r="8" fill="#4a3708"/></svg>' +
              '<span>Forbidden<br>Books</span>' +
            '</div>' +
          '</div></div>' +
          '<span class="bp-spark"></span><span class="bp-spark"></span><span class="bp-spark"></span><span class="bp-spark"></span><span class="bp-spark"></span>' +
        '</div>' +
        '<p class="bp-eyebrow">Free Field Guide &middot; 11 Pages</p>' +
        '<h3 id="bp-title">Open the book they closed.</h3>' +
        '<p class="bp-desc">7 books erased from your Bible, plus one bonus. Real translations, dated removals, yours free.</p>' +
        '<form class="bp-form" novalidate>' +
          '<input type="email" name="email" placeholder="your@email.com" autocomplete="email" aria-label="Email address" required />' +
          '<button type="submit" class="btn-gold">Send me the field guide</button>' +
        '</form>' +
        '<p class="bp-note" role="status" aria-live="polite">Instant delivery to your inbox. No spam.</p>' +
        '<button type="button" class="bp-skip">No thanks</button>' +
      '</div>';
    document.body.appendChild(el);

    el.querySelector('.bp-x').addEventListener('click', close);
    el.querySelector('.bp-skip').addEventListener('click', close);
    el.querySelector('.bp-back').addEventListener('click', close);
    el.querySelector('.bp-form').addEventListener('submit', submit);
    el.addEventListener('keydown', trap);
  }

  function open() {
    if (!el) build();
    if (store.getItem(KEY)) return;
    lastFocus = document.activeElement;
    el.hidden = false;
    document.body.style.overflow = 'hidden';
    store.setItem(KEY, '1'); // once per visitor, set on show
    requestAnimationFrame(function () { el.classList.add('show'); });
    setTimeout(function () { var i = el.querySelector('input'); if (i) i.focus({ preventScroll: true }); }, 500);
    document.addEventListener('keydown', onEsc);
    if (typeof gtag === 'function') gtag('event', 'book_popup_view');
  }

  function close() {
    if (!el || el.hidden) return;
    el.classList.remove('show');
    el.hidden = true;
    document.body.style.overflow = '';
    document.removeEventListener('keydown', onEsc);
    if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
  }

  function onEsc(e) { if (e.key === 'Escape') close(); }

  function trap(e) {
    if (e.key !== 'Tab') return;
    var f = el.querySelectorAll('button, input');
    if (!f.length) return;
    var first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  async function submit(e) {
    e.preventDefault();
    var input = el.querySelector('input');
    var btn = el.querySelector('.btn-gold');
    var note = el.querySelector('.bp-note');
    var label = btn.textContent;
    var email = (input.value || '').trim();
    if (!/^\S+@\S+\.\S+$/.test(email)) { note.textContent = 'Enter a valid email address.'; input.focus(); return; }
    btn.textContent = 'Sending...';
    btn.disabled = true;
    try {
      var res = await fetch('/.netlify/functions/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, source: 'lead_magnet' })
      });
      var data = await res.json();
      if (data.success) {
        btn.textContent = 'Check your inbox';
        note.textContent = 'On its way. Welcome to the Inner Circle.';
        if (typeof gtag === 'function') gtag('event', 'generate_lead', { method: 'book_popup' });
        window.location.href = '/welcome/' + (window.location.search || '');
      } else {
        btn.textContent = label; btn.disabled = false;
        note.textContent = data.error || 'Something went wrong. Try again.';
      }
    } catch (err) {
      btn.textContent = label; btn.disabled = false;
      note.textContent = 'Network error. Try again.';
    }
  }

  function arm() { timer = setTimeout(open, DELAY_MS); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', arm); else arm();

  window.HEBookPopup = { show: function () { store.removeItem(KEY); open(); } };
})();
