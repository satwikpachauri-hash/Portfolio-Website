import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useMotionValue, useVelocity, useSpring, useTransform, animate } from 'motion/react';
import { ChevronLeft, ChevronRight, Expand } from 'lucide-react';
import './VisualExplorations.css';

const photoData = [
  { id: 1, title: 'Warm Horizon', observation: 'Long lines, warm light, and architecture fading into the evening haze.', src: '/assets/photography/2.jpeg', alt: 'Rashtrapati Bhavan' },
  { id: 2, title: 'Pattern in the Wild', observation: 'Texture, pattern, and soft focus turn a small subject into a larger scene.', src: '/assets/photography/WhatsApp Image 2026-09-23 at 7.27.20 PM (3).jpeg', alt: 'Butterfly with white flowers' },
  { id: 3, title: 'After Rain', observation: 'Small droplets follow the curve of the leaf like temporary glass.', src: '/assets/photography/WhatsApp Image 2026-09-23 at 7.27.26 PM.jpeg', alt: 'Green leaf with droplets' },
  { id: 4, title: 'Blue in Sunlight', observation: 'Hard sunlight cuts across a weathered surface and reveals its texture.', src: '/assets/photography/WhatsApp Image 2026-09-23 at 7.27.30 PM.jpeg', alt: 'Blue door' },
  { id: 5, title: 'Framed in Green', observation: 'Foliage creates a natural frame around a quiet subject against the city.', src: '/assets/photography/WhatsApp Image 2026-09-23 at 7.26.48 PM.jpeg', alt: 'Peacock' },
  { id: 6, title: 'Against the Sky', observation: 'An open background isolates the butterfly and gives the frame a quiet sense of space.', src: '/assets/photography/WhatsApp Image 2026-09-23 at 7.27.21 PM.jpeg', alt: 'Second butterfly' },
  { id: 7, title: 'Quiet Structure', observation: 'A delicate web catches light while the world behind it falls softly away.', src: '/assets/photography/WhatsApp Image 2026-09-23 at 7.27.22 PM (1).jpeg', alt: 'Spider web' },
  { id: 8, title: 'Held in Water', observation: 'Tiny reflections gather along an ordinary branch and change how it reads.', src: '/assets/photography/WhatsApp Image 2026-09-23 at 7.27.20 PM.jpeg', alt: 'Yellow branch with droplets' },
  { id: 9, title: 'Suspended', observation: 'A sequence of droplets turns a distant landscape into a chain of reflections.', src: '/assets/photography/WhatsApp Image 2026-09-23 at 7.27.27 PM.jpeg', alt: 'Hanging droplets' },
  { id: 10, title: 'In Conversation', observation: 'Two opposing forms create a quiet visual relationship across the frame.', src: '/assets/photography/WhatsApp Image 2026-09-23 at 7.27.18 PM (2).jpeg', alt: 'Sculptures' },
  { id: 11, title: 'The Ship', observation: 'A wider frame establishes the miniature ship as a world of its own.', src: '/assets/photography/WhatsApp Image 2026-09-23 at 7.26.51 PM (1).jpeg', alt: 'Ship frame 01' },
  { id: 12, title: 'Deck', observation: 'Closer framing brings the timber, ropes, and structure into focus.', src: '/assets/photography/WhatsApp Image 2026-09-23 at 7.26.51 PM (2).jpeg', alt: 'Ship frame 02' },
  { id: 13, title: 'Detail', observation: 'Shallow focus isolates the deck mechanisms and softens everything around them.', src: '/assets/photography/WhatsApp Image 2026-09-23 at 7.26.51 PM (3).jpeg', alt: 'Ship frame 03' },
  { id: 14, title: 'Rigging', observation: 'Ropes, masts, and lines create a dense pattern of texture and depth.', src: '/assets/photography/WhatsApp Image 2026-09-23 at 7.26.52 PM (1).jpeg', alt: 'Ship frame 04' },
  { id: 15, title: 'Pulley', observation: 'Repeated wooden forms turn functional details into a visual rhythm.', src: '/assets/photography/WhatsApp Image 2026-09-23 at 7.26.52 PM (2).jpeg', alt: 'Ship frame 05' },
  { id: 16, title: 'Through Glass', observation: 'Reflection and transparency turn the miniature ship into a layered scene.', src: '/assets/photography/WhatsApp Image 2026-09-23 at 7.26.52 PM.jpeg', alt: 'Ship reflection' },
  { id: 17, title: 'Reflected Landscape', observation: 'A single hanging droplet acts as a natural lens.', src: '/assets/photography/WhatsApp Image 2026-09-23 at 7.27.26 PM (1).jpeg', alt: 'Droplet lens' }
];

const graphicWorks = [
  {
    id: 1,
    image: '/assets/graphic-design/EIPF Poster.webp',
    title: 'Ethos Share',
    observation: 'Poster submission · Emirates International Poster Festival',
    alt: 'Ethos Share - Emirates International Poster Festival'
  }
];

