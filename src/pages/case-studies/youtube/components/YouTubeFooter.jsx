import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import './YouTubeFooter.css';

export default function YouTubeFooter() {
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: true, margin: '-5% 0px -5% 0px' });
  const shouldReduceMotion = useReducedMotion();

  const revealProps = shouldReduceMotion
    ? {
        initial: { opacity: 1, y: 0 },
        animate: { opacity: 1, y: 0 },
      }
    : {
        initial: { opacity: 0, y: 24 },
        animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
        transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
      };

  return (
    <footer className="youtube-case-study-footer">
      <motion.div className="yf-container" ref={footerRef} {...revealProps}>
        {/* 01. Centred YouTube Logo Container (80px x 80px, border-radius 20px) */}
        <div className="yf-logo-container" aria-label="YouTube Logo Card">
          <svg width="42" height="30" viewBox="0 0 40 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M39.198 4.39C38.736 2.658 37.378 1.298 35.65 0.835C32.52 0 20 0 20 0C20 0 7.48 0 4.35 0.835C2.622 1.298 1.264 2.658 0.802 4.39C0 7.525 0 14 0 14C0 14 0 20.475 0.802 23.61C1.264 25.342 2.622 26.702 4.35 27.165C7.48 28 20 28 20 28C20 28 32.52 28 35.65 27.165C37.378 26.702 38.736 25.342 39.198 23.61C40 20.475 40 14 40 14C40 14 40 7.525 39.198 4.39Z" fill="#FF0000"/>
            <path d="M16 20L26.4 14L16 8V20Z" fill="white"/>
          </svg>
        </div>

        {/* 02. YouTube Watchlater. Heading */}
        <h2 className="yf-heading font-display">YouTube Watchlater.</h2>

        {/* 03. Closing Statement */}
        <p className="yf-statement font-body">
          Redesigning Intent. Maximizing Engagement. 2026.
        </p>

        {/* 04. Designer Credit */}
        <p className="yf-credit font-body">
          Designed by Satwik Pachauri &copy; 2026
        </p>
      </motion.div>
    </footer>
  );
}
