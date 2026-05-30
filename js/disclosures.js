(function (window, document) {
  function setOpen(wrapper, open) {
    wrapper.classList.toggle('is-open', open);
    if (!open) wrapper.classList.remove('is-mobile-fixed-popover');
    const host = wrapper.closest('article, .card, .project-card');
    if (host) host.classList.toggle('has-open-popover', open);
    if (open) alignPanel(wrapper, host);
    const button = wrapper.querySelector('.detail-trigger');
    if (!button) return;
    button.setAttribute('aria-expanded', String(open));
    const marker = button.querySelector('span');
    if (marker) marker.textContent = open ? '-' : '+';
  }

  function closeAll(except) {
    document.querySelectorAll('.detail-popover-wrap.is-open').forEach(function (wrapper) {
      if (wrapper !== except) setOpen(wrapper, false);
    });
  }

  function alignPanel(wrapper, host) {
    const panel = wrapper.querySelector('.detail-popover');
    const trigger = wrapper.querySelector('.detail-trigger');
    if (!panel || !trigger || !host) return;
    const hostRect = host.getBoundingClientRect();
    const triggerRect = trigger.getBoundingClientRect();
    const isMobile = window.matchMedia('(max-width: 760px)').matches;
    const useFixedMobilePanel = isMobile && Boolean(host.closest('.project-grid, .volunteer-grid, .award-grid, .blog-grid'));

    wrapper.classList.toggle('is-mobile-fixed-popover', useFixedMobilePanel);

    if (useFixedMobilePanel) {
      panel.style.left = Math.round(Math.max(12, hostRect.left)) + 'px';
      panel.style.top = Math.round(Math.min(triggerRect.bottom + 8, window.innerHeight - 180)) + 'px';
      panel.style.width = Math.round(Math.min(hostRect.width, window.innerWidth - 24)) + 'px';
      return;
    }

    panel.style.top = '';
    panel.style.left = Math.round(hostRect.left - triggerRect.left) + 'px';
    panel.style.width = Math.round(Math.min(hostRect.width, window.innerWidth - 32)) + 'px';
  }

  function init() {
    document.addEventListener('click', function (event) {
      const trigger = event.target.closest('.detail-trigger');
      if (!trigger) {
        if (!event.target.closest('.detail-popover')) closeAll();
        return;
      }

      const wrapper = trigger.closest('.detail-popover-wrap');
      const willOpen = !wrapper.classList.contains('is-open');
      closeAll(wrapper);
      setOpen(wrapper, willOpen);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') closeAll();
    });

    document.querySelectorAll('.detail-popover-wrap').forEach(function (wrapper) {
      wrapper.addEventListener('mouseleave', function () {
        setOpen(wrapper, false);
      });
    });
  }

  window.PortfolioDisclosures = { init };
})(window, document);
