import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { navigationLinks } from '../../../data/navigation';
import { useViewportClasses } from '../../../hooks/useMediaQuery';
import { useTheme } from '../../../hooks/useTheme';
import './DynamicIsland.css';

const STATE = {
  CLOSED: 'CLOSED',
  SHRINK_TO_CIRCLE: 'SHRINK_TO_CIRCLE', // step 2/3
  IMPACT: 'IMPACT', // step 4/5
  DROPLET: 'DROPLET', // step 6/7
  OPEN: 'OPEN', // step 8
  
  // Reversing
  CLOSE_DROPLET: 'CLOSE_DROPLET', // step 1/2/3
  CLOSE_CIRCLE: 'CLOSE_CIRCLE', // step 4
  CLOSE_RISE: 'CLOSE_RISE' // step 5/6
};

export default function DynamicIsland() {
  const [navState, setNavState] = useState(STATE.CLOSED);
  const [isScrolled, setIsScrolled] = useState(false);
  const [viewport, setViewport] = useState('desktop');
  const containerRef = useRef(null);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) setViewport('mobile');
      else if (width < 1024) setViewport('tablet');
      else setViewport('desktop');
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    
    // Initial check
    handleScroll();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Outside click to close
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (navState === STATE.OPEN && containerRef.current && !containerRef.current.contains(e.target)) {
        handleClose();
      }
    };
    
    document.addEventListener('pointerdown', handleOutsideClick);
    return () => document.removeEventListener('pointerdown', handleOutsideClick);
  }, [navState]);

  // Escape to close
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && navState === STATE.OPEN) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [navState]);

  const handleOpen = () => {
    if (navState !== STATE.CLOSED) return;
    
    setNavState(STATE.SHRINK_TO_CIRCLE);
    
    setTimeout(() => {
      setNavState(STATE.IMPACT);
    }, 300);
    
    setTimeout(() => {
      setNavState(STATE.DROPLET);
    }, 450); // fast squash
    
    setTimeout(() => {
      setNavState(STATE.OPEN);
    }, 650); // fast droplet to menu
  };

  const handleClose = () => {
    if (navState !== STATE.OPEN) return;
    
    setNavState(STATE.CLOSE_DROPLET);
    
    setTimeout(() => {
      setNavState(STATE.CLOSE_CIRCLE);
    }, 400); // 0-400: menu to droplet
    
    setTimeout(() => {
      setNavState(STATE.CLOSE_RISE);
    }, 600); // 400-600: droplet to circle
    
    setTimeout(() => {
      setNavState(STATE.CLOSED);
    }, 750); // 600-750: rise to pill
  };

  // Dimensions based on viewport
  let pillWidth = 260;
  let circleSize = 48;
  let menuWidth = 320;
  let fallDistance = 24;

  if (viewport === 'mobile') {
    pillWidth = 200;
    menuWidth = 280;
    fallDistance = 12;
  } else if (viewport === 'tablet') {
    pillWidth = 240;
    menuWidth = 300;
    fallDistance = 16;
  }

  // Calculate current dimensions based on state
  let currentWidth = pillWidth;
  let currentHeight = 48;
  let currentY = 0;
  let scaleX = 1;
  let scaleY = 1;
  let borderRadius = 24;
  let transitionDuration = 0.3;

  if (navState === STATE.SHRINK_TO_CIRCLE) {
    currentWidth = circleSize;
    currentHeight = circleSize;
    transitionDuration = 0.3;
  } else if (navState === STATE.CLOSE_RISE) {
    currentWidth = circleSize;
    currentHeight = circleSize;
    currentY = 0;
    transitionDuration = 0.15;
  } else if (navState === STATE.IMPACT) {
    currentWidth = circleSize;
    currentHeight = circleSize;
    currentY = fallDistance;
    scaleX = 1.05;
    scaleY = 0.95;
    transitionDuration = 0.15;
  } else if (navState === STATE.DROPLET) {
    currentWidth = circleSize;
    currentHeight = circleSize * 1.4;
    currentY = fallDistance - 4;
    borderRadius = '50% 50% 45% 45% / 60% 60% 40% 40%';
    transitionDuration = 0.2;
  } else if (navState === STATE.CLOSE_CIRCLE) {
    currentWidth = circleSize;
    currentHeight = circleSize;
    currentY = fallDistance;
    borderRadius = 24;
    transitionDuration = 0.2;
  } else if (navState === STATE.CLOSE_DROPLET) {
    currentWidth = circleSize;
    currentHeight = circleSize * 1.4;
    currentY = fallDistance - 4;
    borderRadius = '50% 50% 45% 45% / 60% 60% 40% 40%';
    transitionDuration = 0.4; // smooth closing
  } else if (navState === STATE.OPEN) {
    currentWidth = menuWidth;
    currentHeight = 'auto'; // framer-motion will correctly interpolate this if no mode="wait"
    currentY = fallDistance;
    borderRadius = 24;
    transitionDuration = 0.6; // 600ms expansion
  }

  const isCompact = navState !== STATE.CLOSED;
  const isMenuVisible = navState === STATE.OPEN;

  return (
    <div className={`dynamic-island-wrapper ${isScrolled ? 'scrolled' : ''}`}>
      <motion.div
        ref={containerRef}
        className="dynamic-island material-glass"
        animate={{
          width: currentWidth,
          height: currentHeight,
          y: currentY,
          scaleX,
          scaleY,
          borderRadius: typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius
        }}
        transition={{
          type: "tween",
          ease: [0.25, 1, 0.5, 1], // fluid ease-out, no bounce
          duration: transitionDuration
        }}
        onClick={() => {
          if (navState === STATE.CLOSED) {
            handleOpen();
          }
        }}
        layout
      >
        <AnimatePresence>
          {(navState === STATE.CLOSED) && (
            <motion.div 
              key="closed"
              className="di-content-closed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
            >
              <span className="di-name font-body">Satwik Pachauri</span>
              <ChevronDown className="di-chevron" size={14} />
            </motion.div>
          )}

          {isCompact && !isMenuVisible && (
            <motion.div 
              key="compact"
              className="di-content-compact"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
            >
              <span className="di-sp font-body">SP</span>
            </motion.div>
          )}

          {isMenuVisible && (
            <motion.div 
              key="open"
              className="di-content-open"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.3, delay: 0.25 } }} // content appears AFTER surface expands mostly
              exit={{ opacity: 0, y: -8, transition: { duration: 0.15 } }} // content disappears fast on close
            >
              <nav className="di-nav">
                <ul>
                  {navigationLinks.map((link, i) => (
                    <motion.li 
                      key={link.label}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0, transition: { duration: 0.3, delay: 0.3 + (i * 0.03) } }}
                      exit={{ opacity: 0, transition: { duration: 0.1 } }}
                    >
                      {link.external ? (
                        <a href={link.path} target="_blank" rel="noreferrer" className="font-display">
                          {link.label}
                        </a>
                      ) : link.path.startsWith('#') ? (
                        <a href={link.path} className="font-display" onClick={handleClose}>
                          {link.label}
                        </a>
                      ) : (
                        <Link to={link.path} className="font-display" onClick={handleClose}>
                          {link.label}
                        </Link>
                      )}
                    </motion.li>
                  ))}
                </ul>
              </nav>
              
              <motion.div 
                className="theme-selector"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.3, delay: 0.45 } }}
                exit={{ opacity: 0, transition: { duration: 0.1 } }}
              >
                <span className="theme-label font-body">Theme:</span>
                <button 
                  className={theme === 'system' ? 'active font-body' : 'font-body'} 
                  onClick={(e) => { e.stopPropagation(); setTheme('system'); }}
                >System</button>
                <button 
                  className={theme === 'light' ? 'active font-body' : 'font-body'} 
                  onClick={(e) => { e.stopPropagation(); setTheme('light'); }}
                >Light</button>
                <button 
                  className={theme === 'dark' ? 'active font-body' : 'font-body'} 
                  onClick={(e) => { e.stopPropagation(); setTheme('dark'); }}
                >Dark</button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
