import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Check } from 'lucide-react';
import CaseStudySectionChip from './CaseStudySectionChip';
import './YouTubeSolutions.css';

export default function YouTubeSolutions() {
  const shouldReduceMotion = useReducedMotion();

  const revealProps = {
    initial: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-10%' },
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  };

  return (
    <section className="yt-solutions-section" id="solution">
      <div className="yt-container">
        <div className="yt-solutions-header">
          <CaseStudySectionChip number="05" title="Design Solutions" />
          <h2 className="yt-solutions-heading font-display">Design Solutions</h2>
        </div>

        {/* Feature 01: Direct Access */}
        <motion.div className="yt-feature-row" {...revealProps}>
          <div className="yt-feature-info">
            <h4 className="yt-feature-tag font-display">Feature 01</h4>
            <h3 className="yt-feature-title font-display">Direct Access</h3>
            <p className="yt-feature-desc font-body">
              I added a Clock Icon directly to the video thumbnails on the homepage. Users can now save a video with just one tap, similar to how Instagram allows users to save posts instantly.
            </p>
            <ul className="yt-bullet-p font-body">
              <li>
                <Check size={18} className="yt-check-icon" strokeWidth={2.5} />
                <span>Faster saving process (1 tap instead of 3).</span>
              </li>
              <li>
                <Check size={18} className="yt-check-icon" strokeWidth={2.5} />
                <span>Higher visual reminder on the home screen.</span>
              </li>
            </ul>
          </div>
          <div className="yt-mock-wrap">
            <div className="yt-phone">
              <picture>
                <source srcSet="/case-studies/youtube-watchlater/Mockup 1 homepage.webp" type="image/webp" />
                <img src="/case-studies/youtube-watchlater/Mockup 1 homepage.webp" alt="YouTube Homepage One-Tap Save" loading="lazy" />
              </picture>
            </div>
            <div className="yt-tag font-body">One-Tap Save</div>
          </div>
        </motion.div>

        {/* Feature 02: AI Organization */}
        <motion.div className="yt-feature-row reverse" {...revealProps}>
          <div className="yt-feature-info">
            <h4 className="yt-feature-tag font-display">Feature 02</h4>
            <h3 className="yt-feature-title font-display">AI Organization</h3>
            <p className="yt-feature-desc font-body">
              The app now automatically categorizes saved videos into playlists like "Tech," "Tutorials," and "Travel" using AI, so the list never feels cluttered.
            </p>
          </div>
          <div className="yt-mock-wrap">
            <div className="yt-multi-mockup-flex">
              <div className="yt-phone multi">
                <picture>
                  <source srcSet="/case-studies/youtube-watchlater/Mockup 2.webp" type="image/webp" />
                  <img src="/case-studies/youtube-watchlater/Mockup 2.webp" alt="Smart Organization Playlist 1" loading="lazy" />
                </picture>
              </div>
              <div className="yt-phone multi">
                <picture>
                  <source srcSet="/case-studies/youtube-watchlater/Mockup 3.webp" type="image/webp" />
                  <img src="/case-studies/youtube-watchlater/Mockup 3.webp" alt="Smart Organization Playlist 2" loading="lazy" />
                </picture>
              </div>
            </div>
            <div className="yt-tag tag-bottom font-body">Smart Sorting</div>
          </div>
        </motion.div>

        {/* Feature 03: Search Integration */}
        <motion.div className="yt-feature-row" {...revealProps}>
          <div className="yt-feature-info">
            <h4 className="yt-feature-tag font-display">Feature 03</h4>
            <h3 className="yt-feature-title font-display">Search Integration</h3>
            <p className="yt-feature-desc font-body">
              When you search for a topic, the app reminds you about relevant videos you already saved, placing them right at the top of the search results.
            </p>
          </div>
          <div className="yt-mock-wrap">
            <div className="yt-phone">
              <picture>
                <source srcSet="/case-studies/youtube-watchlater/Mockup 4.webp" type="image/webp" />
                <img src="/case-studies/youtube-watchlater/Mockup 4.webp" alt="Search Integration Nudge" loading="lazy" />
              </picture>
            </div>
            <div className="yt-tag font-body">Search Nudge</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
