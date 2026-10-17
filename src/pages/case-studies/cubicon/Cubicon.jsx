import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import CubiconBrief from './components/CubiconBrief';
import CubiconUnderstanding from './components/CubiconUnderstanding';
import CubiconExploring from './components/CubiconExploring';
import CubiconSelection from './components/CubiconSelection';
import CubiconIdeation from './components/CubiconIdeation';
import CubiconApplying from './components/CubiconApplying';
import CubiconSemantics from './components/CubiconSemantics';
import CubiconFriction from './components/CubiconFriction';
import CubiconIndustryInsight from './components/CubiconIndustryInsight';
import CubiconUsabilityTesting from './components/CubiconUsabilityTesting';
import CubiconFinalIteration from './components/CubiconFinalIteration';
import CubiconFooter from './components/CubiconFooter';
import RelatedProjects from '../../../components/projects/RelatedProjects';
import './Cubicon.css';

export default function Cubicon() {
  const heroRef = useRef(null);

  // Subtle background scale to create depth during scroll
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  return (
    <div className="cubicon-case-study">
      <section className="cubicon-hero-cinematic" ref={heroRef}>
        
        {/* Full Viewport Background Image */}
        <motion.div 
          className="cubicon-cinematic-bg-wrapper"
          style={{ scale: bgScale }}
        >
          <motion.img 
            src="/case-studies/cubicon/assets/hero/Hero Section.webp" 
            alt="Cubicon application environment"
            className="cubicon-cinematic-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            loading="eager"
            fetchPriority="high"
          />
        </motion.div>

        {/* Content Overlay / Glass Panel */}
        <div className="cubicon-hero-content-container">
          <motion.div 
            className="cubicon-glass-panel"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="cubicon-logo-tile">
              <img src="/case-studies/cubicon/assets/logo/cubicon-logo.png" alt="Cubicon Logo" className="cubicon-logo-img" />
            </div>

            <motion.h1 
              className="cubicon-glass-title font-display"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              Cubicon
            </motion.h1>
            
            <motion.p 
              className="cubicon-glass-tagline font-body"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              Applying Material Design 3 to build a coherent e-commerce experience from system to interface.
            </motion.p>

            <motion.div 
              className="cubicon-glass-metadata font-body"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="cubicon-meta-column">
                <div className="cubicon-meta-item">
                  <span className="cubicon-meta-label">Role</span>
                  <span className="cubicon-meta-value">Interaction Designer</span>
                </div>
                <div className="cubicon-meta-item">
                  <span className="cubicon-meta-label">Design System</span>
                  <span className="cubicon-meta-value">Material Design 3</span>
                </div>
                <div className="cubicon-meta-item">
                  <span className="cubicon-meta-label">Tool</span>
                  <span className="cubicon-meta-value">Figma</span>
                </div>
              </div>
              <div className="cubicon-meta-column">
                <div className="cubicon-meta-item">
                  <span className="cubicon-meta-label">Category</span>
                  <span className="cubicon-meta-value">E-Commerce</span>
                </div>
                <div className="cubicon-meta-item">
                  <span className="cubicon-meta-label">Platform</span>
                  <span className="cubicon-meta-value">iOS / Android</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Case Study Sections */}
      <div className="cubicon-case-study-body">
        <CubiconBrief />
        <CubiconUnderstanding />
        <CubiconExploring />
        <CubiconSelection />
        <CubiconIdeation />
        <CubiconApplying />
        <CubiconSemantics />
        <CubiconFriction />
        <CubiconIndustryInsight />
        <CubiconUsabilityTesting />
        <CubiconFinalIteration />
        <RelatedProjects currentProject="cubicon" />
        <CubiconFooter />
      </div>
    </div>
  );
}
