/* Vault door animation. Plays on the Vault buy click, then ALWAYS proceeds to the buy link. */
(function () {
  var btn = document.getElementById('vault-buy');
  if (!btn) return;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var playing = false;

  var WHEEL = '<svg class="vo-wheel" viewBox="0 0 200 200" aria-hidden="true">' +
    '<circle cx="100" cy="100" r="96" fill="#1a150b" stroke="#D4AF37" stroke-width="5"/>' +
    '<circle cx="100" cy="100" r="82" fill="none" stroke="#a8892a" stroke-width="2" stroke-dasharray="3 7"/>' +
    '<g stroke="#D4AF37" stroke-width="9" stroke-linecap="round">' +
    '<line x1="100" y1="22" x2="100" y2="178"/><line x1="22" y1="100" x2="178" y2="100"/>' +
    '<line x1="45" y1="45" x2="155" y2="155"/><line x1="155" y1="45" x2="45" y2="155"/></g>' +
    '<circle cx="100" cy="100" r="30" fill="#0e0b06" stroke="#f1d46a" stroke-width="5"/>' +
    '<circle cx="100" cy="100" r="9" fill="#D4AF37"/></svg>';

  btn.addEventListener('click', function (e) {
    if (reduce || playing || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    playing = true;
    e.preventDefault();
    var done = false;
    function finish() { if (done) return; done = true; window.location.href = btn.href; }
    setTimeout(finish, 2400); // hard guarantee: always resolves to checkout
    try {
      var o = document.createElement('div');
      o.className = 'vo';
      o.setAttribute('aria-hidden', 'true');
      o.innerHTML = '<div class="vo-light"></div><div class="vo-door l"></div><div class="vo-door r"></div>' +
        WHEEL + '<div class="vo-label">Opening the Vault</div>';
      document.body.appendChild(o);
      requestAnimationFrame(function () {
        o.classList.add('on', 'spin');
        setTimeout(function () { o.classList.add('open'); }, 850);
      });
    } catch (err) { finish(); }
  });
})();
