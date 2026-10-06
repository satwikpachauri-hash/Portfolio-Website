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
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set('.as2-node span', { autoAlpha: 0 });
        gsap.set('.as2-center-label, .as2-center-dot, .as2-demo-lines', { autoAlpha: 0 });
        gsap.set('.as2-node', { autoAlpha: 0, scale: 0.8 });
        const tl = gsap.timeline({ scrollTrigger: { trigger: containerRef.current, start: 'top 75%', once: true } });
        tl.to('.as2-demo-lines', { autoAlpha: 1, duration: 0.4 })
          .to('.as2-node', { autoAlpha: 1, scale: 1, duration: 0.4, stagger: 0.1 }, "-=0.2")
          .to('.as2-node span', { autoAlpha: 1, duration: 0.3 }, "-=0.2")
          .to('.as2-center-dot, .as2-center-label', { autoAlpha: 1, duration: 0.4 }, "-=0.1");
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
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
      mm.add("(prefers-reduced-motion: no-preference)", () => {
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
      mm.add("(prefers-reduced-motion: reduce)", () => {
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
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set('.mv3-a', { top: '50%', left: '50%', backgroundColor: 'var(--about-border)', borderRadius: '50%', opacity: 0 });
        gsap.set('.mv3-b', { top: '50%', left: '50%', backgroundColor: 'var(--about-interaction)', borderRadius: '8px', scale: 0, opacity: 0 });
        gsap.set('.mv3-arrow', { autoAlpha: 0, width: 0, top: '50%', left: '42%' });
        const tl = gsap.timeline({ scrollTrigger: { trigger: containerRef.current, start: 'top 75%', once: true } });
        tl.to('.mv3-a', { opacity: 1, duration: 0.3 })
          .to('.mv3-a', { left: '30%', duration: 0.6, ease: 'power2.inOut' }, "+=0.3")
          .to('.mv3-b', { opacity: 1, scale: 1.5, left: '70%', duration: 0.6, ease: 'power2.inOut' }, "<")
          .to('.mv3-arrow', { autoAlpha: 1, width: '16%', duration: 0.4 }, "-=0.2");
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
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
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set('.mv4-hl1', { top: '40%', left: '25%', width: '50%', height: '8px', backgroundColor: 'var(--about-border)', opacity: 0 });
        gsap.set('.mv4-hl2', { top: '50%', left: '25%', width: '50%', height: '8px', backgroundColor: 'var(--about-border)', opacity: 0 });
        gsap.set('.mv4-hl3', { top: '60%', left: '25%', width: '50%', height: '8px', backgroundColor: 'var(--about-border)', opacity: 0 });
        const tl = gsap.timeline({ scrollTrigger: { trigger: containerRef.current, start: 'top 75%', once: true } });
        tl.to('.mv4-hl1, .mv4-hl2, .mv4-hl3', { opacity: 1, duration: 0.4 })
          .to('.mv4-hl1', { top: '35%', left: '15%', width: '70%', height: '16px', backgroundColor: 'var(--about-interaction)', duration: 0.6, ease: 'power2.out' }, "+=0.3")
          .to('.mv4-hl2', { top: '52%', left: '15%', width: '50%', duration: 0.6, ease: 'power2.out' }, "<0.1")
          .to('.mv4-hl3', { top: '64%', left: '15%', width: '35%', opacity: 0.5, duration: 0.6, ease: 'power2.out' }, "<0.1");
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
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

      // Desktop/Laptop (>= 1024px) - FULLY PRESERVED
      mm.add("(min-width: 1024px)", () => {
        ScrollTrigger.create({
          trigger: '.as2-wrapper',
          start: 'top top',
          end: 'bottom bottom',
          pin: '.as2-right-col',
          pinSpacing: false,
        });

        const resetEmphasis = () => {
          gsap.to('.as2-p-desc', { opacity: 0, height: 0, duration: 0.3, marginTop: 0 });
          gsap.to('.as2-principle', { opacity: 0.6, duration: 0.3 });
          gsap.to('.as2-p-num', { color: 'var(--text-secondary)', duration: 0.3 });
          gsap.to('.as2-p-title', { color: 'var(--text-primary)', duration: 0.3 });
        };

        const highlight = (pSelector) => {
          gsap.to(`${pSelector} .as2-p-desc`, { opacity: 1, height: 'auto', duration: 0.4, marginTop: '16px' });
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
        gsap.set('.as2-right-col .as2-node.n1, .as2-right-col .as2-node.n2, .as2-right-col .as2-node.n3, .as2-right-col .as2-node.n4', { scale: 1, autoAlpha: 1 });
        state1();

        ScrollTrigger.create({ trigger: '.as2-p1', start: 'top 80%', end: 'bottom 50%', onEnter: state1, onEnterBack: state1 });
        ScrollTrigger.create({ trigger: '.as2-p2', start: 'top 50%', end: 'bottom 50%', onEnter: state2, onEnterBack: state2 });
        ScrollTrigger.create({ trigger: '.as2-p3', start: 'top 50%', end: 'bottom 50%', onEnter: state3, onEnterBack: state3 });
        ScrollTrigger.create({ trigger: '.as2-p4', start: 'top 50%', end: 'bottom 0%', onEnter: state4, onEnterBack: state4 });
      });

      // Reduced Motion global resets
      mm.add("(prefers-reduced-motion: reduce)", () => {
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
