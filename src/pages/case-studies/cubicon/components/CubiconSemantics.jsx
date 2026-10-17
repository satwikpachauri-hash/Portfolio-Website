import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { XCircle, CheckCircle } from 'lucide-react';
import CaseStudySectionChip from './CaseStudySectionChip';
import './CubiconSemantics.css';

// Authentic Iteration 2 Mockup Assets
import iter2Home from '../../../../assets/cubicon/mockups/iteration2/iter2_home.png';
import iter2Product from '../../../../assets/cubicon/mockups/iteration2/iter2_product.png';
import iter2Cart from '../../../../assets/cubicon/mockups/iteration2/iter2_cart.png';
import iter2Pay1 from '../../../../assets/cubicon/mockups/iteration2/iter2_pay1.png';

const SEMANTIC_EXAMPLES = [
  {
    id: 'notification-badge',
    num: '01',
    category: 'The "Bell" Icon',
    heading: 'Notification Badge',
    image: iter2Home,
    alt: 'Iteration 2 Home Screen showing notification bell badge',
    annotation: { top: '9.2%', left: '88.5%' },
    issue: "A bell alone doesn't show new activity.",
    response: 'A number shows pending notifications.',
    reverse: false,
  },
  {
    id: 'add-vs-buy',
    num: '02',
    category: 'Affordance',
    heading: 'Add to Cart vs Buy',
    image: iter2Product,
    alt: 'Iteration 2 Product Screen showing distinct purchase action buttons',
    annotation: { top: '85.5%', left: '24%' },
    issue: 'Similar buttons can blur their purpose.',
    response: 'Distinct styles clarify each action.',
    reverse: true,
  },
  {
    id: 'remove-vs-save',
    num: '03',
    category: 'Semantic Clarity',
    heading: 'Remove vs Save',
    image: iter2Cart,
    alt: 'Iteration 2 Cart Screen showing trash and bookmark controls',
    annotation: { top: '35%', left: '28%' },
    issue: 'Similar actions can be difficult to distinguish.',
    response: 'Trash and bookmark icons communicate different actions.',
    reverse: false,
  },
  {
    id: 'back-vs-close',
    num: '04',
    category: 'Navigation Cues',
    heading: 'Back vs Close',
    image: iter2Pay1,
    alt: 'Iteration 2 Payment Screen showing back arrow navigation',
    annotation: { top: '9.2%', left: '16%' },
    issue: 'An X can suggest closing instead of going back.',
    response: 'A back arrow communicates returning to the previous screen.',
    reverse: true,
  },
];

function SemanticItem({ example, delay = 0 }) {
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
    <motion.article
      className={`csm-item ${example.reverse ? 'csm-reverse' : ''}`}
      ref={ref}
      {...animationProps}
    >
      {/* Mockup Column */}
      <div className="csm-mockup-col">
        <div className="csm-mockup-frame">
          <img
            src={example.image}
            alt={example.alt}
            className="csm-mockup-img"
            loading="lazy"
          />
          {example.annotation && (
            <div
              className="csm-annotation-dot"
              style={{ top: example.annotation.top, left: example.annotation.left }}
              aria-hidden="true"
            />
          )}
        </div>
      </div>

      {/* Explanation Column */}
      <div className="csm-explanation-col">
        <header className="csm-header-meta">
          <span className="csm-example-badge font-body">
            {example.num} · {example.category}
          </span>
          <h3 className="csm-example-title font-display">{example.heading}</h3>
        </header>

        <div className="csm-points-list font-body">
          <div className="csm-point-card csm-point-issue">
            <XCircle size={18} className="csm-point-icon csm-icon-danger" />
            <div className="csm-point-body">
              <strong className="csm-point-label">The Issue:</strong>{' '}
              <span>{example.issue}</span>
            </div>
          </div>

          <div className="csm-point-card csm-point-response">
            <CheckCircle size={18} className="csm-point-icon csm-icon-success" />
            <div className="csm-point-body">
              <strong className="csm-point-label">The Solution:</strong>{' '}
              <span>{example.response}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function CubiconSemantics() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: '-10%' });
  const shouldReduceMotion = useReducedMotion();

  const headerAnimation = shouldReduceMotion
    ? { opacity: 1, y: 0 }
    : {
        initial: { opacity: 0, y: 20 },
        animate: isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
        transition: { duration: 0.6, ease: 'easeOut' },
      };

  return (
    <section className="cubicon-semantics-section" id="section-06">
      <div className="csm-container">
        {/* Section Introduction */}
        <motion.header className="csm-header-block" ref={headerRef} {...headerAnimation}>
          <CaseStudySectionChip number="05" title="SEMANTICS ANALYSIS" />
          <h2 className="csm-section-title font-display">Designing for Meaning</h2>
          <p className="csm-section-intro font-body">
            Small design choices can make actions easier to understand.
          </p>
        </motion.header>

        {/* Four Semantic Examples */}
        <div className="csm-examples-stack">
          {SEMANTIC_EXAMPLES.map((example, idx) => (
            <SemanticItem key={example.id} example={example} delay={idx * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}
