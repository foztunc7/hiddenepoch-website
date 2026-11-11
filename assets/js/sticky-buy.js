(function () {
  var cta = document.querySelector('#buy-cta, #vault-buy');
  if (!cta) return;
  var bar = document.createElement('div');
  bar.className = 'sticky-buy';
  var a = document.createElement('a');
  a.className = 'btn-gold';
  a.textContent = cta.textContent.replace(/\s+/g, ' ').trim();
  bar.appendChild(a);
  document.body.appendChild(bar);
  var hero = document.querySelector('[data-buy-cta]');
  var heroSeen = false, ctaSeen = false;
  function sync() { a.href = cta.href; bar.classList.toggle('on', heroSeen && !ctaSeen); }
  function watch(el, set) {
    new IntersectionObserver(function (e) { set(e[0].isIntersecting); sync(); }).observe(el);
  }
  // show once the hero CTA has been scrolled past, hide while the main buy block is on screen
  new IntersectionObserver(function (e) {
    if (!e[0].isIntersecting && e[0].boundingClientRect.top < 0) heroSeen = true;
    else if (e[0].isIntersecting) heroSeen = false;
    sync();
  }).observe(hero);
  watch(cta, function (v) { ctaSeen = v; });
})();
