import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Book, Code, PenTool, Folder, FileText, Briefcase, Library, CheckSquare, Microscope, Calendar, Mail, Target } from 'lucide-react';
import './PlexProjectContext.css';
import CaseStudySectionChip from './CaseStudySectionChip';

const tagsData = [
  { id: 't0', label: 'JLPT N5', icon: Book, rotate: -3 },
  { id: 't1', label: 'Frontend', icon: Code, rotate: 2 },
  { id: 't2', label: 'Design Projects', icon: PenTool, rotate: -1 },
  { id: 't3', label: 'Portfolio', icon: Folder, rotate: 3 },
  { id: 't4', label: 'Resume', icon: FileText, rotate: -2 },
  { id: 't5', label: 'Internships', icon: Briefcase, rotate: 1 },
  { id: 't6', label: 'Coursework', icon: Library, rotate: -1 },
  { id: 't7', label: 'Assignments', icon: CheckSquare, rotate: 2 },
  { id: 't8', label: 'Research', icon: Microscope, rotate: 1 },
  { id: 't9', label: 'Deadlines', icon: Calendar, rotate: -2 },
  { id: 't10', label: 'Emails', icon: Mail, rotate: 3 },
  { id: 't11', label: 'Personal Goals', icon: Target, rotate: -3 },
];

const ContextTag = ({ tag, index, scrollYProgress }) => {
  // STATE B (Arrival): 0.1 to 0.4
  const appearStart = 0.1 + index * 0.02;
  const appearEnd = appearStart + 0.05;
  
  // STATE D (Clearing): 0.6 to 0.7
  const disappearStart = 0.6 + index * 0.005; 
  const disappearEnd = disappearStart + 0.04; 

  const opacity = useTransform(
    scrollYProgress,
    [0, appearStart, appearEnd, disappearStart, disappearEnd, 1],
    [0, 0, 1, 1, 0, 0]
  );
  
  const scale = useTransform(
    scrollYProgress,
    [0, appearStart, appearEnd, disappearStart, disappearEnd, 1],
    [0.8, 0.8, 1, 1, 0.9, 0.9]
  );
  
  const y = useTransform(
    scrollYProgress,
    [0, appearStart, appearEnd, disappearStart, disappearEnd, 1],
    [20, 20, 0, 0, -20, -20]
  );

  const Icon = tag.icon;

  return (
    <div className={`plex-tag-wrapper tag-${index}`}>
      <motion.div 
        className="plex-context-tag"
        style={{ opacity, scale, y, rotate: tag.rotate }}
        whileHover={{ y: -2 }}
      >
        <Icon size={16} className="plex-tag-icon" />
        <span className="font-body">{tag.label}</span>
      </motion.div>
    </div>
  );
};

export default function PlexProjectContext() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // EXPLICIT STATES
  // 0.0 - 0.1: State A (Intro)
  // 0.1 - 0.4: State B (Chips Arrival)
  // 0.4 - 0.6: State C (Max Context)
  // 0.6 - 0.7: State D (Clearing)
  // 0.7 - 0.75: Dead Zone (Everything invisible)
  // 0.75 - 0.85: State E (Final Question appears)
  // (Hold removed, fades in until 1.0)

  // Intro Headline (State A, B, C, D)
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.6, 0.7], [1, 1, 0]);
  const headlineY = useTransform(scrollYProgress, [0.6, 0.7], [0, -40]);

  // Exclusivity Checks
  // Force visibility: hidden when completely out of phase to guarantee no overlap
  const introPhaseVisibility = useTransform(scrollYProgress, v => v >= 0.72 ? "hidden" : "visible");
  const introPhasePointer = useTransform(scrollYProgress, v => v >= 0.72 ? "none" : "auto");
  
  const finalPhaseVisibility = useTransform(scrollYProgress, v => v < 0.72 ? "hidden" : "visible");
  const finalPhasePointer = useTransform(scrollYProgress, v => v < 0.72 ? "none" : "auto");

  // Final Question (State E)
  const finalOpacity = useTransform(scrollYProgress, [0.75, 1.0], [0, 1]);
  const finalY = useTransform(scrollYProgress, [0.75, 1.0], [40, 0]);

  return (
    <section id="project-context" className="plex-project-context-wrapper" ref={containerRef}>
      <div className="plex-context-sticky">
        
        {/* Phase 1: Intro & Chips (States A, B, C, D) */}
        <motion.div 
          className="plex-phase-container"
          style={{ 
            visibility: introPhaseVisibility, 
            pointerEvents: introPhasePointer,
            position: 'absolute',
            inset: 0,
              width: '100%',
              height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {/* Initial Headline */}
          <motion.div 
            className="plex-context-intro"
            style={{ opacity: headlineOpacity, y: headlineY }}
          >
            <CaseStudySectionChip number="02" title="PROJECT CONTEXT" />
            <h2 className="plex-context-main font-display">Everything felt important.</h2>
          </motion.div>

          {/* Tags */}
          <div className="plex-tags-container">
            {tagsData.map((tag, i) => (
              <ContextTag key={tag.id} tag={tag} index={i} scrollYProgress={scrollYProgress} />
            ))}
          </div>
        </motion.div>

        {/* Phase 2: Final Question (State E) */}
        <motion.div 
          className="plex-context-conclusion"
          style={{ 
            visibility: finalPhaseVisibility,
            pointerEvents: finalPhasePointer,
            opacity: finalOpacity, 
            y: finalY 
          }}
        >
          <h2 className="plex-context-question font-display">What should I do next?</h2>
          <p className="plex-context-sub font-body">
            The workload wasn't the problem.<br className="mobile-break" /> Deciding what deserved my attention was.
          </p>
        </motion.div>

      </div>
    </section>
  );
}







