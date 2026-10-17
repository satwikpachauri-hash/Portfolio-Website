import React, { useRef, useLayoutEffect } from 'react';
import { motion } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './CubiconUnderstanding.css';

const MODULES = [
  { id: 0, r: 0, c: 0, zElev: -140 },
  { id: 1, r: 0, c: 1, zElev: -60 },
  { id: 2, r: 1, c: 0, zElev: 80 },
  { id: 3, r: 0, c: 2, zElev: -20 },
  { id: 4, r: 1, c: 1, zElev: -100 },
  { id: 5, r: 2, c: 0, zElev: 140 },
  { id: 6, r: 1, c: 2, zElev: 20 },
  { id: 7, r: 2, c: 1, zElev: 100 },
  { id: 8, r: 2, c: 2, zElev: -80 },
];

function getPos(cube, stateIndex) {
  let spacingX, spacingY, zOffset;
  if (stateIndex === 1) { 
    spacingX = 140; spacingY = 80; zOffset = cube.zElev;
  } else if (stateIndex === 2) { 
    spacingX = 80; spacingY = 46; zOffset = 0;
  } else { 
    spacingX = 52; spacingY = 30; zOffset = 0;
  }
  return {
    x: (cube.c - cube.r) * spacingX,
    y: (cube.c + cube.r) * spacingY + zOffset
  };
}

// Fixed line coordinates for State 2 Grid
const LINES = [
  { x1: getPos({r:0,c:0}, 2).x, y1: getPos({r:0,c:0}, 2).y, x2: getPos({r:0,c:2}, 2).x, y2: getPos({r:0,c:2}, 2).y },
  { x1: getPos({r:1,c:0}, 2).x, y1: getPos({r:1,c:0}, 2).y, x2: getPos({r:1,c:2}, 2).x, y2: getPos({r:1,c:2}, 2).y },
  { x1: getPos({r:2,c:0}, 2).x, y1: getPos({r:2,c:0}, 2).y, x2: getPos({r:2,c:2}, 2).x, y2: getPos({r:2,c:2}, 2).y },
  { x1: getPos({r:0,c:0}, 2).x, y1: getPos({r:0,c:0}, 2).y, x2: getPos({r:2,c:0}, 2).x, y2: getPos({r:2,c:0}, 2).y },
  { x1: getPos({r:0,c:1}, 2).x, y1: getPos({r:0,c:1}, 2).y, x2: getPos({r:2,c:1}, 2).x, y2: getPos({r:2,c:1}, 2).y },
  { x1: getPos({r:0,c:2}, 2).x, y1: getPos({r:0,c:2}, 2).y, x2: getPos({r:2,c:2}, 2).x, y2: getPos({r:2,c:2}, 2).y },
];

const IsoGeometry = ({ gRefs, lineRefs, accentRefs }) => (
  <svg className="uds-canvas-svg" viewBox="-400 -300 800 600" preserveAspectRatio="xMidYMid meet">
    <title>Isometric dimensional blocks merging into a coherent system</title>
    
    {/* Grid Lines */}
    <g className="uds-grid-lines">
      {LINES.map((l, i) => (
        <line 
          key={i} 
          x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} 
          className="uds-grid-line" 
          ref={el => lineRefs.current[i] = el}
          opacity="0"
        />
      ))}
    </g>

    {/* 9 Modules, drawn strictly back-to-front by array order */}
    {MODULES.map((mod, i) => (
      <g key={mod.id} ref={el => gRefs.current[i] = el}>
        <polygon points="-52,0 0,30 0,70 -52,40" className="face-left" />
        <polygon points="0,30 52,0 52,40 0,70" className="face-right" />
        <polygon points="0,-30 52,0 0,30 -52,0" className="face-top" />
        
        {/* Accent Overlay (Opacity animated by GSAP) */}
        <polygon 
          points="0,-30 52,0 0,30 -52,0" 
          className="accent-top" 
          ref={el => accentRefs.current[i] = el}
          opacity="0"
        />
      </g>
    ))}
  </svg>
);

