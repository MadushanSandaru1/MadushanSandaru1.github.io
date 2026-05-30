(function (window) {
  function init() {
    $('a[href^="#"]').on('click', function (event) {
      const target = $($(this).attr('href'));
      if (target.length) {
        event.preventDefault();
        $('html, body').animate({ scrollTop: target.offset().top - 78 }, 500);
      }
    });

    $('[data-back-to-top]').on('click', function () {
      $('html, body').animate({ scrollTop: 0 }, 500);
    });

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          $('[data-nav-link]').removeClass('active');
          $(`[data-nav-link="${id}"]`).addClass('active');
        }
      });
    }, { rootMargin: '-35% 0px -55% 0px', threshold: 0.01 });

    $('main section[id]').each(function () { observer.observe(this); });

    $(window).on('scroll', function () {
      $('[data-header]').toggleClass('scrolled', window.scrollY > 24);
      $('[data-back-to-top]').toggleClass('visible', window.scrollY > 600);
    });
  }

  window.PortfolioNavigation = { init };
})(window);
