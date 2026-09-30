import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence, useReducedMotion } from 'motion/react';
import { Check } from 'lucide-react';
import './PlexProblemSection.css';
import CaseStudySectionChip from './CaseStudySectionChip';

const ProblemIntro = ({ isVisible }) => (
  <AnimatePresence>
    {isVisible && (
      <motion.div 
        className="plex-problem-intro"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <CaseStudySectionChip number="01" title="THE PROBLEM" />
        <h2 className="plex-intro-main font-display">You can stay busy and still miss what matters most.</h2>
        <p className="plex-intro-sub font-body">When priorities compete, easier tasks can feel more rewarding than important ones.</p>
      </motion.div>
    )}
  </AnimatePresence>
);

const ProblemResolution = ({ isVisible }) => (
  <AnimatePresence>
    {isVisible && (
      <motion.div 
        className="plex-problem-resolution"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="plex-intro-main font-display">Staying busy isn't the same as making progress.</h2>
      </motion.div>
    )}
  </AnimatePresence>
);

const CinematicTaskScenario = ({ step, isVisible }) => {
  const time = step < 3 ? "09:00" : step < 5 ? "12:30" : step < 6 ? "16:45" : "19:10";
  const portfolioStatus = step < 3 ? "DUE TODAY" : step < 5 ? "3 HOURS LEFT" : step < 6 ? "1 HOUR LEFT" : "STILL INCOMPLETE";
  const portfolioTitle = step < 6 ? "Portfolio Deadline" : "DEADLINE MISSED";
  const isMissed = step >= 6;
  const hrComplete = step >= 3;
  const clientComplete = step >= 5;
  const completedCount = (hrComplete ? 1 : 0) + (clientComplete ? 1 : 0);
  
  // 'null' when there is no focus, otherwise the target name
  const focusTarget = step === 1 ? 'portfolio' : (step === 2 || step === 3) ? 'hr' : (step === 4 || step === 5) ? 'client' : step >= 6 ? 'portfolio' : null;

  const containerRef = useRef(null);
  const portfolioRef = useRef(null);
  const hrRef = useRef(null);
  const clientRef = useRef(null);

  const [focusRect, setFocusRect] = useState({ top: 0, left: 0, width: 0, height: 0, opacity: 0 });

  useEffect(() => {
    const updateFocus = () => {
      if (!containerRef.current) return;
      
      const targets = {
        portfolio: portfolioRef.current,
        hr: hrRef.current,
        client: clientRef.current
      };

      const targetEl = focusTarget ? targets[focusTarget] : null;
      
      // If no target, or if portfolio is missed (we don't show focus when missed), hide the ring
      if (!targetEl || (focusTarget === 'portfolio' && isMissed)) {
        setFocusRect(prev => ({ ...prev, opacity: 0 }));
        return;
      }

      
        let top = 0;
        let left = 0;
        let currentEl = targetEl;
        
        while (currentEl && currentEl !== containerRef.current) {
          top += currentEl.offsetTop;
          left += currentEl.offsetLeft;
          currentEl = currentEl.offsetParent;
        }
        
        const width = targetEl.offsetWidth;
        const height = targetEl.offsetHeight;
        
        const gap = 4;
        const ringBorder = 2;
        const offset = gap + ringBorder;

        setFocusRect({
          top: top - offset,
          left: left - offset,
          width: width + (offset * 2),
          height: height + (offset * 2),
          opacity: 1
        });

    };

          updateFocus();
      window.addEventListener('resize', updateFocus);
      
      let ro;
      if (containerRef.current) {
        ro = new ResizeObserver(() => updateFocus());
        ro.observe(containerRef.current);
      }
      
      return () => {
        window.removeEventListener('resize', updateFocus);
        if (ro) ro.disconnect();
      };
  }, [focusTarget, isMissed, isVisible]);

  return (
    <motion.div 
      className="plex-task-interface"
      ref={containerRef}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.95 }} style={{ pointerEvents: isVisible ? "auto" : "none" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* GLOBAL PERSISTENT FOCUS RING */}
      <motion.div 
        className="plex-focus-ring-global"
        animate={{ 
          top: focusRect.top, 
          left: focusRect.left, 
          width: focusRect.width, 
          height: focusRect.height, 
          opacity: focusRect.opacity 
        }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      />

      <div className="plex-task-header">
        <div className="plex-task-time">
          <span className="time-val font-display">{time}</span>
          <span className="time-label font-body">TODAY</span>
        </div>
        <div className="plex-task-progress font-body">
          {completedCount} {completedCount === 1 ? "TASK" : "TASKS"} COMPLETE
        </div>
      </div>
      
      <div className="plex-task-body">
        <div className="plex-task-col main-task">
          <div className={`plex-card important-task ${isMissed ? 'missed' : ''}`} ref={portfolioRef}>
            <h3 className="font-display">{portfolioTitle}</h3>
            <div className={`task-status font-body ${isMissed ? 'error' : 'warning'}`}>{portfolioStatus}</div>
          </div>
        </div>
        
        <div className="plex-task-col sub-tasks">
          <div className={`plex-card easy-task ${hrComplete ? 'completed' : ''}`} ref={hrRef}>
            <div className="easy-info">
              <h3 className="font-display">Mail to HR</h3>
              <span className="font-body">10 MIN</span>
            </div>
            <div className="easy-check">
              <div className={`check-icon ${hrComplete ? 'visible' : ''}`}><Check size={18} /></div>
            </div>
          </div>
          
          <div className={`plex-card easy-task ${clientComplete ? 'completed' : ''}`} ref={clientRef}>
            <div className="easy-info">
              <h3 className="font-display">Client Call</h3>
              <span className="font-body">15 MIN</span>
            </div>
            <div className="easy-check">
              <div className={`check-icon ${clientComplete ? 'visible' : ''}`}><Check size={18} /></div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const RadialVisual = ({ percentage }) => {
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  return (
    <div className="plex-radial-container">
      <svg width="140" height="140" viewBox="0 0 140 140" style={{ transform: 'rotate(-90deg)' }}>
        <circle cx="70" cy="70" r={radius} className="plex-radial-bg" />
        <motion.circle 
          cx="70" cy="70" r={radius} 
          className="plex-radial-fill"
          initial={{ strokeDashoffset: circumference }}
          whileInView={{ strokeDashoffset }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
          strokeDasharray={circumference}
        />
      </svg>
      <div className="plex-radial-text font-display">{percentage}%</div>
    </div>
  );
}

const RulerVisual = () => {
  const markers = [0, 1, 2, 3, 4, 4.9];
  return (
    <div className="plex-ruler-container">
      <div className="plex-ruler-track">
        <motion.div 
          className="plex-ruler-fill"
          initial={{ width: 0 }}
          whileInView={{ width: '100%' }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
        />
      </div>
      <div className="plex-ruler-markers font-body">
        {markers.map(m => (
          <span key={m} style={{ left: `${(m / 4.9) * 100}%` }}>{m}h</span>
        ))}
      </div>
    </div>
  )
}

const ComparisonVisual = () => {
  return (
    <div className="plex-comp-container font-body">
      <div className="plex-comp-row">
        <span className="plex-comp-label">Planned</span>
        <div className="plex-comp-track">
           <motion.div 
             className="plex-comp-fill" 
             initial={{ width: 0 }} 
             whileInView={{ width: '61%' }} 
             viewport={{ once: true }}
             transition={{ duration: 1, ease: "easeOut", delay: 0.2 }} 
           />
        </div>
        <span className="plex-comp-val">33.9d</span>
      </div>
      <div className="plex-comp-row">
        <span className="plex-comp-label">Actual</span>
        <div className="plex-comp-track">
           <motion.div 
             className="plex-comp-fill actual" 
             initial={{ width: 0 }} 
             whileInView={{ width: '100%' }} 
             viewport={{ once: true }}
             transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }} 
           />
        </div>
        <span className="plex-comp-val">55.5d</span>
      </div>
      <motion.div 
        className="plex-comp-annotation font-display" 
        initial={{ opacity: 0, scale: 0.95 }} 
        whileInView={{ opacity: 1, scale: 1 }} 
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 1.8 }}
      >
        +21.6 DAYS
      </motion.div>
    </div>
  )
}

