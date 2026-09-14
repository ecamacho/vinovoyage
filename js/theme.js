// Applied immediately (this script is loaded unblocked, before <body>) so the
// page never flashes the wrong theme on load.
(function () {
  const STORAGE_KEY = 'vinovoyage-theme';
  const media = window.matchMedia('(prefers-color-scheme: dark)');

  const getStoredTheme = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === 'light' || stored === 'dark' ? stored : null;
  };

  const effectiveTheme = () => getStoredTheme() || (media.matches ? 'dark' : 'light');

  const applyTheme = (theme) => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    const sunIcon = document.getElementById('theme-icon-sun');
    const moonIcon = document.getElementById('theme-icon-moon');
    if (sunIcon && moonIcon) {
      sunIcon.hidden = theme !== 'dark';
      moonIcon.hidden = theme === 'dark';
    }
  };

  applyTheme(effectiveTheme());

  // Follow the OS/browser setting live, unless the visitor picked a theme themselves.
  media.addEventListener('change', (event) => {
    if (!getStoredTheme()) applyTheme(event.matches ? 'dark' : 'light');
  });

  document.addEventListener('DOMContentLoaded', () => {
    applyTheme(effectiveTheme());
    const toggle = document.getElementById('theme-toggle');
    if (!toggle) return;
    toggle.addEventListener('click', () => {
      const next = effectiveTheme() === 'dark' ? 'light' : 'dark';
      localStorage.setItem(STORAGE_KEY, next);
      applyTheme(next);
    });
  });
})();
