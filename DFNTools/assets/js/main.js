(() => {
  "use strict";

  const $ = (selector, all = false) =>
    all ? [...document.querySelectorAll(selector)] : document.querySelector(selector);

  const scrollToTarget = (selector) => {
    const target = $(selector);
    if (!target) return;

    const headerHeight = $("#header")?.offsetHeight || 0;
    const top = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 12;

    window.scrollTo({ top, behavior: "smooth" });
  };

  window.addEventListener("load", () => {
    $("#preloader")?.remove();

    if (window.location.hash && $(window.location.hash)) {
      setTimeout(() => scrollToTarget(window.location.hash), 100);
    }

    if (typeof AOS !== "undefined") {
      AOS.init({
        duration: 700,
        easing: "ease-in-out",
        once: true,
        mirror: false,
      });
    }
  });

  const backToTop = $(".back-to-top");
  const toggleBackToTop = () => backToTop?.classList.toggle("active", window.scrollY > 150);

  window.addEventListener("load", toggleBackToTop);
  window.addEventListener("scroll", toggleBackToTop);

  document.addEventListener("click", (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;

    const href = link.getAttribute("href");
    if (!href || href === "#" || !$(href)) return;

    e.preventDefault();
    scrollToTarget(href);

    const navbar = $(".navbar-collapse.show");
    if (navbar && typeof bootstrap !== "undefined") {
      bootstrap.Collapse.getOrCreateInstance(navbar).hide();
    }
  });
})();