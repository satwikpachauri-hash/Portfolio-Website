import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import CaseStudySectionChip from './CaseStudySectionChip';
import './PlexSolutionReveal.css';

// Import video assets from the permanent source
import mobileVideo from '../../../assets/plex/plex-phone-tablet.mp4';
import desktopVideo from '../../../assets/plex/plex-laptop-desktop.mp4';

export default function PlexSolutionReveal() {
  // Use a safe initial state
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Mark as client-side rendered
    setIsClient(true);

    const mediaQuery = window.matchMedia('(max-width: 1023px)');
    
    // Set initial value
    setIsMobileOrTablet(mediaQuery.matches);
    
    // Listen for resize changes
    const handler = (e) => {
      setIsMobileOrTablet(e.matches);
    };
    
    // Modern addEventListener
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handler);
    } else {
      mediaQuery.addListener(handler);
    }
    
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handler);
      } else {
        mediaQuery.removeListener(handler);
      }
    };
  }, []);

  const videoSrc = isMobileOrTablet ? mobileVideo : desktopVideo;

  return (
    <section className="plex-solution-reveal-wrapper">
      <div className="plex-solution-reveal-content">
        
        {/* Section Heading Structure - PRESERVED EXACTLY */}
        <motion.div 
          className="plex-solution-reveal-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <CaseStudySectionChip title="THE SOLUTION" number="04" />
        </motion.div>

        <motion.h2 
          className="plex-solution-reveal-title font-display"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
        >
          Plex
        </motion.h2>

        {/* Video Container - CLEAN REBUILD */}
        <motion.div 
          className="plex-solution-reveal-video-container"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          {isClient && (
            <video 
              key={videoSrc} // Forces React to recreate the video element when the source changes
              className="plex-solution-video"
              src={videoSrc}
              autoPlay 
              muted 
              loop 
              playsInline
              preload="auto"
              aria-label="Plex product introduction"
            />
          )}
        </motion.div>

      </div>
    </section>
  );
}
