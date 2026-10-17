import React, { useState, useRef } from 'react';
import { motion, useInView, useReducedMotion, AnimatePresence } from 'motion/react';
import { SlidersHorizontal, MousePointerClick, AlignJustify, BellOff } from 'lucide-react';
import CaseStudySectionChip from './CaseStudySectionChip';
import './CubiconFriction.css';

// Authentic Iteration 2 Mockup Assets
import iter2Home from '../../../../assets/cubicon/mockups/iteration2/iter2_home.png';
import iter2Product from '../../../../assets/cubicon/mockups/iteration2/iter2_product.png';

const SCREENS = {
  home: {
    id: 'home',
    label: 'Homepage',
    image: iter2Home,
    alt: 'Iteration 2 Homepage mockup showing usability friction points',
    issues: [
      {
        id: 'issue-01',
        category: 'Carousel Navigation',
        heading: 'Invisible Boundaries',
        description:
          'The image carousel lacked pagination dots. Users had no indication of how many images were available or which one they were viewing.',
        icon: SlidersHorizontal,
        markerPosition: { top: '53%', left: '65%' },
      },
      {
        id: 'issue-02',
        category: 'Misleading Links',
        heading: 'Underlined Headings',
        description:
          'Section headings with underlines and arrows were perceived as interactive hyperlinks (false affordance), causing interaction errors.',
        icon: MousePointerClick,
        markerPosition: { top: '56.2%', left: '53.5%' },
      },
    ],
  },
  product: {
    id: 'product',
    label: 'Product Page',
    image: iter2Product,
    alt: 'Iteration 2 Product Page mockup showing usability friction points',
    issues: [
      {
        id: 'issue-03',
        category: 'Cognitive Overload',
        heading: 'Walls of Text',
        description:
          'The product detail page presented a massive block of text, increasing cognitive load and making it difficult to scan for key information.',
        icon: AlignJustify,
        markerPosition: { top: '67.5%', left: '91%' },
      },
      {
        id: 'issue-04',
        category: 'Feedback Failure',
        heading: 'Unnoticed Cart Updates',
        description:
          "Even after adding a numerical badge, users frequently missed the cart state change. The feedback mechanism wasn't grabbing attention properly.",
        icon: BellOff,
        markerPosition: { top: '82%', left: '9.5%' },
      },
    ],
  },
};

export default function CubiconFriction() {
  const [activeScreen, setActiveScreen] = useState('home');

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-10%' });
  const shouldReduceMotion = useReducedMotion();

  const handleScreenChange = (screenKey) => {
    if (screenKey === activeScreen) return;
    setActiveScreen(screenKey);
  };

  const currentScreenData = SCREENS[activeScreen];

  const headerAnimation = shouldReduceMotion
    ? { opacity: 1, y: 0 }
    : {
        initial: { opacity: 0, y: 20 },
        animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
        transition: { duration: 0.6, ease: 'easeOut' },
      };

  return (
    <section className="cubicon-friction-section" id="section-07" ref={sectionRef}>
      <div className="cuf-container">
        {/* Section Header */}
        <motion.header className="cuf-header-block" {...headerAnimation}>
          <CaseStudySectionChip number="06" title="USABILITY ISSUES" />
          <h2 className="cuf-section-title font-display">Where the Interface Fell Short</h2>
          <p className="cuf-section-intro font-body">
            A closer look at four issues in the second iteration.
          </p>
        </motion.header>

        {/* Interactive Audit Module */}
        <div className="cuf-audit-module">
          <div className="cuf-audit-header">
            <h3 className="cuf-audit-title font-display">Inspect the Interface</h3>
            <p className="cuf-audit-subtitle font-body">
              Select an issue to see where it appears.
            </p>

            {/* Segmented Screen Selector */}
            <div className="cuf-screen-selector" role="tablist" aria-label="Mockup Screen Selector">
              {Object.keys(SCREENS).map((key) => {
                const screen = SCREENS[key];
                const isActive = activeScreen === key;
                return (
                  <button
                    key={screen.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`cuf-selector-btn font-body ${isActive ? 'cuf-selector-btn-active' : ''}`}
                    onClick={() => handleScreenChange(key)}
                  >
                    {screen.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive Mockup Display with Minimal Annotation Markers */}
          <div className="cuf-mockup-wrapper">
            <div className="cuf-mockup-frame">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentScreenData.id}
                  src={currentScreenData.image}
                  alt={currentScreenData.alt}
                  className="cuf-mockup-img"
                  initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  loading="lazy"
                />
              </AnimatePresence>

              {/* Both Minimal Annotation Markers visible immediately on the active screen */}
              {currentScreenData.issues.map((issue) => (
                <div
                  key={issue.id}
                  className="cuf-marker"
                  style={{
                    top: issue.markerPosition.top,
                    left: issue.markerPosition.left,
                  }}
                  aria-hidden="true"
                />
              ))}
            </div>
          </div>

          {/* Two Static Issue Cards Beneath the Mockup */}
          <div className="cuf-cards-grid" role="region" aria-label="Usability issue details">
            {currentScreenData.issues.map((issue) => {
              const IconComponent = issue.icon;

              return (
                <article key={issue.id} className="cuf-issue-card">
                  <div className="cuf-card-top">
                    <IconComponent size={18} className="cuf-card-icon" aria-hidden="true" />
                    <span className="cuf-card-category font-body">{issue.category}</span>
                  </div>
                  <h4 className="cuf-card-title font-display">{issue.heading}</h4>
                  <p className="cuf-card-desc font-body">{issue.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
