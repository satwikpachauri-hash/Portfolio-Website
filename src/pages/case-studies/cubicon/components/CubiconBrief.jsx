import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import CaseStudySectionChip from './CaseStudySectionChip';
import './CubiconBrief.css';

export default function CubiconBrief() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-15%" });

  return (
    <section className="cubicon-brief-section" ref={sectionRef}>
      <div className="cubicon-brief-container">
        
        {/* Header Section */}
        <motion.div 
          className="cubicon-brief-header"
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <CaseStudySectionChip number="01" title="THE BRIEF" />
          
          <h2 className="cubicon-brief-title font-display">
            Understand the system.<br/>
            Then design with it.
          </h2>
          
          <p className="cubicon-brief-body font-body">
            The challenge was to study how design systems create consistency, select one suited to the product, and apply it across a complete experience.
          </p>
        </motion.div>

        {/* Visual Section */}
        <motion.div 
          className="cubicon-brief-visual"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          {/* Stage 1: Understand */}
          <div className="cubicon-brief-stage">
            <div className="cubicon-brief-geo-group understand-geo">
              <div className="geo-module geo-blue geo-rotate-1" />
              <div className="geo-module geo-yellow geo-rotate-2" />
              <div className="geo-module geo-fade geo-rotate-3" />
              <div className="geo-module geo-green geo-rotate-4" />
              <div className="geo-module geo-red geo-rotate-5" />
            </div>
            <span className="cubicon-brief-stage-label font-body">UNDERSTAND</span>
          </div>

          <div className="cubicon-brief-connector" />

          {/* Stage 2: Select */}
          <div className="cubicon-brief-stage">
            <div className="cubicon-brief-geo-group select-geo">
              {/* Option 1: Stacked bars */}
              <div className="select-candidate candidate-alt">
                <div className="candidate-layout struct-h">
                  <div className="geo-module geo-fade" />
                  <div className="geo-module geo-fade" />
                  <div className="geo-module geo-fade" />
                </div>
              </div>

              {/* Option 2: The Coherent Grid (Selected) */}
              <div className="select-candidate candidate-active">
                <div className="candidate-layout struct-grid">
                  <div className="geo-module geo-blue" />
                  <div className="geo-module geo-blue" />
                  <div className="geo-module geo-blue" />
                  <div className="geo-module geo-blue" />
                </div>
              </div>

              {/* Option 3: Vertical split */}
              <div className="select-candidate candidate-alt">
                <div className="candidate-layout struct-v">
                  <div className="geo-module geo-fade" />
                  <div className="geo-module geo-fade" />
                  <div className="geo-module geo-fade" />
                </div>
              </div>
            </div>
            <span className="cubicon-brief-stage-label font-body">SELECT</span>
          </div>

          <div className="cubicon-brief-connector" />

          {/* Stage 3: Apply */}
          <div className="cubicon-brief-stage">
            <div className="cubicon-brief-geo-group apply-geo">
              <div className="geo-module geo-blue" />
              <div className="geo-module geo-blue" />
              <div className="geo-module geo-blue" />
              <div className="geo-module geo-blue" />
            </div>
            <span className="cubicon-brief-stage-label font-body">APPLY</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
