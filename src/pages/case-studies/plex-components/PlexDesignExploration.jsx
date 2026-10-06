import React, { useRef, useLayoutEffect } from 'react';
import { motion } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Hand, Layers, Pointer, Layout, 
  Scan, Link2Off, Target, Link, 
  PieChart, Search, Focus, Eye, 
  Settings, Filter, Folder, Star 
} from 'lucide-react';
import CaseStudySectionChip from './CaseStudySectionChip';
import './PlexDesignExploration.css';

gsap.registerPlugin(ScrollTrigger);

/* ─── Comparison data (unchanged) ─────────────────────────── */
const comparisons = [
  {
    id: "homepage",
    title: "Homepage",
    initialImage: "/case-studies/plex/assets/wireframes/Iteration 1.webp",
    finalImage: "/case-studies/plex/assets/wireframes/Iteration 1 Fixed.webp",
    initialAlt: "Homepage initial design",
    finalAlt: "Homepage final design",
    problems: [
      { text: "Brain Dump required excessive thumb reach during one-handed use.", icon: Hand },
      { text: "The interface prioritized planning before helping users understand their day.", icon: Layers }
    ],
    solutions: [
      { text: "Brain Dump moved into the natural interaction zone.", icon: Pointer },
      { text: "Information hierarchy reorganized to emphasize today's workload first.", icon: Layout }
    ]
  },
  {
    id: "schedule",
    title: "Schedule",
    initialImage: "/case-studies/plex/assets/wireframes/Iteration 2.webp",
    finalImage: "/case-studies/plex/assets/wireframes/Iteration 2 Fixed.webp",
    initialAlt: "Schedule initial design",
    finalAlt: "Schedule final design",
    problems: [
      { text: "Active tasks blended with upcoming tasks, reducing scanability.", icon: Scan },
      { text: "Long-term goals felt disconnected from today's schedule.", icon: Link2Off }
    ],
    solutions: [
      { text: "Active work is visually prioritized.", icon: Target },
      { text: "Goals and daily planning are connected through contextual scheduling.", icon: Link }
    ]
  },
  {
    id: "analytics",
    title: "Analytics",
    initialImage: "/case-studies/plex/assets/wireframes/Iteration 3.webp",
    finalImage: "/case-studies/plex/assets/wireframes/Iteration 3 Fixed.webp",
    initialAlt: "Analytics initial design",
    finalAlt: "Analytics final design",
    problems: [
      { text: "Every metric competed equally for attention.", icon: PieChart },
      { text: "Users had to interpret multiple charts before understanding progress.", icon: Search }
    ],
    solutions: [
      { text: "Primary insights receive clear visual priority.", icon: Focus },
      { text: "Analytics communicate progress at a glance.", icon: Eye }
    ]
  },
  {
    id: "profile",
    title: "Profile",
    initialImage: "/case-studies/plex/assets/wireframes/Iteration 4.webp",
    finalImage: "/case-studies/plex/assets/wireframes/Iteration 4 Fixed.webp",
    initialAlt: "Profile initial design",
    finalAlt: "Profile final design",
    problems: [
      { text: "Settings lacked clear organization.", icon: Settings },
      { text: "Frequently used controls were mixed with secondary options.", icon: Filter }
    ],
    solutions: [
      { text: "Related settings are grouped logically.", icon: Folder },
      { text: "Frequently accessed controls receive higher visual priority.", icon: Star }
    ]
  }
];

/* ─── Marker count ─────────────────────────────────────────── */
const MARKER_COUNT = 10;

/* ══════════════════════════════════════════════════════════════
   ITERATION STATISTIC — scroll-driven counter
   ══════════════════════════════════════════════════════════════ */
