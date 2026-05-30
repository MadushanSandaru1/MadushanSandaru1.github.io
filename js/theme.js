(function (window) {
  const storageKey = 'portfolio-theme';

  function systemTheme() {
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  function getTheme() {
    return localStorage.getItem(storageKey) || systemTheme();
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
      localStorage.setItem(storageKey, next);
      applyTheme(next);
    });
    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', function () {
      if (!localStorage.getItem(storageKey)) applyTheme(systemTheme());
    });
  }

  window.PortfolioTheme = { initTheme, applyTheme };
})(window);
