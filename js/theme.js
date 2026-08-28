(function (window) {
  const storageKey = 'portfolio-theme';

  function systemTheme() {
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  function getTheme() {
    try {
      const saved = localStorage.getItem(storageKey);
      return ['dark', 'light'].includes(saved) ? saved : systemTheme();
    } catch (_) { return systemTheme(); }
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    $('[data-theme-toggle]').html(window.PortfolioIcons.icon(theme === 'dark' ? 'sun' : 'moon'));
    $('[data-theme-toggle]').attr('aria-label', 'Switch to ' + (theme === 'dark' ? 'light' : 'dark') + ' theme');
  }

  function initTheme() {
    applyTheme(getTheme());
    $('[data-theme-toggle]').on('click', function () {
      const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem(storageKey, next); } catch (_) { /* Theme still works without persistence. */ }
      applyTheme(next);
    });
    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', function () {
      try { if (localStorage.getItem(storageKey)) return; } catch (_) {}
      applyTheme(systemTheme());
    });
  }

  window.PortfolioTheme = { initTheme, applyTheme };
})(window);
