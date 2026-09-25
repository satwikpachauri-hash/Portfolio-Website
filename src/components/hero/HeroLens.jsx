import React from 'react';
import { motion, useMotionTemplate } from 'motion/react';
import './Hero.css';

export default function HeroLens({ x, y, size, children }) {
  // Use a radial gradient for mask-image because clip-path can sometimes cause harsh aliased edges,
  // but mask-image provides a clean subpixel edge. 
  // However, clip-path circle is more performant. We'll use mask-image for better optical glass edge simulation.
  
  const maskImage = useMotionTemplate`radial-gradient(circle at ${x}px ${y}px, black ${size}px, transparent ${size}px)`;
  const webkitMaskImage = useMotionTemplate`radial-gradient(circle at ${x}px ${y}px, black ${size}px, transparent ${size}px)`;
  
  const lensSurface = useMotionTemplate`radial-gradient(circle at ${x}px ${y}px, var(--lens-surface) calc(${size}px - 2px), var(--lens-border) calc(${size}px - 1px), var(--lens-highlight) ${size}px, transparent calc(${size}px + 1px))`;

  return (
    <>
      <motion.div 
        className="hero-lens-layer"
        style={{
          maskImage,
          WebkitMaskImage: webkitMaskImage,
          maskSize: '100% 100%',
          WebkitMaskSize: '100% 100%',
          maskRepeat: 'no-repeat',
          WebkitMaskRepeat: 'no-repeat',
          backdropFilter: 'blur(var(--lens-blur)) brightness(var(--lens-refraction-brightness)) contrast(var(--lens-refraction-contrast))',
          WebkitBackdropFilter: 'blur(var(--lens-blur)) brightness(var(--lens-refraction-brightness)) contrast(var(--lens-refraction-contrast))'
        }}
      >
        {/* Subtle magnification inside the lens */}
        <div className="hero-lens-magnification">
          {children}
        </div>
      </motion.div>
      
      {/* Liquid glass optical edge */}
      <motion.div 
        className="hero-lens-edge pointer-events-none"
        style={{ 
          background: lensSurface,
          filter: useMotionTemplate`drop-shadow(0px 8px 16px var(--lens-shadow))`
        }}
      />
    </>
  );
}
