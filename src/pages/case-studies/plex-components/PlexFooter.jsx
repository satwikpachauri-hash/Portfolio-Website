import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import './PlexFooter.css';

export default function PlexFooter() {
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
    <footer className="plex-case-study-footer">
      <motion.div className="pf-container" ref={footerRef} {...revealProps}>
        {/* 01. Centred Plex Logo Container (80px x 80px) with Clash Display PLEX Wordmark */}
        <div className="pf-logo-container" aria-label="Plex Logo Card">
          <span className="pf-logo-text font-display">PLEX</span>
        </div>

        {/* 02. Plex. Heading */}
        <h2 className="pf-heading font-display">Plex.</h2>

        {/* 03. Closing Statement */}
        <p className="pf-statement font-body">
          Cognitive clarity, intentional friction removal, and designing for effortless progress.
        </p>

        {/* 04. Designer Credit */}
        <p className="pf-credit font-body">
          Designed by Satwik Pachauri &copy; 2026
        </p>
      </motion.div>
    </footer>
  );
}
