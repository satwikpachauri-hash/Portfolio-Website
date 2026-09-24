import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('portfolio-theme') || 'system';
  });

  useEffect(() => {
    const root = document.documentElement;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const applyTheme = (currentTheme) => {
      let resolvedTheme = currentTheme;
      if (currentTheme === 'system') {
        resolvedTheme = mediaQuery.matches ? 'dark' : 'light';
      }
      root.setAttribute('data-theme', resolvedTheme);
      
      // Smoothly transition colors
      root.style.transition = 'background-color 0.3s ease, color 0.3s ease';
      setTimeout(() => {
        root.style.transition = '';
      }, 350);
    };

    applyTheme(theme);
    localStorage.setItem('portfolio-theme', theme);

    const listener = () => {
      if (theme === 'system') {
        applyTheme('system');
      }
    };
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
