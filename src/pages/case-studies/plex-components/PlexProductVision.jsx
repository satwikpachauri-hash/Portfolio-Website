import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'motion/react';
import CaseStudySectionChip from './CaseStudySectionChip';
import './PlexProductVision.css';

const principles = [
  {
    id: "p01",
    number: "01",
    title: "Reduce\nCognitive Load",
    description: "Minimal interfaces that only show what matters right now.",
    image: "/case-studies/plex/assets/mockups/Homepage.webp",
    imageAlt: "Plex homepage interface"
  },
  {
    id: "p02",
    number: "02",
    title: "Automation\nWithout\nLosing Control",
    description: "AI handles complexity while the user remains in control.",
    image: "/case-studies/plex/assets/mockups/Automation Without Losing Control.webp",
    imageAlt: "Plex automation interface"
  },
  {
    id: "p03",
    number: "03",
    title: "Support\nInstead of\nPressure",
    description: "Guidance instead of guilt.",
    image: "/case-studies/plex/assets/mockups/Analytics Page 1.webp",
    imageAlt: "Plex analytics interface"
  },
  {
    id: "p04",
    number: "04",
    title: "Realistic\nPlanning",
    description: "Schedules adapt to real life.",
    image: "/case-studies/plex/assets/mockups/Schedule Page.webp",
    imageAlt: "Plex schedule interface"
  },
  {
    id: "p05",
    number: "05",
    title: "Local\nProcessing",
    description: "Your information stays on your device.",
    image: "/case-studies/plex/assets/mockups/Privacy Page.webp",
    imageAlt: "Plex privacy interface"
  },
  {
    id: "p06",
    number: "06",
    title: "Intelligent\nPlanning",
    description: "Plex turns your tasks, goals, and time into a plan that works around your day.",
    image: "/case-studies/plex/assets/mockups/Local Intelligence.webp",
    imageAlt: "Plex local intelligence interface"
  }
];

