import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { AlertCircle } from 'lucide-react';
import CaseStudySectionChip from './CaseStudySectionChip';
import './YouTubeProblem.css';

export default function YouTubeProblem() {
  const shouldReduceMotion = useReducedMotion();

  const bulletVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 16 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: shouldReduceMotion ? 0 : i * 0.12,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  const points = [
    'Users save videos to "watch later" when they are busy, but the list becomes a messy dumping ground.',
    'The feature is hidden deep in the Library menu, making it invisible to the user during their daily scrolling.',
    'Because it is hard to find, users forget what they saved and end up searching for the same videos again.',
  ];

  return (
    <section className="yt-problem-section">
      <div className="yt-container">
        <div className="yt-problem-wrap">
          <CaseStudySectionChip number="01" title="The Problem" />
          <h2 className="yt-problem-heading font-display">The Problem</h2>

          <ul className="yt-problem-bullets font-body">
            {points.map((text, idx) => (
              <motion.li
                key={idx}
                custom={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-10%' }}
                variants={bulletVariants}
              >
                <div className="yt-problem-icon" aria-hidden="true">
                  <AlertCircle size={22} strokeWidth={2.2} />
                </div>
                <span>{text}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
