(function (window, document) {
  let filterTimer = null;

  function rectMap(cards) {
    const map = new Map();
    cards.forEach(function (card) {
      if (!card.classList.contains('is-hidden')) map.set(card, card.getBoundingClientRect());
    });
    return map;
  }

  function animateMove(card, first, last) {
    if (!first || !last) return;
    const dx = first.left - last.left;
    const dy = first.top - last.top;
    if (Math.abs(dx) < 1 && Math.abs(dy) < 1) return;
    card.animate([
      { transform: `translate(${dx}px, ${dy}px)`, opacity: 1 },
      { transform: 'translate(0, 0)', opacity: 1 }
    ], {
      duration: 320,
      easing: 'cubic-bezier(.2,.8,.2,1)'
    });
  }

  function animateEnter(card, index) {
    card.animate([
      { opacity: 0, transform: 'translateY(14px) scale(.985)' },
      { opacity: 1, transform: 'translateY(0) scale(1)' }
    ], {
      duration: 260,
      delay: Math.min(index * 35, 140),
      easing: 'cubic-bezier(.2,.8,.2,1)'
    });
  }

  function applyFilter(category) {
    const cards = Array.from(document.querySelectorAll('[data-project-category]'));
    const visibleBefore = cards.filter((card) => !card.classList.contains('is-hidden'));
    const shouldShow = (card) => category === 'All' || card.dataset.projectCategory === category;
    const leaving = visibleBefore.filter((card) => !shouldShow(card));
    const entering = cards.filter((card) => shouldShow(card) && card.classList.contains('is-hidden'));
    const staying = visibleBefore.filter((card) => shouldShow(card));

    clearTimeout(filterTimer);
    cards.forEach((card) => card.classList.remove('is-filter-leaving'));
    leaving.forEach((card) => card.classList.add('is-filter-leaving'));

    filterTimer = setTimeout(function () {
      const first = rectMap(staying);

      leaving.forEach(function (card) {
        card.classList.add('is-hidden');
        card.classList.remove('is-filter-leaving');
      });

      entering.forEach(function (card) {
        card.classList.remove('is-hidden');
      });

      const visibleAfter = cards.filter((card) => shouldShow(card));
      const last = rectMap(visibleAfter);

      staying.forEach(function (card) {
        animateMove(card, first.get(card), last.get(card));
      });
      entering.forEach(animateEnter);
    }, leaving.length ? 170 : 0);
  }

  function init() {
    $('.filter-chip').on('click', function () {
      const category = $(this).data('filter');
      $('.filter-chip').removeClass('active');
      $(this).addClass('active');
      applyFilter(category);
    });
  }

  window.PortfolioFilters = { init };
})(window, document);
