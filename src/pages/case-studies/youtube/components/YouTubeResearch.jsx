import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { BarChart2, AlertCircle } from 'lucide-react';
import CaseStudySectionChip from './CaseStudySectionChip';
import './YouTubeResearch.css';

export default function YouTubeResearch() {
  const shouldReduceMotion = useReducedMotion();

  const barVariants = (heightPercent) => ({
    hidden: { height: '0%' },
    visible: {
      height: `${heightPercent}%`,
      transition: {
        duration: shouldReduceMotion ? 0 : 1.2,
        ease: [0.16, 1, 0.3, 1],
        delay: shouldReduceMotion ? 0 : 0.2,
      },
    },
  });

  const segmentVariants = (widthPercent, delay) => ({
    hidden: { width: '0%' },
    visible: {
      width: `${widthPercent}%`,
      transition: {
        duration: shouldReduceMotion ? 0 : 1.2,
        ease: [0.16, 1, 0.3, 1],
        delay: shouldReduceMotion ? 0 : delay,
      },
    },
  });

  return (
    <section className="yt-research-section" id="data">
      <div className="yt-container">
        <div className="yt-research-header">
          <CaseStudySectionChip number="03" title="Research Data" />
          <h2 className="yt-research-heading font-display">Research Data</h2>
          <p className="yt-research-sub font-body">
            Based on a survey of 52 YouTube users via Google Forms, mapping content saving patterns and rediscovery drop-off.
          </p>
        </div>

        <div className="yt-chart-grid">
          {/* Card 1: Vertical Pillars (App Saving Habits) */}
          <div className="yt-glass-card yt-premium-data-card">
            <div className="yt-data-header">
              <div className="yt-data-icon" aria-hidden="true">
                <BarChart2 size={24} style={{ color: '#3b82f6' }} />
              </div>
              <div>
                <h4 className="font-display">App Saving Habits</h4>
                <p className="font-body">Return rate for saved content</p>
              </div>
            </div>

            <div className="yt-pillars-container">
              {/* Pillar 1: IG / Netflix */}
              <div className="yt-pillar-item">
                <span className="yt-pillar-value font-display" style={{ color: '#3b82f6' }}>85%</span>
                <div className="yt-pillar-track">
                  <motion.div
                    className="yt-pillar-fill pillar-blue"
                    variants={barVariants(85)}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-5%' }}
                  />
                </div>
                <span className="yt-pillar-label font-body">IG / Netflix</span>
              </div>

              {/* Pillar 2: Watchlater */}
              <div className="yt-pillar-item">
                <span className="yt-pillar-value font-display" style={{ color: '#ef4444' }}>59%</span>
                <div className="yt-pillar-track">
                  <motion.div
                    className="yt-pillar-fill pillar-red"
                    variants={barVariants(59)}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-5%' }}
                  />
                </div>
                <span className="yt-pillar-label font-body">Watchlater</span>
              </div>
            </div>
          </div>

          {/* Card 2: Segmented Capsule (Why Users Forget) */}
          <div className="yt-glass-card yt-premium-data-card">
            <div className="yt-data-header centered">
              <h4 className="font-display">Why Users Forget</h4>
            </div>

            <div className="yt-capsule-wrapper">
              <div className="yt-capsule-track">
                {/* 40.7% Forget */}
                <motion.div
                  className="yt-capsule-segment seg-forget"
                  variants={segmentVariants(55, 0.1)}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-5%' }}
                />
                {/* 33.3% Save, no return */}
                <motion.div
                  className="yt-capsule-segment seg-noreturn"
                  variants={segmentVariants(45, 0.25)}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-5%' }}
                />
              </div>

              <div className="yt-capsule-total">
                <h3 className="font-display">74%</h3>
                <span className="font-body">Total Drop-off</span>
              </div>
            </div>

            <div className="yt-rings-legend font-body">
              <div className="yt-legend-item">
                <div className="yt-legend-dot" style={{ background: '#ef4444' }} aria-hidden="true" />
                <span><strong>40.7%</strong> Forget it exists</span>
              </div>
              <div className="yt-legend-item">
                <div className="yt-legend-dot" style={{ background: '#3b82f6' }} aria-hidden="true" />
                <span><strong>33.3%</strong> Save, no return</span>
              </div>
            </div>
          </div>
        </div>

        {/* Synthesis Callout */}
        <div className="yt-research-callout font-body">
          <AlertCircle size={20} className="yt-callout-icon" aria-hidden="true" />
          <p>
            This is not a utility problem. It is a <strong className="yt-accent-text">visibility and re-engagement problem.</strong>
          </p>
        </div>
      </div>
    </section>
  );
}
