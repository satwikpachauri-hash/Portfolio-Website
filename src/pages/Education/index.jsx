import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './EducationPage.css';

gsap.registerPlugin(ScrollTrigger);

const CREDENTIALS = [
  {
    degree: 'Bachelor of Design, UI/UX',
    institution: 'UPES',
    period: '2023 – 2027',
  },
  {
    degree: 'Senior Secondary Education',
    institution: 'Delhi Public World School',
    period: 'May 2019 – Mar 2023',
  }
];

export default function Education() {
  const pageRef = useRef(null);
  
  // Intro
  const introRef = useRef(null);
  
  // Map Section (Pinned Container)
  const mapSectionRef = useRef(null);

  // Mobile Map
  const mobileMapRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Education — Satwik Pachauri';
  }, []);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      
      // 1. Intro Entrance (Mount animation for balanced landing frame)
      const introTl = gsap.timeline({ delay: 0.1 });
      introTl
        .from('.edu-marker', { y: 10, opacity: 0, duration: 0.5, ease: 'power2.out' })
        .from('.edu-heading', { y: 16, opacity: 0, duration: 0.6, ease: 'power2.out' }, '-=0.3')
        .from('.edu-supporting', { y: 12, opacity: 0, duration: 0.5, ease: 'power2.out' }, '-=0.3')
        .from('.edu-credentials > div', {
          y: 10, opacity: 0, duration: 0.4, stagger: 0.1, ease: 'power2.out'
        }, '-=0.2');

      // 2. Desktop Map Assembly (Pinned with Smooth Damped Scrub)
      const desktopMap = document.querySelector('.edu-map-desktop');
      if (desktopMap && window.innerWidth >= 1024) {
        
        // Initial hidden states
        gsap.set('.edu-line', { strokeDasharray: 100, strokeDashoffset: 100 });
        gsap.set(['.edu-node', '.edu-synthesis p'], { opacity: 0, y: 12 });

        const mapTl = gsap.timeline({
          scrollTrigger: {
            trigger: mapSectionRef.current,
            start: 'top 12%', // Leaves safe zone for navbar
            end: '+=240vh', // Controlled total scroll distance
            scrub: 1.5, // Damped, cinematic scroll smoothing
            pin: true,
            invalidateOnRefresh: true,
          }
        });

        // Phase 0: Intro header recedes gracefully as scroll starts
        mapTl.to('.edu-intro', { y: -25, opacity: 0.2, duration: 1, ease: 'power1.out' });

        // Phase 1: Anchor settles calmly in center
        mapTl.to('.edu-node--anchor', { opacity: 1, y: 0, duration: 1, ease: 'power2.out' })
             .to({}, { duration: 0.5 }); // Short hold

        // Phase 2: Research connects (Appear → Connect → Settle)
        mapTl.to('.edu-node--research', { opacity: 1, y: 0, duration: 1, ease: 'power2.out' })
             .to('.line-research', { strokeDashoffset: 0, duration: 1, ease: 'none' }, '<')
             .to('.edu-node--anchor', { scale: 1.01, duration: 0.3, ease: 'power1.out' }, '>')
             .to('.edu-node--anchor', { scale: 1, duration: 0.3, ease: 'power1.inOut' })
             .to({}, { duration: 0.5 }); // Hold

        // Phase 3: Structure connects
        mapTl.to('.edu-node--structure', { opacity: 1, y: 0, duration: 1, ease: 'power2.out' })
             .to('.line-structure', { strokeDashoffset: 0, duration: 1, ease: 'none' }, '<')
             .to('.edu-node--anchor', { scale: 1.01, duration: 0.3, ease: 'power1.out' }, '>')
             .to('.edu-node--anchor', { scale: 1, duration: 0.3, ease: 'power1.inOut' })
             .to({}, { duration: 0.5 }); // Hold

        // Phase 4: Interaction connects
        mapTl.to('.edu-node--interaction', { opacity: 1, y: 0, duration: 1, ease: 'power2.out' })
             .to('.line-interaction', { strokeDashoffset: 0, duration: 1, ease: 'none' }, '<')
             .to('.edu-node--anchor', { scale: 1.01, duration: 0.3, ease: 'power1.out' }, '>')
             .to('.edu-node--anchor', { scale: 1, duration: 0.3, ease: 'power1.inOut' })
             .to({}, { duration: 0.5 }); // Hold

        // Phase 5: Visual Communication connects
        mapTl.to('.edu-node--viscomm', { opacity: 1, y: 0, duration: 1, ease: 'power2.out' })
             .to('.line-viscomm', { strokeDashoffset: 0, duration: 1, ease: 'none' }, '<')
             .to('.edu-node--anchor', { scale: 1.01, duration: 0.3, ease: 'power1.out' }, '>')
             .to('.edu-node--anchor', { scale: 1, duration: 0.3, ease: 'power1.inOut' })
             .to({}, { duration: 0.5 }); // Hold

        // Phase 6: Making connects & Full Map Hold
        mapTl.to('.edu-node--making', { opacity: 1, y: 0, duration: 1, ease: 'power2.out' })
             .to('.line-making', { strokeDashoffset: 0, duration: 1, ease: 'none' }, '<')
             .to('.edu-node--anchor', { scale: 1.01, duration: 0.3, ease: 'power1.out' }, '>')
             .to('.edu-node--anchor', { scale: 1, duration: 0.3, ease: 'power1.inOut' })
             .to({}, { duration: 2.0 }); // SUBSTANTIAL FULL MAP HOLD

        // Phase 7: Sequential Synthesis Reveal
        mapTl.to('.edu-synthesis p:first-child', { opacity: 1, y: 0, duration: 1.0, ease: 'power2.out' })
             .to('.edu-syn-highlight', { opacity: 1, y: 0, duration: 1.0, ease: 'power2.out' }, '+=0.2')
             .to({}, { duration: 1.0 }); // Reading hold before unpinning
      }

      // 3. Mobile/Tablet Stacked Map Entrance
      if (mobileMapRef.current && window.innerWidth < 1024) {
        const nodes = mobileMapRef.current.querySelectorAll('.edu-mob-node');
        const synthesis = mobileMapRef.current.nextElementSibling;
        
        const mobTl = gsap.timeline({
          scrollTrigger: {
            trigger: mobileMapRef.current,
            start: 'top 75%',
          }
        });
        
        mobTl.from(nodes, {
          y: 16, opacity: 0, duration: 0.6, stagger: 0.15, ease: 'power2.out'
        });
        
        gsap.from(synthesis, {
          y: 12, opacity: 0, duration: 0.6, ease: 'power2.out',
          scrollTrigger: {
            trigger: synthesis,
            start: 'top 85%'
          }
        });
      }

    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className="education-page" ref={pageRef}>
      <div className="education-wrapper">
        
        {/* ── INTRO / LANDING FRAME ── */}
        <header className="edu-intro" ref={introRef}>
          <p className="edu-marker">EDUCATION / 01</p>
          <h1 className="edu-heading">Built across disciplines.</h1>
          <p className="edu-supporting">
            Learning interaction design meant learning to connect people, systems, behaviour and visual communication.
          </p>

          <div className="edu-credentials">
            {CREDENTIALS.map((cred, i) => (
              <div key={i} style={{ marginBottom: i === 0 ? '24px' : '0' }}>
                <h2 className="edu-cred-degree">{cred.degree}</h2>
                <p className="edu-cred-inst">{cred.institution}</p>
                <p className="edu-cred-date">{cred.period}</p>
              </div>
            ))}
          </div>
        </header>

        {/* ── MAP SECTION ── */}
        <section className="edu-map-section" ref={mapSectionRef}>
          
          <div className="edu-map-desktop">
            {/* SVG Connection Lines */}
            <svg className="edu-lines-svg">
              <line className="edu-line line-research" x1="50%" y1="12%" x2="50%" y2="45%" pathLength="100" />
              <line className="edu-line line-structure" x1="18%" y1="38%" x2="50%" y2="45%" pathLength="100" />
              <line className="edu-line line-interaction" x1="82%" y1="38%" x2="50%" y2="45%" pathLength="100" />
              <line className="edu-line line-viscomm" x1="30%" y1="75%" x2="50%" y2="45%" pathLength="100" />
              <line className="edu-line line-making" x1="70%" y1="75%" x2="50%" y2="45%" pathLength="100" />
            </svg>

            {/* Nodes */}
            <div className="edu-node edu-node--anchor" tabIndex="0">
              <h3 className="edu-node-title">INTERACTION DESIGN</h3>
            </div>

            <div className="edu-node edu-node--research" tabIndex="0">
              <h3 className="edu-node-title">RESEARCH</h3>
              <p className="edu-node-context">People · Context · Problems</p>
            </div>

            <div className="edu-node edu-node--structure" tabIndex="0">
              <h3 className="edu-node-title">STRUCTURE</h3>
              <p className="edu-node-context">Information architecture · Flows · Systems</p>
            </div>

            <div className="edu-node edu-node--interaction" tabIndex="0">
              <h3 className="edu-node-title">INTERACTION</h3>
              <p className="edu-node-context">Behaviour · Feedback · Prototyping</p>
            </div>

            <div className="edu-node edu-node--viscomm" tabIndex="0">
              <h3 className="edu-node-title">VISUAL COMMUNICATION</h3>
              <p className="edu-node-context">Hierarchy · Typography · Composition</p>
            </div>

            <div className="edu-node edu-node--making" tabIndex="0">
              <h3 className="edu-node-title">MAKING</h3>
              <p className="edu-node-context">Prototype · Implementation</p>
            </div>
          </div>

          {/* ── LEARNING MAP (MOBILE/TABLET) ── */}
          <div className="edu-map-mobile" ref={mobileMapRef}>
            <div className="edu-mob-node edu-mob-node--anchor">
              <h3 className="edu-mob-title">INTERACTION DESIGN</h3>
              <p className="edu-mob-context">Primary direction</p>
            </div>

            <div className="edu-mob-node">
              <h3 className="edu-mob-title">RESEARCH</h3>
              <p className="edu-mob-context">People · Context · Problems</p>
            </div>

            <div className="edu-mob-node">
              <h3 className="edu-mob-title">STRUCTURE</h3>
              <p className="edu-mob-context">Information architecture · Flows · Systems</p>
            </div>

            <div className="edu-mob-node">
              <h3 className="edu-mob-title">INTERACTION</h3>
              <p className="edu-mob-context">Behaviour · Feedback · Prototyping</p>
            </div>

            <div className="edu-mob-node edu-mob-node--viscomm">
              <h3 className="edu-mob-title">VISUAL COMMUNICATION</h3>
              <p className="edu-mob-context">Hierarchy · Typography · Composition</p>
            </div>

            <div className="edu-mob-node">
              <h3 className="edu-mob-title">MAKING</h3>
              <p className="edu-mob-context">Prototype · Implementation</p>
            </div>
          </div>
          
          {/* ── SYNTHESIS ── */}
          <div className="edu-synthesis">
            <p>The value wasn't learning these separately.</p>
            <p className="edu-syn-highlight">It was learning how they connect.</p>
          </div>
          
        </section>
      </div>
    </main>
  );
}