function IterationStat() {
  const sectionRef  = useRef(null);
  const numRef      = useRef(null);   // the numeric text node wrapper
  const plusRef     = useRef(null);   // "+" sign
  const lineRef     = useRef(null);   // progress line fill
  const markersRef  = useRef([]);     // marker array

  useLayoutEffect(() => {
    const prefersReduced =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (prefersReduced) {
        /* Reduced motion: show final state immediately */
        if (numRef.current)   numRef.current.textContent = '150';
        if (lineRef.current)  gsap.set(lineRef.current, { scaleX: 1 });
        markersRef.current.forEach(m => m && gsap.set(m, { opacity: 0.6 }));
        return;
      }

      /* ── Counter object for GSAP to tween ──────────────── */
      const counter = { val: 0 };

      /* ── Animated proxy object ─────────────────────────── */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          end:   'bottom 60%',
          scrub: 1.2,
        },
      });

      /* Number counts 0 → 150 */
      tl.to(counter, {
        val: 150,
        duration: 1,
        ease: 'power1.inOut',
        onUpdate: () => {
          if (numRef.current) {
            numRef.current.textContent = Math.round(counter.val);
          }
        },
      }, 0);

      /* Progress line expands left → right */
      tl.fromTo(
        lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 1, ease: 'power1.inOut' },
        0
      );

      /* Markers appear staggered */
      tl.to(
        markersRef.current,
        {
          opacity: 0.55,
          duration: 0.05,
          stagger: {
            each: 1 / MARKER_COUNT,
            from: 'start',
          },
          ease: 'none',
        },
        0
      );

      /* "+" settles to accent color at the very end */
      tl.to(
        plusRef.current,
        {
          color: 'var(--accent)',
          duration: 0.15,
          ease: 'none',
        },
        0.9 /* 90% through the scrub */
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="iteration-stat" ref={sectionRef}>
      {/* ── Number ─────────────────────────────────────── */}
      <div className="iteration-number font-display" aria-label="150+">
        {/* Stable reserved container prevents layout jitter */}
        <span className="iteration-digits" ref={numRef}>0</span>
        <span className="iteration-plus" ref={plusRef}>+</span>
      </div>

      {/* ── Label ─────────────────────────────────────── */}
      <p className="iteration-label">DESIGN ITERATIONS</p>

      {/* ── Progress track ────────────────────────────── */}
      <div className="iteration-track" aria-hidden="true">
        <div className="iteration-track-fill" ref={lineRef} />
        {Array.from({ length: MARKER_COUNT }).map((_, i) => (
          <div
            key={i}
            className="iteration-marker"
            style={{ left: `${((i + 1) / (MARKER_COUNT + 1)) * 100}%` }}
            ref={el => (markersRef.current[i] = el)}
          />
        ))}
      </div>

      {/* ── Description ───────────────────────────────── */}
      <p className="iteration-desc">
        Design iterations created throughout the development of Plex.
      </p>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   ROOT SECTION
   ══════════════════════════════════════════════════════════════ */
export default function PlexDesignExploration() {
  return (
    <section className="plex-design-exploration" id="process">
      
      {/* Header — unchanged */}
      <motion.div 
        className="exploration-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <CaseStudySectionChip title="PROCESS" number="06" />
        <h2 className="font-display">Design Exploration</h2>
        <p>Every screen went through multiple iterations before reaching its final form. Each redesign solved specific usability problems rather than simply improving aesthetics.</p>
      </motion.div>

      {/* ── 150+ Statistic (replaces the two PNG boards) ── */}
      <IterationStat />

      {/* Comparisons — completely unchanged */}
      <div className="comparisons-container">
        {comparisons.map((comp) => (
          <div className="comparison-block" key={comp.id}>
            
            <motion.h3 
              className="comparison-title font-display"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {comp.title}
            </motion.h3>

            <div className="comparison-images">
              <motion.div 
                className="comparison-side"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <div className="comparison-label">INITIAL DESIGN</div>
                <img src={comp.initialImage} alt={comp.initialAlt} className="comparison-img" loading="lazy" />
              </motion.div>

              <motion.div 
                className="comparison-side"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
              >
                <div className="comparison-label">FINAL DESIGN</div>
                <img src={comp.finalImage} alt={comp.finalAlt} className="comparison-img" loading="lazy" />
              </motion.div>
            </div>

            <motion.div 
              className="comparison-details"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            >
              <div className="detail-column">
                <h4 className="detail-title">Problems</h4>
                <ul className="detail-list problem-list">
                  {comp.problems.map((prob, i) => (
                    <li key={`prob-${i}`}>
                      <prob.icon className="detail-icon problem-icon" aria-hidden="true" />
                      <span>{prob.text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="detail-column">
                <h4 className="detail-title">Solutions</h4>
                <ul className="detail-list solution-list">
                  {comp.solutions.map((sol, i) => (
                    <li key={`sol-${i}`}>
                      <sol.icon className="detail-icon solution-icon" aria-hidden="true" />
                      <span>{sol.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

          </div>
        ))}
      </div>

    </section>
  );
}
