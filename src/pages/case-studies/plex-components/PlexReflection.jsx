import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CaseStudySectionChip from './CaseStudySectionChip';
import './PlexReflection.css';

gsap.registerPlugin(ScrollTrigger);

export default function PlexReflection() {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      // Only run cinematic scroll if NOT reduced motion
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Set initial states explicitly
        gsap.set('.state-planning', { autoAlpha: 1, y: 0 });
        gsap.set(['.state-mental', '.state-attention', '.state-time', '.state-focus'], { autoAlpha: 0, y: 20 });

        // Build the timeline
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: stageRef.current,
            start: "top top",
            end: "+=400%", // 4 viewport heights of scrolling
            scrub: 1,
            pin: true,
            anticipatePin: 1
          }
        });

        // The timeline guarantees NO overlap by completing each exit before the next entrance.
        
        // 1. PLANNING
        tl.addLabel("planning")
          .to({}, { duration: 1 }) // Hold
          .to('.state-planning', { autoAlpha: 0, y: -20, duration: 0.8, ease: "power2.inOut" }) // Exit
          .to({}, { duration: 0.2 }); // Empty breath

        // 2. MENTAL EFFORT
        tl.addLabel("mentalEffort")
          .to('.state-mental', { autoAlpha: 1, y: 0, duration: 0.8, ease: "power2.out" }) // Enter
          .to({}, { duration: 1 }) // Hold
          .to('.state-mental', { autoAlpha: 0, y: -20, duration: 0.8, ease: "power2.inOut" }) // Exit
          .to({}, { duration: 0.2 }); // Empty breath

        // 3. ATTENTION
        tl.addLabel("attention")
          .to('.state-attention', { autoAlpha: 1, y: 0, duration: 0.8, ease: "power2.out" }) // Enter
          .to({}, { duration: 1 }) // Hold
          .to('.state-attention', { autoAlpha: 0, y: -20, duration: 0.8, ease: "power2.inOut" }) // Exit
          .to({}, { duration: 0.2 }); // Empty breath

        // 4. TIME
        tl.addLabel("time")
          .to('.state-time', { autoAlpha: 1, y: 0, duration: 0.8, ease: "power2.out" }) // Enter
          .to({}, { duration: 1 }) // Hold
          .to('.state-time', { autoAlpha: 0, y: -20, duration: 0.8, ease: "power2.inOut" }) // Exit
          .to({}, { duration: 0.5 }); // Longer empty breath before finale

        // 5. FOCUS (Finale)
        tl.addLabel("focus")
          .to('.state-focus', { autoAlpha: 1, y: 0, duration: 1.2, ease: "power2.out" }) // Gentle Enter
          .to({}, { duration: 1.5 }); // Longest hold at the end to read and resolve
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="plex-reflection" id="reflection" ref={sectionRef}>
      
      {/* NORMAL FLOW INTRO */}
      <div className="reflection-intro">
        <CaseStudySectionChip number="11" title="Reflection" />
        <h2>What was Plex really designing for?</h2>
      </div>

      {/* PINNED CINEMATIC STAGE */}
      <div className="reflection-cinematic-stage" ref={stageRef}>
        
        {/* STATE 1 */}
        <div className="reflection-state state-planning">
          <h3>Planning</h3>
          <p>Plex began as a way to organize everyday planning.</p>
        </div>

        {/* STATE 2 */}
        <div className="reflection-state state-mental">
          <h3>Mental Effort</h3>
          <p>The challenge was never managing tasks. It was reducing the effort required to think about them.</p>
        </div>

        {/* STATE 3 */}
        <div className="reflection-state state-attention">
          <h3>Attention</h3>
          <p>Great products don't ask for more attention. They quietly give it back.</p>
        </div>

        {/* STATE 4 */}
        <div className="reflection-state state-time">
          <h3>Time</h3>
          <p>In the end, time was never the feature. It was always the outcome.</p>
        </div>

        {/* STATE 5 - FINAL RESOLUTION */}
        <div className="reflection-state state-focus">
          <h3>The Output is Focus.</h3>
          <p>Plex began as a productivity tool. It became an exploration of how technology can reduce the effort around planning instead of adding to it.</p>
        </div>

      </div>

    </section>
  );
}
