import React, { useState, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CaseStudySectionChip from './CaseStudySectionChip';
import './PlexCollaboration.css';

gsap.registerPlugin(ScrollTrigger);

const productDesignGroups = [
  {
    label: "Discover",
    items: ["Problem Definition", "UX Research"]
  },
  {
    label: "Define",
    items: ["Product Strategy", "Feature Planning", "Information Architecture", "User Flows"]
  },
  {
    label: "Design",
    items: ["Wireframing", "Interaction Design", "Design System", "High-Fidelity UI"]
  },
  {
    label: "Build",
    items: ["Frontend"]
  }
];

const engineeringGroups = [
  {
    label: "Intelligence",
    items: ["AI Architecture", "Plex AI Core", "Reasoning Engine"]
  },
  {
    label: "Context",
    items: ["Memory System"]
  },
  {
    label: "Local-First",
    items: ["Local AI", "Safety Layer"]
  },
  {
    label: "System",
    items: ["Backend"]
  }
];

const COPY = {
  design: (
    <>
      Satwik led the product design of Plex, shaping the problem definition, research, product strategy, information architecture, interaction design, interface system, and frontend experience.
    </>
  ),
  engineering: (
    <>
      Jaspreet leads the AI/ML engineering of Plex, translating the product logic into the architecture, reasoning, memory, local intelligence, safety systems, and backend that power the product.
    </>
  ),
  together: (
    <>
      <span className="copy-primary">The intelligence only matters when people can understand and control it.</span>
      <span className="copy-secondary">Plex is being built collaboratively by Satwik across product design and frontend, and Jaspreet across AI/ML engineering and backend, combining product thinking with intelligent systems in one cohesive experience.</span>
    </>
  )
};

export default function PlexCollaboration() {
  const [activeMode, setActiveMode] = useState('together');
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    let mm = gsap.matchMedia();
    
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // 49. OPTIONAL ENTRANCE ANIMATION
      gsap.fromTo(containerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, 
          y: 0, 
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            once: true
          }
        }
      );
    });

    return () => mm.revert();
  }, []);

  return (
    <section className="plex-collaboration" id="collaboration" ref={containerRef}>
      
      {/* 5. SECTION HEADER */}
      <div className="collab-header-container">
        <CaseStudySectionChip number="10" title="Collaboration" />
        <h2>Building Plex</h2>
        <p>Plex is a collaborative project built by Satwik and Jaspreet, bringing product design and AI/ML engineering together to create one cohesive product.</p>
      </div>

      {/* 9. INTERACTION CONTROLS */}
      <div className="collab-controls" role="tablist">
        <button 
          className="collab-control-btn" 
          role="tab" 
          aria-selected={activeMode === 'design'}
          onClick={() => setActiveMode('design')}
        >
          Product Design
        </button>
        <button 
          className="collab-control-btn" 
          role="tab" 
          aria-selected={activeMode === 'together'}
          onClick={() => setActiveMode('together')}
        >
          Together
        </button>
        <button 
          className="collab-control-btn" 
          role="tab" 
          aria-selected={activeMode === 'engineering'}
          onClick={() => setActiveMode('engineering')}
        >
          AI/ML Engineering
        </button>
      </div>

      <div className="collab-stage-container">
        <div className={`collab-visualization mode-${activeMode}`}>

          {/* PRODUCT DESIGN */}
          <div className="collab-side side-design">
            <h3 className="collab-side-title">
              Product Design
              <span className="collab-author">Satwik — Product Designer</span>
            </h3>
            <div className="collab-clusters">
              {productDesignGroups.map(group => (
                <div key={group.label} className="collab-cluster">
                  <span className="cluster-label">{group.label}</span>
                  <div className="cluster-items">
                    {group.items.map(item => (
                      <span key={item} className="cluster-item">{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="collab-connector line-design"></div>

          {/* PLEX NODE */}
          <div className="collab-center">
            <div className="plex-node">
              PLEX
            </div>
          </div>

          <div className="collab-connector line-engineering"></div>

          {/* AI ENGINEERING */}
          <div className="collab-side side-engineering">
            <h3 className="collab-side-title">
              AI/ML Engineering
              <span className="collab-author">Jaspreet — AI/ML Engineer</span>
            </h3>
            <div className="collab-clusters">
              {engineeringGroups.map(group => (
                <div key={group.label} className="collab-cluster">
                  <span className="cluster-label">{group.label}</span>
                  <div className="cluster-items">
                    {group.items.map(item => (
                      <span key={item} className="cluster-item">{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
        </div>
        
        {/* CONTRIBUTION COPY */}
        <p className="contribution-copy">
          {COPY[activeMode]}
        </p>
      </div>
    </section>
  );
}
