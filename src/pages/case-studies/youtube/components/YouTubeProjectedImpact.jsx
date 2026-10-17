import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import CaseStudySectionChip from './CaseStudySectionChip';
import './YouTubeProjectedImpact.css';

export default function YouTubeProjectedImpact() {
  const shouldReduceMotion = useReducedMotion();

  const revealProps = {
    initial: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-10%' },
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  };

  return (
    <section className="yt-projected-section yt-projected-impact-section">
      <div className="yt-container">
        <div className="yt-projected-header">
          <CaseStudySectionChip number="06" title="Projected Business Impact" />
        </div>

        <motion.div className="yt-glass-card yt-metrics-grid" {...revealProps}>
          <div className="yt-metrics-left">
            <h2 className="yt-projected-title font-display">Projected Business Impact</h2>
            <p className="yt-projected-lead font-body">
              By making it easier to watch saved videos, we estimate an increase in the overall watch time on the platform. This hypothesized improvement leads to more ads being shown and higher potential revenue.
            </p>

            <div className="yt-metrics-flex">
              <div className="yt-metric-stat">
                <h3 className="font-display" style={{ color: '#10b981' }}>+22%</h3>
                <p className="font-body">Estimated CTR Potential</p>
              </div>
              <div className="yt-metric-stat">
                <h3 className="font-display" style={{ color: '#3b82f6' }}>+15%</h3>
                <p className="font-body">Estimated Watch Time Growth</p>
              </div>
            </div>

            <span className="yt-estimate-note font-body">
              Projection Notice: Unvalidated conceptual estimates based on intent models, not post-launch measurements.
            </span>
          </div>

          <div className="yt-ad-revenue-card">
            <h4 className="font-display" style={{ color: '#f59e0b' }}>Ad Revenue</h4>
            <p className="font-body">
              Intent-based watching allows for more relevant, higher-paying ads to be served to the user.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
