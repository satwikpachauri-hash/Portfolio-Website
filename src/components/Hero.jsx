import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'motion/react';
import styles from './Hero.module.css';

import plexImg from '../assets/plex-hero.png';
import cubiconImg from '../assets/cubicon-hero.png';
import youtubeImg from '../assets/youtube-hero.png';
import portraitImg from '../assets/satwik-portrait.jpg';

const VisualField = ({ isReveal }) => (
  <div className={`${styles.visualField} ${isReveal ? styles.revealField : styles.subduedField}`}>
    <div className={styles.gridLines}></div>
    <div className={styles.composition}>
      <img src={plexImg} alt="" className={styles.imgPlex} />
      <img src={cubiconImg} alt="" className={styles.imgCubicon} />
      <img src={youtubeImg} alt="" className={styles.imgYoutube} />
      <img src={portraitImg} alt="" className={styles.imgPortrait} />
    </div>
  </div>
);

// Purely static typography to guarantee ZERO misalignment during renders
const Typography = ({ isReveal }) => (
  <div className={`${styles.typography} ${isReveal ? styles.textDark : styles.textLight}`}>
    <h1 className={styles.title}>Satwik Pachauri</h1>
    <p className={styles.subtitle}>Interaction / Product / UI/UX Design</p>
    <p className={styles.tagline}>I design the part where things start to make sense.</p>
  </div>
);

export default function Hero() {
  const containerRef = useRef(null);
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  
  // Responsive lens size logic
  const [lensSize, setLensSize] = useState(105);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setLensSize(65);
      else if (window.innerWidth < 1024) setLensSize(80);
      else if (window.innerWidth < 1440) setLensSize(100);
      else setLensSize(115); // Smaller, glimpses only
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Smooth, non-bouncy inertia for cursor follow (~50-100ms lag)
  const springConfig = { stiffness: 400, damping: 40, mass: 0.5 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);
  
  // Gentle formation: ~600ms, zero bounce (critically damped)
  const radiusScale = useSpring(0, { stiffness: 60, damping: 20, mass: 1 });

  // CSS Variables mapped directly to motion values for perfect sync between glass and masks
  const motionStyle = {
    '--lens-x': useMotionTemplate`${springX}px`,
    '--lens-y': useMotionTemplate`${springY}px`,
    '--lens-radius': useMotionTemplate`calc(${lensSize}px * ${radiusScale})`,
    '--lens-diameter': useMotionTemplate`calc(${lensSize}px * ${radiusScale} * 2)`
  };

  const handlePointerMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handlePointerEnter = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const startX = e.clientX - rect.left;
    const startY = e.clientY - rect.top;
    
    // 1. Immediately jump physics to cursor
    springX.jump(startX);
    springY.jump(startY);
    mouseX.set(startX);
    mouseY.set(startY);
    
    // 2. Start tiny
    radiusScale.jump(0.03);
    
    // 3. Grow gently to 1
    radiusScale.set(1);
  };

  const handlePointerLeave = () => {
    radiusScale.set(0);
  };

  const handleTouchStart = (e) => {
    if (!containerRef.current) return;
    const touch = e.touches[0];
    const rect = containerRef.current.getBoundingClientRect();
    const startX = touch.clientX - rect.left;
    const startY = touch.clientY - rect.top;
    
    springX.jump(startX);
    springY.jump(startY);
    mouseX.set(startX);
    mouseY.set(startY);
    
    radiusScale.jump(0.03);
    radiusScale.set(1);
  };

  const handleTouchMove = (e) => {
    if (!containerRef.current) return;
    const touch = e.touches[0];
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(touch.clientX - rect.left);
    mouseY.set(touch.clientY - rect.top);
  };

  const handleTouchEnd = () => {
    radiusScale.set(0);
  };

  return (
    <motion.section 
      className={styles.hero} 
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      style={motionStyle}
    >
      {/* 1. Base Dark Environment */}
      <VisualField isReveal={false} />
      
      {/* 2. Black Veil */}
      <div className={styles.veil}></div>

      {/* 3. Base Light Typography (Inversely Masked OUTSIDE the lens) */}
      <div className={styles.baseTypographyWrapper}>
        <Typography isReveal={false} />
      </div>

      {/* 4. Masked Reveal Layer (Contains Magnified Visuals + Dark Text, Masked INSIDE the lens) */}
      <div className={styles.revealContainer}>
        <div className={styles.refractionContainer}>
          <VisualField isReveal={true} />
        </div>
        
        <Typography isReveal={true} />
      </div>

      {/* 5. The Visible Liquid Glass Lens Ring */}
      <div className={styles.lensRing}>
        <div className={styles.lensHighlight}></div>
      </div>
    </motion.section>
  );
}
