import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, X, Monitor, Sun, Moon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import styles from './DynamicIsland.module.css';
import { useTheme } from './ThemeProvider';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Projects', path: '/projects' },
  { name: 'Experience', path: '/experience' },
  { name: 'Education', path: '/education' },
  { name: 'Contact', path: '/contact' },
];

export default function DynamicIsland() {
  const [islandState, setIslandState] = useState('CLOSED');
  const location = useLocation();
  const [dropY, setDropY] = useState(20);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setDropY(12);
      else if (window.innerWidth < 1024) setDropY(16);
      else setDropY(24);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollTimeout = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIslandState(prev => {
        if (prev === 'CLOSED') return 'SCROLL_COMPACT';
        return prev;
      });

      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        setIslandState(prev => {
          if (prev === 'SCROLL_COMPACT') return 'CLOSED';
          return prev;
        });
      }, 150); // 150ms debounce
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, []);

  useEffect(() => {
    if (islandState === 'OPEN') {
      closeSequence();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const openSequence = async () => {
    if (islandState !== 'CLOSED' && islandState !== 'SCROLL_COMPACT') return;
    
    if (islandState === 'CLOSED') {
      setIslandState('OPENING_IDENTITY');
      await new Promise(r => setTimeout(r, 250));
    }
    
    setIslandState('COMPACT_CIRCLE');
    await new Promise(r => setTimeout(r, 120));
    
    setIslandState('IMPACT');
    await new Promise(r => setTimeout(r, 350));
    
    setIslandState('DROPLET');
    await new Promise(r => setTimeout(r, 150));
    
    setIslandState('OPEN');
  };

  const closeSequence = async (e) => {
    if (e) e.stopPropagation();
    if (islandState !== 'OPEN') return;
    
    setIslandState('CLOSING'); 
    await new Promise(r => setTimeout(r, 200));
    
    setIslandState('COMPACT_CIRCLE');
    await new Promise(r => setTimeout(r, 200));
    
    setIslandState('CLOSED');
  };

  const getIslandClass = () => {
    switch (islandState) {
      case 'CLOSED': return styles.stateClosed;
      case 'SCROLL_COMPACT': return styles.stateCircle;
      case 'OPENING_IDENTITY': return styles.stateCircle;
      case 'COMPACT_CIRCLE': return styles.stateCircle;
      case 'IMPACT': return styles.stateCircle;
      case 'DROPLET': return styles.stateDroplet;
      case 'OPEN': return styles.stateOpen;
      case 'CLOSING': return styles.stateDroplet;
      default: return styles.stateClosed;
    }
  };

  const transformVariants = {
    CLOSED: { y: 0, scaleX: 1, scaleY: 1, transition: { type: 'spring', stiffness: 350, damping: 30 } },
    SCROLL_COMPACT: { y: 0, scaleX: 1, scaleY: 1, transition: { type: 'spring', stiffness: 300, damping: 25 } },
    OPENING_IDENTITY: { y: 0, scaleX: 1, scaleY: 1, transition: { type: 'spring', stiffness: 350, damping: 30 } },
    COMPACT_CIRCLE: { y: 0, scaleX: 1, scaleY: 1 },
    IMPACT: { 
      y: dropY, 
      scaleX: 1.05, 
      scaleY: 0.95,
      transition: {
        y: { type: 'tween', ease: 'easeIn', duration: 0.25 },
        scaleX: { delay: 0.20, duration: 0.15, ease: 'easeOut' },
        scaleY: { delay: 0.20, duration: 0.15, ease: 'easeOut' }
      }
    },
    DROPLET: { 
      y: dropY - 4,
      scaleX: 0.98,
      scaleY: 1.02,
      transition: { type: 'tween', ease: 'easeOut', duration: 0.15 }
    },
    OPEN: { 
      y: dropY - 4,
      scaleX: 1, 
      scaleY: 1,
      transition: { type: 'spring', stiffness: 300, damping: 25 }
    },
    CLOSING: {
      y: dropY - 4,
      scaleX: 0.98,
      scaleY: 1.02,
      transition: { type: 'spring', stiffness: 300, damping: 25 }
    }
  };

  const isClosedMode = islandState === 'CLOSED' || islandState === 'SCROLL_COMPACT';
  const showName = islandState === 'CLOSED';
  const isOpenMode = islandState === 'OPEN';

  return (
    <div className={styles.islandContainer}>
      <motion.div 
        layout
        className={`${styles.island} ${getIslandClass()} ${isClosedMode ? styles.clickable : ''}`}
        variants={transformVariants}
        initial="CLOSED"
        animate={islandState}
        onClick={isClosedMode ? openSequence : undefined}
        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
      >
        
        {/* The Universal SP Center */}
        <motion.div layout className={styles.spContainer}>
          <motion.span 
            className={styles.spText}
            animate={{ opacity: showName ? 0 : 1 }}
            transition={{ duration: 0.25 }}
          >
            SP
          </motion.span>
        </motion.div>

        {/* The Menu links */}
        <AnimatePresence>
          {isOpenMode && (
            <motion.div 
              className={styles.menuLinksContainer}
              initial={{ opacity: 0, filter: 'blur(4px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <nav className={styles.navLinks}>
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + (i * 0.04), duration: 0.3 }}
                  >
                    <Link to={link.path} className={styles.navLink}>
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + (navLinks.length * 0.04), duration: 0.3 }}
                >
                  <a href="https://drive.google.com/drive/folders/1TBI0_91mPWLTq9ln9e2fddyNnZWm4K-7?usp=sharing" target="_blank" rel="noopener noreferrer" className={styles.navLink}>
                    Resume
                  </a>
                </motion.div>
              </nav>
              
              <motion.div 
                className={styles.themeControlContainer}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
              >
                <div className={styles.themeDivider} />
                <span className={styles.themeLabel}>Appearance</span>
                <div className={styles.themeControl}>
                  <button className={`${styles.themeBtn} ${theme === 'system' ? styles.themeBtnActive : ''}`} onClick={(e) => { e.stopPropagation(); setTheme('system'); }}>
                    <Monitor size={14} strokeWidth={2} /> <span className={styles.themeBtnLabel}>System</span>
                  </button>
                  <button className={`${styles.themeBtn} ${theme === 'light' ? styles.themeBtnActive : ''}`} onClick={(e) => { e.stopPropagation(); setTheme('light'); }}>
                    <Sun size={14} strokeWidth={2} /> <span className={styles.themeBtnLabel}>Light</span>
                  </button>
                  <button className={`${styles.themeBtn} ${theme === 'dark' ? styles.themeBtnActive : ''}`} onClick={(e) => { e.stopPropagation(); setTheme('dark'); }}>
                    <Moon size={14} strokeWidth={2} /> <span className={styles.themeBtnLabel}>Dark</span>
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* The Name + Signifier layer (absolute to perfectly overlay without shifting SP) */}
        <AnimatePresence>
          {showName && (
            <motion.div 
              className={styles.nameLayer}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
            >
              <span className={styles.name}>Satwik Pachauri</span>
              <div className={styles.signifierWrapper}>
                <ChevronDown size={14} strokeWidth={1.5} className={styles.signifier} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Subtle Close Button */}
        <AnimatePresence>
          {isOpenMode && (
            <motion.button 
              className={styles.closeBtn}
              onClick={closeSequence}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.2 }}
              aria-label="Close menu"
            >
              <X size={14} strokeWidth={2} />
            </motion.button>
          )}
        </AnimatePresence>

      </motion.div>
    </div>
  );
}
