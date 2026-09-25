import React from 'react';
import { motion, useMotionTemplate } from 'motion/react';
import './Hero.css';

export default function HeroLens({ x, y, size, children }) {
  const maskImage = useMotionTemplate`radial-gradient(circle at ${x}px ${y}px, black ${size}px, transparent ${size}px)`;
  const webkitMaskImage = useMotionTemplate`radial-gradient(circle at ${x}px ${y}px, black ${size}px, transparent ${size}px)`;

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
        }}
      >
        {/* Subtle magnification inside the lens */}
        <motion.div 
          className="hero-lens-magnification"
          style={{
            transformOrigin: useMotionTemplate`${x}px ${y}px`
          }}
        >
          {children}
        </motion.div>
      </motion.div>
      
      {/* Liquid glass optical edge (physical circle) */}
      <motion.div 
        className="hero-lens-edge pointer-events-none"
        style={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          width: useMotionTemplate`calc(${size}px * 2)`,
          height: useMotionTemplate`calc(${size}px * 2)`,
          x: useMotionTemplate`calc(${x}px - ${size}px)`,
          y: useMotionTemplate`calc(${y}px - ${size}px)`,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0) 40%, rgba(0, 0, 0, 0.05) 100%)',
          boxShadow: `
            inset 0 0 0 1px rgba(255, 255, 255, 0.1),
            inset 0 0 15px rgba(255, 255, 255, 0.2),
            inset 0 0 40px rgba(0, 0, 0, 0.1),
            inset 3px 0 10px rgba(255, 0, 0, 0.05),
            inset -3px 0 10px rgba(0, 255, 255, 0.05),
            0 20px 40px rgba(0, 0, 0, 0.15),
            0 10px 15px rgba(0, 0, 0, 0.1)
          `,
          backdropFilter: 'saturate(1.05) brightness(1.02)'
        }}
      />
    </>
  );
}
