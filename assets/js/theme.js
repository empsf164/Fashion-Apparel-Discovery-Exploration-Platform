/**
 * MODE / ATLAS — Theme Management
 * Light & Dark Theme Detection, Persistence & Switching
 */

(function () {
  'use strict';

  const THEME_STORAGE_KEY = 'mode_atlas_theme';
  const htmlEl = document.documentElement;

  // Detect system preference
  function getSystemTheme() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  // Get initial theme: stored in localStorage or system preference
  function getInitialTheme() {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }
    return getSystemTheme();
  }

  // Apply theme to document element
  function applyTheme(theme) {
    htmlEl.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);

    // Dispatch global event for other components (e.g. Map tiles)
    window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme } }));
  }

  // Toggle between dark and light
  function toggleTheme() {
    const current = htmlEl.getAttribute('data-theme') || getSystemTheme();
    const next = current === 'light' ? 'dark' : 'light';
    applyTheme(next);
  }

  // Initialize theme immediately to prevent flash of wrong theme
  const initialTheme = getInitialTheme();
  applyTheme(initialTheme);

  // Setup DOM listeners when document is ready
  document.addEventListener('DOMContentLoaded', () => {
    const toggleBtns = document.querySelectorAll('.theme-toggle-btn, [data-action="toggle-theme"]');
    toggleBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        toggleTheme();
      });
    });

    // Listen for OS system theme changes
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
        if (!localStorage.getItem(THEME_STORAGE_KEY)) {
          applyTheme(e.matches ? 'light' : 'dark');
        }
      });
    }
  });

  // Expose to window
  window.ModeAtlasTheme = {
    toggle: toggleTheme,
    apply: applyTheme,
    getCurrent: () => htmlEl.getAttribute('data-theme') || 'dark'
  };
})();
