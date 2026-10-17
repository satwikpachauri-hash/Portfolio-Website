import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import './YouTubeHero.css';

export default function YouTubeHero() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: shouldReduceMotion ? 1 : 0.98 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 },
    },
  };

  return (
    <section className="yt-hero-section">
      <div className="yt-container">
        <motion.div
          className="yt-hero-grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Column: Reference A Hero Card */}
          <motion.div className="yt-hero-card" variants={itemVariants}>
            <div className="yt-hero-badge">
              <div className="yt-logo-badge" aria-label="YouTube Logo">
                <svg width="24" height="17" viewBox="0 0 40 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M39.198 4.39C38.736 2.658 37.378 1.298 35.65 0.835C32.52 0 20 0 20 0C20 0 7.48 0 4.35 0.835C2.622 1.298 1.264 2.658 0.802 4.39C0 7.525 0 14 0 14C0 14 0 20.475 0.802 23.61C1.264 25.342 2.622 26.702 4.35 27.165C7.48 28 20 28 20 28C20 28 32.52 28 35.65 27.165C37.378 26.702 38.736 25.342 39.198 23.61C40 20.475 40 14 40 14C40 14 40 7.525 39.198 4.39Z" fill="#FF0000"/>
                  <path d="M16 20L26.4 14L16 8V20Z" fill="white"/>
                </svg>
              </div>
              <span className="yt-hero-badge-label font-body">Case Study</span>
            </div>

            <h1 className="yt-hero-title font-display">
              YouTube<br className="yt-hero-title-br" />Watchlater
            </h1>

            <p className="yt-hero-lead font-body">
              Bridging the gap between intent and consumption by transforming a passive archive into an active discovery hub.
            </p>

            <div className="yt-hero-meta">
              <div className="yt-meta-item">
                <label className="font-body">Designer</label>
                <h4 className="font-display">Satwik Pachauri</h4>
              </div>
              <div className="yt-meta-item">
                <label className="font-body">Tool</label>
                <h4 className="font-display">Figma</h4>
              </div>
              <div className="yt-meta-item">
                <label className="font-body">Category</label>
                <h4 className="font-display">UX Redesign</h4>
              </div>
              <div className="yt-meta-item">
                <label className="font-body">Project</label>
                <h4 className="font-display">YouTube Watchlater</h4>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Authentic Hero Showcase */}
          <motion.div className="yt-hero-visual" variants={imageVariants}>
            <div className="yt-hero-img-box">
              <picture>
                <source srcSet="/case-studies/youtube-watchlater/Hero Section.webp" type="image/webp" />
                <img
                  src="/case-studies/youtube-watchlater/Hero Section.webp"
                  alt="YouTube Watch Later Redesign Interface Showcase"
                  className="yt-hero-image"
                  fetchPriority="high"
                  loading="eager"
                />
              </picture>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