export default function CubiconUnderstanding() {
  const sectionRef = useRef(null);
  const desktopWrapRef = useRef(null);
  
  // Desktop Refs
  const d_gRefs = useRef([]);
  const d_lineRefs = useRef([]);
  const d_accentRefs = useRef([]);
  const d_textRefs = useRef([]);

  // Mobile Refs
  const m_gRefs = useRef([]);
  const m_lineRefs = useRef([]);
  const m_accentRefs = useRef([]);
  const m_step1 = useRef(null);
  const m_step2 = useRef(null);
  const m_step3 = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      let mm = gsap.matchMedia();
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // --- DESKTOP LOGIC ---
      mm.add("(min-width: 1024px)", () => {
        if (prefersReduced) {
          gsap.set(d_gRefs.current, { x: i => getPos(MODULES[i], 3).x, y: i => getPos(MODULES[i], 3).y });
          gsap.set(d_accentRefs.current, { opacity: 1 });
          gsap.set(d_textRefs.current[2], { autoAlpha: 1, y: 0 });
          return;
        }

        // Init State 1
        gsap.set(d_gRefs.current, { x: i => getPos(MODULES[i], 1).x, y: i => getPos(MODULES[i], 1).y, force3D: true });
        gsap.set(d_textRefs.current[0], { autoAlpha: 1, y: 0 });
        gsap.set([d_textRefs.current[1], d_textRefs.current[2]], { autoAlpha: 0, y: 20 });
        gsap.set(d_lineRefs.current, { opacity: 0 });
        gsap.set(d_accentRefs.current, { opacity: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: desktopWrapRef.current,
            start: "top top",
            end: "+=180%",
            pin: true,
            scrub: 1,
          }
        });

        // 1. Elements -> Rules
        tl.to(d_textRefs.current[0], { autoAlpha: 0, y: -20, duration: 1, ease: "power1.inOut" }, 0)
          .to(d_textRefs.current[1], { autoAlpha: 1, y: 0, duration: 1, ease: "power1.inOut" }, 1)
          .to(d_gRefs.current, {
            x: i => getPos(MODULES[i], 2).x,
            y: i => getPos(MODULES[i], 2).y,
            duration: 2,
            ease: "power2.inOut"
          }, 0)
          .to(d_lineRefs.current, { opacity: 1, duration: 1, ease: "power1.inOut" }, 1);

        // 2. Rules -> System
        tl.to(d_textRefs.current[1], { autoAlpha: 0, y: -20, duration: 1, ease: "power1.inOut" }, 3)
          .to(d_textRefs.current[2], { autoAlpha: 1, y: 0, duration: 1, ease: "power1.inOut" }, 4)
          .to(d_gRefs.current, {
            x: i => getPos(MODULES[i], 3).x,
            y: i => getPos(MODULES[i], 3).y,
            duration: 2,
            ease: "power2.inOut"
          }, 3)
          .to(d_lineRefs.current, { opacity: 0, duration: 0.5, ease: "power1.inOut" }, 3)
          .to(d_accentRefs.current, { opacity: 1, duration: 1, ease: "power1.inOut" }, 4);
      });

      // --- MOBILE / TABLET LOGIC (Sticky Storyboard) ---
      mm.add("(max-width: 1023px)", () => {
        // Init State 1
        gsap.set(m_gRefs.current, { x: i => getPos(MODULES[i], 1).x, y: i => getPos(MODULES[i], 1).y, force3D: true });
        gsap.set(m_lineRefs.current, { opacity: 0 });
        gsap.set(m_accentRefs.current, { opacity: 0 });

        if (prefersReduced) {
          gsap.set(m_gRefs.current, { x: i => getPos(MODULES[i], 3).x, y: i => getPos(MODULES[i], 3).y });
          gsap.set(m_accentRefs.current, { opacity: 1 });
          return;
        }

        // Helper to animate mobile to a specific state
        const animateToState = (stateIdx) => {
          gsap.to(m_gRefs.current, {
            x: i => getPos(MODULES[i], stateIdx).x,
            y: i => getPos(MODULES[i], stateIdx).y,
            duration: 0.8,
            ease: "power2.out",
            overwrite: "auto"
          });
          
          if (stateIdx === 1) {
            gsap.to(m_lineRefs.current, { opacity: 0, duration: 0.4, overwrite: "auto" });
            gsap.to(m_accentRefs.current, { opacity: 0, duration: 0.4, overwrite: "auto" });
          } else if (stateIdx === 2) {
            gsap.to(m_lineRefs.current, { opacity: 1, duration: 0.4, overwrite: "auto" });
            gsap.to(m_accentRefs.current, { opacity: 0, duration: 0.4, overwrite: "auto" });
          } else if (stateIdx === 3) {
            gsap.to(m_lineRefs.current, { opacity: 0, duration: 0.4, overwrite: "auto" });
            gsap.to(m_accentRefs.current, { opacity: 1, duration: 0.6, overwrite: "auto" });
          }
        };

        // ScrollTriggers for each text step
        ScrollTrigger.create({
          trigger: m_step1.current,
          start: "top 60%",
          onEnter: () => animateToState(1),
          onEnterBack: () => animateToState(1)
        });

        ScrollTrigger.create({
          trigger: m_step2.current,
          start: "top 60%",
          onEnter: () => animateToState(2),
          onEnterBack: () => animateToState(2)
        });

        ScrollTrigger.create({
          trigger: m_step3.current,
          start: "top 60%",
          onEnter: () => animateToState(3),
          onEnterBack: () => animateToState(3)
        });

      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="cubicon-uds-section" ref={sectionRef}>
      
      {/* DESKTOP / LAPTOP Pinned Scrub */}
      <div className="uds-desktop-wrapper" ref={desktopWrapRef}>
        <div className="uds-text-column">
          <div className="uds-story-block" ref={el => d_textRefs.current[0] = el}>
            <span className="uds-story-label">01 INDIVIDUAL PIECES</span>
            <h3 className="uds-story-title font-display">Every design starts<br />with individual pieces.</h3>
            <p className="uds-story-body font-body">
              Buttons, colours, text and layouts are useful on their own, but they need to work together.
            </p>
          </div>
          <div className="uds-story-block" ref={el => d_textRefs.current[1] = el}>
            <span className="uds-story-label">02 SHARED RULES</span>
            <h3 className="uds-story-title font-display">Rules bring those<br />pieces together.</h3>
            <p className="uds-story-body font-body">
              Shared spacing, colours and patterns make different screens feel connected.
            </p>
          </div>
          <div className="uds-story-block" ref={el => d_textRefs.current[2] = el}>
            <span className="uds-story-label">03 ONE SYSTEM</span>
            <h3 className="uds-story-title font-display">Everything starts<br />working as one.</h3>
            <p className="uds-story-body font-body">
              The result is an experience that feels consistent, even as it grows.
            </p>
          </div>
        </div>

        <div className="uds-visual-column">
          <IsoGeometry gRefs={d_gRefs} lineRefs={d_lineRefs} accentRefs={d_accentRefs} />
        </div>
      </div>

      {/* MOBILE / TABLET Sticky Storyboard */}
      <div className="uds-mobile-wrapper">
        <div className="uds-sticky-container">
          <IsoGeometry gRefs={m_gRefs} lineRefs={m_lineRefs} accentRefs={m_accentRefs} />
        </div>
        
        <div className="uds-scroll-text-blocks">
          <div className="uds-mobile-text-step" ref={m_step1}>
            <div className="uds-mobile-text-card">
              <span className="uds-story-label">01 INDIVIDUAL PIECES</span>
              <h3 className="uds-story-title font-display" style={{fontSize: '1.75rem', marginBottom: '8px'}}>Every design starts<br />with individual pieces.</h3>
              <p className="uds-story-body font-body" style={{fontSize: '1.05rem'}}>Buttons, colours, text and layouts are useful on their own, but they need to work together.</p>
            </div>
          </div>
          <div className="uds-mobile-text-step" ref={m_step2}>
            <div className="uds-mobile-text-card">
              <span className="uds-story-label">02 SHARED RULES</span>
              <h3 className="uds-story-title font-display" style={{fontSize: '1.75rem', marginBottom: '8px'}}>Rules bring those<br />pieces together.</h3>
              <p className="uds-story-body font-body" style={{fontSize: '1.05rem'}}>Shared spacing, colours and patterns make different screens feel connected.</p>
            </div>
          </div>
          <div className="uds-mobile-text-step" ref={m_step3}>
            <div className="uds-mobile-text-card">
              <span className="uds-story-label">03 ONE SYSTEM</span>
              <h3 className="uds-story-title font-display" style={{fontSize: '1.75rem', marginBottom: '8px'}}>Everything starts<br />working as one.</h3>
              <p className="uds-story-body font-body" style={{fontSize: '1.05rem'}}>The result is an experience that feels consistent, even as it grows.</p>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}







