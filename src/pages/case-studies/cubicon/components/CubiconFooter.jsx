import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import cubiconLogo from '../../../../assets/cubicon/logo/cubicon-logo.png';
import './CubiconFooter.css';

export default function CubiconFooter() {
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
    <footer className="cubicon-case-study-footer">
      <motion.div className="cf-container" ref={footerRef} {...revealProps}>
        {/* 01. Centred Cubicon Logo Container (80px x 80px) */}
        <div className="cf-logo-container">
          <img
            src={cubiconLogo}
            alt="Cubicon Logo"
            className="cf-logo-img"
            loading="lazy"
            decoding="async"
          />
        </div>

        {/* 02. Cubicon. Heading */}
        <h2 className="cf-heading font-display">Cubicon.</h2>

        {/* 03. Closing Statement */}
        <p className="cf-statement font-body">
          Structured design thinking, iteration, semantic clarity, and usability validation.
        </p>

        {/* 04. Designer Credit */}
        <p className="cf-credit font-body">
          Designed by Satwik Pachauri &copy; 2026
        </p>
      </motion.div>
    </footer>
  );
}
