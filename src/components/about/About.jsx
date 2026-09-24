import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useMotionValueEvent, animate, useReducedMotion } from 'motion/react';
import './About.css';

const PROCESS_DATA = [
  {
    id: 'research', label: 'RESEARCH',
    heading: "Watch first. Assume later.",
    text: "Observation, synthesis, questions.",
    image: '/images/about/research.jpg', objectPosition: 'center 30%'
  },
  {
    id: 'make', label: 'MAKE',
    heading: "Turn messy findings into something tangible.",
    text: "Exploration, interaction, visual systems.",
    image: '/images/about/make.jpg', objectPosition: 'center 40%'
  },
  {
    id: 'test', label: 'TEST',
    heading: "Put the idea in front of people before it gets precious.",
    text: "Testing, observation, feedback.",
    image: '/images/about/test.jpg', objectPosition: 'center center'
  },
  {
    id: 'refine', label: 'REFINE',
    heading: "Keep what works. Break what doesn't. Repeat.",
    text: "Feedback, iteration, refinement.",
    image: '/images/about/refine.jpg', objectPosition: 'center 30%'
  }
];

// Target scroll progress values for each stage
const TARGET_PROGRESS = [0.1, 0.4, 0.65, 0.9];

export default function About() {
  const [activeProcess, setActiveProcess] = useState(0);
  const sectionRef = useRef(null);
  const isManualOverride = useRef(false);
  const rawProgressAtOverride = useRef(0);
  const shouldReduceMotion = useReducedMotion();

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 1. Get raw scroll progress mapped to when the section enters the bottom 30% and leaves the top 30%
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: isMobile ? ["start 75%", "end 25%"] : ["start start", "end end"]
  });

  // 2. The active progress value that drives the visuals. It tracks raw scroll unless overridden.
  const activeProgress = useMotionValue(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (isMobile) return; // Do not react to scroll on mobile/tablet

    if (isManualOverride.current) {
      // Release manual override if the user scrolls significantly away from where they clicked
      if (Math.abs(latest - rawProgressAtOverride.current) > 0.04) {
        isManualOverride.current = false;
        // Catch back up to scroll smoothly
        animate(activeProgress, latest, { duration: 0.25, ease: "easeOut" });
      }
    } else {
      activeProgress.set(latest);
    }
  });

  // 3. Update the discrete UI state (text, tabs) based on active progress
  useMotionValueEvent(activeProgress, "change", (latest) => {
    if (!isManualOverride.current) {
      let newIdx = 0;
      if (latest < 0.25) newIdx = 0;
      else if (latest < 0.5) newIdx = 1;
      else if (latest < 0.75) newIdx = 2;
      else newIdx = 3;
      
      if (newIdx !== activeProcess) {
        setActiveProcess(newIdx);
      }
    }
  });

  // 4. Handle manual interaction
  const handleManualSelect = (idx) => {
    if (shouldReduceMotion) {
      setActiveProcess(idx);
      return;
    }
    isManualOverride.current = true;
    rawProgressAtOverride.current = scrollYProgress.get();
    setActiveProcess(idx);
    animate(activeProgress, TARGET_PROGRESS[idx], { duration: 0.45, ease: "easeOut" });
  };

  // 5. Scroll-driven image transitions
  const opacities = [
    useTransform(activeProgress, [0, 0.25, 0.35], [1, 1, 0]),
    useTransform(activeProgress, [0.15, 0.35, 0.5, 0.6], [0, 1, 1, 0]),
    useTransform(activeProgress, [0.4, 0.6, 0.75, 0.85], [0, 1, 1, 0]),
    useTransform(activeProgress, [0.65, 0.85, 1], [0, 1, 1])
  ];

  const scales = [
    useTransform(activeProgress, [0, 0.35], [1, 1.03]),
    useTransform(activeProgress, [0.15, 0.6], [0.97, 1.03]),
    useTransform(activeProgress, [0.4, 0.85], [0.97, 1.03]),
    useTransform(activeProgress, [0.65, 1], [0.97, 1])
  ];

  // Preload images
  useEffect(() => {
    PROCESS_DATA.forEach(stage => {
      const img = new Image();
      img.src = stage.image;
    });
  }, []);

  return (
    <section id="about" className="about-section" ref={sectionRef}>
      <div className="about-grid" />
      
      <div className="about-sticky-viewport">
        <div className="about-container">
          
          {/* LEFT COLUMN: COPY */}
          <div className="about-intro">
          <motion.h2 
            className="about-title font-display"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            ABOUT
          </motion.h2>
          <motion.p 
            className="about-statement font-display"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          >
            "I like figuring out why something feels wrong before deciding how to fix it."
          </motion.p>
          <motion.p 
            className="about-paragraph font-body"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            The process starts before the pixels. Research reveals the friction, making gives it form, testing exposes what was missed, and refinement closes the gap.
          </motion.p>

          <div className="about-process-content">
            <div className="about-process-content-wrapper">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeProcess}
                  className="process-content-item"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                >
                  <h3 className="process-heading font-display">{PROCESS_DATA[activeProcess].heading}</h3>
                  <p className="process-text font-body">{PROCESS_DATA[activeProcess].text}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: VISUAL + CONTROLS */}
        <motion.div 
          className="about-visual-block"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
        >
          <div className="about-image-frame">
            {PROCESS_DATA.map((stage, i) => (
              <motion.img 
                key={stage.id}
                src={stage.image}
                alt={stage.label}
                className={`process-image ${i === activeProcess ? 'active' : ''}`}
                style={
                  shouldReduceMotion 
                    ? { objectPosition: stage.objectPosition } 
                    : { 
                        objectPosition: stage.objectPosition,
                        opacity: opacities[i],
                        scale: scales[i]
                      }
                }
              />
            ))}
          </div>
          
          <div className="about-process-indicator">
            <div className="process-progress font-body">
              <span>0</span>
              <div className="process-digit-container">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={activeProcess}
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    exit={{ y: "-100%", opacity: 0 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    style={{ display: "inline-block", position: "absolute" }}
                  >
                    {activeProcess + 1}
                  </motion.span>
                </AnimatePresence>
              </div>
              <span> / 04</span>
            </div>
            
            <div className="process-selector">
              {PROCESS_DATA.map((stage, i) => (
                <button
                  key={stage.id}
                  className={`process-button font-display ${i === activeProcess ? 'active' : ''}`}
                  onClick={() => handleManualSelect(i)}
                  onMouseEnter={() => window.matchMedia('(hover: hover) and (pointer: fine)').matches && handleManualSelect(i)}
                  onFocus={() => handleManualSelect(i)}
                  aria-label={stage.label}
                  aria-pressed={i === activeProcess}
                >
                  <span className="process-button-text">
                    {stage.label}
                    {stage.id === 'refine' && (
                      <span className="refine-arrow">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="4" y1="12" x2="20" y2="12" />
                          <polyline points="16 9 20 12 16 15" />
                        </svg>
                      </span>
                    )}
                    
                    {i === activeProcess && (
                      <motion.div
                        layoutId="processMarker"
                        className="process-marker"
                        initial={false}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                      />
                    )}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
      </div>
    </section>
  );
}
