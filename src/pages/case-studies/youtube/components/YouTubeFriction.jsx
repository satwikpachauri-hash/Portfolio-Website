import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { EyeOff, Layers, Link2Off, X } from 'lucide-react';
import CaseStudySectionChip from './CaseStudySectionChip';
import './YouTubeFriction.css';

export default function YouTubeFriction() {
  const shouldReduceMotion = useReducedMotion();

  const frictionCards = [
    {
      num: '01',
      icon: EyeOff,
      heading: 'Discoverability',
      statements: [
        'Buried under multiple taps inside the Library',
        'No persistent visibility during browsing sessions',
      ],
    },
    {
      num: '02',
      icon: Layers,
      heading: 'Organizational Fatigue',
      statements: [
        'All content types in one unfiltered vertical feed',
        'Analysis paralysis when list grows large',
      ],
    },
    {
      num: '03',
      icon: Link2Off,
      heading: 'Contextual Invisibility',
      statements: [
        'No cross-referencing with search or recommendations',
        'Saved content stays permanently disconnected',
      ],
    },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
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

  return (
    <section className="yt-friction-section">
      <div className="yt-container">
        <div className="yt-friction-header">
          <CaseStudySectionChip number="04" title="Friction Analysis" />
          <h2 className="yt-friction-heading font-display">Three Places It Breaks</h2>
          <p className="yt-friction-lead font-body">
            Research synthesis pointed to three distinct UX failure modes, each compounding the other.
          </p>
        </div>

        <div className="yt-friction-grid">
          {frictionCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={idx}
                className="yt-friction-card"
                custom={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-10%' }}
                variants={cardVariants}
              >
                {/* Large subtle background number */}
                <div className="yt-friction-num font-display" aria-hidden="true">
                  {card.num}
                </div>

                <div className="yt-friction-icon-wrap" aria-hidden="true">
                  <Icon size={24} strokeWidth={2} />
                </div>

                <h3 className="yt-friction-card-title font-display">{card.heading}</h3>

                <ul className="yt-friction-bullet-list font-body">
                  {card.statements.map((stmt, sIdx) => (
                    <li key={sIdx}>
                      <span className="yt-friction-bullet-icon" aria-hidden="true">
                        <X size={14} strokeWidth={2.5} />
                      </span>
                      <span>{stmt}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
