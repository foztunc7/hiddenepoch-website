(function () {
  var input = document.getElementById('archive-search');
  if (!input) return;
  var cards = Array.prototype.slice.call(document.querySelectorAll('.posts-grid .post-card'));
  var count = document.getElementById('archive-count');
  var empty = document.getElementById('archive-empty');
  var chipBox = document.getElementById('archive-topics');
  var haystack = cards.map(function (c) { return c.textContent.toLowerCase(); });

  // Topic chips: the ~70 free-form card tags roll up into a few browsable lanes.
  // A card matches a topic when its tag or title contains a keyword. Cards can sit in several.
  var TOPICS = [
    ['Bible & Scripture', /bibl|scriptur|gospel|enoch|genesis|church|canon|testament|nephilim|giants|heresy|jesus|gnostic|ark of|noah/],
    ['Egypt', /egypt|pharaoh|pyramid|sphinx|serapeum|giza|khufu|akhenaten/],
    ['Sumer & Babylon', /sumer|mesopot|babylon|anunnaki|enlil|enki|atrahasis|akkad|nippur/],
    ['Aliens & Space', /alien|ufo|space|signal|seti|mars|extraterr|cosmic|astronaut|planet|galactic|star/],
    ['Lost Civilizations', /lost civ|megalith|engineering|lost tech|peru|inca|ancient civ|ancient myster|forbidden geo|forbidden arch|cartograph|antikythera/],
    ['Suppressed History', /suppress|forbidden|cover|classified|banned|conspirac|forgery/]
  ];
  var meta = cards.map(function (c) {
    var t = ((c.querySelector('.tag') || {}).textContent || '') + ' ' + ((c.querySelector('h2') || {}).textContent || '');
    t = t.toLowerCase();
    return TOPICS.map(function (tp) { return tp[1].test(t); });
  });
  var active = -1;

  function run() {
    var terms = input.value.toLowerCase().split(/\s+/).filter(Boolean);
    var shown = 0;
    cards.forEach(function (c, i) {
      var ok = terms.every(function (t) { return haystack[i].indexOf(t) !== -1; });
      if (ok && active > -1) ok = meta[i][active];
      c.hidden = !ok;
      if (ok) shown++;
    });
    var filtered = terms.length || active > -1;
    count.textContent = filtered ? shown + ' of ' + cards.length + ' investigations' : cards.length + ' investigations';
    empty.hidden = shown !== 0;
  }

  if (chipBox) {
    var btns = [];
    function make(label, idx, n) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'topic-chip';
      b.setAttribute('aria-pressed', idx === -1 ? 'true' : 'false');
      b.textContent = label + ' (' + n + ')';
      b.addEventListener('click', function () {
        active = idx;
        btns.forEach(function (x) { x.b.setAttribute('aria-pressed', x.i === idx ? 'true' : 'false'); });
        run();
      });
      btns.push({ b: b, i: idx });
      chipBox.appendChild(b);
    }
    make('All', -1, cards.length);
    TOPICS.forEach(function (tp, i) {
      var n = meta.filter(function (m) { return m[i]; }).length;
      if (n > 2) make(tp[0], i, n);
    });
  }

  input.addEventListener('input', run);
  run();
})();
