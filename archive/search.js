(function () {
  var input = document.getElementById('archive-search');
  if (!input) return;
  var cards = Array.prototype.slice.call(document.querySelectorAll('.posts-grid .post-card'));
  var count = document.getElementById('archive-count');
  var empty = document.getElementById('archive-empty');
  var haystack = cards.map(function (c) { return c.textContent.toLowerCase(); });
  function run() {
    var terms = input.value.toLowerCase().split(/\s+/).filter(Boolean);
    var shown = 0;
    cards.forEach(function (c, i) {
      var ok = terms.every(function (t) { return haystack[i].indexOf(t) !== -1; });
      c.hidden = !ok;
      if (ok) shown++;
    });
    count.textContent = terms.length ? shown + ' of ' + cards.length + ' investigations' : cards.length + ' investigations';
    empty.hidden = shown !== 0;
  }
  input.addEventListener('input', run);
  run();
})();
