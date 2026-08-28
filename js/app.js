(function () {
  function optional(name, initialize) {
    try { initialize(); } catch (error) { console.warn(name + ' is unavailable.', error); }
  }
  $(function () {
    const status = document.querySelector('[data-load-status]');
    optional('Theme', () => PortfolioTheme.initTheme());
    PortfolioDataLoader.loadPortfolioData().then(function (data) {
      PortfolioRenderer.render(data);
      optional('Navigation', () => PortfolioNavigation.init());
      optional('Filters', () => PortfolioFilters.init());
      optional('Details', () => PortfolioDisclosures.init());
      optional('Contact', () => PortfolioContact.init(data.emailjsConfig || {}));
      optional('CV download', () => PortfolioCvDownload.init());
      optional('Counters', () => PortfolioCounters.init());
      optional('Animations', () => PortfolioAnimations.init());
      if (data.failedSections.length) {
        status.hidden = false;
        status.querySelector('span').textContent = 'Some sections could not load. You can still contact me or download my CV. Reload to try again.';
      }
    }).catch(function (error) {
      console.error('Unable to load portfolio.', error);
      status.hidden = false;
    }).finally(function () {
      $('[data-page-loader]').addClass('is-hidden');
    });
  });
})();
