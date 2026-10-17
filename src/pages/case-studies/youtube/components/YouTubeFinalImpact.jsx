import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { CheckCircle, TrendingUp } from 'lucide-react';
import CaseStudySectionChip from './CaseStudySectionChip';
import './YouTubeFinalImpact.css';

export default function YouTubeFinalImpact() {
  const shouldReduceMotion = useReducedMotion();

  const revealProps = {
    initial: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-10%' },
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  };

  return (
    <section className="yt-final-impact-section">
      <div className="yt-container">
        <div className="yt-final-header">
          <CaseStudySectionChip number="07" title="Final Impact" />
          <h2 className="yt-final-heading font-display">Final Impact</h2>
        </div>

        <div className="yt-final-grid">
          {/* Card 1: For Users */}
          <motion.div className="yt-glass-card yt-final-card" {...revealProps}>
            <h4 className="yt-final-card-title font-display">For Users</h4>
            <ul className="yt-bullet-p font-body">
              <li>
                <CheckCircle size={20} className="yt-final-icon user-icon" strokeWidth={2.2} />
                <span>No more stress managing a messy "Watch Later" list.</span>
              </li>
              <li>
                <CheckCircle size={20} className="yt-final-icon user-icon" strokeWidth={2.2} />
                <span>Instant access to content they actually care about.</span>
              </li>
              <li>
                <CheckCircle size={20} className="yt-final-icon user-icon" strokeWidth={2.2} />
                <span>Smarter reminders during search and browsing.</span>
              </li>
            </ul>
          </motion.div>

          {/* Card 2: For YouTube */}
          <motion.div className="yt-glass-card yt-final-card" {...revealProps}>
            <h4 className="yt-final-card-title font-display">For YouTube</h4>
            <ul className="yt-bullet-p font-body">
              <li>
                <TrendingUp size={20} className="yt-final-icon yt-icon" strokeWidth={2.2} />
                <span>Increased user retention and session depth.</span>
              </li>
              <li>
                <TrendingUp size={20} className="yt-final-icon yt-icon" strokeWidth={2.2} />
                <span>Higher value ad inventory per session.</span>
              </li>
              <li>
                <TrendingUp size={20} className="yt-final-icon yt-icon" strokeWidth={2.2} />
                <span>Better monetization of existing user intent.</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
