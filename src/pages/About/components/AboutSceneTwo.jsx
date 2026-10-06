import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './AboutSceneTwo.css';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSceneTwo() {
  const wrapperRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop / Laptop Animation
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: 'top top',
            end: '+=250%', // 250vh total duration
            scrub: 1,
            pin: true,
          }
        });

        // Initial visual states
        gsap.set('.as2-hier-line', { autoAlpha: 0 });
        gsap.set('.as2-p-desc', { height: 0, autoAlpha: 0, overflow: 'hidden' });
        gsap.set('.as2-p1-desc', { height: 'auto', autoAlpha: 1 });

        // HOLD 01
        tl.to({}, { duration: 0.4 }); // Initial hold

        // 01 -> 02 (Systems over isolated screens)
        tl.addLabel('trans01_02')
          // Left side
          .to('.as2-p1-desc', { height: 0, autoAlpha: 0, duration: 0.4 }, 'trans01_02')
          .to('.as2-p1', { opacity: 0.65 }, 'trans01_02')
          .to('.as2-p1 .as2-p-num', { color: 'var(--about-text-muted)' }, 'trans01_02')
          .to('.as2-p1 .as2-p-title', { color: 'var(--about-text-secondary)' }, 'trans01_02')
          
          .to('.as2-p2', { opacity: 1 }, 'trans01_02')
          .to('.as2-p2 .as2-p-num', { color: 'var(--about-interaction)' }, 'trans01_02')
          .to('.as2-p2 .as2-p-title', { color: 'var(--about-text-primary)' }, 'trans01_02')
          .to('.as2-p2-desc', { height: 'auto', autoAlpha: 1, duration: 0.4 }, 'trans01_02')
          
          // Right side (Organize into system)
          .to('.as2-node span', { autoAlpha: 0, duration: 0.2 }, 'trans01_02')
          .to('.as2-center-label, .as2-center-dot, .as2-demo-lines', { autoAlpha: 0, duration: 0.3 }, 'trans01_02')
          // Move scattered nodes into a tight coherent 2x2 grid
          .to('.as2-node.n1', { top: '45%', left: '45%', borderRadius: '2px', backgroundColor: 'var(--about-interaction)', duration: 0.5, ease: 'power2.inOut' }, 'trans01_02')
          .to('.as2-node.n2', { top: '45%', left: '55%', borderRadius: '2px', duration: 0.5, ease: 'power2.inOut' }, 'trans01_02')
          .to('.as2-node.n3', { top: '55%', left: '45%', borderRadius: '2px', duration: 0.5, ease: 'power2.inOut' }, 'trans01_02')
          .to('.as2-node.n4', { top: '55%', left: '55%', borderRadius: '2px', backgroundColor: 'var(--about-interaction)', duration: 0.5, ease: 'power2.inOut' }, 'trans01_02');

        tl.to({}, { duration: 0.6 }); // Hold 02

        // 02 -> 03 (Interaction explains itself)
        tl.addLabel('trans02_03')
          .to('.as2-p2-desc', { height: 0, autoAlpha: 0, duration: 0.4 }, 'trans02_03')
          .to('.as2-p2', { opacity: 0.65 }, 'trans02_03')
          .to('.as2-p2 .as2-p-num', { color: 'var(--about-text-muted)' }, 'trans02_03')
          .to('.as2-p2 .as2-p-title', { color: 'var(--about-text-secondary)' }, 'trans02_03')
          
          .to('.as2-p3', { opacity: 1 }, 'trans02_03')
          .to('.as2-p3 .as2-p-num', { color: 'var(--about-interaction)' }, 'trans02_03')
          .to('.as2-p3 .as2-p-title', { color: 'var(--about-text-primary)' }, 'trans02_03')
          .to('.as2-p3-desc', { height: 'auto', autoAlpha: 1, duration: 0.4 }, 'trans02_03')

          // Right side (State A -> State B)
          .to('.as2-node.n3, .as2-node.n4', { autoAlpha: 0, duration: 0.3 }, 'trans02_03')
          .to('.as2-node.n1', { top: '50%', left: '35%', backgroundColor: 'var(--about-border)', borderRadius: '50%', duration: 0.5, ease: 'power2.inOut' }, 'trans02_03')
          .to('.as2-node.n2', { top: '50%', left: '65%', backgroundColor: 'var(--about-interaction)', borderRadius: '8px', scale: 1.5, duration: 0.5, ease: 'power2.inOut' }, 'trans02_03')
          // Small arrow/line indicating change
          .fromTo('.as2-hier-line.arrow', { autoAlpha: 0, width: 0, top: '50%', left: '42%' }, { autoAlpha: 1, width: '16%', duration: 0.4 }, 'trans02_03+=0.2');

        tl.to({}, { duration: 0.6 }); // Hold 03

        // 03 -> 04 (Visuals carry information)
        tl.addLabel('trans03_04')
          .to('.as2-p3-desc', { height: 0, autoAlpha: 0, duration: 0.4 }, 'trans03_04')
          .to('.as2-p3', { opacity: 0.65 }, 'trans03_04')
          .to('.as2-p3 .as2-p-num', { color: 'var(--about-text-muted)' }, 'trans03_04')
          .to('.as2-p3 .as2-p-title', { color: 'var(--about-text-secondary)' }, 'trans03_04')
          
          .to('.as2-p4', { opacity: 1 }, 'trans03_04')
          .to('.as2-p4 .as2-p-num', { color: 'var(--about-interaction)' }, 'trans03_04')
          .to('.as2-p4 .as2-p-title', { color: 'var(--about-text-primary)' }, 'trans03_04')
          .to('.as2-p4-desc', { height: 'auto', autoAlpha: 1, duration: 0.4 }, 'trans03_04')

          // Right side (Flat -> Hierarchy)
          .to('.as2-node.n1, .as2-node.n2, .as2-hier-line.arrow', { autoAlpha: 0, duration: 0.3 }, 'trans03_04')
          // Show 3 flat lines
          .fromTo('.as2-hier-line.hl1', { autoAlpha: 0, top: '40%', left: '30%', width: '40%', height: '8px', backgroundColor: 'var(--about-border)' }, { autoAlpha: 1, duration: 0.2 }, 'trans03_04')
          .fromTo('.as2-hier-line.hl2', { autoAlpha: 0, top: '50%', left: '30%', width: '40%', height: '8px', backgroundColor: 'var(--about-border)' }, { autoAlpha: 1, duration: 0.2 }, 'trans03_04')
          .fromTo('.as2-hier-line.hl3', { autoAlpha: 0, top: '60%', left: '30%', width: '40%', height: '8px', backgroundColor: 'var(--about-border)' }, { autoAlpha: 1, duration: 0.2 }, 'trans03_04')
          // Transform to hierarchy
          .to('.as2-hier-line.hl1', { top: '35%', left: '20%', width: '60%', height: '16px', backgroundColor: 'var(--about-interaction)', duration: 0.5, ease: 'power2.out' }, 'trans03_04+=0.3')
          .to('.as2-hier-line.hl2', { top: '52%', left: '20%', width: '45%', height: '8px', duration: 0.5, ease: 'power2.out' }, 'trans03_04+=0.3')
          .to('.as2-hier-line.hl3', { top: '64%', left: '20%', width: '30%', height: '8px', opacity: 0.5, duration: 0.5, ease: 'power2.out' }, 'trans03_04+=0.3');

        tl.to({}, { duration: 0.6 }); // Final hold
      });

      // Phone & Tablet Animation (Normal flow, principle-driven triggers)
      mm.add("(max-width: 1023px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.set('.as2-hier-line', { autoAlpha: 0 });
        gsap.set('.as2-p-desc', { clearProps: 'all' }); 

        const resetEmphasis = () => {
          gsap.to('.as2-p1, .as2-p2, .as2-p3, .as2-p4', { opacity: 0.65, duration: 0.3 });
          gsap.to('.as2-p-num', { color: 'var(--about-text-muted)', duration: 0.3 });
          gsap.to('.as2-p-title', { color: 'var(--about-text-secondary)', duration: 0.3 });
        };

        const highlight = (pSelector) => {
          gsap.to(pSelector, { opacity: 1, duration: 0.3 });
          gsap.to(`${pSelector} .as2-p-num`, { color: 'var(--about-interaction)', duration: 0.3 });
          gsap.to(`${pSelector} .as2-p-title`, { color: 'var(--about-text-primary)', duration: 0.3 });
        };

        const killTweens = () => {
          gsap.killTweensOf('.as2-p1, .as2-p2, .as2-p3, .as2-p4, .as2-p-num, .as2-p-title, .as2-node, .as2-node span, .as2-hier-line, .as2-center-label, .as2-center-dot, .as2-demo-lines');
        };

        const state1 = () => {
          killTweens();
          resetEmphasis();
          highlight('.as2-p1');
          
          gsap.to('.as2-hier-line', { autoAlpha: 0, duration: 0.3 });
          gsap.to('.as2-node span', { autoAlpha: 1, duration: 0.3 });
          gsap.to('.as2-center-label, .as2-center-dot, .as2-demo-lines', { autoAlpha: 1, duration: 0.3 });
          gsap.to('.as2-node.n1', { top: '15%', left: '15%', borderRadius: '50%', backgroundColor: 'var(--about-border)', scale: 1, duration: 0.5 });
          gsap.to('.as2-node.n2', { top: '15%', left: '85%', borderRadius: '50%', backgroundColor: 'var(--about-border)', scale: 1, duration: 0.5 });
          gsap.to('.as2-node.n3', { top: '85%', left: '15%', borderRadius: '50%', backgroundColor: 'var(--about-border)', scale: 1, autoAlpha: 1, duration: 0.5 });
          gsap.to('.as2-node.n4', { top: '85%', left: '85%', borderRadius: '50%', backgroundColor: 'var(--about-border)', scale: 1, autoAlpha: 1, duration: 0.5 });
        };

        const state2 = () => {
          killTweens();
          resetEmphasis();
          highlight('.as2-p2');
          
          gsap.to('.as2-hier-line', { autoAlpha: 0, duration: 0.3 });
          gsap.to('.as2-node span', { autoAlpha: 0, duration: 0.2 });
          gsap.to('.as2-center-label, .as2-center-dot, .as2-demo-lines', { autoAlpha: 0, duration: 0.3 });
          gsap.to('.as2-node.n1', { top: '45%', left: '45%', borderRadius: '2px', backgroundColor: 'var(--about-interaction)', scale: 1, duration: 0.5 });
          gsap.to('.as2-node.n2', { top: '45%', left: '55%', borderRadius: '2px', backgroundColor: 'var(--about-border)', scale: 1, autoAlpha: 1, duration: 0.5 });
          gsap.to('.as2-node.n3', { top: '55%', left: '45%', borderRadius: '2px', backgroundColor: 'var(--about-border)', scale: 1, autoAlpha: 1, duration: 0.5 });
          gsap.to('.as2-node.n4', { top: '55%', left: '55%', borderRadius: '2px', backgroundColor: 'var(--about-interaction)', scale: 1, autoAlpha: 1, duration: 0.5 });
        };

        const state3 = () => {
          killTweens();
          resetEmphasis();
          highlight('.as2-p3');
          
          gsap.to('.as2-hier-line', { autoAlpha: 0, duration: 0.3 });
          gsap.to('.as2-node.n3, .as2-node.n4', { autoAlpha: 0, duration: 0.3 });
          gsap.to('.as2-node.n1', { top: '50%', left: '30%', backgroundColor: 'var(--about-border)', borderRadius: '50%', scale: 1, autoAlpha: 1, duration: 0.5 });
          gsap.to('.as2-node.n2', { top: '50%', left: '70%', backgroundColor: 'var(--about-interaction)', borderRadius: '8px', scale: 1.5, autoAlpha: 1, duration: 0.5 });
          gsap.to('.as2-hier-line.arrow', { autoAlpha: 1, width: '16%', top: '50%', left: '42%', duration: 0.4 });
        };

        const state4 = () => {
          killTweens();
          resetEmphasis();
          highlight('.as2-p4');
          
          gsap.to('.as2-node.n1, .as2-node.n2, .as2-hier-line.arrow', { autoAlpha: 0, duration: 0.3 });
          gsap.to('.as2-hier-line.hl1', { autoAlpha: 1, top: '35%', left: '15%', width: '70%', height: '16px', backgroundColor: 'var(--about-interaction)', duration: 0.5 });
          gsap.to('.as2-hier-line.hl2', { autoAlpha: 1, top: '52%', left: '15%', width: '50%', height: '8px', backgroundColor: 'var(--about-border)', duration: 0.5 });
          gsap.to('.as2-hier-line.hl3', { autoAlpha: 0.5, top: '64%', left: '15%', width: '35%', height: '8px', backgroundColor: 'var(--about-border)', duration: 0.5 });
        };

        // Initialize state 1 instantly so it's ready
        gsap.set('.as2-node.n1, .as2-node.n2, .as2-node.n3, .as2-node.n4', { scale: 1, autoAlpha: 1 });
        state1();

        ScrollTrigger.create({ trigger: '.as2-p1', start: 'top 80%', end: 'bottom 50%', onEnter: state1, onEnterBack: state1 });
        ScrollTrigger.create({ trigger: '.as2-p2', start: 'top 50%', end: 'bottom 50%', onEnter: state2, onEnterBack: state2 });
        ScrollTrigger.create({ trigger: '.as2-p3', start: 'top 50%', end: 'bottom 50%', onEnter: state3, onEnterBack: state3 });
        ScrollTrigger.create({ trigger: '.as2-p4', start: 'top 50%', end: 'bottom 0%', onEnter: state4, onEnterBack: state4 });
      });

      // Reduced Motion
      mm.add("(prefers-reduced-motion: reduce)", () => {
        // Expand all descriptions, keep all fully visible
        gsap.set('.as2-p-desc', { clearProps: 'all' });
        gsap.set('.as2-principle', { opacity: 1 });
        gsap.set('.as2-p-num', { color: 'var(--about-interaction)' });
        gsap.set('.as2-p-title', { color: 'var(--about-text-primary)' });
      });

    }, wrapperRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="as2-wrapper" ref={wrapperRef}>
      <div className="as2-content">
        
        <div className="as2-left-col">
          <div className="as2-marker">ABOUT / 02</div>
          <h2 className="as2-heading">How I think.</h2>

          <div className="as2-principles-list">
            
            {/* 01 */}
            <div className="as2-principle as2-p1 active">
              <span className="as2-p-num">01</span>
              <div className="as2-p-content">
                <h3 className="as2-p-title">Understand before designing.</h3>
                <p className="as2-p-desc as2-p1-desc">Context should shape the interface before pixels do.</p>
              </div>
            </div>

            {/* Visual Demo for Mobile */}
            <div className="as2-mobile-visual">
              <VisualDemo />
            </div>

            {/* 02 */}
            <div className="as2-principle as2-p2 inactive">
              <span className="as2-p-num">02</span>
              <div className="as2-p-content">
                <h3 className="as2-p-title">Systems over isolated screens.</h3>
                <p className="as2-p-desc as2-p2-desc">A product should behave coherently, not as a collection of disconnected layouts.</p>
              </div>
            </div>

            {/* 03 */}
            <div className="as2-principle as2-p3 inactive">
              <span className="as2-p-num">03</span>
              <div className="as2-p-content">
                <h3 className="as2-p-title">Interaction should explain itself.</h3>
                <p className="as2-p-desc as2-p3-desc">Motion, hierarchy and signifiers should help people understand what changed.</p>
              </div>
            </div>

            {/* 04 */}
            <div className="as2-principle as2-p4 inactive last">
              <span className="as2-p-num">04</span>
              <div className="as2-p-content">
                <h3 className="as2-p-title">Visuals should carry information.</h3>
                <p className="as2-p-desc as2-p4-desc">Good visual design communicates before it decorates.</p>
              </div>
            </div>

          </div>
        </div>

        {/* Visual Demo for Desktop */}
        <div className="as2-right-col as2-desktop-visual">
          <VisualDemo />
        </div>

      </div>
    </section>
  );
}

const VisualDemo = () => (
  <div className="as2-visual-wrapper" aria-hidden="true">
    <div className="as2-demo-canvas">
      {/* Principle 01 - Initial Nodes */}
      <div className="as2-demo-lines"></div>
      
      <div className="as2-node n1"><span>USER</span></div>
      <div className="as2-node n2"><span>CONTEXT</span></div>
      <div className="as2-node n3"><span>CONSTRAINT</span></div>
      <div className="as2-node n4"><span>GOAL</span></div>
      
      <div className="as2-node-center">
        <div className="as2-center-dot"></div>
        <span className="as2-center-label">UNDERSTAND</span>
      </div>

      {/* Additional Nodes for transformations */}
      <div className="as2-hier-line arrow"></div>
      <div className="as2-hier-line hl1"></div>
      <div className="as2-hier-line hl2"></div>
      <div className="as2-hier-line hl3"></div>
    </div>
  </div>
);
