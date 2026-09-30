import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'motion/react';
import { Check, Sparkles } from 'lucide-react';
import CaseStudySectionChip from './CaseStudySectionChip';
import './PlexProductEvolution.css';

const milestones = [
  {
    id: 1,
    status: "IN DEVELOPMENT",
    title: "Version One",
    items: [
      "Natural language capture",
      "Basic automatic scheduling",
      "Local-first architecture"
    ],
    type: "list",
    icon: Check
  },
  {
    id: 2,
    status: "NEXT PHASE",
    title: "Next Milestone",
    items: [
      "Improved AI reasoning",
      "Better schedule adaptation",
      "More personalized planning"
    ],
    type: "list",
    icon: Sparkles
  },
  {
    id: 3,
    status: "CONTINUOUS EVOLUTION",
    title: "Beyond Mobile",
    description: "The long-term direction is to bring Plex to desktop, evolving it from an intelligent planner into a more proactive system that can understand context and take action across your workflow.",
    type: "paragraph"
  }
];

export default function PlexProductEvolution() {
  const railRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // The three milestones evenly divide the container visually.
    // 0.0 to 0.35 = Version One
    // 0.35 to 0.70 = Next Milestone
    // 0.70 to 1.0 = Beyond Mobile
    
    let newIndex = 0;
    if (latest >= 0.70) {
      newIndex = 2;
    } else if (latest >= 0.35) {
      newIndex = 1;
    } else {
      newIndex = 0;
    }
    
    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  });

  return (
    <section className="plex-product-evolution" id="roadmap">
      {/* Introduction */}
      <div className="evolution-intro">
        <CaseStudySectionChip title="ROADMAP" number="07" />
        <h2 className="font-display">Product Evolution</h2>
        
        <h3 className="evolution-statement font-display">
          <span className="statement-quiet">Make it exist first.</span><br />
          <span className="statement-loud">Make it good later.</span>
        </h3>
        
        <p className="evolution-description">
          Version One intentionally focuses only on solving the core problem. The roadmap reflects a gradual expansion of intelligence.
        </p>
      </div>

      {/* Roadmap Timeline */}
      <div className="evolution-roadmap-container">
        <div className="evolution-roadmap" ref={railRef}>
          {/* Background subtle line */}
          <div className="roadmap-timeline-base"></div>
          
          {/* Active progress line */}
          <motion.div 
            className="roadmap-timeline-progress"
            style={{ height: lineHeight }}
          ></motion.div>

          {milestones.map((milestone, index) => {
            const isActive = index === activeIndex;
            const isPast = index < activeIndex;
            
            return (
              <div 
                key={milestone.id} 
                className={`roadmap-stage ${isActive ? 'stage-active' : (isPast ? 'stage-past' : 'stage-future')}`}
              >
                <div className="stage-node"></div>
                <div className="stage-content">
                  <div className="stage-label">{milestone.status}</div>
                  <h4 className="stage-title font-display">{milestone.title}</h4>
                  
                  {milestone.type === 'list' ? (
                    <ul className="stage-capabilities">
                      {milestone.items.map((item, i) => {
                        const IconComponent = milestone.icon;
                        return (
                          <li key={i}>
                            <IconComponent size={18} className="capability-icon" aria-hidden="true" />
                            <span>{item}</span>
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <p className="stage-description">{milestone.description}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
