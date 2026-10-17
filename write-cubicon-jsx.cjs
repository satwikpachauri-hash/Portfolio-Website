const fs = require('fs');
const content = 
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './Cubicon.css';

export default function Cubicon() {
  const heroRef = useRef(null);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Cubicon - Satwik Pachauri';
  }, []);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      if (prefersReduced) {
        gsap.set('.cb-anim', { opacity: 1, y: 0, scale: 1 });
        return;
      }

      gsap.set('.cb-visual', { opacity: 0, scale: 0.98 });
      gsap.set('.cb-title-wrap', { opacity: 0, y: 20 });
      gsap.set('.cb-desc', { opacity: 0, y: 15 });
      gsap.set('.cb-meta-item', { opacity: 0, y: 10 });
      gsap.set('.cb-scroll-cue', { opacity: 0 });

      // Match media for different animations based on device size
      const mm = gsap.matchMedia();

      // Laptop / Desktop Animation
      mm.add("(min-width: 1024px)", () => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        tl.to('.cb-visual', { opacity: 1, scale: 1, duration: 1.2, delay: 0.1 })
          .to('.cb-title-wrap', { opacity: 1, y: 0, duration: 0.8 }, "-=1.0")
          .to('.cb-desc', { opacity: 1, y: 0, duration: 0.8 }, "-=0.7")
          .to('.cb-meta-item', { opacity: 1, y: 0, duration: 0.6, stagger: 0.05 }, "-=0.6")
          .to('.cb-scroll-cue', { opacity: 1, duration: 1 }, "-=0.2");
      });

      // Phone / Tablet Animation
      mm.add("(max-width: 1023px)", () => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        // title + desc reveal -> visual -> meta
        tl.to('.cb-title-wrap', { opacity: 1, y: 0, duration: 0.6, delay: 0.1 })
          .to('.cb-desc', { opacity: 1, y: 0, duration: 0.6 }, "-=0.4")
          .to('.cb-visual', { opacity: 1, scale: 1, duration: 0.8 }, "-=0.3")
          .to('.cb-meta-item', { opacity: 1, y: 0, duration: 0.5, stagger: 0.05 }, "-=0.4");
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className=\\"cubicon-case-study\\">
      <section className=\\"cb-hero\\" ref={heroRef}>
        <div className=\\"cb-hero-layout\\">
          
          <div className=\\"cb-hero-text\\">
            <div className=\\"cb-title-wrap cb-anim\\">
              <span className=\\"cb-identifier\\">CASE STUDY</span>
              <h1 className=\\"cb-title\\">Cubicon</h1>
            </div>
            
            <p className=\\"cb-desc cb-anim\\">
              A niche e-commerce experience for Rubik’s cube enthusiasts,
              designed through Material Design 3.
            </p>

            <div className=\\"cb-metadata\\">
              <div className=\\"cb-meta-item cb-anim\\">
                <span className=\\"cb-meta-label\\">ROLE</span>
                <span className=\\"cb-meta-val\\">Interaction Designer</span>
              </div>
              <div className=\\"cb-meta-item cb-anim\\">
                <span className=\\"cb-meta-label\\">TYPE</span>
                <span className=\\"cb-meta-val\\">E-Commerce</span>
              </div>
              <div className=\\"cb-meta-item cb-anim\\">
                <span className=\\"cb-meta-label\\">SYSTEM</span>
                <span className=\\"cb-meta-val\\">Material Design 3</span>
              </div>
              <div className=\\"cb-meta-item cb-anim\\">
                <span className=\\"cb-meta-label\\">PLATFORM</span>
                <span className=\\"cb-meta-val\\">Mobile</span>
              </div>
            </div>
          </div>

          <div className=\\"cb-hero-visual-wrapper cb-visual cb-anim\\">
            <img 
              src=\\"/assets/projects/cubicon-hero.webp\\" 
              alt=\\"Cubicon e-commerce app mockup\\" 
              className=\\"cb-hero-img\\"
              width=\\"1000\\"
              height=\\"800\\"
            />
          </div>
          
        </div>
        
        <div className=\\"cb-scroll-cue cb-anim\\">
          <span>SCROLL</span>
          <div className=\\"cb-scroll-line\\"></div>
        </div>
      </section>
    </main>
  );
}
;
fs.writeFileSync('src/pages/case-studies/cubicon/Cubicon.jsx', content, 'utf8');