// ==========================================
// DESKTOP / LAPTOP (Two-Column Pinned)
// ==========================================
function DesktopVisionStage() {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    let index = 0;
    if (latest < 0.16) index = 0;
    else if (latest < 0.32) index = 1;
    else if (latest < 0.48) index = 2;
    else if (latest < 0.64) index = 3;
    else if (latest < 0.80) index = 4;
    else index = 5; // Extra reading time for Principle 06

    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  });

  return (
    <div className="vision-desktop-container" ref={containerRef}>
      <div className="vision-desktop-sticky">
        <div className="vision-desktop-stage">
          
          <div className="vision-header-group">
            <CaseStudySectionChip title="PRINCIPLES" number="05" />
            <h2 className="vision-main-title font-display">Product Vision</h2>
          </div>

          <div className="vision-presentation-area">
            
            <div className="vision-text-col">
              <div className="vision-text-stable-region">
                {principles.map((p, i) => (
                  <motion.div
                    key={p.id}
                    className="vision-text-block"
                    initial={false}
                    animate={{
                      opacity: i === activeIndex ? 1 : 0,
                      y: i === activeIndex ? 0 : (i < activeIndex ? -20 : 20),
                      pointerEvents: i === activeIndex ? "auto" : "none"
                    }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <span className="vision-principle-number font-display">{p.number}</span>
                    <h3 className="vision-principle-title font-display">{p.title}</h3>
                    <p className="vision-principle-desc font-body">{p.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="vision-phone-col">
              <div className="vision-phone-mockup">
                {principles.map((p, i) => (
                  <motion.img
                    key={p.id}
                    src={p.image}
                    alt={p.imageAlt}
                    className="vision-screen-image"
                    initial={false}
                    animate={{
                      opacity: i === activeIndex ? 1 : 0,
                      y: i === activeIndex ? 0 : (i < activeIndex ? -15 : 15),
                      scale: i === activeIndex ? 1 : 0.98
                    }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  />
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

// ==========================================
// TABLET (Centered Simplified)
// ==========================================
function TabletVisionStage() {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    let index = 0;
    if (latest < 0.16) index = 0;
    else if (latest < 0.32) index = 1;
    else if (latest < 0.48) index = 2;
    else if (latest < 0.64) index = 3;
    else if (latest < 0.80) index = 4;
    else index = 5;
    if (index !== activeIndex) setActiveIndex(index);
  });

  return (
    <div className="vision-tablet-container" ref={containerRef}>
      <div className="vision-tablet-sticky">
        <div className="vision-tablet-stage">
          
          <div className="vision-header-group tablet-header">
            <CaseStudySectionChip title="PRINCIPLES" number="05" />
            <h2 className="vision-main-title font-display">Product Vision</h2>
          </div>

          <div className="vision-phone-mockup tablet-phone">
            {principles.map((p, i) => (
              <motion.img
                key={p.id}
                src={p.image}
                alt={p.imageAlt}
                className="vision-screen-image"
                initial={false}
                animate={{ opacity: i === activeIndex ? 1 : 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
            ))}
          </div>

          <div className="vision-text-stable-region tablet-text">
            {principles.map((p, i) => (
              <motion.div
                key={p.id}
                className="vision-text-block tablet-block"
                initial={false}
                animate={{
                  opacity: i === activeIndex ? 1 : 0,
                  y: i === activeIndex ? 0 : (i < activeIndex ? -20 : 20),
                  pointerEvents: i === activeIndex ? "auto" : "none"
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <span className="vision-principle-number font-display">{p.number}</span>
                <h3 className="vision-principle-title font-display">{p.title}</h3>
                <p className="vision-principle-desc font-body">{p.description}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}

// ==========================================
// PHONE (Mobile-First Vertical Flow)
// ==========================================
function PhoneVisionStage() {
  return (
    <div className="vision-phone-container">
      <div className="vision-header-group phone-header">
        <CaseStudySectionChip title="PRINCIPLES" number="05" />
        <h2 className="vision-main-title font-display">Product Vision</h2>
      </div>

      <div className="vision-phone-sequence">
        {principles.map((p) => (
          <motion.div 
            className="vision-phone-stage-block"
            key={p.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="vision-phone-mockup mobile-phone">
              <img src={p.image} alt={p.imageAlt} className="vision-screen-image static-screen" />
            </div>
            
            <div className="vision-mobile-text-block">
              <span className="vision-principle-number font-display">{p.number}</span>
              <h3 className="vision-principle-title font-display" style={{ whiteSpace: "normal" }}>{p.title}</h3>
              <p className="vision-principle-desc font-body">{p.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// REDUCED MOTION (Fallback)
// ==========================================
function ReducedMotionVisionStage() {
  return (
    <div className="vision-reduced-motion-container">
      <div className="vision-header-group phone-header">
        <CaseStudySectionChip title="PRINCIPLES" number="05" />
        <h2 className="vision-main-title font-display">Product Vision</h2>
      </div>
      <div className="vision-phone-sequence">
        {principles.map((p) => (
          <div className="vision-phone-stage-block" key={`rm-${p.id}`}>
            <div className="vision-phone-mockup mobile-phone">
              <img src={p.image} alt={p.imageAlt} className="vision-screen-image static-screen" />
            </div>
            <div className="vision-mobile-text-block">
              <span className="vision-principle-number font-display">{p.number}</span>
              <h3 className="vision-principle-title font-display" style={{ whiteSpace: "normal" }}>{p.title}</h3>
              <p className="vision-principle-desc font-body">{p.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// MAIN EXPORT
// ==========================================
export default function PlexProductVision() {
  const [device, setDevice] = useState("desktop");

  useEffect(() => {
    const checkDevice = () => {
      if (window.innerWidth < 768) setDevice("phone");
      else if (window.innerWidth < 1024) setDevice("tablet");
      else setDevice("desktop");
    };
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  return (
    <section className="plex-product-vision" id="principles">
      <div className="vision-standard-render">
        {device === "desktop" && <DesktopVisionStage />}
        {device === "tablet" && <TabletVisionStage />}
        {device === "phone" && <PhoneVisionStage />}
      </div>
      
      <div className="vision-rm-render">
        <ReducedMotionVisionStage />
      </div>
    </section>
  );
}
