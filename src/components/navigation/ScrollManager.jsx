import { useEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function ScrollManager() {
  const location = useLocation();
  const navigationType = useNavigationType(); // 'POP', 'PUSH', 'REPLACE'
  const locationRef = useRef(location);
  const isRestoringRef = useRef(false);
  const transitionIdRef = useRef(0);

  // Keep locationRef current
  useEffect(() => {
    locationRef.current = location;
  }, [location]);

  // Helper to get unique history key
  const getHistoryKey = (loc) => {
    const idx = window.history.state?.idx;
    if (typeof idx === 'number') {
      return `scroll_idx_${idx}`;
    }
    return `scroll_loc_${loc.key || loc.pathname}`;
  };

  // Continuous and event-based scroll tracking
  useEffect(() => {
    let ticking = false;

    const saveScroll = () => {
      // Never save if restoration or route transition is in progress
      if (isRestoringRef.current) return;
      const currentLoc = locationRef.current;
      if (!currentLoc) return;
      // Guard against saving during route transition teardown
      if (currentLoc.pathname !== window.location.pathname) return;

      const y = window.scrollY;

      // 1. Save in history.state
      try {
        const s = window.history.state || {};
        window.history.replaceState({ ...s, __portfolio_scroll: y }, '');
      } catch (e) {}

      // 2. Save in sessionStorage per history entry & pathname
      try {
        const key = getHistoryKey(currentLoc);
        sessionStorage.setItem(key, String(y));
        sessionStorage.setItem(`scroll_path_${currentLoc.pathname}`, String(y));
      } catch (e) {}
    };

    const handleScroll = () => {
      if (isRestoringRef.current) return;
      if (locationRef.current?.pathname !== window.location.pathname) return;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          saveScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    const handleSaveImmediate = () => {
      if (!isRestoringRef.current) {
        saveScroll();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('pagehide', handleSaveImmediate);
    window.addEventListener('beforeunload', handleSaveImmediate);

    return () => {
      handleSaveImmediate();
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('pagehide', handleSaveImmediate);
      window.removeEventListener('beforeunload', handleSaveImmediate);
    };
  }, []);

  // Main scroll restoration and navigation handler
  useEffect(() => {
    // Unique generation identifier for transition ownership
    const currentTransitionId = ++transitionIdRef.current;
    const isReload = window.performance.getEntriesByType('navigation')[0]?.type === 'reload';
    const key = getHistoryKey(location);

    // Transition ownership validator
    const isCurrent = () => transitionIdRef.current === currentTransitionId;

    // ── Scenario D: Anchor Navigation ──────────────────────────────
    if (location.hash) {
      const id = location.hash.replace('#', '');
      isRestoringRef.current = true;
      const startTime = performance.now();

      const handleUserCancel = () => {
        if (isCurrent()) {
          isRestoringRef.current = false;
        }
      };

      window.addEventListener('wheel', handleUserCancel, { passive: true, once: true });
      window.addEventListener('touchstart', handleUserCancel, { passive: true, once: true });
      window.addEventListener('keydown', handleUserCancel, { passive: true, once: true });

      const tryScrollToAnchor = async () => {
        if (!isCurrent()) return;

        // If fonts are still loading, wait up to 300ms for stable layout
        if (document.fonts && document.fonts.status !== 'loaded') {
          try {
            await Promise.race([
              document.fonts.ready,
              new Promise((r) => setTimeout(r, 300))
            ]);
          } catch (e) {}
        }
        if (!isCurrent()) return;

        const element = document.getElementById(id);
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const elapsed = performance.now() - startTime;

        if (element) {
          const targetY = element.getBoundingClientRect().top + window.scrollY;
          const isHeightReady = maxScroll >= targetY - 50;

          if (isHeightReady || elapsed > 1800) {
            if (window.lenis) {
              window.lenis.resize();
              window.lenis.scrollTo(element, { offset: 0, immediate: isReload });
            } else {
              element.scrollIntoView({ behavior: isReload ? 'instant' : 'smooth' });
            }

            ScrollTrigger.update();
            requestAnimationFrame(() => {
              if (!isCurrent()) return;
              ScrollTrigger.refresh();
              if (window.lenis) {
                window.lenis.resize();
                window.lenis.scrollTo(element, { offset: 0, immediate: isReload });
              }
              isRestoringRef.current = false;
            });
            return;
          }
        }

        if (elapsed < 3000) {
          requestAnimationFrame(tryScrollToAnchor);
        } else {
          if (isCurrent()) isRestoringRef.current = false;
        }
      };

      requestAnimationFrame(tryScrollToAnchor);

      return () => {
        if (isCurrent()) {
          isRestoringRef.current = false;
        }
        window.removeEventListener('wheel', handleUserCancel);
        window.removeEventListener('touchstart', handleUserCancel);
        window.removeEventListener('keydown', handleUserCancel);
      };
    }

    // ── Scenario B: New Route Navigation (PUSH) ─────────────────────
    if (navigationType === 'PUSH') {
      isRestoringRef.current = true;

      // 1. Immediately reset Lenis virtual velocity and position without competing loops
      if (window.lenis) {
        window.lenis.reset();
        window.lenis.scrollTo(0, { immediate: true, force: true });
        window.lenis.resize();
      }
      // 2. Immediately reset native window scroll
      window.scrollTo(0, 0);
      ScrollTrigger.update();

      const handleUserCancel = () => {
        if (isCurrent()) {
          isRestoringRef.current = false;
        }
      };
      window.addEventListener('wheel', handleUserCancel, { passive: true, once: true });
      window.addEventListener('touchstart', handleUserCancel, { passive: true, once: true });
      window.addEventListener('keydown', handleUserCancel, { passive: true, once: true });

      // 3. Coordinate double-rAF for DOM commit + layout reflow stabilization
      // Frame 1: React unmounts previous tree and mounts new tree
      // Frame 2: Browser computes geometry and layout heights
      requestAnimationFrame(() => {
        if (!isCurrent()) return;
        requestAnimationFrame(() => {
          if (!isCurrent()) return;
          // Synchronize final layout dimensions once DOM has settled
          if (window.lenis) {
            window.lenis.resize();
          }
          ScrollTrigger.update();
          // Release transition lock cleanly: no delayed timer, no forced second scroll
          isRestoringRef.current = false;
        });
      });

      return () => {
        // Lifecycle safety: never leave restoration lock permanently active on cleanup
        if (isCurrent()) {
          isRestoringRef.current = false;
        }
        window.removeEventListener('wheel', handleUserCancel);
        window.removeEventListener('touchstart', handleUserCancel);
        window.removeEventListener('keydown', handleUserCancel);
      };
    }

    // ── Scenario A & C: Reload or Back/Forward (POP) ─────────────────
    if (navigationType === 'POP') {
      const hasHistoryState = typeof window.history.state?.__portfolio_scroll === 'number';
      
      let targetY = 0;
      if (hasHistoryState) {
        targetY = window.history.state.__portfolio_scroll;
      } else if (isReload) {
        const storageY = sessionStorage.getItem(key);
        const pathY = sessionStorage.getItem(`scroll_path_${location.pathname}`);
        targetY = Number(storageY) || Number(pathY) || 0;
      }

      if (targetY <= 0) {
        // No saved scroll -> start at top
        if (window.lenis) {
          window.lenis.reset();
          window.lenis.scrollTo(0, { immediate: true, force: true });
          window.lenis.resize();
        }
        window.scrollTo(0, 0);
        ScrollTrigger.update();
        return;
      }

      // Restore position smoothly when content height is ready
      isRestoringRef.current = true;

      const handleUserInteraction = () => {
        if (isCurrent()) {
          isRestoringRef.current = false;
        }
      };

      window.addEventListener('wheel', handleUserInteraction, { passive: true, once: true });
      window.addEventListener('touchstart', handleUserInteraction, { passive: true, once: true });
      window.addEventListener('keydown', handleUserInteraction, { passive: true, once: true });

      const startTime = performance.now();

      const tryRestore = async () => {
        if (!isCurrent()) return;

        // If fonts are still loading, wait up to 300ms for stable layout
        if (document.fonts && document.fonts.status !== 'loaded') {
          try {
            await Promise.race([
              document.fonts.ready,
              new Promise((r) => setTimeout(r, 300))
            ]);
          } catch (e) {}
        }
        if (!isCurrent()) return;

        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const isHeightReady = maxScroll >= targetY - 20;
        const elapsed = performance.now() - startTime;

        if (isHeightReady || elapsed > 1800) {
          const finalY = Math.min(targetY, Math.max(0, maxScroll));
          if (window.lenis) {
            window.lenis.resize();
            window.lenis.scrollTo(finalY, { immediate: true });
          }
          window.scrollTo(0, finalY);

          ScrollTrigger.update();
          requestAnimationFrame(() => {
            if (!isCurrent()) return;
            ScrollTrigger.refresh();
            // Re-affirm final scroll after ScrollTrigger recalculates
            if (window.lenis) {
              window.lenis.resize();
              window.lenis.scrollTo(finalY, { immediate: true });
            }
            window.scrollTo(0, finalY);
            isRestoringRef.current = false;
          });
          return;
        }

        requestAnimationFrame(tryRestore);
      };

      requestAnimationFrame(tryRestore);

      return () => {
        if (isCurrent()) {
          isRestoringRef.current = false;
        }
        window.removeEventListener('wheel', handleUserInteraction);
        window.removeEventListener('touchstart', handleUserInteraction);
        window.removeEventListener('keydown', handleUserInteraction);
      };
    }
  }, [location.pathname, location.hash, navigationType]);

  return null;
}
