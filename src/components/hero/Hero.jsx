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
      gsap.to(textRef.current, {
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

  const handlePointerMove = (e) => {
    if (isMobileOrTablet) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handlePointerEnter = (e) => {
    if (isMobileOrTablet) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.jump(e.clientX - rect.left);
    mouseY.jump(e.clientY - rect.top);
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
