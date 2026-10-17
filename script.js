const fs = require('fs');
const path = require('path');

const jsxPath = path.join('src', 'pages', 'case-studies', 'cubicon', 'Cubicon.jsx');
const cssPath = path.join('src', 'pages', 'case-studies', 'cubicon', 'Cubicon.css');

// Extract the HERO section from the current JSX
const currentJsx = fs.readFileSync(jsxPath, 'utf8');
const heroMatch = currentJsx.match(/<section className="cb-hero" ref={heroRef}>([\s\S]*?)<\/section>/);
const heroJsx = heroMatch ? heroMatch[0] : '';

const newJsx = import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Cubicon.css';

gsap.registerPlugin(ScrollTrigger);

export default function Cubicon() {
  const heroRef = useRef(null);
  const sectionRef = useRef(null);
  const pinRef = useRef(null);
  const mobileRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let ctx = gsap.context(() => {
      // --- HERO ANIMATION (UNCHANGED) ---
      if (prefersReduced) {
        gsap.set('.cb-anim', { opacity: 1, y: 0, scale: 1 });
      } else {
        gsap.set('.cb-bg-img', { opacity: 0, scale: 1.015 });
        gsap.set('.cb-info-panel', { opacity: 0, y: 12 });
        gsap.set('.cb-logo', { opacity: 0, y: 10 });
        gsap.set('.cb-title', { opacity: 0, y: 16 });
        gsap.set('.cb-desc', { opacity: 0, y: 12 });
        gsap.set('.cb-meta-block', { opacity: 0, y: 10 });
        gsap.set('.cb-scroll-indicator', { opacity: 0 });

        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
        tl.to('.cb-bg-img', { opacity: 1, scale: 1, duration: 1.2 })
          .to('.cb-info-panel', { opacity: 1, y: 0, duration: 0.8 }, "-=0.6")
          .to('.cb-logo', { opacity: 1, y: 0, duration: 0.6 }, "-=0.5")
          .to('.cb-title', { opacity: 1, y: 0, duration: 0.6 }, "-=0.4")
          .to('.cb-desc', { opacity: 1, y: 0, duration: 0.6 }, "-=0.4")
          .to('.cb-meta-block', { opacity: 1, y: 0, duration: 0.5, stagger: 0.05 }, "-=0.4")
          .to('.cb-scroll-indicator', { opacity: 1, duration: 0.8 }, "-=0.2");
      }

      // --- SECTION 01 ANIMATION ---
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        // Desktop / Laptop: Pinned Scrub Timeline
        
        // Initial state
        gsap.set('.cb-s1-statement', { opacity: 0, y: 12, pointerEvents: 'none' });
        gsap.set('.cb-anno', { opacity: 0 });
        
        const modules = gsap.utils.toArray('.cb-mod', pinRef.current);
        const size = 50;
        
        // INITIAL (Pre-animation bridge) - Dispersed loosely
        gsap.set(modules, {
          x: i => ((i % 3) - 1) * (size * 1.8),
          y: i => (Math.floor(i / 3) - 1) * (size * 1.8),
          z: i => ((i % 3) - 1) * 20,
          opacity: 'var(--c1-module-context)'
        });
        gsap.set('.cb-scene', { rotateX: 60, rotateZ: -45 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pinRef.current,
            pin: true,
            scrub: 1,
            start: 'top top',
            end: '+=300%'
          }
        });

        // 1. UNDERSTAND
        tl.to('.cb-state-understand', { opacity: 1, y: 0, duration: 1 }, "understand")
          .to(modules, {
            x: i => ((i % 3) - 1) * (size * 1.2),
            y: i => (Math.floor(i / 3) - 1) * (size * 1.2),
            z: 0,
            opacity: 'var(--c1-module-active)',
            duration: 1.5
          }, "understand")
          .to('.cb-anno-u', { opacity: 1, duration: 1 }, "understand+=0.5")

        // 2. EXPLORE
        tl.to('.cb-state-understand', { opacity: 0, y: -12, duration: 1 }, "explore")
          .to('.cb-anno-u', { opacity: 0, duration: 0.5 }, "explore")
          .to('.cb-state-explore', { opacity: 1, y: 0, duration: 1 }, "explore+=1")
          .to(modules, {
            x: i => {
              const row = Math.floor(i / 3);
              const col = i % 3;
              if (row === 0) return (col - 1) * size - 80;
              if (row === 2) return (col - 1) * size + 80;
              return (col - 1) * size;
            },
            y: i => {
              const row = Math.floor(i / 3);
              const col = i % 3;
              if (row === 0) return (row - 1) * size - 80;
              if (row === 2) return (row - 1) * size + 80;
              return (row - 1) * size;
            },
            opacity: 'var(--c1-module-context)',
            duration: 1.5
          }, "explore")
          .to('.cb-anno-e', { opacity: 1, duration: 1 }, "explore+=1")

        // 3. CHOOSE
        tl.to('.cb-state-explore', { opacity: 0, y: -12, duration: 1 }, "choose")
          .to('.cb-anno-e', { opacity: 0, duration: 0.5 }, "choose")
          .to('.cb-state-choose', { opacity: 1, y: 0, duration: 1 }, "choose+=1")
          .to(modules, {
            x: i => {
              const row = Math.floor(i / 3);
              const col = i % 3;
              if (row === 0) return (col - 1) * size - 30;
              if (row === 2) return (col - 1) * size + 30;
              return (col - 1) * size;
            },
            y: i => {
              const row = Math.floor(i / 3);
              const col = i % 3;
              if (row === 0) return (row - 1) * size - 30;
              if (row === 2) return (row - 1) * size + 30;
              return (row - 1) * size;
            },
            opacity: i => {
              const row = Math.floor(i / 3);
              return row === 1 ? 'var(--c1-module-active)' : 'var(--c1-module-bg)';
            },
            duration: 1.5
          }, "choose")
          .to('.cb-scene', { rotateX: 65, rotateZ: -35, duration: 1.5 }, "choose")

        // 4. SOURCE (FINAL)
        tl.to('.cb-state-choose', { opacity: 0, y: -12, duration: 1 }, "source")
          .to('.cb-state-source', { opacity: 1, y: 0, pointerEvents: 'auto', duration: 1 }, "source+=1")
          .to(modules, {
            x: i => ((i % 3) - 1) * (size * 1.05),
            y: i => (Math.floor(i / 3) - 1) * (size * 1.05),
            z: i => {
              const row = Math.floor(i / 3);
              return row === 1 ? 20 : 0; // Pop the middle row slightly
            },
            opacity: 'var(--c1-module-active)',
            duration: 1.5
          }, "source")
          .to('.cb-scene', { rotateX: 55, rotateZ: -50, duration: 1.5 }, "source");
      });

      mm.add("(max-width: 1023px)", () => {
        // Mobile / Tablet: Sequential Storytelling
        const blocks = gsap.utils.toArray('.cb-m-block', mobileRef.current);
        blocks.forEach((block, idx) => {
          gsap.fromTo(block, 
            { opacity: 0, y: 30 },
            {
              opacity: 1, 
              y: 0, 
              duration: 0.8,
              scrollTrigger: {
                trigger: block,
                start: 'top 85%',
                once: true
              }
            }
          );
        });
      });

    });

    return () => ctx.revert();
  }, []);

  return (
    <main className="cubicon-case-study">
      

      {/* --- DESKTOP / LAPTOP --- */}
      <section className="cb-s1-desktop" ref={sectionRef}>
        <div className="cb-s1-opening">
          <span className="cb-s1-label">01 — UNDERSTANDING THE SYSTEM</span>
          <h2 className="cb-s1-headline">A design system is more<br/>than a library of components.</h2>
          <p className="cb-s1-body">
            I started by understanding the principles that make a system coherent, then compared established systems before choosing one to apply.
          </p>
        </div>

        <div className="cb-s1-pin" ref={pinRef}>
          <div className="cb-s1-left">
            <div className="cb-s1-statement cb-state-understand">
              <h3>Consistency comes from<br/>shared rules.</h3>
            </div>
            <div className="cb-s1-statement cb-state-explore">
              <h3>I compared how established<br/>systems created consistency.</h3>
            </div>
            <div className="cb-s1-statement cb-state-choose">
              <h3>The system had to fit<br/>the product, not just look good.</h3>
              <p>Material Design became the framework I would take further.</p>
            </div>
            <div className="cb-s1-statement cb-state-source">
              <h3>So I went to the source.</h3>
              <p>Material Design 3<br/>Component anatomy · spacing · interaction patterns</p>
            </div>
          </div>
          
          <div className="cb-s1-right">
            <div className="cb-scene-wrapper">
              <div className="cb-scene">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className={\cb-mod cb-mod-\\}>
                    <div className="cb-mod-inner">
                      <div className="cb-face cb-top"></div>
                      <div className="cb-face cb-front"></div>
                      <div className="cb-face cb-right"></div>
                    </div>
                  </div>
                ))}
                
                {/* Annotations */}
                <div className="cb-anno cb-anno-u cb-anno-purpose">PURPOSE</div>
                <div className="cb-anno cb-anno-u cb-anno-structure">STRUCTURE</div>
                <div className="cb-anno cb-anno-u cb-anno-consistency">CONSISTENCY</div>
                
                <div className="cb-anno cb-anno-e cb-anno-polaris">POLARIS</div>
                <div className="cb-anno cb-anno-e cb-anno-md">MATERIAL DESIGN</div>
                <div className="cb-anno cb-anno-e cb-anno-apple">APPLE HIG</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- PHONE / TABLET --- */}
      <section className="cb-s1-mobile" ref={mobileRef}>
        <div className="cb-s1-opening">
          <span className="cb-s1-label">01 — UNDERSTANDING THE SYSTEM</span>
          <h2 className="cb-s1-headline">A design system is more<br/>than a library of components.</h2>
          <p className="cb-s1-body">
            I started by understanding the principles that make a system coherent, then compared established systems before choosing one to apply.
          </p>
        </div>

        <div className="cb-m-block">
          <h3>Consistency comes from<br/>shared rules.</h3>
          <div className="cb-m-visual cb-m-understand">
            <div className="cb-scene cb-scene-m-u">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className={\cb-mod\}>
                    <div className="cb-mod-inner">
                      <div className="cb-face cb-top"></div>
                      <div className="cb-face cb-front"></div>
                      <div className="cb-face cb-right"></div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className="cb-m-block">
          <h3>I compared how established<br/>systems created consistency.</h3>
          <div className="cb-m-visual cb-m-explore">
             <div className="cb-scene cb-scene-m-e">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className={\cb-mod\}>
                    <div className="cb-mod-inner">
                      <div className="cb-face cb-top"></div>
                      <div className="cb-face cb-front"></div>
                      <div className="cb-face cb-right"></div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className="cb-m-block">
          <h3>The system had to fit<br/>the product, not just look good.</h3>
          <p>Material Design became the framework I would take further.</p>
          <div className="cb-m-visual cb-m-choose">
             <div className="cb-scene cb-scene-m-c">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className={\cb-mod cb-mod-row-\\}>
                    <div className="cb-mod-inner">
                      <div className="cb-face cb-top"></div>
                      <div className="cb-face cb-front"></div>
                      <div className="cb-face cb-right"></div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className="cb-m-block cb-m-final">
          <h3>So I went to the source.</h3>
          <p>Material Design 3<br/>Component anatomy · spacing · interaction patterns</p>
          <div className="cb-m-visual cb-m-source">
             <div className="cb-scene cb-scene-m-s">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className={\cb-mod cb-mod-row-\\}>
                    <div className="cb-mod-inner">
                      <div className="cb-face cb-top"></div>
                      <div className="cb-face cb-front"></div>
                      <div className="cb-face cb-right"></div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

      </section>

    </main>
  );
}
;

fs.writeFileSync(jsxPath, newJsx);

const newCss = 
/* ============================================================
   CUBICON GLOBAL SETUP
   ============================================================ */
.cubicon-case-study {
  width: 100%;
  min-height: 100vh;
  background-color: var(--bg);
}

/* Hero is preserved entirely in actual file, but we must inject Hero CSS if it was deleted.
   I will append Section 01 CSS to existing file to preserve Hero. */
;
// Let's rewrite Cubicon.css carefully.
// The user says: "Remove unused Section 01 rules... Verify Hero untouched."
