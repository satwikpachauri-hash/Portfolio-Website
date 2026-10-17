import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useReducedMotion, AnimatePresence } from 'motion/react';
import {
  MapPin,
  ChevronDown,
  Lightbulb,
  ShoppingBag,
  CheckCircle2,
} from 'lucide-react';
import CaseStudySectionChip from './CaseStudySectionChip';
import './CubiconIndustryInsight.css';

export default function CubiconIndustryInsight() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const stage1Ref = useRef(null);
  const stage2Ref = useRef(null);
  const stage3Ref = useRef(null);

  const swiggyDemoRef = useRef(null);
  const cubiconDemoRef = useRef(null);

  const shouldReduceMotion = useReducedMotion();

  // ---------------------------------------------------------------------------
  // SCROLL REVEALS: ONE-TIME ENTRANCE PER STAGE (ONCE REVEALED, STAYS VISIBLE)
  // ---------------------------------------------------------------------------
  const isHeaderInView = useInView(headerRef, { once: true, margin: '-5% 0px -5% 0px' });
  const isStage1InView = useInView(stage1Ref, { once: true, margin: '-8% 0px -8% 0px' });
  const isStage2InView = useInView(stage2Ref, { once: true, margin: '-8% 0px -8% 0px' });
  const isStage3InView = useInView(stage3Ref, { once: true, margin: '-8% 0px -8% 0px' });

  // Lightweight reveal helper: subtle opacity + 16px translateY, smooth ease-out
  const getRevealProps = (isInView, delay = 0) => {
    if (shouldReduceMotion) {
      return {
        initial: { opacity: 1, y: 0 },
        animate: { opacity: 1, y: 0 },
      };
    }
    return {
      initial: { opacity: 0, y: 16 },
      animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
      transition: { duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] },
    };
  };

  // ---------------------------------------------------------------------------
  // INTERSECTION OBSERVERS FOR OFFSCREEN ANIMATION PAUSING (INDEPENDENT OF REVEAL)
  // ---------------------------------------------------------------------------
  const [isSwiggyVisible, setIsSwiggyVisible] = useState(false);
  const [isCubiconVisible, setIsCubiconVisible] = useState(false);

  useEffect(() => {
    const swiggyEl = swiggyDemoRef.current;
    if (!swiggyEl) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsSwiggyVisible(entry.isIntersecting),
      { threshold: 0.15 }
    );
    observer.observe(swiggyEl);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const cubiconEl = cubiconDemoRef.current;
    if (!cubiconEl) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsCubiconVisible(entry.isIntersecting),
      { threshold: 0.15 }
    );
    observer.observe(cubiconEl);
    return () => observer.disconnect();
  }, []);

  // ---------------------------------------------------------------------------
  // STAGE 01: SWIGGY DEMONSTRATION AUTOMATIC LOOP (~5s cycle)
  // Phase 0: Initial state (App opens with delivery address visible) - 1.4s
  // Phase 1: Attention-guiding movement (Logo moves towards address area) - 1.2s
  // Phase 2: Address emphasis (Address receives restrained emphasis) - 1.8s
  // Phase 3: Pause and reset - 0.6s
  // ---------------------------------------------------------------------------
  const [swiggyPhase, setSwiggyPhase] = useState(0);

  useEffect(() => {
    if (shouldReduceMotion || !isSwiggyVisible) {
      if (shouldReduceMotion) setSwiggyPhase(2); // Settled focused state in reduced motion
      return;
    }

    let timeoutId;
    const runCycle = () => {
      setSwiggyPhase(0); // Phase 1: Initial state
      timeoutId = setTimeout(() => {
        setSwiggyPhase(1); // Phase 2: Movement toward address
        timeoutId = setTimeout(() => {
          setSwiggyPhase(2); // Phase 3: Address emphasis
          timeoutId = setTimeout(() => {
            setSwiggyPhase(3); // Phase 4: Brief hold/reset
            timeoutId = setTimeout(runCycle, 600);
          }, 1800);
        }, 1200);
      }, 1400);
    };

    runCycle();

    return () => clearTimeout(timeoutId);
  }, [shouldReduceMotion, isSwiggyVisible]);

  // ---------------------------------------------------------------------------
  // STAGE 03: CUBICON CART-FEEDBACK AUTOMATIC LOOP (~5.5s cycle)
  // Phase 0: Add to Cart action visible - 1.4s
  // Phase 1: Action acknowledgment (subtle tap/pressed state) - 0.5s
  // Phase 2: Snackbar enters and holds for reading - 2.4s
  // Phase 3: Snackbar exits smoothly - 0.5s
  // Phase 4: Pause before restart - 0.8s
  // ---------------------------------------------------------------------------
  const [cubiconPhase, setCubiconPhase] = useState(0);

  useEffect(() => {
    if (shouldReduceMotion || !isCubiconVisible) {
      if (shouldReduceMotion) setCubiconPhase(2); // Static visible snackbar in reduced motion
      return;
    }

    let timeoutId;
    const runCycle = () => {
      setCubiconPhase(0); // Phase 1: Add to Cart visible
      timeoutId = setTimeout(() => {
        setCubiconPhase(1); // Phase 2: Action acknowledgment
        timeoutId = setTimeout(() => {
          setCubiconPhase(2); // Phase 3 & 4: Snackbar enters & holds
          timeoutId = setTimeout(() => {
            setCubiconPhase(3); // Phase 5: Snackbar exits
            timeoutId = setTimeout(runCycle, 800);
          }, 2400);
        }, 500);
      }, 1400);
    };

    runCycle();

    return () => clearTimeout(timeoutId);
  }, [shouldReduceMotion, isCubiconVisible]);

  return (
    <section className="cubicon-industry-insight-section" id="section-07" ref={sectionRef}>
      <div className="cii-container">
        {/* Section Header */}
        <motion.header
          className="cii-header-block"
          ref={headerRef}
          {...getRevealProps(isHeaderInView, 0)}
        >
          <CaseStudySectionChip number="07" title="INDUSTRY INSIGHT" />
          <h2 className="cii-section-title font-display">Learning from Swiggy</h2>
          <p className="cii-section-intro font-body">
            Using motion to guide attention at the right moment.
          </p>
        </motion.header>

        {/* Three-Stage Editorial Sequence with Scroll-Based Progressive Disclosure */}
        <div className="cii-stages-wrapper">
          {/* =================================================================
              STAGE 01: THE PROBLEM AND SWIGGY'S SOLUTION
             ================================================================= */}
          <article
            className="cii-stage-row cii-stage-01"
            ref={stage1Ref}
            aria-labelledby="heading-stage-01"
          >
            <motion.div
              className="cii-stage-text"
              {...getRevealProps(isStage1InView, 0)}
            >
              <span className="cii-stage-pill font-body">Stage 01</span>
              <h3 id="heading-stage-01" className="cii-stage-heading font-display">
                01. The Problem and Swiggy's Solution
              </h3>
              <p className="cii-stage-copy font-body">
                Swiggy could select a previously used delivery address, even when someone was ordering from another location. If overlooked, the order could be sent to the wrong place.
              </p>
              <p className="cii-stage-copy font-body">
                The original case study describes Swiggy animating its logo toward the address bar when the app opened, drawing attention to the selected location before ordering.
              </p>
            </motion.div>

            <motion.div
              className="cii-stage-visual"
              ref={swiggyDemoRef}
              {...getRevealProps(isStage1InView, 0.15)}
            >
              <div className="cii-mockup-card cii-swiggy-card">
                <div className="cii-card-badge-row">
                  <span className="cii-subtle-tag font-body">Motion Demonstration</span>
                  <span className="cii-status-tag cii-tag-swiggy font-body">
                    {swiggyPhase === 0 && 'App opens'}
                    {swiggyPhase === 1 && 'Motion guides attention'}
                    {(swiggyPhase === 2 || swiggyPhase === 3) && 'Address focused'}
                  </span>
                </div>

                {/* Swiggy Conceptual Motion Canvas */}
                <div className="cii-swiggy-stage">
                  {/* Delivery Address Target Bar */}
                  <div
                    className={`cii-swiggy-address-bar ${
                      swiggyPhase >= 2 ? 'cii-address-focused' : ''
                    }`}
                  >
                    <div className="cii-address-icon-wrap" aria-hidden="true">
                      <MapPin size={18} className="cii-pin-icon" />
                    </div>
                    <div className="cii-address-details font-body">
                      <div className="cii-address-title font-display">
                        <span>Delivering to Home</span>
                        <ChevronDown size={14} className="cii-chevron" aria-hidden="true" />
                      </div>
                      <span className="cii-address-sub">Previously selected address</span>
                    </div>
                    {swiggyPhase >= 2 && (
                      <span className="cii-focus-pill font-body">Noticed</span>
                    )}
                  </div>

                  {/* Motion Trajectory Guide Path */}
                  <div className="cii-motion-path-field" aria-hidden="true">
                    <div className="cii-path-line" />
                    <div
                      className={`cii-motion-logo-dot cii-phase-${swiggyPhase}`}
                    >
                      <div className="cii-logo-dot-core" />
                      <div className="cii-logo-dot-halo" />
                    </div>
                  </div>

                  {/* App Launch Starting Zone */}
                  <div className="cii-launch-zone">
                    <span className="cii-launch-label font-body">App Launch Point</span>
                  </div>
                </div>

                <div className="cii-visual-caption font-body">
                  Conceptual reconstruction of the motion described in the original case study.
                </div>
              </div>
            </motion.div>
          </article>

          <div className="cii-stage-divider" aria-hidden="true" />

          {/* =================================================================
              STAGE 02: WHAT I LEARNED (COMPACT INSIGHT PANEL)
             ================================================================= */}
          <article
            className="cii-stage-row cii-stage-02"
            ref={stage2Ref}
            aria-labelledby="heading-stage-02"
          >
            <motion.div
              className="cii-insight-card"
              {...getRevealProps(isStage2InView, 0)}
            >
              <div className="cii-insight-header">
                <div className="cii-insight-icon-wrap" aria-hidden="true">
                  <Lightbulb size={22} className="cii-insight-icon" />
                </div>
                <div className="cii-insight-meta">
                  <span className="cii-stage-pill font-body">Stage 02</span>
                  <h3 id="heading-stage-02" className="cii-stage-heading font-display">
                    02. What I Learned
                  </h3>
                </div>
              </div>

              <div className="cii-insight-content">
                <p className="cii-insight-primary font-display">
                  Motion should guide attention, not distract from the task.
                </p>
                <p className="cii-insight-supporting font-body">
                  A small animation at the right moment can make important information easier to notice.
                </p>
              </div>
            </motion.div>
          </article>

          <div className="cii-stage-divider" aria-hidden="true" />

          {/* =================================================================
              STAGE 03: APPLYING IT TO CUBICON
             ================================================================= */}
          <article
            className="cii-stage-row cii-stage-03"
            ref={stage3Ref}
            aria-labelledby="heading-stage-03"
          >
            <motion.div
              className="cii-stage-text"
              {...getRevealProps(isStage3InView, 0)}
            >
              <span className="cii-stage-pill font-body">Stage 03</span>
              <h3 id="heading-stage-03" className="cii-stage-heading font-display">
                03. Applying It to Cubicon
              </h3>
              <p className="cii-stage-copy font-body">
                Cubicon's cart badge could be overlooked after adding a product. I applied the same principle through an animated snackbar that confirms the action without interrupting shopping.
              </p>
            </motion.div>

            <motion.div
              className="cii-stage-visual"
              ref={cubiconDemoRef}
              {...getRevealProps(isStage3InView, 0.15)}
            >
              <div className="cii-mockup-card cii-cubicon-card">
                <div className="cii-card-badge-row">
                  <span className="cii-subtle-tag font-body">Cart Feedback Demonstration</span>
                  <span className="cii-status-tag cii-tag-cubicon font-body">
                    {cubiconPhase === 0 && 'Ready'}
                    {cubiconPhase === 1 && 'Adding to cart'}
                    {(cubiconPhase === 2 || cubiconPhase === 3) && 'Feedback active'}
                  </span>
                </div>

                {/* Minimal Cubicon Cart-Feedback Demonstration Area */}
                <div className="cii-cubicon-demo-stage">
                  {/* Simplified Add to Cart Action */}
                  <div
                    className={`cii-add-action-btn font-body ${
                      cubiconPhase === 1 ? 'cii-action-pressed' : ''
                    }`}
                  >
                    <ShoppingBag size={16} className="cii-bag-icon" aria-hidden="true" />
                    <span>{cubiconPhase === 1 ? 'Adding...' : 'Add to Cart'}</span>
                  </div>

                  {/* Reserved Fixed-Height Feedback Slot to Prevent Layout Shift */}
                  <div className="cii-snackbar-slot">
                    <AnimatePresence>
                      {(cubiconPhase === 2 || (shouldReduceMotion && cubiconPhase >= 2)) && (
                        <motion.div
                          className="cii-snackbar"
                          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.98 }}
                          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                          role="status"
                          aria-live="polite"
                        >
                          <div className="cii-snackbar-content">
                            <CheckCircle2 size={18} className="cii-snack-icon" aria-hidden="true" />
                            <div className="cii-snack-text">
                              <span className="cii-snack-primary font-body">Added to cart</span>
                              <span className="cii-snack-secondary font-body">
                                Your item has been added successfully.
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <div className="cii-visual-caption font-body">
                  Conceptual demonstration of the Cubicon feedback snackbar.
                </div>
              </div>
            </motion.div>
          </article>
        </div>
      </div>
    </section>
  );
}
