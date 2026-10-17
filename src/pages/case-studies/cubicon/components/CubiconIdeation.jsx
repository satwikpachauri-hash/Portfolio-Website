import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { AlertTriangle, Lightbulb, X, Check } from 'lucide-react';
import CaseStudySectionChip from './CaseStudySectionChip';
import './CubiconIdeation.css';

export default function CubiconIdeation() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-10%' });
  const shouldReduceMotion = useReducedMotion();

  const entranceProps = shouldReduceMotion
    ? { opacity: 1, y: 0 }
    : {
        initial: { opacity: 0, y: 24 },
        animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
        transition: { duration: 0.6, ease: 'easeOut' },
      };

  return (
    <section className="cubicon-ideation-section" id="section-04" ref={sectionRef}>
      <div className="ci-container">
        {/* Section Header */}
        <motion.header className="ci-header-block" {...entranceProps}>
          <CaseStudySectionChip number="04" title="PRODUCT IDEATION" />
          <h2 className="ci-section-title font-display">From Chaos to Niche</h2>
          <p className="ci-section-intro font-body">
            I chose a focused Rubik's Cube store to explore how Material Design 3 could support a clear, consistent shopping experience.
          </p>
        </motion.header>

        {/* Side-by-Side Comparison Grid */}
        <motion.div
          className="ci-comparison-grid"
          {...entranceProps}
          transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
        >
          {/* Left Comparison: General E-commerce */}
          <div className="ci-card ci-card-general">
            <AlertTriangle size={32} className="ci-card-icon ci-icon-danger" />
            <h3 className="ci-card-title font-display">General E-commerce</h3>
            <ul className="ci-point-list font-body">
              <li className="ci-point-item">
                <X size={16} className="ci-point-icon ci-icon-danger" />
                <span>A broad range of unrelated products.</span>
              </li>
              <li className="ci-point-item">
                <X size={16} className="ci-point-icon ci-icon-danger" />
                <span>More categories and content to organise.</span>
              </li>
            </ul>
          </div>

          {/* Right Comparison: The Cubicon Idea */}
          <div className="ci-card ci-card-cubicon">
            <Lightbulb size={32} className="ci-card-icon ci-icon-success" />
            <h3 className="ci-card-title font-display">The Cubicon Idea</h3>
            <ul className="ci-point-list font-body">
              <li className="ci-point-item">
                <Check size={16} className="ci-point-icon ci-icon-success" />
                <span>A store focused on Rubik's Cubes.</span>
              </li>
              <li className="ci-point-item">
                <Check size={16} className="ci-point-icon ci-icon-success" />
                <span>A more defined product scope for applying consistent design patterns.</span>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
