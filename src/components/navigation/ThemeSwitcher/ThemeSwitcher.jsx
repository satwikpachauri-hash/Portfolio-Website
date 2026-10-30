import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { useTheme } from '../../../hooks/useTheme';
import SunMoonMorph from './SunMoonMorph';
import './ThemeSwitcher.css';

export default function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const containerRef = useRef(null);
  const triggerRef = useRef(null);

  // Sync scroll position with navbar glass styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Synchronize viewer open state for theme-to-close morph
  useEffect(() => {
    const checkViewerOpen = () => {
      const open = document.documentElement.getAttribute('data-viewer-open') === 'true';
      setIsViewerOpen(open);
    };
    checkViewerOpen();
    const observer = new MutationObserver(checkViewerOpen);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-viewer-open'] });
    return () => observer.disconnect();
  }, []);

  const handleTriggerClick = () => {
    if (isViewerOpen) {
      window.dispatchEvent(new CustomEvent('portfolio-close-viewer'));
      return;
    }
    toggleTheme();
  };

  const ariaLabel = isViewerOpen
    ? 'Close image viewer'
    : theme === 'dark'
      ? 'Switch to light mode'
      : 'Switch to dark mode';

  return (
    <div
      ref={containerRef}
      className={`theme-switcher-container ${isScrolled ? 'scrolled' : ''} ${isViewerOpen ? 'in-viewer-mode' : ''}`}
      data-floating-control="theme"
    >
      <button
        ref={triggerRef}
        type="button"
        className={`theme-switcher-trigger ${isViewerOpen ? 'is-viewer-close' : ''}`}
        onClick={handleTriggerClick}
        aria-label={ariaLabel}
        data-floating-control="theme"
      >
        <div className="theme-switcher-icon-wrap" aria-hidden="true">
          <div className={`theme-icon-layer ${!isViewerOpen ? 'theme-icon-active' : 'theme-icon-inactive'}`}>
            <SunMoonMorph isDark={theme === 'dark'} />
          </div>
          <div className={`theme-icon-layer ${isViewerOpen ? 'theme-icon-active' : 'theme-icon-inactive'}`}>
            <X className="theme-switcher-icon" size={18} strokeWidth={2.2} />
          </div>
        </div>
      </button>
    </div>
  );
}
