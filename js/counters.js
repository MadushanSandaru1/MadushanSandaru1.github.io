(function (window) {
  function init() {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        const $item = $(entry.target);
        const target = parseInt($item.data('counter'), 10) || 0;
        $({ value: 0 }).animate({ value: target }, {
          duration: 1100,
          step: function (now) { $item.text(Math.floor(now) + '+'); },
          complete: function () { $item.text(target + '+'); }
        });
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.7 });
    $('[data-counter]').each(function () { observer.observe(this); });
  }
  window.PortfolioCounters = { init };
})(window);
