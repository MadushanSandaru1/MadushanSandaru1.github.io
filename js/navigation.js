(function (window) {
  function revealActiveLink(link) {
    const track = link.closest('[data-nav-track]');
    if (!track || !track.clientWidth) return;
    const item = link.getBoundingClientRect();
    const viewport = track.getBoundingClientRect();
    if (item.left >= viewport.left + 8 && item.right <= viewport.right - 8) return;
    // Move only the horizontal track; never move page scroll or keyboard focus.
    track.scrollTo({
      left: Math.max(0, Math.min(track.scrollWidth - track.clientWidth,
        track.scrollLeft + item.left - viewport.left - (track.clientWidth - item.width) / 2)),
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'
    });
  }

  function sectionAtViewport(sections, marker, atBottom) {
    if (atBottom) return sections[sections.length - 1];
    let current = sections[0];
    for (const section of sections) {
      if (section.getBoundingClientRect().top > marker) break;
      current = section;
    }
    return current;
  }

  function init() {
    document.querySelectorAll('[data-nav-track]').forEach(function (track) {
      const shell = track.parentElement;
      const arrows = Array.from(shell.querySelectorAll('[data-nav-scroll]'));
      const behavior = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth';
      function updateArrows() {
        arrows.forEach((button) => {
          button.disabled = Number(button.dataset.navScroll) < 0
            ? track.scrollLeft <= 1
            : track.scrollLeft + track.clientWidth >= track.scrollWidth - 1;
        });
      }
      arrows.forEach((button) => button.addEventListener('click', () => {
        track.scrollBy({ left: Number(button.dataset.navScroll) * track.clientWidth * 0.75, behavior: behavior() });
      }));
      track.addEventListener('scroll', updateArrows, { passive: true });
      window.addEventListener('resize', updateArrows);
      if (window.ResizeObserver) new ResizeObserver(updateArrows).observe(track);
      track.addEventListener('keydown', (event) => {
        const links = Array.from(track.querySelectorAll('a'));
        const index = links.indexOf(document.activeElement);
        if (index < 0) return;
        const next = { ArrowLeft: index - 1, ArrowRight: index + 1, Home: 0, End: links.length - 1 }[event.key];
        if (next === undefined) return;
        event.preventDefault();
        links[Math.max(0, Math.min(next, links.length - 1))].focus();
      });
      updateArrows();
    });
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function () {
        const target = document.getElementById(link.hash.slice(1));
        if (target) {
          if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
          target.focus({ preventScroll: true });
        }
      });
    });
    $('[data-back-to-top]').on('click', function () {
      const hero = document.getElementById('hero');
      if (hero) {
        hero.setAttribute('tabindex', '-1');
        hero.focus({ preventScroll: true });
      }
      window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    });

    const sections = Array.from(document.querySelectorAll('main section[id]'));
    const links = Array.from(document.querySelectorAll('[data-nav-link]'));
    let activeId = null;
    let pendingFrame = false;
    let resized = false;
    function syncNavigation() {
      pendingFrame = false;
      const atBottom = window.scrollY > 0 && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
      const current = sectionAtViewport(sections, window.innerHeight * 0.35, atBottom);
      if (current && (current.id !== activeId || resized)) {
        activeId = current.id;
        links.forEach((link) => {
          const active = link.dataset.navLink === activeId;
          link.classList.toggle('active', active);
          if (active) {
            link.setAttribute('aria-current', 'location');
            revealActiveLink(link);
          } else link.removeAttribute('aria-current');
        });
      }
      resized = false;
      $('[data-header]').toggleClass('scrolled', window.scrollY > 24);
      $('[data-back-to-top]').toggleClass('visible', window.scrollY > 600);
    }
    function scheduleSync() {
      if (!pendingFrame) {
        pendingFrame = true;
        window.requestAnimationFrame(syncNavigation);
      }
    }
    window.addEventListener('scroll', scheduleSync, { passive: true });
    window.addEventListener('resize', () => { resized = true; scheduleSync(); });
    // Expanded sections and late-loading images can change the active section.
    if (window.ResizeObserver) new ResizeObserver(scheduleSync).observe(document.querySelector('main'));
    syncNavigation();

  }

  window.PortfolioNavigation = { init, revealActiveLink, sectionAtViewport };
})(window);
