import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { XCircle, CheckCircle, Info, X, Check } from 'lucide-react';
import CaseStudySectionChip from './CaseStudySectionChip';
import './CubiconApplying.css';

// Authentic Iteration 1 Mockups (Phase 1)
import iter1Home from '../../../../assets/cubicon/mockups/iteration1/iter1_home.png';
import iter1Search from '../../../../assets/cubicon/mockups/iteration1/iter1_search.png';
import iter1Product from '../../../../assets/cubicon/mockups/iteration1/iter1_product.png';

// Authentic Iteration 2 Mockups (Phase 2)
import iter2Home from '../../../../assets/cubicon/mockups/iteration2/iter2_home.png';
import iter2Search from '../../../../assets/cubicon/mockups/iteration2/iter2_search.png';
import iter2Product from '../../../../assets/cubicon/mockups/iteration2/iter2_product.png';
import iter2Cart from '../../../../assets/cubicon/mockups/iteration2/iter2_cart.png';

function ComparisonBlock({ title, phase1, phase2, delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });
  const shouldReduceMotion = useReducedMotion();

  const animationProps = shouldReduceMotion
    ? { opacity: 1, y: 0 }
    : {
        initial: { opacity: 0, y: 24 },
        animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
        transition: { duration: 0.6, delay, ease: 'easeOut' },
      };

  return (
    <motion.div className="ca-comparison-block" ref={ref} {...animationProps}>
      <h3 className="ca-comparison-title font-display">{title}</h3>

      <div className="ca-comparison-grid">
        {/* Phase 1 Column (Left) */}
        <div className="ca-col ca-col-problem">
          <div className="ca-mockup-phone">
            <img
              src={phase1.image}
              alt={phase1.alt}
              className="ca-mockup-img"
              loading="lazy"
            />
          </div>
          <div className="ca-ps-content">
            <span className="ca-ps-badge ca-badge-problem font-body">
              <XCircle size={15} className="ca-badge-icon" /> {phase1.badge}
            </span>
            <h4 className="ca-ps-title font-display">{phase1.title}</h4>
            <ul className="ca-issue-list font-body">
              {phase1.items.map((item, idx) => (
                <li key={idx} className="ca-stagger-item">
                  <X size={14} className="ca-list-icon ca-icon-danger" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Phase 2 Column (Right) */}
        <div className="ca-col ca-col-solution">
          <div className="ca-mockup-phone">
            <img
              src={phase2.image}
              alt={phase2.alt}
              className="ca-mockup-img"
              loading="lazy"
            />
          </div>
          <div className="ca-ps-content">
            <span className="ca-ps-badge ca-badge-solution font-body">
              <CheckCircle size={15} className="ca-badge-icon" /> {phase2.badge}
            </span>
            <h4 className="ca-ps-title font-display">{phase2.title}</h4>
            <ul className="ca-issue-list font-body">
              {phase2.items.map((item, idx) => (
                <li key={idx} className="ca-stagger-item">
                  <Check size={14} className="ca-list-icon ca-icon-success" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function CubiconApplying() {
  const headerRef = useRef(null);
  const checkoutRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: '-10%' });
  const isCheckoutInView = useInView(checkoutRef, { once: true, margin: '-10%' });
  const shouldReduceMotion = useReducedMotion();

  const headerAnimation = shouldReduceMotion
    ? { opacity: 1, y: 0 }
    : {
        initial: { opacity: 0, y: 20 },
        animate: isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
        transition: { duration: 0.6, ease: 'easeOut' },
      };

  const checkoutAnimation = shouldReduceMotion
    ? { opacity: 1, y: 0 }
    : {
        initial: { opacity: 0, y: 24 },
        animate: isCheckoutInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
        transition: { duration: 0.6, ease: 'easeOut' },
      };

  return (
    <section className="cubicon-applying-section" id="section-05">
      <div className="ca-container">

        {/* Section Header */}
        <motion.header className="ca-header-block" ref={headerRef} {...headerAnimation}>
          <CaseStudySectionChip number="05" title="APPLYING THE DESIGN SYSTEM" />
          <h2 className="ca-section-title font-display">
            Interface Iterations
          </h2>
          <p className="ca-section-intro font-body">
            Placing the initial Phase One designs alongside the refined Phase Two solutions to highlight the progression of visual hierarchy, semantic clarity, and proper affordances.
          </p>
        </motion.header>

        {/* Comparison 1: Home Page */}
        <ComparisonBlock
          title="Home Page"
          phase1={{
            image: iter1Home,
            alt: "Phase 1 Home Page: Poor Visual Hierarchy",
            badge: "Phase 1: Problem",
            title: "Poor Visual Hierarchy",
            items: [
              "Foreground blending into background",
              "Categories felt disorganized and chaotic",
            ],
          }}
          phase2={{
            image: iter2Home,
            alt: "Phase 2 Home Page: Restructured Homepage",
            badge: "Phase 2: Solution",
            title: "Restructured Homepage",
            items: [
              "Clear depth and visual hierarchy",
              "Proper separation of UI layers",
            ],
          }}
        />

        {/* Comparison 2: Search Page */}
        <ComparisonBlock
          title="Search Page"
          phase1={{
            image: iter1Search,
            alt: "Phase 1 Search Page: Missing Signifiers",
            badge: "Phase 1: Problem",
            title: "Missing Signifiers",
            items: [
              "No voice search or back icons",
              "Users lacked visual cues for actions",
            ],
          }}
          phase2={{
            image: iter2Search,
            alt: "Phase 2 Search Page: Proper Signifiers",
            badge: "Phase 2: Solution",
            title: "Proper Signifiers",
            items: [
              "Added standard back arrow",
              "Included voice search indicator",
            ],
          }}
        />

        {/* Comparison 3: Product Page */}
        <ComparisonBlock
          title="Product Page"
          phase1={{
            image: iter1Product,
            alt: "Phase 1 Product Page: Weak CTA Weight",
            badge: "Phase 1: Problem",
            title: "Weak CTA Weight",
            items: [
              '"Add to Cart" blended into page',
              "Failed to drive primary action",
            ],
          }}
          phase2={{
            image: iter2Product,
            alt: "Phase 2 Product Page: Stronger CTA",
            badge: "Phase 2: Solution",
            title: "Stronger CTA",
            items: [
              "Redesigned with proper visual weight",
              "High-contrast color and rounded shape",
            ],
          }}
        />

        {/* Comparison 4: Checkout Flow */}
        <motion.div className="ca-comparison-block ca-checkout-block" ref={checkoutRef} {...checkoutAnimation}>
          <h3 className="ca-comparison-title font-display">Checkout Flow</h3>

          {/* Phase 1 Limitation Box */}
          <div className="ca-limitation-box">
            <div className="ca-limitation-header">
              <span className="ca-ps-badge ca-badge-problem font-body">
                <Info size={15} className="ca-badge-icon" /> Phase 1 Limitation
              </span>
            </div>
            <ul className="ca-issue-list ca-limitation-list font-body">
              <li className="ca-stagger-item">
                <X size={14} className="ca-list-icon ca-icon-danger" />
                <span>Scope was limited to product discovery</span>
              </li>
              <li className="ca-stagger-item">
                <X size={14} className="ca-list-icon ca-icon-danger" />
                <span>Cart and checkout flows did not exist</span>
              </li>
            </ul>
          </div>

          {/* Centered Phase 2 Mockup */}
          <div className="ca-single-mockup-wrap">
            <div className="ca-col ca-col-solution">
              <div className="ca-mockup-phone">
                <img
                  src={iter2Cart}
                  alt="Phase 2 Checkout Flow: End-to-End Checkout"
                  className="ca-mockup-img"
                  loading="lazy"
                />
              </div>
              <div className="ca-ps-content">
                <span className="ca-ps-badge ca-badge-solution font-body">
                  <CheckCircle size={15} className="ca-badge-icon" /> Phase 2: Solution
                </span>
                <h4 className="ca-ps-title font-display">End-to-End Checkout</h4>
                <ul className="ca-issue-list font-body">
                  <li className="ca-stagger-item">
                    <Check size={14} className="ca-list-icon ca-icon-success" />
                    <span>Added active and empty Cart states</span>
                  </li>
                  <li className="ca-stagger-item">
                    <Check size={14} className="ca-list-icon ca-icon-success" />
                    <span>Integrated full Google Pay flow</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
