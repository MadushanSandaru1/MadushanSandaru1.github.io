(function (window, document) {
  function applyFilter(category) {
    const cards = Array.from(document.querySelectorAll('[data-project-category]'));
    let count = 0;
    cards.forEach(function (card) {
      const show = category === 'All' || (category === 'Featured' ? card.dataset.featured === 'true' : card.dataset.projectCategory === category);
      card.hidden = !show;
      card.classList.toggle('is-hidden', !show);
      if (show) count++;
    });
    document.querySelectorAll('.filter-chip').forEach(function (button) {
      const active = button.dataset.filter === category;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    const status = document.querySelector('[data-project-count]');
    if (status) status.textContent = `${count} ${category === 'Featured' ? 'featured ' : ''}project${count === 1 ? '' : 's'} · ${cards.length} total`;
  }
  function init() {
    const buttons = document.querySelectorAll('.filter-chip');
    buttons.forEach((button) => button.addEventListener('click', () => applyFilter(button.dataset.filter)));
    if (buttons.length) applyFilter(buttons[0].dataset.filter);
  }
  window.PortfolioFilters = { init };
})(window, document);
