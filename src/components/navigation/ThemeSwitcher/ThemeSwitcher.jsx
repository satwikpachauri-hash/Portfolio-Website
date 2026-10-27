import React, { useState, useEffect, useRef } from 'react';
import { Monitor, Sun, Moon, Check, X } from 'lucide-react';
import { useTheme } from '../../../hooks/useTheme';
import './ThemeSwitcher.css';

const THEME_OPTIONS = [
  { id: 'system', label: 'System', icon: Monitor },
  { id: 'light', label: 'Light', icon: Sun },
  { id: 'dark', label: 'Dark', icon: Moon },
];

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const containerRef = useRef(null);
  const triggerRef = useRef(null);
  const menuRef = useRef(null);

  // Sync scroll position with navbar
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
      if (open) {
        setIsOpen(false);
      }
    };
    checkViewerOpen();
    const observer = new MutationObserver(checkViewerOpen);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-viewer-open'] });
    return () => observer.disconnect();
  }, []);

  // Responsive collision avoidance: Close menu if navbar expands
  useEffect(() => {
    const checkNavOpen = () => {
      if (document.documentElement.getAttribute('data-nav-open') === 'true') {
        setIsOpen(false);
      }
    };
    const observer = new MutationObserver(checkNavOpen);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-nav-open'] });
    return () => observer.disconnect();
  }, []);

  // Dismiss on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (isOpen && containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('pointerdown', handleOutsideClick);
    return () => document.removeEventListener('pointerdown', handleOutsideClick);
  }, [isOpen]);

  // Dismiss on Escape key and return focus to trigger
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Keyboard navigation within the options
  const handleItemKeyDown = (e, index) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = (index + 1) % THEME_OPTIONS.length;
      const items = menuRef.current?.querySelectorAll('[role="menuitemradio"]');
      items?.[nextIndex]?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIndex = (index - 1 + THEME_OPTIONS.length) % THEME_OPTIONS.length;
      const items = menuRef.current?.querySelectorAll('[role="menuitemradio"]');
      items?.[prevIndex]?.focus();
    } else if (e.key === 'Tab') {
      setIsOpen(false);
    }
  };

  const handleSelect = (optionId) => {
    setTheme(optionId);
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  const handleTriggerClick = () => {
    if (isViewerOpen) {
      window.dispatchEvent(new CustomEvent('portfolio-close-viewer'));
      return;
    }
    setIsOpen((prev) => !prev);
  };

  // Determine active icon for the collapsed trigger button
  const CurrentIcon = theme === 'light' ? Sun : theme === 'dark' ? Moon : Monitor;

  return (
    <div
      ref={containerRef}
      className={`theme-switcher-container ${isScrolled ? 'scrolled' : ''} ${isOpen ? 'is-open' : ''} ${isViewerOpen ? 'in-viewer-mode' : ''}`}
    >
      <button
        ref={triggerRef}
        type="button"
        className={`theme-switcher-trigger ${isViewerOpen ? 'is-viewer-close' : ''}`}
        onClick={handleTriggerClick}
        aria-label={isViewerOpen ? "Close image viewer" : "Appearance settings"}
        aria-haspopup={isViewerOpen ? undefined : "menu"}
        aria-expanded={isViewerOpen ? undefined : isOpen}
      >
        <div className="theme-switcher-icon-wrap" aria-hidden="true">
          <div className={`theme-icon-layer ${!isViewerOpen ? 'theme-icon-active' : 'theme-icon-inactive'}`}>
            <CurrentIcon className="theme-switcher-icon" size={18} strokeWidth={2.2} />
          </div>
          <div className={`theme-icon-layer ${isViewerOpen ? 'theme-icon-active' : 'theme-icon-inactive'}`}>
            <X className="theme-switcher-icon" size={18} strokeWidth={2.2} />
          </div>
        </div>
      </button>

      {isOpen && !isViewerOpen && (
        <div
          ref={menuRef}
          className="theme-switcher-dropdown"
          role="menu"
          aria-label="Appearance options"
        >
          <div className="theme-menu-header">Appearance</div>
          <div className="theme-menu-list">
            {THEME_OPTIONS.map((opt, i) => {
              const Icon = opt.icon;
              const isSelected = theme === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  role="menuitemradio"
                  aria-checked={isSelected}
                  className={`theme-menu-item ${isSelected ? 'is-selected' : ''}`}
                  onClick={() => handleSelect(opt.id)}
                  onKeyDown={(e) => handleItemKeyDown(e, i)}
                >
                  <Icon className="theme-item-icon" size={16} strokeWidth={2} aria-hidden="true" />
                  <span className="theme-item-label">{opt.label}</span>
                  {isSelected && (
                    <Check className="theme-check-icon" size={14} strokeWidth={2.5} aria-hidden="true" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