export default function VisualExplorations() {
  const [viewerPhotoId, setViewerPhotoId] = useState(null);
  const [isGraphicViewerOpen, setIsGraphicViewerOpen] = useState(false);
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const indicatorTrackRef = useRef(null);
  const thumbRef = useRef(null);
  const sectionRef = useRef(null);

  // Device orientation / gyroscope state (Phone + Tablet touch devices only)
  const tiltEnabledRef = useRef(false);
  const isCalibratedRef = useRef(false);
  const neutralBetaRef = useRef(0);
  const neutralGammaRef = useRef(0);
  const hasRequestedPermissionRef = useRef(false);

  const targetPhotoRotX = useRef(0);
  const targetPhotoRotY = useRef(0);
  const currentPhotoRotX = useRef(0);
  const currentPhotoRotY = useRef(0);

  const targetPosterRotX = useRef(0);
  const targetPosterRotY = useRef(0);
  const currentPosterRotX = useRef(0);
  const currentPosterRotY = useRef(0);

  const rafIdRef = useRef(null);
  const isSectionVisibleRef = useRef(false);
  const isAnyViewerOpenRef = useRef(false);
  
  // Drag suppression state with movement threshold tracking
  const isDragging = useRef(false);
  const pointerStartPos = useRef({ x: 0, y: 0, time: 0 });
  const isGraphicDragging = useRef(false);
  const graphicPointerStartPos = useRef({ x: 0, y: 0, time: 0 });

  // Focus restoration
  const lastFocusedRef = useRef(null);

  // One-time drag demonstration
  const hasNudgedRef = useRef(false);
  const hasInteractedRef = useRef(false);
  const nudgeAnimationRef = useRef(null);
  const nudgeTimeoutRef = useRef(null);

  // Single source of truth bounds reference (always live, no stale closures)
  const boundsRef = useRef({
    maxDrag: 0,
    minX: 0,
    maxX: 0,
    viewportWidth: 0,
    trackWidth: 0,
    indicatorWidth: 160,
    thumbWidth: 36,
    availableTravel: 124
  });

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Physics-based sway for photography dragging
  const x = useMotionValue(0);
  const velocity = useVelocity(x);
  const smoothVelocity = useSpring(velocity, { damping: 40, stiffness: 400 });
  const dragTilt = useTransform(smoothVelocity, [-1000, 0, 1000], [-3, 0, 3]);

  // Recalculate real gallery movement boundaries and available thumb travel
  const updateBounds = useCallback(() => {
    if (!viewportRef.current || !trackRef.current) return;

    const vWidth = viewportRef.current.clientWidth;
    const tWidth = trackRef.current.scrollWidth;
    const maxDrag = Math.max(0, tWidth - vWidth);
    const iTrackWidth = indicatorTrackRef.current?.clientWidth || (window.innerWidth < 768 ? 130 : 160);

    const calculatedThumbWidth = tWidth > 0 
      ? Math.max(28, Math.min(52, Math.round((vWidth / tWidth) * iTrackWidth)))
      : 36;

    const availableTravel = Math.max(0, iTrackWidth - calculatedThumbWidth);

    boundsRef.current = {
      maxDrag,
      minX: -maxDrag,
      maxX: 0,
      viewportWidth: vWidth,
      trackWidth: tWidth,
      indicatorWidth: iTrackWidth,
      thumbWidth: calculatedThumbWidth,
      availableTravel
    };

    if (thumbRef.current) {
      thumbRef.current.style.width = `${calculatedThumbWidth}px`;
      const currentX = x.get();
      const clampedX = Math.min(0, Math.max(-maxDrag, currentX));
      const progress = maxDrag > 0 ? Math.max(0, Math.min(1, -clampedX / maxDrag)) : 0;
      thumbRef.current.style.transform = `translateX(${progress * availableTravel}px)`;
    }

    const currentX = x.get();
    setCanScrollLeft(currentX < -2);
    setCanScrollRight(maxDrag > 0 && currentX > -(maxDrag - 2));
  }, [x]);

  useEffect(() => {
    updateBounds();
    const ro = new ResizeObserver(() => {
      updateBounds();
    });
    if (viewportRef.current) ro.observe(viewportRef.current);
    if (trackRef.current) ro.observe(trackRef.current);
    if (indicatorTrackRef.current) ro.observe(indicatorTrackRef.current);
    window.addEventListener('resize', updateBounds);
    window.addEventListener('load', updateBounds);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', updateBounds);
      window.removeEventListener('load', updateBounds);
    };
  }, [updateBounds]);

  // Direct subscription to the single source of truth motion value (x)
  // Guarantees synchronous updates during dragging, inertia, arrows, and demonstration with zero React re-renders
  useEffect(() => {
    const updateThumb = (latestX) => {
      const b = boundsRef.current;
      if (!b || b.maxDrag <= 0 || !thumbRef.current) return;

      // Gallery coordinates:
      // maxX is 0 (start / leftmost cards)
      // minX is -b.maxDrag (end / rightmost cards)
      // progress = (currentX - maxX) / (minX - maxX) = -latestX / b.maxDrag
      const clampedX = Math.min(0, Math.max(-b.maxDrag, latestX));
      const progress = Math.max(0, Math.min(1, -clampedX / b.maxDrag));
      const thumbPosition = progress * b.availableTravel;

      thumbRef.current.style.transform = `translateX(${thumbPosition}px)`;
    };

    // Initial update
    updateThumb(x.get());

    const unsubscribe = x.on('change', (latest) => {
      updateThumb(latest);
      
      const atLeft = latest >= -2;
      const atRight = boundsRef.current.maxDrag > 0 && latest <= -(boundsRef.current.maxDrag - 2);
      setCanScrollLeft(!atLeft);
      setCanScrollRight(!atRight);
    });

    return () => unsubscribe();
  }, [x]);

  // Graphic Design Pendulum Drag
  const graphicRotation = useSpring(1, { damping: 15, stiffness: 150 });

  const cancelNudge = () => {
    hasInteractedRef.current = true;
    hasNudgedRef.current = true;
    if (nudgeTimeoutRef.current) {
      clearTimeout(nudgeTimeoutRef.current);
      nudgeTimeoutRef.current = null;
    }
    if (nudgeAnimationRef.current) {
      nudgeAnimationRef.current.stop();
      nudgeAnimationRef.current = null;
    }
  };

  const handleScrollLeft = () => {
    cancelNudge();
    const b = boundsRef.current;
    const currentX = x.get();
    const step = Math.min(b.viewportWidth * 0.65 || 280, 280);
    const targetX = Math.min(0, currentX + step);
    animate(x, targetX, { duration: 0.45, ease: [0.25, 1, 0.5, 1] });
  };

  const handleScrollRight = () => {
    cancelNudge();
    const b = boundsRef.current;
    const currentX = x.get();
    const step = Math.min(b.viewportWidth * 0.65 || 280, 280);
    const targetX = Math.max(-b.maxDrag, currentX - step);
    animate(x, targetX, { duration: 0.45, ease: [0.25, 1, 0.5, 1] });
  };

  const handleGraphicPan = (e, info) => {
    cancelNudge();
    if (Math.abs(info.offset.x) > 4) {
      isGraphicDragging.current = true;
    }
    let tilt = info.offset.x * -0.06;
    tilt = Math.max(Math.min(tilt, 10), -10);
    graphicRotation.set(tilt + 1);
  };

  const handleGraphicPanEnd = () => {
    graphicRotation.set(1);
    setTimeout(() => {
      isGraphicDragging.current = false;
    }, 50);
  };

  // One-time horizontal drag demonstration when gallery enters viewport
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (
          entry.isIntersecting &&
          !hasNudgedRef.current &&
          !hasInteractedRef.current &&
          !viewerPhotoId &&
          !isGraphicViewerOpen
        ) {
          const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          if (prefersReducedMotion) {
            hasNudgedRef.current = true;
            return;
          }

          hasNudgedRef.current = true;

          // 1. Wait approximately 400 milliseconds
          nudgeTimeoutRef.current = setTimeout(() => {
            if (hasInteractedRef.current) return;

            // 2. Move photograph arrangement horizontally by ~70–90px (-80px to reveal cards to the right)
            // 3. Return smoothly to original resting position (0)
            // 4. Run demonstration only once per page visit
            // Total movement duration ~1200ms (within 1000–1400ms range)
            const b = boundsRef.current;
            const demoDist = Math.min(80, b.maxDrag > 0 ? b.maxDrag : 80);
            nudgeAnimationRef.current = animate(x, [0, -demoDist, 0], {
              duration: 1.2,
              ease: "easeInOut",
              times: [0, 0.45, 1],
              onComplete: () => {
                nudgeAnimationRef.current = null;
              }
            });
          }, 400);
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (nudgeTimeoutRef.current) {
        clearTimeout(nudgeTimeoutRef.current);
      }
      if (nudgeAnimationRef.current) {
        nudgeAnimationRef.current.stop();
      }
    };
  }, [viewerPhotoId, isGraphicViewerOpen, x]);

  const isAnyViewerOpen = Boolean(viewerPhotoId || isGraphicViewerOpen);
  isAnyViewerOpenRef.current = isAnyViewerOpen;

  // Device orientation event handler with neutral calibration, dead zone, screen rotation compensation, and clamping
  const handleOrientation = useCallback((e) => {
    if (!tiltEnabledRef.current) return;
    if (e.beta === null || e.gamma === null) return;

    // Capture neutral resting orientation on first sensor event
    if (!isCalibratedRef.current) {
      neutralBetaRef.current = e.beta;
      neutralGammaRef.current = e.gamma;
      isCalibratedRef.current = true;
      return;
    }

    // Relative angles against calibrated neutral position
    let deltaBeta = e.beta - neutralBetaRef.current;
    let deltaGamma = e.gamma - neutralGammaRef.current;

    // Compensate for screen orientation rotation (0, 90, 180, 270/-90)
    const orientationAngle =
      window.screen?.orientation?.angle ??
      (typeof window.orientation === 'number' ? window.orientation : 0);

    let rawX = 0; // vertical pitch (rotateX)
    let rawY = 0; // horizontal roll (rotateY)

    if (orientationAngle === 90) {
      rawX = -deltaGamma;
      rawY = deltaBeta;
    } else if (orientationAngle === -90 || orientationAngle === 270) {
      rawX = deltaGamma;
      rawY = -deltaBeta;
    } else if (orientationAngle === 180) {
      rawX = -deltaBeta;
      rawY = -deltaGamma;
    } else {
      rawX = deltaBeta;
      rawY = deltaGamma;
    }

    // Dead zone: ±0.8° relative movement resolves to 0 to prevent stationary jitter
    const DEAD_ZONE = 0.8;
    if (Math.abs(rawX) < DEAD_ZONE) rawX = 0;
    else rawX = rawX > 0 ? rawX - DEAD_ZONE : rawX + DEAD_ZONE;

    if (Math.abs(rawY) < DEAD_ZONE) rawY = 0;
    else rawY = rawY > 0 ? rawY - DEAD_ZONE : rawY + DEAD_ZONE;

    // Normalization range: ±25° physical tilt maps to full clamp
    const NORMALIZATION_RANGE = 25;
    const normX = Math.max(-1, Math.min(1, rawX / NORMALIZATION_RANGE));
    const normY = Math.max(-1, Math.min(1, rawY / NORMALIZATION_RANGE));

    // Clamp bounds:
    // Photography cards: rotateY ±3.5°, rotateX ±2.5°
    const PHOTO_MAX_ROT_Y = 3.5;
    const PHOTO_MAX_ROT_X = 2.5;
    targetPhotoRotX.current = -normX * PHOTO_MAX_ROT_X;
    targetPhotoRotY.current = normY * PHOTO_MAX_ROT_Y;

    // Ethos Share poster: more restrained, rotateY ±2.0°, rotateX ±1.5°
    const POSTER_MAX_ROT_Y = 2.0;
    const POSTER_MAX_ROT_X = 1.5;
    targetPosterRotX.current = -normX * POSTER_MAX_ROT_X;
    targetPosterRotY.current = normY * POSTER_MAX_ROT_Y;
  }, []);

  const handleScreenOrientationChange = useCallback(() => {
    isCalibratedRef.current = false;
    targetPhotoRotX.current = 0;
    targetPhotoRotY.current = 0;
    targetPosterRotX.current = 0;
    targetPosterRotY.current = 0;
  }, []);

  const disableTilt = useCallback(() => {
    tiltEnabledRef.current = false;
    isCalibratedRef.current = false;
    targetPhotoRotX.current = 0;
    targetPhotoRotY.current = 0;
    targetPosterRotX.current = 0;
    targetPosterRotY.current = 0;
    window.removeEventListener('deviceorientation', handleOrientation, true);
    window.removeEventListener('orientationchange', handleScreenOrientationChange);
    if (window.screen?.orientation) {
      window.screen.orientation.removeEventListener('change', handleScreenOrientationChange);
    }
  }, [handleOrientation, handleScreenOrientationChange]);

  const enableTilt = useCallback(() => {
    if (tiltEnabledRef.current) return;
    tiltEnabledRef.current = true;
    isCalibratedRef.current = false;
    window.addEventListener('deviceorientation', handleOrientation, true);
    window.addEventListener('orientationchange', handleScreenOrientationChange);
    if (window.screen?.orientation) {
      window.screen.orientation.addEventListener('change', handleScreenOrientationChange);
    }
  }, [handleOrientation, handleScreenOrientationChange]);

  // Automatic device-orientation initialisation (Phone & Tablet touch only)
  useEffect(() => {
    const checkSupport = () => {
      if (typeof window === 'undefined') return false;

      // 1. Reduced motion gating
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) return false;

      // Allow automated testing override if explicitly enabled
      if (window.__ANTIGRAVITY_ENABLE_TILT_TEST__) return true;

      // 2. Coarse pointer / touch device check
      const isCoarse = window.matchMedia('(pointer: coarse)').matches;
      const hasTouch = 'ontouchstart' in window || (typeof navigator !== 'undefined' && navigator.maxTouchPoints > 0);
      if (!isCoarse && !hasTouch) return false;

      // Desktop check: Exclude pure desktop fine pointer (mouse with no coarse touch)
      const isPureFine = window.matchMedia('(hover: hover) and (pointer: fine)').matches && !isCoarse;
      if (isPureFine) return false;

      // 3. Orientation API check
      const hasOrientationApi = 'DeviceOrientationEvent' in window;
      if (!hasOrientationApi) return false;

      return true;
    };

    const activateIfSupported = () => {
      if (!checkSupport()) {
        disableTilt();
        return;
      }

      // Check if browser requires user gesture permission (iOS 13+ Safari)
      if (
        typeof DeviceOrientationEvent !== 'undefined' &&
        typeof DeviceOrientationEvent.requestPermission === 'function'
      ) {
        const handleFirstGesture = () => {
          if (hasRequestedPermissionRef.current) return;
          hasRequestedPermissionRef.current = true;
          DeviceOrientationEvent.requestPermission()
            .then((permissionState) => {
              if (permissionState === 'granted') {
                enableTilt();
              }
            })
            .catch(() => {});
          window.removeEventListener('touchstart', handleFirstGesture, true);
          window.removeEventListener('pointerdown', handleFirstGesture, true);
        };

        window.addEventListener('touchstart', handleFirstGesture, { capture: true, once: true });
        window.addEventListener('pointerdown', handleFirstGesture, { capture: true, once: true });
      } else {
        // Automatically activate on Android and standard browsers permitting orientation
        enableTilt();
      }
    };

    activateIfSupported();

    const handleMediaChange = () => {
      activateIfSupported();
    };

    const coarseQuery = window.matchMedia('(pointer: coarse)');
    const fineQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    coarseQuery.addEventListener?.('change', handleMediaChange);
    fineQuery.addEventListener?.('change', handleMediaChange);
    motionQuery.addEventListener?.('change', handleMediaChange);

    return () => {
      coarseQuery.removeEventListener?.('change', handleMediaChange);
      fineQuery.removeEventListener?.('change', handleMediaChange);
      motionQuery.removeEventListener?.('change', handleMediaChange);
      disableTilt();
    };
  }, [enableTilt, disableTilt]);

  // Section visibility, document visibility, and requestAnimationFrame interpolation loop
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        isSectionVisibleRef.current = entry.isIntersecting;
        if (!entry.isIntersecting && sectionRef.current) {
          sectionRef.current.style.removeProperty('--photo-tilt-x');
          sectionRef.current.style.removeProperty('--photo-tilt-y');
          sectionRef.current.style.removeProperty('--poster-tilt-x');
          sectionRef.current.style.removeProperty('--poster-tilt-y');
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(el);

    const handleDocVisibility = () => {
      if (document.visibilityState === 'hidden' && sectionRef.current) {
        sectionRef.current.style.removeProperty('--photo-tilt-x');
        sectionRef.current.style.removeProperty('--photo-tilt-y');
        sectionRef.current.style.removeProperty('--poster-tilt-x');
        sectionRef.current.style.removeProperty('--poster-tilt-y');
      }
    };
    document.addEventListener('visibilitychange', handleDocVisibility);

    const tick = () => {
      if (
        isSectionVisibleRef.current &&
        document.visibilityState !== 'hidden' &&
        !isAnyViewerOpenRef.current
      ) {
        const smoothing = 0.12;

        if (tiltEnabledRef.current) {
          currentPhotoRotX.current += (targetPhotoRotX.current - currentPhotoRotX.current) * smoothing;
          currentPhotoRotY.current += (targetPhotoRotY.current - currentPhotoRotY.current) * smoothing;
          currentPosterRotX.current += (targetPosterRotX.current - currentPosterRotX.current) * smoothing;
          currentPosterRotY.current += (targetPosterRotY.current - currentPosterRotY.current) * smoothing;

          if (sectionRef.current) {
            sectionRef.current.style.setProperty('--photo-tilt-x', `${currentPhotoRotX.current.toFixed(2)}deg`);
            sectionRef.current.style.setProperty('--photo-tilt-y', `${currentPhotoRotY.current.toFixed(2)}deg`);
            sectionRef.current.style.setProperty('--poster-tilt-x', `${currentPosterRotX.current.toFixed(2)}deg`);
            sectionRef.current.style.setProperty('--poster-tilt-y', `${currentPosterRotY.current.toFixed(2)}deg`);
          }
        } else if (
          Math.abs(currentPhotoRotX.current) > 0.005 ||
          Math.abs(currentPhotoRotY.current) > 0.005 ||
          Math.abs(currentPosterRotX.current) > 0.005 ||
          Math.abs(currentPosterRotY.current) > 0.005
        ) {
          // Smooth return to neutral (0, 0)
          currentPhotoRotX.current += (0 - currentPhotoRotX.current) * smoothing;
          currentPhotoRotY.current += (0 - currentPhotoRotY.current) * smoothing;
          currentPosterRotX.current += (0 - currentPosterRotX.current) * smoothing;
          currentPosterRotY.current += (0 - currentPosterRotY.current) * smoothing;

          if (
            Math.abs(currentPhotoRotX.current) < 0.01 &&
            Math.abs(currentPhotoRotY.current) < 0.01 &&
            Math.abs(currentPosterRotX.current) < 0.01 &&
            Math.abs(currentPosterRotY.current) < 0.01
          ) {
            currentPhotoRotX.current = 0;
            currentPhotoRotY.current = 0;
            currentPosterRotX.current = 0;
            currentPosterRotY.current = 0;
            if (sectionRef.current) {
              sectionRef.current.style.removeProperty('--photo-tilt-x');
              sectionRef.current.style.removeProperty('--photo-tilt-y');
              sectionRef.current.style.removeProperty('--poster-tilt-x');
              sectionRef.current.style.removeProperty('--poster-tilt-y');
            }
          } else if (sectionRef.current) {
            sectionRef.current.style.setProperty('--photo-tilt-x', `${currentPhotoRotX.current.toFixed(2)}deg`);
            sectionRef.current.style.setProperty('--photo-tilt-y', `${currentPhotoRotY.current.toFixed(2)}deg`);
            sectionRef.current.style.setProperty('--poster-tilt-x', `${currentPosterRotX.current.toFixed(2)}deg`);
            sectionRef.current.style.setProperty('--poster-tilt-y', `${currentPosterRotY.current.toFixed(2)}deg`);
          }
        }
      }

      rafIdRef.current = requestAnimationFrame(tick);
    };

    rafIdRef.current = requestAnimationFrame(tick);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleDocVisibility);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  // Cleanup orientation listeners on unmount
  useEffect(() => {
    return () => {
      window.removeEventListener('deviceorientation', handleOrientation, true);
      window.removeEventListener('orientationchange', handleScreenOrientationChange);
      if (window.screen?.orientation) {
        window.screen.orientation.removeEventListener('change', handleScreenOrientationChange);
      }
    };
  }, [handleOrientation, handleScreenOrientationChange]);

  const savedScrollY = useRef(0);

  // Shared viewer state synchronization: document attribute and scroll lock
  useEffect(() => {
    let handleScrollLock = null;
    if (isAnyViewerOpen) {
      savedScrollY.current = window.scrollY;
      document.documentElement.setAttribute('data-viewer-open', 'true');
      
      // Close navigation menu if open
      if (document.documentElement.getAttribute('data-nav-open') === 'true') {
        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
      }

      // Lock body and document scroll while preserving scroll position
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      if (window.lenis) {
        window.lenis.stop();
      }

      handleScrollLock = () => {
        if (window.scrollY !== savedScrollY.current) {
          window.scrollTo(0, savedScrollY.current);
        }
      };
      window.addEventListener('scroll', handleScrollLock, { passive: false });
    } else {
      document.documentElement.removeAttribute('data-viewer-open');
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      if (window.lenis) {
        window.lenis.start();
      }
      if (savedScrollY.current > 0) {
        window.scrollTo(0, savedScrollY.current);
      }
    }

    return () => {
      if (handleScrollLock) {
        window.removeEventListener('scroll', handleScrollLock);
      }
      document.documentElement.removeAttribute('data-viewer-open');
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      if (window.lenis) {
        window.lenis.start();
      }
      if (savedScrollY.current > 0) {
        window.scrollTo(0, savedScrollY.current);
      }
    };
  }, [isAnyViewerOpen]);

  // Touch scroll prevention for background page on mobile devices
  useEffect(() => {
    if (!isAnyViewerOpen) return;

    const handleTouchMove = (e) => {
      const target = e.target;
      const overlay = target && typeof target.closest === 'function' ? target.closest('.photo-viewer-overlay') : null;
      if (!overlay) {
        e.preventDefault();
      }
    };

    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    return () => {
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isAnyViewerOpen]);

  const closeAllViewers = () => {
    setViewerPhotoId(null);
    setIsGraphicViewerOpen(false);
    if (lastFocusedRef.current) {
      lastFocusedRef.current.focus();
    }
  };

  // Listen to external close event triggered by the morphed Liquid Glass top-right button
  useEffect(() => {
    const handleExternalClose = () => {
      closeAllViewers();
    };
    window.addEventListener('portfolio-close-viewer', handleExternalClose);
    return () => window.removeEventListener('portfolio-close-viewer', handleExternalClose);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isAnyViewerOpen) {
        e.preventDefault();
        closeAllViewers();
        return;
      }
      if (!viewerPhotoId) return;
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAnyViewerOpen, viewerPhotoId]);

  const handleNext = () => {
    if (viewerPhotoId < photoData.length) {
      setViewerPhotoId(viewerPhotoId + 1);
    }
  };

  const handlePrev = () => {
    if (viewerPhotoId > 1) {
      setViewerPhotoId(viewerPhotoId - 1);
    }
  };

  const openPhotoViewer = (id, triggerEl) => {
    lastFocusedRef.current = triggerEl || document.activeElement;
    setViewerPhotoId(id);
  };

  const openGraphicViewer = (triggerEl) => {
    lastFocusedRef.current = triggerEl || document.activeElement;
    setIsGraphicViewerOpen(true);
  };

  const handlePhotoPointerDown = (e) => {
    cancelNudge();
    pointerStartPos.current = { x: e.clientX, y: e.clientY, time: Date.now() };
    isDragging.current = false;
  };

  const handlePhotoPointerMove = (e) => {
    if (pointerStartPos.current.x > 0 || pointerStartPos.current.y > 0) {
      const distance = Math.hypot(e.clientX - pointerStartPos.current.x, e.clientY - pointerStartPos.current.y);
      if (distance > 8) {
        isDragging.current = true;
      }
    }
  };

  const handlePhotoClick = (e, item, cardEl) => {
    // If movement exceeds the 8px drag threshold or active drag, suppress click
    if (isDragging.current) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    if (pointerStartPos.current.x > 0 && pointerStartPos.current.y > 0 && e.clientX > 0 && e.clientY > 0) {
      const distance = Math.hypot(e.clientX - pointerStartPos.current.x, e.clientY - pointerStartPos.current.y);
      if (distance > 8) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }
    }
    openPhotoViewer(item.id, cardEl);
  };

  const renderPhotoCard = (item, index) => {
    const baseRot = [-2, -1, 0, 1, 2][index % 5];
    return (
      <div 
        key={item.id}
        className="contact-card-wrapper"
        onClick={(e) => handlePhotoClick(e, item, e.currentTarget)}
        onPointerDown={handlePhotoPointerDown}
        onPointerMove={handlePhotoPointerMove}
        onPointerUp={() => {
          setTimeout(() => { isDragging.current = false; }, 80);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openPhotoViewer(item.id, e.currentTarget);
          }
        }}
        role="button"
        aria-label={`Open photograph: ${item.title}`}
        tabIndex={0}
      >
        <motion.div 
          className="drag-tilt-layer" 
          style={{ rotate: dragTilt, transformOrigin: '50% 4px' }}
        >
          <div className="base-tilt-layer" style={{ transform: `rotate(${baseRot}deg)` }}>
            <div className="card-gyro-tilt-layer">
              <div className="card-pin"></div>
              <div className={`contact-card sway-${index % 3}`}>
                <div className="contact-card-frame">
                  <img src={item.src} alt={item.alt} loading="lazy" draggable={false} />
                  <div className="card-expand-badge" aria-hidden="true">
                    <Expand size={14} strokeWidth={2.2} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  };

  const activePhotoIndex = viewerPhotoId ? photoData.findIndex(p => p.id === viewerPhotoId) : -1;
  const activePhoto = activePhotoIndex !== -1 ? photoData[activePhotoIndex] : null;

  return (
    <section className="explorations-section" id="explorations" ref={sectionRef}>
      <div className="explorations-container">
        <div className="explorations-header">
          <h2 className="explorations-title font-display">EXPLORATIONS</h2>
        </div>

        <div className="exploration-subsection">
          <div className="subsection-header main-sub">
            <h3 className="subsection-title font-display">
              01<span className="title-spacer"></span>PHOTOGRAPHY
            </h3>
          </div>

          <div className="contact-sheet-wrapper">
            <div 
              className="drag-viewport" 
              ref={viewportRef}
              onPointerDown={cancelNudge}
              onTouchStart={cancelNudge}
            >
              <motion.div 
                ref={trackRef}
                className="drag-track"
                style={{ x }} 
                drag="x" 
                whileDrag={{ cursor: 'grabbing' }}
                dragConstraints={viewportRef} 
                dragElastic={0.05} 
                dragTransition={{ bounceStiffness: 600, bounceDamping: 60 }} 
                onDragStart={() => {
                  cancelNudge();
                  isDragging.current = true;
                }} 
                onDragEnd={() => { 
                  setTimeout(() => isDragging.current = false, 50); 
                }}
                onPointerDown={cancelNudge}
                onTouchStart={cancelNudge}
              >
                {photoData.map((item, index) => renderPhotoCard(item, index))}
              </motion.div>
            </div>

            {/* Functional Horizontal Position Indicator */}
            <div className="gallery-indicator-container">
              <button
                type="button"
                className="gallery-indicator-arrow"
                onClick={handleScrollLeft}
                disabled={!canScrollLeft}
                aria-label="Previous photographs"
              >
                <ChevronLeft size={16} strokeWidth={2} />
              </button>

              <div className="gallery-indicator-track" ref={indicatorTrackRef}>
                <div 
                  ref={thumbRef}
                  className="gallery-indicator-thumb"
                  style={{ width: `${boundsRef.current.thumbWidth}px` }}
                />
              </div>

              <button
                type="button"
                className="gallery-indicator-arrow"
                onClick={handleScrollRight}
                disabled={!canScrollRight}
                aria-label="Next photographs"
              >
                <ChevronRight size={16} strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>

        <div className="exploration-subsection graphic-design-section">
          <div className="subsection-header main-sub">
            <h3 className="subsection-title font-display">
              02<span className="title-spacer"></span>GRAPHIC DESIGN
            </h3>
          </div>

          <div className="graphic-design-presentation">
            <div 
              className="graphic-poster-wrapper"
              onClick={(e) => {
                if (isGraphicDragging.current) {
                  e.preventDefault();
                  e.stopPropagation();
                  return;
                }
                if (graphicPointerStartPos.current.x > 0 && graphicPointerStartPos.current.y > 0 && e.clientX > 0 && e.clientY > 0) {
                  const distance = Math.hypot(e.clientX - graphicPointerStartPos.current.x, e.clientY - graphicPointerStartPos.current.y);
                  if (distance > 8) {
                    e.preventDefault();
                    e.stopPropagation();
                    return;
                  }
                }
                openGraphicViewer(e.currentTarget);
              }}
              onPointerDown={(e) => {
                cancelNudge();
                graphicPointerStartPos.current = { x: e.clientX, y: e.clientY };
                isGraphicDragging.current = false;
              }}
              onPointerMove={(e) => {
                if (graphicPointerStartPos.current.x > 0 || graphicPointerStartPos.current.y > 0) {
                  const dist = Math.hypot(e.clientX - graphicPointerStartPos.current.x, e.clientY - graphicPointerStartPos.current.y);
                  if (dist > 8) {
                    isGraphicDragging.current = true;
                  }
                }
              }}
              onPointerUp={() => {
                setTimeout(() => { isGraphicDragging.current = false; }, 80);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  openGraphicViewer(e.currentTarget);
                }
              }}
              role="button"
              tabIndex={0}
              aria-label="Open Ethos Share poster"
              style={{ touchAction: "pan-y" }}
            >
              <div className="card-pin" style={{ zIndex: 10, position: "absolute", top: "4px", left: "50%", transform: "translateX(-50%)" }}></div>
              
              <motion.div 
                className="base-tilt-layer"
                style={{ rotate: graphicRotation, originX: 0.5, originY: 0 }}
                onPan={handleGraphicPan}
                onPanEnd={handleGraphicPanEnd}
              >
                <div className="poster-gyro-tilt-layer">
                  <div className="graphic-poster-card">
                    <img src={graphicWorks[0].image} alt={graphicWorks[0].alt} loading="lazy" />
                    <div className="card-expand-badge poster-expand-badge" aria-hidden="true">
                      <Expand size={15} strokeWidth={2.2} />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="graphic-metadata">
              <h4 className="graphic-title font-display">{graphicWorks[0].title}</h4>
              <p className="graphic-observation font-body">{graphicWorks[0].observation}</p>
            </div>
          </div>
        </div>
      </div>

      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {viewerPhotoId && activePhoto && (
            <motion.div 
              className="photo-viewer-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={(e) => {
                if (e.target === e.currentTarget) {
                  closeAllViewers();
                }
              }}
            >
              <div className="viewer-top-bar" onClick={(e) => e.stopPropagation()}>
                <div className="viewer-index font-body">
                  {String(activePhoto.id).padStart(2, '0')} / {photoData.length}
                </div>
              </div>

              <div 
                className="viewer-image-container"
                onClick={(e) => {
                  if (e.target === e.currentTarget) {
                    closeAllViewers();
                  }
                }}
              >
                <img 
                  src={activePhoto.src} 
                  alt={activePhoto.alt} 
                  className="viewer-image"
                  onClick={(e) => e.stopPropagation()} 
                />
              </div>

              <div className="viewer-bottom-bar" onClick={(e) => e.stopPropagation()}>
                <div className="viewer-text">
                  <h3 className="viewer-title font-display">{activePhoto.title}</h3>
                  <p className="viewer-observation font-body">{activePhoto.observation}</p>
                </div>
                
                <div className="viewer-controls">
                  <button 
                    className="viewer-arrow" 
                    onClick={handlePrev}
                    disabled={viewerPhotoId === 1}
                    aria-label="Previous photograph"
                  >
                    <ChevronLeft size={24} strokeWidth={1.5} />
                  </button>
                  <button 
                    className="viewer-arrow" 
                    onClick={handleNext}
                    disabled={viewerPhotoId === photoData.length}
                    aria-label="Next photograph"
                  >
                    <ChevronRight size={24} strokeWidth={1.5} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}

      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {isGraphicViewerOpen && (
            <motion.div 
              className="photo-viewer-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={(e) => {
                if (e.target === e.currentTarget) {
                  closeAllViewers();
                }
              }}
            >
              <div className="viewer-top-bar" onClick={(e) => e.stopPropagation()}>
                <div className="viewer-index font-body">
                  01 / 01
                </div>
              </div>

              <div 
                className="viewer-image-container graphic-viewer-container"
                onClick={(e) => {
                  if (e.target === e.currentTarget) {
                    closeAllViewers();
                  }
                }}
              >
                <img 
                  src={graphicWorks[0].image} 
                  alt={graphicWorks[0].alt} 
                  className="viewer-image" 
                  onClick={(e) => e.stopPropagation()}
                />
              </div>

              <div className="viewer-bottom-bar graphic-bottom-bar" onClick={(e) => e.stopPropagation()}>
                <div className="viewer-text">
                  <h3 className="viewer-title font-display">{graphicWorks[0].title}</h3>
                  <p className="viewer-observation font-body">{graphicWorks[0].observation}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
}
