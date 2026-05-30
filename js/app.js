(function () {
  $(function () {
    PortfolioTheme.initTheme();
    PortfolioDataLoader.loadPortfolioData().then(function (data) {
      PortfolioRenderer.render(data);
      PortfolioNavigation.init();
      PortfolioFilters.init();
      PortfolioDisclosures.init();
      PortfolioContact.init(data.emailjsConfig || {});
      PortfolioCvDownload.init();
      PortfolioCounters.init();
      PortfolioAnimations.init();
      $('[data-page-loader]').addClass('is-hidden');
    }).catch(function () {
      $('[data-page-loader]').addClass('is-hidden');
    });
  });
})();
