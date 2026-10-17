import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import CaseStudySectionChip from './CaseStudySectionChip';
import './CubiconUsabilityTesting.css';

// Reusable Animated Number component using easeOutExpo
function AnimatedCounter({ target, isFloat = false, duration = 1500, trigger = false }) {
  const shouldReduceMotion = useReducedMotion();
  const [value, setValue] = useState(shouldReduceMotion ? (isFloat ? target.toFixed(1) : target) : 0);
  const hasRunRef = useRef(false);

  useEffect(() => {
    if (shouldReduceMotion) {
      setValue(isFloat ? target.toFixed(1) : target);
      return;
    }
    if (!trigger || hasRunRef.current) return;
    hasRunRef.current = true;

    let startTime = null;
    let animId;

    const update = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo easing curve
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = target * ease;

      if (progress < 1) {
        setValue(isFloat ? current.toFixed(1) : Math.round(current));
        animId = requestAnimationFrame(update);
      } else {
        setValue(isFloat ? target.toFixed(1) : target);
      }
    };

    animId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animId);
  }, [trigger, target, isFloat, duration, shouldReduceMotion]);

  return <span className="cut-number-count">{value}</span>;
}

export default function CubiconUsabilityTesting() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const taskSuccessRef = useRef(null);
  const susRef = useRef(null);
  const tlxRef = useRef(null);

  const shouldReduceMotion = useReducedMotion();

  // Progressive scroll reveals
  const isHeaderInView = useInView(headerRef, { once: true, margin: '-5% 0px -5% 0px' });
  const isTaskSuccessInView = useInView(taskSuccessRef, { once: true, margin: '-5% 0px -5% 0px' });
  const isSusInView = useInView(susRef, { once: true, margin: '-5% 0px -5% 0px' });
  const isTlxInView = useInView(tlxRef, { once: true, margin: '-5% 0px -5% 0px' });

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

  // NASA-TLX 6 Workload Dimensions Data (Preserved exactly from legacy reference)
  const tlxItems = [
    { label: 'Mental Demand (Low)', score: 22, width: 22, isSuccess: false },
    { label: 'Physical Demand (Low)', score: 15, width: 15, isSuccess: false },
    { label: 'Temporal Demand (Low)', score: 28, width: 28, isSuccess: false },
    { label: 'Performance (High Success)', score: 85, width: 85, isSuccess: true },
    { label: 'Effort (Low)', score: 30, width: 30, isSuccess: false },
    { label: 'Frustration (Low)', score: 18, width: 18, isSuccess: false },
  ];

  return (
    <section className="cubicon-usability-testing-section" id="section-08" ref={sectionRef}>
      <div className="cut-container">
        {/* =================================================================
            01. SECTION INTRODUCTION
           ================================================================= */}
        <motion.header
          className="cut-header-block"
          ref={headerRef}
          {...getRevealProps(isHeaderInView, 0)}
        >
          <CaseStudySectionChip number="08" title="VALIDATION" />
          <h2 className="cut-section-title font-display">Usability Testing</h2>
          <p className="cut-section-intro font-body">
            Rigorous testing across 14 participants to validate the design decisions and measure overall system usability.
          </p>
        </motion.header>

        {/* =================================================================
            02. TASK SUCCESS RATE
           ================================================================= */}
        <motion.div
          className="cut-block cut-task-success-block"
          ref={taskSuccessRef}
          {...getRevealProps(isTaskSuccessInView, 0)}
        >
          <div className="cut-block-header">
            <div className="cut-header-text">
              <h3 className="cut-block-heading font-display">Task Success Rate</h3>
              <p className="cut-block-sub font-body">Evaluated across three core shopping tasks.</p>
            </div>
            <div className="cut-stat-card">
              <div className="cut-stat-value cut-val-success font-display">
                <AnimatedCounter target={83.3} isFloat={true} trigger={isTaskSuccessInView} />%
              </div>
              <div className="cut-stat-label font-body">Overall Success</div>
            </div>
          </div>

          <div className="cut-table-wrapper">
            <table className="cut-data-table font-body">
              <thead>
                <tr>
                  <th>Participant</th>
                  <th>Task 1: Add 3x3 to Cart</th>
                  <th>Task 2: Complete Purchase</th>
                  <th>Task 3: Find 3 ways to buy</th>
                  <th>Success Rate</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>User 01</td>
                  <td><span className="cut-badge cut-badge-pass">Pass</span></td>
                  <td><span className="cut-badge cut-badge-pass">Pass</span></td>
                  <td><span className="cut-badge cut-badge-pass">Pass</span></td>
                  <td className="cut-td-strong">100%</td>
                </tr>
                <tr>
                  <td>User 02</td>
                  <td><span className="cut-badge cut-badge-pass">Pass</span></td>
                  <td><span className="cut-badge cut-badge-pass">Pass</span></td>
                  <td><span className="cut-badge cut-badge-fail">Fail (Found 2)</span></td>
                  <td className="cut-td-strong">66%</td>
                </tr>
                <tr>
                  <td>User 05</td>
                  <td><span className="cut-badge cut-badge-pass">Pass (Friction)</span></td>
                  <td><span className="cut-badge cut-badge-pass">Pass</span></td>
                  <td><span className="cut-badge cut-badge-fail">Fail (Abandoned)</span></td>
                  <td className="cut-td-strong">66%</td>
                </tr>
                <tr>
                  <td>User 09</td>
                  <td><span className="cut-badge cut-badge-fail">Fail (Nav Error)</span></td>
                  <td><span className="cut-badge cut-badge-pass">Pass</span></td>
                  <td><span className="cut-badge cut-badge-fail">Fail (Abandoned)</span></td>
                  <td className="cut-td-strong">33%</td>
                </tr>
                <tr className="cut-row-summary">
                  <td>Average (N=14)</td>
                  <td>92.8% Pass</td>
                  <td>100% Pass</td>
                  <td>57.1% Pass</td>
                  <td className="cut-td-strong">83.3%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* =================================================================
            03. SYSTEM USABILITY SCALE (SUS)
           ================================================================= */}
        <motion.div
          className="cut-block cut-sus-block"
          ref={susRef}
          {...getRevealProps(isSusInView, 0)}
        >
          <div className="cut-block-header">
            <div className="cut-header-text">
              <h3 className="cut-block-heading font-display">System Usability Scale (SUS)</h3>
              <p className="cut-block-sub font-body">Measuring the perceived usability of the final design.</p>
            </div>
            <div className="cut-stat-card">
              <div className="cut-stat-value cut-val-accent font-display">
                <AnimatedCounter target={72.5} isFloat={true} trigger={isSusInView} />
              </div>
              <div className="cut-stat-label font-body">Good Rating</div>
            </div>
          </div>

          <div className="cut-table-wrapper">
            <table className="cut-data-table font-body">
              <thead>
                <tr>
                  <th>Participant</th>
                  <th>Calculated Score</th>
                  <th>Adjective Rating</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>User 01</td>
                  <td className="cut-td-score">90.0</td>
                  <td><span className="cut-badge cut-badge-pass">Excellent</span></td>
                </tr>
                <tr>
                  <td>User 04</td>
                  <td className="cut-td-score">52.5</td>
                  <td><span className="cut-badge cut-badge-fail">Poor</span></td>
                </tr>
                <tr>
                  <td>User 06</td>
                  <td className="cut-td-score">82.5</td>
                  <td><span className="cut-badge cut-badge-pass">Excellent</span></td>
                </tr>
                <tr>
                  <td>User 12</td>
                  <td className="cut-td-score">62.5</td>
                  <td><span className="cut-badge cut-badge-fail">Marginal</span></td>
                </tr>
                <tr className="cut-row-summary">
                  <td>Average (N=14)</td>
                  <td className="cut-td-score cut-td-strong">72.5</td>
                  <td><span className="cut-badge cut-badge-pass">Good</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* =================================================================
            04. NASA-TLX SCOREBOARD
           ================================================================= */}
        <motion.div
          className="cut-block cut-tlx-block"
          ref={tlxRef}
          {...getRevealProps(isTlxInView, 0)}
        >
          <div className="cut-tlx-card">
            <div className="cut-tlx-card-header">
              <h3 className="cut-block-heading font-display">NASA TLX Scoreboard</h3>
              <p className="cut-block-sub font-body">
                Measuring subjective workload assessment across participants.
              </p>
            </div>

            <div className="cut-tlx-items-container">
              {tlxItems.map((item, index) => {
                const barWidth = isTlxInView || shouldReduceMotion ? `${item.width}%` : '0%';
                return (
                  <div className="cut-tlx-item" key={index}>
                    <div className="cut-tlx-label-row font-body">
                      <span className="cut-tlx-label">{item.label}</span>
                      <span
                        className={`cut-tlx-score font-display ${
                          item.isSuccess ? 'cut-tlx-score-success' : ''
                        }`}
                      >
                        <AnimatedCounter
                          target={item.score}
                          isFloat={false}
                          trigger={isTlxInView}
                        />
                      </span>
                    </div>
                    <div className="cut-tlx-bar-container">
                      <div
                        className={`cut-tlx-bar ${item.isSuccess ? 'cut-tlx-bar-success' : ''}`}
                        style={{
                          width: barWidth,
                          transitionDelay: shouldReduceMotion ? '0s' : `${index * 0.08}s`,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
