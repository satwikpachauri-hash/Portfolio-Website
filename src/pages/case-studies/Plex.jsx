import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import PlexProblemSection from './plex-components/PlexProblemSection';
import PlexProjectContext from './plex-components/PlexProjectContext';
import PlexExistingToolsSection from './plex-components/PlexExistingToolsSection';
import PlexProductPhilosophy from './plex-components/PlexProductPhilosophy';
import PlexSolutionReveal from './plex-components/PlexSolutionReveal';
import PlexProductVision from './plex-components/PlexProductVision';
import PlexDesignExploration from './plex-components/PlexDesignExploration';
import PlexProductEvolution from './plex-components/PlexProductEvolution';
import PlexWalkthrough from './plex-components/PlexWalkthrough';
import PlexArchitecture from './plex-components/PlexArchitecture';
import PlexCollaboration from './plex-components/PlexCollaboration';
import PlexReflection from './plex-components/PlexReflection';
import './Plex.css';

export default function Plex() {
  const heroRef = useRef(null);

  // Subtle background scale to create depth during scroll
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  return (
    <div className="plex-case-study">
      <section className="plex-hero-cinematic" ref={heroRef}>
        
        {/* Full Viewport Background Image */}
        <motion.div 
          className="plex-cinematic-bg-wrapper"
          style={{ scale: bgScale }}
        >
          <motion.img 
            src="/case-studies/plex/assets/hero/Hero Page.webp" 
            alt="Plex application environment"
            className="plex-cinematic-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            loading="eager"
            fetchPriority="high"
          />
        </motion.div>

        {/* Content Overlay / Glass Panel */}
        <div className="plex-hero-content-container">
          <motion.div 
            className="plex-glass-panel"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.h1 
              className="plex-glass-title font-display"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              Plex
            </motion.h1>
            
            <motion.h2 
              className="plex-glass-tagline font-body"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              Less planning. More progress.
            </motion.h2>

            <motion.div 
              className="plex-glass-metadata font-body"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="plex-meta-column">
                <div className="plex-meta-item">
                  <span className="plex-meta-label">Role</span>
                  <span className="plex-meta-value">Product Designer</span>
                </div>
                <div className="plex-meta-item">
                  <span className="plex-meta-label">Project</span>
                  <span className="plex-meta-value">Plex</span>
                </div>
              </div>
              <div className="plex-meta-column">
                <div className="plex-meta-item">
                  <span className="plex-meta-label">Category</span>
                  <span className="plex-meta-value">Product Design</span>
                </div>
                <div className="plex-meta-item">
                  <span className="plex-meta-label">Platform</span>
                  <span className="plex-meta-value">Android</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Case Study Sections */}
      <div className="plex-case-study-body">
        <PlexProblemSection />
        <PlexProjectContext />
        <PlexExistingToolsSection />
        <PlexProductPhilosophy />
        <PlexSolutionReveal />
        <PlexProductVision />
        <PlexDesignExploration />
        <PlexProductEvolution />
        <PlexWalkthrough />
        <PlexArchitecture />
        <PlexCollaboration />
        <PlexReflection />
      </div>
    </div>
  );
}
