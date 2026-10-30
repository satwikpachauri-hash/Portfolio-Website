import { useState, useEffect } from 'react';

const VALID_THEMES = ['light', 'dark'];

export function useTheme() {
  const [theme, setThemeState] = useState(() => {
    try {
      const savedTheme = localStorage.getItem('portfolio-theme');
      if (savedTheme === 'dark') {
        return 'dark';
      }
    } catch (e) {
      // Storage access may fail in restricted environments
    }
    return 'light'; // Default to Light Mode for first-time visitors and obsolete 'system' preference
  });

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme === 'dark' ? 'dark' : 'light');

    // Synchronize across multiple hook instances and tabs
    const handleSync = (e) => {
      if (e.detail && VALID_THEMES.includes(e.detail) && e.detail !== theme) {
        setThemeState(e.detail);
      }
    };
    window.addEventListener('portfolio-theme-change', handleSync);

    const handleStorage = (e) => {
      if (e.key === 'portfolio-theme') {
        const resolved = e.newValue === 'dark' ? 'dark' : 'light';
        if (resolved !== theme) {
          setThemeState(resolved);
        }
      }
    };
    window.addEventListener('storage', handleStorage);

    return () => {
      window.removeEventListener('portfolio-theme-change', handleSync);
      window.removeEventListener('storage', handleStorage);
    };
  }, [theme]);

  const setTheme = (newTheme) => {
    const resolvedTheme = newTheme === 'dark' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', resolvedTheme);
    setThemeState(resolvedTheme);
    try {
      localStorage.setItem('portfolio-theme', resolvedTheme);
    } catch (e) {
      // Storage access may fail in restricted environments
    }
    window.dispatchEvent(new CustomEvent('portfolio-theme-change', { detail: resolvedTheme }));
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return { theme, setTheme, toggleTheme };
}
