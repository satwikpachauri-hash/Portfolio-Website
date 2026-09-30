import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CaseStudySectionChip from './CaseStudySectionChip';
import './PlexArchitecture.css';

gsap.registerPlugin(ScrollTrigger);

export default function PlexArchitecture() {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    let mm = gsap.matchMedia();

    // 35. REDUCED MOTION
    // Do not run timeline if reduced motion is requested
    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set('.arch-layer', { opacity: 1, visibility: 'visible', position: 'relative' });
      return;
    });

    const buildTimeline = (config) => {
      // 31. INITIAL STATES - Explicitly reset everything
      gsap.set('.arch-layer', { opacity: 0, visibility: 'visible', pointerEvents: 'none' });
      gsap.set('.request-item', { opacity: 0, y: config.yDist });
      gsap.set('.understanding-indicator', { scale: 0.9, opacity: 0 });
      gsap.set('.pulse-dot', { scale: 1, opacity: 1 });
      gsap.set('.struct-module', { opacity: 0, scale: 0.95, y: 0 });
      gsap.set('.context-token, .decision-token', { opacity: 0, scale: 0.95, y: 0 });
      gsap.set('.arch-layer-caption', { opacity: 0, y: 15 });
      gsap.set('.schedule-rail', { scaleY: 0, transformOrigin: 'top center' });
      gsap.set('.sched-block', { opacity: 0, x: config.isPhone ? 0 : -15, y: config.isPhone ? 10 : 0 });
      gsap.set('.protect-item', { opacity: 0, y: 15 });
      gsap.set('.final-statement', { opacity: 0, y: 15 });
      gsap.set('.decision-token.highlight', { scale: 0.95 });

      const tl = gsap.timeline({
        paused: true,
        repeat: -1, // 30. Loop endlessly
      });

      /* Phase 1: Human Intent (0-3s approx) */
      tl.addLabel('intent');
      tl.to('.layer-request', { opacity: 1, duration: 0.4 });
      tl.to('.request-item', { opacity: 1, y: 0, duration: 0.8, stagger: 0.25, ease: 'power2.out' });
      tl.to({}, { duration: 1.5 }); 

      /* Phase 2: Understanding (3-5s) */
      tl.addLabel('understanding');
      tl.to('.layer-understanding', { opacity: 1, duration: 0.4 }, '-=0.4');
      tl.to('.request-item', { opacity: 0.2, y: -config.yDist, duration: 0.8, ease: 'power2.inOut' }, '<');
      tl.to('.understanding-indicator', { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.5)' }, '<');
      tl.to('.pulse-dot', { scale: 1.5, opacity: 0.4, duration: 0.8, yoyo: true, repeat: 1, ease: 'sine.inOut' }, '<');
      tl.to({}, { duration: 1.0 }); 
      tl.to(['.layer-request', '.layer-understanding'], { opacity: 0, duration: 0.6 });

      /* Phase 3: Structured Tasks (5-8s) */
      tl.addLabel('structure');
      tl.to('.layer-structure', { opacity: 1, duration: 0.4 }, '-=0.2');
      tl.to('.struct-module', { opacity: 1, scale: 1, duration: 0.8, stagger: 0.15, ease: 'power2.out' }, '<');
      tl.to({}, { duration: 1.2 }); 

      /* Phase 4: Personal Context (8-11s) */
      tl.addLabel('context');
      // 14. STRUCTURED -> CONTEXT TRANSITION: Fade out previous completely to prevent overlap
      tl.to('.layer-structure', { opacity: 0, duration: 0.5 });
      
      tl.to('.layer-context', { opacity: 1, duration: 0.4 }, '+=0.1');
      tl.to('.context-token', { opacity: 1, scale: 1, duration: 0.6, stagger: 0.08, ease: 'back.out(1.2)' }, '<0.2');
      tl.to('.layer-context .arch-layer-caption', { opacity: 1, y: 0, duration: 0.6 }, '<0.2');
      tl.to({}, { duration: 1.5 }); 
      
      /* Phase 5: Priority + Constraints (11-14s) */
      tl.addLabel('evaluation');
      // 19. CONTEXT -> EVALUATION TRANSITION: Fade out previous completely
      tl.to('.layer-context', { opacity: 0, duration: 0.5 });

      tl.to('.layer-reason', { opacity: 1, duration: 0.4 }, '+=0.1');
      tl.to('.decision-token', { opacity: 0.5, scale: 1, duration: 0.6, stagger: 0.08, ease: 'power2.out' }, '<');
      tl.to('.decision-token.highlight', { opacity: 1, scale: 1.05, duration: 0.4 }, '+=0.2');
      tl.to('.layer-reason .arch-layer-caption', { opacity: 1, y: 0, duration: 0.6 }, '<');
      tl.to({}, { duration: 1.5 }); 
      tl.to('.layer-reason', { opacity: 0, duration: 0.6 });

      /* Phase 6: Schedule Construction (14-18s) */
      tl.addLabel('schedule');
      tl.to('.layer-plan', { opacity: 1, duration: 0.4 }, '-=0.2');
      tl.to('.schedule-rail', { scaleY: 1, duration: 0.8, ease: 'power2.inOut' }, '<');
      tl.to('.sched-block', { opacity: 1, x: 0, y: 0, duration: 0.6, stagger: 0.2, ease: 'power2.out' }, '<0.2');
      tl.to('.layer-plan .arch-layer-caption', { opacity: 1, y: 0, duration: 0.6 }, '-=0.2');
      tl.to({}, { duration: 1.5 }); 
      tl.to('.layer-plan .arch-layer-caption', { opacity: 0, duration: 0.4 }); // hide caption to make room for final

      /* Phase 7: Wellbeing Protection (18-21s) */
      tl.addLabel('protection');
      tl.to('.layer-protect', { opacity: 1, duration: 0.4 }, '-=0.2');
      tl.to('.protect-item', { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'power2.out' }, '<');
      tl.to('.caption-protect-text', { opacity: 1, y: 0, duration: 0.6 }, '<0.2');
      tl.to({}, { duration: 1.5 }); 
      tl.to(['.caption-protect-text', '.protect-item'], { opacity: 0.15, duration: 0.8 }); // abstract schedule back

      /* Phase 8: Final Plan Hold (21-24s) */
      tl.addLabel('final');
      tl.to('.final-statement', { opacity: 1, y: 0, duration: 0.8 }, '<');
      tl.to({}, { duration: 2.5 }); // Final Hold
      
      /* Phase 9: Elegant Reset Loop */
      tl.addLabel('reset');
      tl.to(['.layer-plan', '.layer-protect', '.final-statement'], { opacity: 0, duration: 0.8 });
      tl.to({}, { duration: 0.5 }); // breathe before restart

      // 12. VIEWPORT BEHAVIOUR - Auto Play/Pause using ScrollTrigger (No Scrub/Pin)
      const st = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 75%",
        end: "bottom 25%",
        animation: tl,
        toggleActions: "play pause resume pause",
        // plays on enter, pauses on leave, resumes on enter back, pauses on leave back
      });

      return () => {
        st.kill();
        tl.kill();
      };
    };

    // 29. GSAP ARCHITECTURE - Dedicated Device Timelines
    mm.add("(max-width: 599px)", () => {
      // Phone
      return buildTimeline({ yDist: 10, scaleMod: 0, isPhone: true });
    });

    mm.add("(min-width: 600px) and (max-width: 899px)", () => {
      // Tablet
      return buildTimeline({ yDist: 15, scaleMod: 0.05, isPhone: false });
    });

    mm.add("(min-width: 900px) and (max-width: 1439px)", () => {
      // Laptop
      return buildTimeline({ yDist: 20, scaleMod: 0.05, isPhone: false });
    });

    mm.add("(min-width: 1440px)", () => {
      // Desktop
      return buildTimeline({ yDist: 30, scaleMod: 0.05, isPhone: false });
    });

    return () => mm.revert();
  }, []);

  return (
    <section className="plex-architecture" id="architecture" ref={containerRef}>
      
      {/* 06: SECTION HEADER */}
      <div className="arch-header-container">
        <CaseStudySectionChip number="09" title="Architecture" />
        <h2>Behind the Intelligence</h2>
        <p>Meet the AI in Plex. Every schedule begins with understanding before planning.</p>
      </div>

      <div className="arch-stage-container">
        <div className="arch-visual-stage">

          {/* Phase 1: Human Intent */}
          <div className="arch-layer layer-request">
            <div className="layer-content">
              <div className="request-stack">
                <div className="request-item primary">Finish my portfolio by Friday.</div>
                <div className="request-item secondary">Practice JLPT tonight.</div>
                <div className="request-item secondary">Go to the gym tomorrow.</div>
                <div className="request-item secondary">Apply to Oracle internship.</div>
              </div>
            </div>
            <div className="arch-layer-caption"></div>
          </div>

          {/* Phase 2: Understanding */}
          <div className="arch-layer layer-understanding">
            <div className="layer-content">
              <div className="understanding-indicator">
                <div className="pulse-dot"></div>
                <span className="understanding-text">Understanding...</span>
              </div>
            </div>
            <div className="arch-layer-caption"></div>
          </div>

          {/* Phase 3: Structured Tasks */}
          <div className="arch-layer layer-structure">
            <div className="layer-content">
              <div className="structure-grid">
                <div className="struct-module">
                  <span className="struct-title">Portfolio</span>
                  <span className="struct-detail">Deadline: Friday</span>
                  <span className="struct-detail">Est: 3 Hours</span>
                </div>
                <div className="struct-module">
                  <span className="struct-title">JLPT</span>
                  <span className="struct-detail">Duration: 45m</span>
                  <span className="struct-detail">Evening</span>
                </div>
                <div className="struct-module">
                  <span className="struct-title">Gym</span>
                  <span className="struct-detail">Tomorrow</span>
                  <span className="struct-detail">Recovery</span>
                </div>
              </div>
            </div>
            <div className="arch-layer-caption"></div>
          </div>

          {/* Phase 4: Context */}
          <div className="arch-layer layer-context">
            <div className="layer-content">
              <div className="token-cloud">
                <div className="context-token">Working Hours</div>
                <div className="context-token">Sleep Schedule</div>
                <div className="context-token">Travel Time</div>
                <div className="context-token">Existing Tasks</div>
                <div className="context-token">Preferences</div>
              </div>
            </div>
            <div className="arch-layer-caption">
              Every recommendation begins with understanding your personal context.
            </div>
          </div>

          {/* Phase 5: Priority & Constraints */}
          <div className="arch-layer layer-reason">
            <div className="layer-content">
              <div className="token-cloud">
                <div className="decision-token highlight">High Priority</div>
                <div className="decision-token highlight">Deadline Conflict</div>
                <div className="decision-token">Available Time</div>
                <div className="decision-token">Estimated Duration</div>
                <div className="decision-token">Dependencies</div>
              </div>
            </div>
            <div className="arch-layer-caption">
              Priorities are evaluated before time is assigned.
            </div>
          </div>

          {/* Phase 6: Plan */}
          <div className="arch-layer layer-plan">
            <div className="layer-content">
              <div className="plan-schedule">
                <div className="schedule-rail"></div>
                <div className="sched-block focus">Focus: Portfolio (3h)</div>
                <div className="sched-block">Lunch Break</div>
                <div className="sched-block">JLPT Practice (45m)</div>
                <div className="sched-block">Travel to Gym</div>
                <div className="sched-block">Gym Workout</div>
              </div>
            </div>
            <div className="arch-layer-caption">
              Plans are created around real life instead of ideal conditions.
            </div>
          </div>

          {/* Phase 7: Protect & Final State */}
          <div className="arch-layer layer-protect">
            <div className="layer-content">
              <div className="protect-list">
                <div className="protect-item"><span className="protect-icon">✓</span> Sleep Protected</div>
                <div className="protect-item"><span className="protect-icon">✓</span> Recovery Preserved</div>
                <div className="protect-item"><span className="protect-icon">✓</span> Break Maintained</div>
              </div>
            </div>
            <div className="arch-layer-caption caption-protect-text">
              Productivity should never come at the expense of recovery.
            </div>
            {/* The final statement is absolutely positioned in the caption area via CSS (Wait, let's just stack it and use GSAP to hide/show) */}
            <div className="arch-layer-caption final-statement" style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
              Every schedule is generated locally through Plex's intelligence, combining your goals, routines, and priorities into a realistic plan designed around your life.
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
