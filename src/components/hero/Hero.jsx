import React, { useRef, useEffect } from 'react';
import { useMotionValue, useSpring, useMotionTemplate, motion } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroVisualField from './HeroVisualField';
import HeroLens from './HeroLens';
import HeroNotes from './HeroNotes';
import { useViewportClasses } from '../../hooks/useMediaQuery';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const viewport = useViewportClasses();
  const containerRect = useRef({ left: 0, top: 0 });

  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);
  const lensSize = useMotionValue(0);
  
  // Spring physics for smooth follow
  const springConfig = { damping: 30, stiffness: 200, mass: 0.5 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);
  const smoothLensSize = useSpring(lensSize, { damping: 25, stiffness: 150 });

  // Inverted mask for text: transparent inside the circle, black (visible) outside.
  const textMaskImage = useMotionTemplate`radial-gradient(circle at ${smoothMouseX}px ${smoothMouseY}px, transparent ${smoothLensSize}px, black calc(${smoothLensSize}px + 1px))`;

  const isMobileOrTablet = viewport === 'mobile' || viewport === 'tablet';

  useEffect(() => {
    let ctx = gsap.matchMedia();
    
    ctx.add("(min-width: 1024px)", () => {
      // Scroll animation ONLY for laptop/desktop
      const textElements = gsap.utils.toArray('.hero-content-safe-zone');
      gsap.to(textElements, {
        y: 100,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });
    });

    return () => ctx.revert();
  }, []);

  // Update rect geometry for pointer calculations
  useEffect(() => {
    if (isMobileOrTablet) return;

    const updateRect = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        containerRect.current = { left: rect.left, top: rect.top };
      }
    };

    updateRect();
    window.addEventListener('resize', updateRect);
    window.addEventListener('scroll', updateRect, { passive: true });

    return () => {
      window.removeEventListener('resize', updateRect);
      window.removeEventListener('scroll', updateRect);
    };
  }, [isMobileOrTablet]);

  const handlePointerMove = (e) => {
    if (isMobileOrTablet) return;
    mouseX.set(e.clientX - containerRect.current.left);
    mouseY.set(e.clientY - containerRect.current.top);
  };

  const handlePointerEnter = (e) => {
    if (isMobileOrTablet) return;
    // Fast update on enter just in case layout shifted
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      containerRect.current = { left: rect.left, top: rect.top };
    }
    mouseX.jump(e.clientX - containerRect.current.left);
    mouseY.jump(e.clientY - containerRect.current.top);
    lensSize.jump(10); 
    
    let targetSize = 135; // laptop/desktop
    lensSize.set(targetSize);
  };

  const handlePointerLeave = () => {
    if (isMobileOrTablet) return;
    lensSize.set(0);
  };

  if (isMobileOrTablet) {
    return (
      <div id="home" className="hero-container hero-simple">
        <div className="hero-content-safe-zone">
          <h1 className="hero-title">Satwik Pachauri</h1>
          <h2 className="hero-subtitle">INTERACTION / PRODUCT / UI/UX DESIGN</h2>
          <p className="hero-body">I design the part where things start to make sense.</p>
        </div>
        <div className="hero-simple-portrait">
          <img src="/assets/portrait/main-portrait.jpg" alt="Satwik Pachauri" />
        </div>
      </div>
    );
  }

  return (
    <div 
      id="home"
      className="hero-container" 
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      {/* Base Layer: Static background (Grid) */}
      <div className="hero-base-layer">
        <HeroVisualField showPortrait={false} />
      </div>

      {/* Single Text Layer: Sits above static background */}
      <motion.div 
        className="hero-text-layer"
        style={{
          maskImage: textMaskImage,
          WebkitMaskImage: textMaskImage,
          maskSize: '100% 100%',
          WebkitMaskSize: '100% 100%',
          maskRepeat: 'no-repeat',
          WebkitMaskRepeat: 'no-repeat'
        }}
      >
        <div className="hero-content-safe-zone" ref={textRef}>
          <h1 className="hero-title">Satwik Pachauri</h1>
          <h2 className="hero-subtitle">INTERACTION / PRODUCT / UI/UX DESIGN</h2>
          <p className="hero-body">I design the part where things start to make sense.</p>
        </div>
      </motion.div>

      {/* Lens Layer: Masked circle that sits above the text. 
          Contains the full visual field including the portrait and the practice notes. */}
      <HeroLens 
        x={smoothMouseX} 
        y={smoothMouseY} 
        size={smoothLensSize} 
      >
        <HeroVisualField showPortrait={true} />
        <HeroNotes />
      </HeroLens>
    </div>
  );
}
