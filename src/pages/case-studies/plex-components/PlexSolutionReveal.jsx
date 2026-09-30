import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import CaseStudySectionChip from './CaseStudySectionChip';
import './PlexSolutionReveal.css';
import mobileVideo from '../../../assets/plex/plex-phone-tablet.mp4';
import desktopVideo from '../../../assets/plex/plex-laptop-desktop.mp4';

export default function PlexSolutionReveal() {
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 1023px)');
    setIsMobileOrTablet(mediaQuery.matches);
    
    const handler = (e) => setIsMobileOrTablet(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const videoSrc = isMobileOrTablet ? mobileVideo : desktopVideo;

  return (
    <section className="plex-solution-reveal-wrapper">
      <div className="plex-solution-reveal-content">
        
        {/* Chip */}
        <motion.div 
          className="plex-solution-reveal-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <CaseStudySectionChip title="THE SOLUTION" number="04" />
        </motion.div>

        {/* Title */}
        <motion.h2 
          className="plex-solution-reveal-title font-display"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
        >
          Plex
        </motion.h2>

        {/* Video Container */}
        <motion.div 
          className="plex-solution-reveal-video-container"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <video 
            key={videoSrc} // Forces re-mount when source changes
            className="plex-solution-video"
            src={videoSrc}
            autoPlay 
            muted 
            loop 
            playsInline
            preload="metadata"
            aria-label="Plex product introduction"
          />
        </motion.div>

      </div>
    </section>
  );
}
