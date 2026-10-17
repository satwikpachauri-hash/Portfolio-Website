import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { Check } from 'lucide-react';
import CaseStudySectionChip from './CaseStudySectionChip';
import './CubiconFinalIteration.css';

// Authentic Iteration 3 Mockups (The Result)
import iter3Home from '../../../../assets/cubicon/mockups/iteration3/Image 1 (Home page).png';
import iter3Category from '../../../../assets/cubicon/mockups/iteration3/Image 2 (3x3 category page).png';
import iter3Search from '../../../../assets/cubicon/mockups/iteration3/Image 3 (Search page).png';
import iter3ProductDetail from '../../../../assets/cubicon/mockups/iteration3/Image 4 (Product detail page).png';
import iter3ProductDesc from '../../../../assets/cubicon/mockups/iteration3/Image 4 scrolled down (Product description section).png';
import iter3ProductSpecs from '../../../../assets/cubicon/mockups/iteration3/Image 4 scrolled down (specification section).png';
import iter3CartNotification from '../../../../assets/cubicon/mockups/iteration3/Image 5 (Product added to cart notification screen).png';
import iter3CartPage from '../../../../assets/cubicon/mockups/iteration3/Image 6 (Cart page).png';

// Static Mockup Card (Stationary on hover, no tilt, no rotation, no scaling)
function MockupCard({ src, alt, priority = false }) {
  return (
    <div className="cfi-mockup-phone cfi-mockup-phone-lg">
      <img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        className="cfi-mockup-img"
      />
    </div>
  );
}

export default function CubiconFinalIteration() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const improvementsRef = useRef(null);
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);
  const row3Ref = useRef(null);

  const shouldReduceMotion = useReducedMotion();

  // Scroll reveal triggers
  const isHeaderInView = useInView(headerRef, { once: true, margin: '-5% 0px -5% 0px' });
  const isImprovementsInView = useInView(improvementsRef, { once: true, margin: '-5% 0px -5% 0px' });
  const isRow1InView = useInView(row1Ref, { once: true, margin: '-5% 0px -5% 0px' });
  const isRow2InView = useInView(row2Ref, { once: true, margin: '-5% 0px -5% 0px' });
  const isRow3InView = useInView(row3Ref, { once: true, margin: '-5% 0px -5% 0px' });

  const getRevealProps = (isInView, delay = 0) => {
    if (shouldReduceMotion) {
      return {
        initial: { opacity: 1, y: 0 },
        animate: { opacity: 1, y: 0 },
      };
    }
    return {
      initial: { opacity: 0, y: 24 },
      animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
      transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
    };
  };

  const improvements = [
    'Replaced text-heavy product details with scannable infographics to reduce cognitive load.',
    'Implemented an animated snackbar notification for cart additions, ensuring immediate system feedback.',
    'Removed misleading underlines from headings to prevent false affordances.',
    'Fixed the carousel navigation by adding pagination dots, allowing users to understand image boundaries.',
  ];

  return (
    <section className="cubicon-final-iteration-section" id="section-09" ref={sectionRef}>
      <div className="cfi-container">
        {/* =================================================================
            01. SECTION INTRODUCTION
           ================================================================= */}
        <motion.header
          className="cfi-header-block"
          ref={headerRef}
          {...getRevealProps(isHeaderInView, 0)}
        >
          <CaseStudySectionChip number="09" title="THE RESULT" />
          <h2 className="cfi-section-title font-display">Final Iteration</h2>
          <p className="cfi-section-intro font-body">
            Implementing the insights from testing to create the refined, final experience.
          </p>
        </motion.header>

        {/* =================================================================
            02. KEY IMPROVEMENTS MADE
           ================================================================= */}
        <motion.div
          className="cfi-improvements-card"
          ref={improvementsRef}
          {...getRevealProps(isImprovementsInView, 0.1)}
        >
          <h3 className="cfi-improvements-heading font-display">Key Improvements Made</h3>
          <ul className="cfi-improvements-list">
            {improvements.map((text, idx) => (
              <li className="cfi-improvement-item font-body" key={idx}>
                <span className="cfi-issue-icon" aria-hidden="true">
                  <Check size={14} strokeWidth={2.5} />
                </span>
                <span className="cfi-improvement-text">{text}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* =================================================================
            03. FINAL MOCKUPS SHOWCASE (3 ROWS, 8 MOCKUPS)
           ================================================================= */}
        <div className="cfi-mockups-showcase">
          {/* Mockup Row 01: Home, 3x3 Category, Search */}
          <motion.div
            className="cfi-mockup-row"
            ref={row1Ref}
            {...getRevealProps(isRow1InView, 0)}
          >
            <MockupCard
              src={iter3Home}
              alt="Cubicon Final Iteration: Home page interface showing restructured visual hierarchy and curated categories"
            />
            <MockupCard
              src={iter3Category}
              alt="Cubicon Final Iteration: 3x3 category page layout with clean product grids"
            />
            <MockupCard
              src={iter3Search}
              alt="Cubicon Final Iteration: Search page interface with instant filtered suggestions"
            />
          </motion.div>

          {/* Mockup Row 02: Product Detail, Product Description, Product Specs */}
          <motion.div
            className="cfi-mockup-row"
            ref={row2Ref}
            {...getRevealProps(isRow2InView, 0)}
          >
            <MockupCard
              src={iter3ProductDetail}
              alt="Cubicon Final Iteration: Product detail page showcasing carousel navigation dots and clear typography"
            />
            <MockupCard
              src={iter3ProductDesc}
              alt="Cubicon Final Iteration: Product description section with scannable infographics"
            />
            <MockupCard
              src={iter3ProductSpecs}
              alt="Cubicon Final Iteration: Product specifications table with structured dimensions"
            />
          </motion.div>

          {/* Mockup Row 03: Cart Notification, Cart Page */}
          <motion.div
            className="cfi-mockup-row cfi-mockup-row-two"
            ref={row3Ref}
            {...getRevealProps(isRow3InView, 0)}
          >
            <MockupCard
              src={iter3CartNotification}
              alt="Cubicon Final Iteration: Animated snackbar notification confirming product added to cart"
            />
            <MockupCard
              src={iter3CartPage}
              alt="Cubicon Final Iteration: Cart page interface with streamlined purchase workflow"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
