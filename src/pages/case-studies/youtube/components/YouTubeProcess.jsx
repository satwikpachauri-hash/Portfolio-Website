import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import CaseStudySectionChip from './CaseStudySectionChip';
import './YouTubeProcess.css';

export default function YouTubeProcess() {
  const containerRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'end 70%'],
  });

  const fillScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const steps = [
    {
      title: '1. Empathize',
      desc: 'Surveyed 52 users via Google Forms to find out why they stop using the Watch Later list. Found that it feels like "manual labor" to find videos.',
    },
    {
      title: '2. Define',
      desc: 'Identified the core issue: Visibility. If a user doesn\'t see their saved videos on the homepage, they won\'t watch them.',
    },
    {
      title: '3. Ideate',
      desc: 'Created sketches for a "Collections Hub" that brings saved content back to the user automatically.',
    },
    {
      title: '4. Prototype',
      desc: 'Built high-fidelity mockups in Figma showing the new one-tap save and AI playlists.',
    },
  ];

  return (
    <section className="yt-process-section" id="process">
      <div className="yt-container">
        <div className="yt-process-wrap">
          <CaseStudySectionChip number="02" title="Design Process" />
          <h2 className="yt-process-heading font-display">Design Process</h2>

          <div className="yt-process-box" ref={containerRef}>
            {/* Background line */}
            <div className="yt-process-line" />
            {/* Animated fill line */}
            <motion.div
              className="yt-process-fill"
              style={{
                scaleY: shouldReduceMotion ? 1 : fillScale,
                transformOrigin: 'top',
              }}
            />

            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                className="yt-process-step"
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="yt-process-dot" aria-hidden="true" />
                <h4 className="yt-step-title font-display">{step.title}</h4>
                <p className="yt-step-desc font-body">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
