import { useState, useEffect } from 'react';

const VALID_THEMES = ['system', 'light', 'dark'];

export function useTheme() {
  const [theme, setThemeState] = useState(() => {
    try {
      const savedTheme = localStorage.getItem('portfolio-theme');
      if (savedTheme && VALID_THEMES.includes(savedTheme)) {
        return savedTheme;
      }
    } catch (e) {
      // Storage access may fail in restricted environments
    }
    return 'light'; // Default to Light Mode for first-time visitors
  });

  useEffect(() => {
    const root = document.documentElement;
    
    const applyTheme = (currentTheme) => {
      if (currentTheme === 'system') {
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        root.setAttribute('data-theme', systemPrefersDark ? 'dark' : 'light');
      } else if (currentTheme === 'dark') {
        root.setAttribute('data-theme', 'dark');
      } else {
        root.setAttribute('data-theme', 'light');
      }
    };

    applyTheme(theme);

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (theme === 'system') {
        applyTheme('system');
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);

    // Synchronize across multiple hook instances and tabs
    const handleSync = (e) => {
      if (e.detail && VALID_THEMES.includes(e.detail) && e.detail !== theme) {
        setThemeState(e.detail);
      }
    };
    window.addEventListener('portfolio-theme-change', handleSync);

    const handleStorage = (e) => {
      if (e.key === 'portfolio-theme' && e.newValue && VALID_THEMES.includes(e.newValue) && e.newValue !== theme) {
        setThemeState(e.newValue);
      }
    };
    window.addEventListener('storage', handleStorage);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
      window.removeEventListener('portfolio-theme-change', handleSync);
      window.removeEventListener('storage', handleStorage);
    };
  }, [theme]);

  const setTheme = (newTheme) => {
    if (!VALID_THEMES.includes(newTheme)) return;
    setThemeState(newTheme);
    try {
      localStorage.setItem('portfolio-theme', newTheme);
    } catch (e) {
      // Storage access may fail in restricted environments
    }
    window.dispatchEvent(new CustomEvent('portfolio-theme-change', { detail: newTheme }));
  };

  return { theme, setTheme };
}
