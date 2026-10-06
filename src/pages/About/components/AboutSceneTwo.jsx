import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './AboutSceneTwo.css';

gsap.registerPlugin(ScrollTrigger);

// MOBILE COMPONENTS (<= 1023px)
const MobileVisual01 = () => {
  const containerRef = useRef(null);
  useEffect(() => {
    let ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(max-width: 1023px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.set('.as2-node span', { autoAlpha: 0 });
        gsap.set('.as2-center-label, .as2-center-dot, .as2-demo-lines', { autoAlpha: 0 });
        gsap.set('.as2-node', { autoAlpha: 0, scale: 0.8 });
        const tl = gsap.timeline({ scrollTrigger: { trigger: containerRef.current, start: 'top 75%', once: true } });
        tl.to('.as2-demo-lines', { autoAlpha: 1, duration: 0.4 })
          .to('.as2-node', { autoAlpha: 1, scale: 1, duration: 0.4, stagger: 0.1 }, "-=0.2")
          .to('.as2-node span', { autoAlpha: 1, duration: 0.3 }, "-=0.2")
          .to('.as2-center-dot, .as2-center-label', { autoAlpha: 1, duration: 0.4 }, "-=0.1");
      });
      mm.add("(max-width: 1023px) and (prefers-reduced-motion: reduce)", () => {
        gsap.set('.as2-node span, .as2-center-label, .as2-center-dot, .as2-demo-lines, .as2-node', { autoAlpha: 1, scale: 1 });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);
  return (
    <div className="as2-mobile-visual" ref={containerRef} aria-hidden="true">
      <div className="as2-visual-wrapper m-v1">
        <div className="as2-demo-canvas">
          <div className="as2-demo-lines"></div>
          <div className="as2-node n1"><span>USER</span></div>
          <div className="as2-node n2"><span>CONTEXT</span></div>
          <div className="as2-node n3"><span>CONSTRAINT</span></div>
          <div className="as2-node n4"><span>GOAL</span></div>
          <div className="as2-node-center">
            <div className="as2-center-dot"></div>
            <span className="as2-center-label">UNDERSTAND</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const MobileVisual02 = () => {
  const containerRef = useRef(null);
  useEffect(() => {
    let ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(max-width: 1023px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.set('.mv2-n', { borderRadius: '2px', backgroundColor: 'var(--about-border)', opacity: 0 });
        gsap.set('.mv2-n1', { top: '35%', left: '35%' });
        gsap.set('.mv2-n2', { top: '35%', left: '65%' });
        gsap.set('.mv2-n3', { top: '65%', left: '35%' });
        gsap.set('.mv2-n4', { top: '65%', left: '65%' });
        const tl = gsap.timeline({ scrollTrigger: { trigger: containerRef.current, start: 'top 75%', once: true } });
        tl.to('.mv2-n', { opacity: 1, duration: 0.4 })
          .to('.mv2-n1', { top: '45%', left: '45%', backgroundColor: 'var(--about-interaction)', duration: 0.6, ease: 'back.out(1.2)' }, "+=0.2")
          .to('.mv2-n2', { top: '45%', left: '55%', duration: 0.6, ease: 'back.out(1.2)' }, "<0.1")
          .to('.mv2-n3', { top: '55%', left: '45%', duration: 0.6, ease: 'back.out(1.2)' }, "<0.1")
          .to('.mv2-n4', { top: '55%', left: '55%', backgroundColor: 'var(--about-interaction)', duration: 0.6, ease: 'back.out(1.2)' }, "<0.1");
      });
      mm.add("(max-width: 1023px) and (prefers-reduced-motion: reduce)", () => {
        gsap.set('.mv2-n', { borderRadius: '2px', backgroundColor: 'var(--about-border)', opacity: 1 });
        gsap.set('.mv2-n1', { top: '45%', left: '45%', backgroundColor: 'var(--about-interaction)' });
        gsap.set('.mv2-n2', { top: '45%', left: '55%' });
        gsap.set('.mv2-n3', { top: '55%', left: '45%' });
        gsap.set('.mv2-n4', { top: '55%', left: '55%', backgroundColor: 'var(--about-interaction)' });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);
  return (
    <div className="as2-mobile-visual" ref={containerRef} aria-hidden="true">
      <div className="as2-visual-wrapper">
        <div className="as2-demo-canvas">
          <div className="as2-node mv2-n mv2-n1"></div>
          <div className="as2-node mv2-n mv2-n2"></div>
          <div className="as2-node mv2-n mv2-n3"></div>
          <div className="as2-node mv2-n mv2-n4"></div>
        </div>
      </div>
    </div>
  );
};

const MobileVisual03 = () => {
  const containerRef = useRef(null);
  useEffect(() => {
    let ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(max-width: 1023px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.set('.mv3-a', { top: '50%', left: '50%', backgroundColor: 'var(--about-border)', borderRadius: '50%', opacity: 0 });
        gsap.set('.mv3-b', { top: '50%', left: '50%', backgroundColor: 'var(--about-interaction)', borderRadius: '8px', scale: 0, opacity: 0 });
        gsap.set('.mv3-arrow', { autoAlpha: 0, width: 0, top: '50%', left: '42%' });
        const tl = gsap.timeline({ scrollTrigger: { trigger: containerRef.current, start: 'top 75%', once: true } });
        tl.to('.mv3-a', { opacity: 1, duration: 0.3 })
          .to('.mv3-a', { left: '30%', duration: 0.6, ease: 'power2.inOut' }, "+=0.3")
          .to('.mv3-b', { opacity: 1, scale: 1.5, left: '70%', duration: 0.6, ease: 'power2.inOut' }, "<")
          .to('.mv3-arrow', { autoAlpha: 1, width: '16%', duration: 0.4 }, "-=0.2");
      });
      mm.add("(max-width: 1023px) and (prefers-reduced-motion: reduce)", () => {
        gsap.set('.mv3-a', { top: '50%', left: '30%', backgroundColor: 'var(--about-border)', borderRadius: '50%', opacity: 1 });
        gsap.set('.mv3-b', { top: '50%', left: '70%', backgroundColor: 'var(--about-interaction)', borderRadius: '8px', scale: 1.5, opacity: 1 });
        gsap.set('.mv3-arrow', { autoAlpha: 1, width: '16%', top: '50%', left: '42%' });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);
  return (
    <div className="as2-mobile-visual" ref={containerRef} aria-hidden="true">
      <div className="as2-visual-wrapper">
        <div className="as2-demo-canvas">
          <div className="as2-node mv3-a"></div>
          <div className="as2-node mv3-b"></div>
          <div className="as2-hier-line arrow mv3-arrow"></div>
        </div>
      </div>
    </div>
  );
};

const MobileVisual04 = () => {
  const containerRef = useRef(null);
  useEffect(() => {
    let ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(max-width: 1023px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.set('.mv4-hl1', { top: '40%', left: '25%', width: '50%', height: '8px', backgroundColor: 'var(--about-border)', opacity: 0 });
        gsap.set('.mv4-hl2', { top: '50%', left: '25%', width: '50%', height: '8px', backgroundColor: 'var(--about-border)', opacity: 0 });
        gsap.set('.mv4-hl3', { top: '60%', left: '25%', width: '50%', height: '8px', backgroundColor: 'var(--about-border)', opacity: 0 });
        const tl = gsap.timeline({ scrollTrigger: { trigger: containerRef.current, start: 'top 75%', once: true } });
        tl.to('.mv4-hl1, .mv4-hl2, .mv4-hl3', { opacity: 1, duration: 0.4 })
          .to('.mv4-hl1', { top: '35%', left: '15%', width: '70%', height: '16px', backgroundColor: 'var(--about-interaction)', duration: 0.6, ease: 'power2.out' }, "+=0.3")
          .to('.mv4-hl2', { top: '52%', left: '15%', width: '50%', duration: 0.6, ease: 'power2.out' }, "<0.1")
          .to('.mv4-hl3', { top: '64%', left: '15%', width: '35%', opacity: 0.5, duration: 0.6, ease: 'power2.out' }, "<0.1");
      });
      mm.add("(max-width: 1023px) and (prefers-reduced-motion: reduce)", () => {
        gsap.set('.mv4-hl1', { top: '35%', left: '15%', width: '70%', height: '16px', backgroundColor: 'var(--about-interaction)', opacity: 1 });
        gsap.set('.mv4-hl2', { top: '52%', left: '15%', width: '50%', height: '8px', backgroundColor: 'var(--about-border)', opacity: 1 });
        gsap.set('.mv4-hl3', { top: '64%', left: '15%', width: '35%', height: '8px', backgroundColor: 'var(--about-border)', opacity: 0.5 });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);
  return (
    <div className="as2-mobile-visual last" ref={containerRef} aria-hidden="true" style={{ borderBottom: 'none' }}>
      <div className="as2-visual-wrapper">
        <div className="as2-demo-canvas">
          <div className="as2-hier-line mv4-hl1"></div>
          <div className="as2-hier-line mv4-hl2"></div>
          <div className="as2-hier-line mv4-hl3"></div>
        </div>
      </div>
    </div>
  );
};


// MAIN COMPONENT
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
        gsap.set('.as2-desktop-visual .as2-hier-line', { autoAlpha: 0 });
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
          .to('.as2-desktop-visual .as2-node span', { autoAlpha: 0, duration: 0.2 }, 'trans01_02')
          .to('.as2-desktop-visual .as2-center-label, .as2-desktop-visual .as2-center-dot, .as2-desktop-visual .as2-demo-lines', { autoAlpha: 0, duration: 0.3 }, 'trans01_02')
          // Move scattered nodes into a tight coherent 2x2 grid
          .to('.as2-desktop-visual .as2-node.n1', { top: '45%', left: '45%', borderRadius: '2px', backgroundColor: 'var(--about-interaction)', duration: 0.5, ease: 'power2.inOut' }, 'trans01_02')
          .to('.as2-desktop-visual .as2-node.n2', { top: '45%', left: '55%', borderRadius: '2px', duration: 0.5, ease: 'power2.inOut' }, 'trans01_02')
          .to('.as2-desktop-visual .as2-node.n3', { top: '55%', left: '45%', borderRadius: '2px', duration: 0.5, ease: 'power2.inOut' }, 'trans01_02')
          .to('.as2-desktop-visual .as2-node.n4', { top: '55%', left: '55%', borderRadius: '2px', backgroundColor: 'var(--about-interaction)', duration: 0.5, ease: 'power2.inOut' }, 'trans01_02');

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
          .to('.as2-desktop-visual .as2-node.n3, .as2-desktop-visual .as2-node.n4', { autoAlpha: 0, duration: 0.3 }, 'trans02_03')
          .to('.as2-desktop-visual .as2-node.n1', { top: '50%', left: '35%', backgroundColor: 'var(--about-border)', borderRadius: '50%', duration: 0.5, ease: 'power2.inOut' }, 'trans02_03')
          .to('.as2-desktop-visual .as2-node.n2', { top: '50%', left: '65%', backgroundColor: 'var(--about-interaction)', borderRadius: '8px', scale: 1.5, duration: 0.5, ease: 'power2.inOut' }, 'trans02_03')
          // Small arrow/line indicating change
          .fromTo('.as2-desktop-visual .as2-hier-line.arrow', { autoAlpha: 0, width: 0, top: '50%', left: '42%' }, { autoAlpha: 1, width: '16%', duration: 0.4 }, 'trans02_03+=0.2');

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
          .to('.as2-desktop-visual .as2-node.n1, .as2-desktop-visual .as2-node.n2, .as2-desktop-visual .as2-hier-line.arrow', { autoAlpha: 0, duration: 0.3 }, 'trans03_04')
          // Show 3 flat lines
          .fromTo('.as2-desktop-visual .as2-hier-line.hl1', { autoAlpha: 0, top: '40%', left: '30%', width: '40%', height: '8px', backgroundColor: 'var(--about-border)' }, { autoAlpha: 1, duration: 0.2 }, 'trans03_04')
          .fromTo('.as2-desktop-visual .as2-hier-line.hl2', { autoAlpha: 0, top: '50%', left: '30%', width: '40%', height: '8px', backgroundColor: 'var(--about-border)' }, { autoAlpha: 1, duration: 0.2 }, 'trans03_04')
          .fromTo('.as2-desktop-visual .as2-hier-line.hl3', { autoAlpha: 0, top: '60%', left: '30%', width: '40%', height: '8px', backgroundColor: 'var(--about-border)' }, { autoAlpha: 1, duration: 0.2 }, 'trans03_04')
          // Transform to hierarchy
          .to('.as2-desktop-visual .as2-hier-line.hl1', { top: '35%', left: '20%', width: '60%', height: '16px', backgroundColor: 'var(--about-interaction)', duration: 0.5, ease: 'power2.out' }, 'trans03_04+=0.3')
          .to('.as2-desktop-visual .as2-hier-line.hl2', { top: '52%', left: '20%', width: '45%', height: '8px', duration: 0.5, ease: 'power2.out' }, 'trans03_04+=0.3')
          .to('.as2-desktop-visual .as2-hier-line.hl3', { top: '64%', left: '20%', width: '30%', height: '8px', opacity: 0.5, duration: 0.5, ease: 'power2.out' }, 'trans03_04+=0.3');

        tl.to({}, { duration: 0.6 }); // Final hold
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
            <MobileVisual01 />

            {/* 02 */}
            <div className="as2-principle as2-p2 inactive">
              <span className="as2-p-num">02</span>
              <div className="as2-p-content">
                <h3 className="as2-p-title">Systems over isolated screens.</h3>
                <p className="as2-p-desc as2-p2-desc">A product should behave coherently, not as a collection of disconnected layouts.</p>
              </div>
            </div>
            <MobileVisual02 />

            {/* 03 */}
            <div className="as2-principle as2-p3 inactive">
              <span className="as2-p-num">03</span>
              <div className="as2-p-content">
                <h3 className="as2-p-title">Interaction should explain itself.</h3>
                <p className="as2-p-desc as2-p3-desc">Motion, hierarchy and signifiers should help people understand what changed.</p>
              </div>
            </div>
            <MobileVisual03 />

            {/* 04 */}
            <div className="as2-principle as2-p4 inactive last">
              <span className="as2-p-num">04</span>
              <div className="as2-p-content">
                <h3 className="as2-p-title">Visuals should carry information.</h3>
                <p className="as2-p-desc as2-p4-desc">Good visual design communicates before it decorates.</p>
              </div>
            </div>
            <MobileVisual04 />

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