const InsightCard = ({ visual, number, text, citation, delay = 0 }) => (
  <motion.div 
    className="plex-insight-card"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.8, ease: "easeOut", delay }}
  >
    <div className="plex-insight-visual">{visual}</div>
    <div className="plex-insight-content">
      <h3 className="font-display">{number}</h3>
      <p className="font-body">{text}</p>
      <span className="plex-citation font-body">{citation}</span>
    </div>
  </motion.div>
);

const ResearchInsights = () => (
  <section className="plex-research-section">
    <div className="plex-research-header">
      <CaseStudySectionChip title="RESEARCH INSIGHTS" />
      <h2 className="font-display">The data behind the problem.</h2>
    </div>
    <div className="plex-research-grid">
      <InsightCard 
        delay={0.1} visual={<RadialVisual percentage={58} />}
        number="58%"
        text="58% of the workday can go to managing work instead of doing it."
        citation={"Asana \u2014 Anatomy of Work"}
      />
      <InsightCard 
        delay={0.3} visual={<RulerVisual />}
        number="4.9 HOURS"
        text="Better processes could recover 4.9 hours of work time each week."
        citation={"Asana \u2014 Anatomy of Work"}
      />
      <InsightCard 
        delay={0.5} visual={<ComparisonVisual />}
        number={"33.9 \u2192 55.5 DAYS"}
        text="Planned completion took 33.9 days. Actual completion took 55.5."
        citation="Buehler, Griffin & Ross, 1994"
      />
      </div>
    </section>
);

const ProblemConclusion = () => (
  <section className="plex-problem-conclusion">
    <motion.h2 
      className="font-display"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      >
        Planning can become part of the workload.
    </motion.h2>
  </section>
);

export default function PlexProblemSection() {
  const containerRef = useRef(null); const [step, setStep] = useState(0); const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    let newStep = 0; if (latest > 0.95) newStep = 8; else if (latest > 0.85) newStep = 7; else if (latest > 0.72) newStep = 6; else if (latest > 0.58) newStep = 5; else if (latest > 0.44) newStep = 4; else if (latest > 0.30) newStep = 3; else if (latest > 0.16) newStep = 2; else if (latest > 0.05) newStep = 1;

    if (newStep !== step) {
      setStep(newStep);
    }
  });

  return (
    <div className="plex-problem-wrapper">
      <div className="plex-cinematic-track" ref={containerRef}>
        <div className="plex-cinematic-sticky">
          <div className="plex-cinematic-layout">
            <div className="plex-cinematic-intro-region">
              <ProblemIntro isVisible={shouldReduceMotion || step === 0} />
            </div>
            <div className="plex-cinematic-scenario-region">
              <CinematicTaskScenario step={shouldReduceMotion ? 7 : step} isVisible={shouldReduceMotion || (step > 0 && step < 7)} />
            </div>
            <div className="plex-cinematic-resolution-region">
              <ProblemResolution isVisible={shouldReduceMotion || step === 7} />
            </div>
          </div>
        </div>
      </div>
      <ResearchInsights />
      <ProblemConclusion />
    </div>
  );
}





















