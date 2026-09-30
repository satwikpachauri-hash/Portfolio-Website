import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ExperiencePage.css';

gsap.registerPlugin(ScrollTrigger);

// ── Verified data — independent copy. Homepage component is not modified.
const DESIGN_ENTRIES = [
  {
    id: 'ui-ux-2025',
    num: '01',
    org: '1 Artifact Decor',
    role: 'UI/UX Designer',
    year: '2025',
    period: 'Jun – Jul 2025',
    location: 'Agra, Uttar Pradesh, India',
    context: 'Worked on UI/UX initiatives and collaborated with the graphic design team on a product catalogue, contributing to interface refinement, visual structure, and information layout.',
    contributions: [
      'Contributed to interface refinement and information layout for a product catalogue.',
      'Collaborated with the graphic design team to align visual structure across materials.',
      'Supported product presentation through user-facing design decisions.',
    ],
  },
  {
    id: 'graphic-2024',
    num: '02',
    org: 'Gramrajya Vikas Evam Prashikshan Sansthan',
    orgShort: 'GVPS',
    role: 'Graphic Designer',
    year: '2024',
    period: 'Jun – Jul 2024',
    location: 'Jaipur, Rajasthan, India',
    context: 'Designed educational presentations and visual materials around social issues, translating complex topics into accessible visual communication.',
    contributions: null,
    // No approved visual artifact. No image used. No Ethos Share. No unrelated artifact.
  },
];

const EARLIER_ENTRIES = [
  {
    id: 'retail-2022',
    num: '03',
    year: '2022',
    period: 'November 2022',
    org: 'India International Trade Fair',
    role: 'Retail Sales Lead',
    location: 'Pragati Maidan, New Delhi',
    context: 'Led an assigned trade-fair stall, managing product selection, pricing, negotiation, and promotional offers.',
  },
  {
    id: 'merchandiser-2022',
    num: '04',
    year: '2022',
    period: 'October 2022',
    org: '1 Artifact Decor',
    role: 'Merchandiser',
    location: 'Greater Noida, Uttar Pradesh, India',
    context: 'Represented 1 Artifact Décor at the IHGF Delhi Fair, handling international client enquiries and coordinating product requirements between two exhibition stalls.',
  },
  {
    id: 'retail-2021',
    num: '05',
    year: '2021',
    period: 'November 2021',
    org: 'India International Trade Fair',
    role: 'Retail Sales Lead',
    location: 'Pragati Maidan, New Delhi',
    context: 'Led an assigned trade-fair stall, managing product selection, pricing, negotiation, and promotional offers.',
  },
];

export default function Experience() {
  const pageRef   = useRef(null);
  // Intro refs
  const markerRef      = useRef(null);
  const headingRef     = useRef(null);
  const supportingRef  = useRef(null);
  // Group label refs
  const designLabelRef = useRef(null);
  const earlierLabelRef= useRef(null);
  // Design entry refs — one per entry
  const primaryRef  = useRef(null);   // 01 – 1 Artifact Decor
  const gvpsRef     = useRef(null);   // 02 – GVPS
  // Bridge ref
  const bridgeRef   = useRef(null);
  // Earlier entries ref
  const earlierRef  = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Experience — Satwik Pachauri';
  }, []);

  useEffect(() => {
    // ── Respect prefers-reduced-motion ──────────────────────────
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {

      // ─────────────────────────────────────────────────────────
      // INTRO — page-load entrance, no ScrollTrigger
      // ─────────────────────────────────────────────────────────
      const introTl = gsap.timeline({ delay: 0.1 });
      introTl
        .from(markerRef.current, {
          y: 10, opacity: 0, duration: 0.5, ease: 'power2.out',
        })
        .from(headingRef.current, {
          y: 18, opacity: 0, duration: 0.6, ease: 'power2.out',
        }, '-=0.3')
        .from(supportingRef.current, {
          y: 12, opacity: 0, duration: 0.5, ease: 'power2.out',
        }, '-=0.25');

      // ─────────────────────────────────────────────────────────
      // DESIGN EXPERIENCE label
      // ─────────────────────────────────────────────────────────
      gsap.from(designLabelRef.current, {
        y: 8, opacity: 0, duration: 0.45, ease: 'power2.out',
        scrollTrigger: {
          trigger: designLabelRef.current,
          start: 'top 80%',
          once: true,
        },
      });

      // ─────────────────────────────────────────────────────────
      // PRIMARY DESIGN ENTRY — 1 Artifact Decor
      // 5-stage: rule → date → org/role → context → contributions
      // ─────────────────────────────────────────────────────────
      if (primaryRef.current) {
        const el = primaryRef.current;
        const rule      = el.querySelector('.exp-record-rule-anim');
        const metaNum   = el.querySelector('.exp-entry-num');
        const metaYear  = el.querySelector('.exp-entry-year');
        const metaPer   = el.querySelector('.exp-entry-period');
        const metaLoc   = el.querySelector('.exp-entry-location');
        const org       = el.querySelector('.exp-entry-org');
        const role      = el.querySelector('.exp-entry-role');
        const context   = el.querySelector('.exp-entry-context');
        const contribs  = el.querySelectorAll('.exp-contribution');

        const primaryTl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: 'top 72%',
            once: true,
          },
        });

        // Stage 1 — rule extends
        if (rule) {
          primaryTl.from(rule, {
            scaleX: 0.1, opacity: 0.4, duration: 0.55, ease: 'power3.out',
            transformOrigin: 'left center',
          });
        }

        // Stage 2 — date/period gain emphasis
        primaryTl.from([metaNum, metaYear, metaPer, metaLoc].filter(Boolean), {
          y: 10, opacity: 0, duration: 0.4, ease: 'power2.out', stagger: 0.05,
        }, rule ? '-=0.2' : 0);

        // Stage 3 — org + role settle
        primaryTl.from(org, {
          y: 16, opacity: 0, duration: 0.5, ease: 'power2.out',
        }, '-=0.25');
        primaryTl.from(role, {
          y: 10, opacity: 0, duration: 0.4, ease: 'power2.out',
        }, '-=0.35');

        // Stage 4 — context
        if (context) {
          primaryTl.from(context, {
            y: 10, opacity: 0, duration: 0.45, ease: 'power2.out',
          }, '-=0.2');
        }

        // Stage 5 — contributions stagger
        if (contribs.length) {
          primaryTl.from(contribs, {
            y: 10, opacity: 0, duration: 0.38, ease: 'power2.out',
            stagger: 0.08,
          }, '-=0.15');
        }

        // Focus class — adds .exp-entry--focus while in reading zone
        ScrollTrigger.create({
          trigger: el,
          start: 'top 60%',
          end: 'bottom 20%',
          onEnter: ()      => el.classList.add('exp-entry--focus'),
          onLeave: ()      => el.classList.remove('exp-entry--focus'),
          onEnterBack: ()  => el.classList.add('exp-entry--focus'),
          onLeaveBack: ()  => el.classList.remove('exp-entry--focus'),
        });
      }

      // ─────────────────────────────────────────────────────────
      // GVPS ENTRY — typographic only, no imagery, no Ethos Share
      // ─────────────────────────────────────────────────────────
      if (gvpsRef.current) {
        const el = gvpsRef.current;
        const rule     = el.querySelector('.exp-record-rule-anim');
        const metaNum  = el.querySelector('.exp-entry-num');
        const metaYear = el.querySelector('.exp-entry-year');
        const metaPer  = el.querySelector('.exp-entry-period');
        const metaLoc  = el.querySelector('.exp-entry-location');
        const org      = el.querySelector('.exp-entry-org');
        const role     = el.querySelector('.exp-entry-role');
        const context  = el.querySelector('.exp-entry-context');

        const gvpsTl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: 'top 74%',
            once: true,
          },
        });

        if (rule) {
          gvpsTl.from(rule, {
            scaleX: 0.1, opacity: 0.4, duration: 0.5, ease: 'power3.out',
            transformOrigin: 'left center',
          });
        }
        gvpsTl.from([metaNum, metaYear, metaPer, metaLoc].filter(Boolean), {
          y: 8, opacity: 0, duration: 0.35, ease: 'power2.out', stagger: 0.04,
        }, '-=0.2');
        gvpsTl.from(org, {
          y: 14, opacity: 0, duration: 0.45, ease: 'power2.out',
        }, '-=0.2');
        gvpsTl.from(role, {
          y: 8, opacity: 0, duration: 0.35, ease: 'power2.out',
        }, '-=0.3');
        if (context) {
          gvpsTl.from(context, {
            y: 8, opacity: 0, duration: 0.4, ease: 'power2.out',
          }, '-=0.15');
        }
      }

      // ─────────────────────────────────────────────────────────
      // BRIDGE
      // ─────────────────────────────────────────────────────────
      if (bridgeRef.current) {
        gsap.from(bridgeRef.current.children, {
          y: 8, opacity: 0, duration: 0.4, ease: 'power2.out', stagger: 0.08,
          scrollTrigger: {
            trigger: bridgeRef.current,
            start: 'top 78%',
            once: true,
          },
        });
      }

      // ─────────────────────────────────────────────────────────
      // EARLIER EXPERIENCE label
      // ─────────────────────────────────────────────────────────
      if (earlierLabelRef.current) {
        gsap.from(earlierLabelRef.current, {
          y: 8, opacity: 0, duration: 0.4, ease: 'power2.out',
          scrollTrigger: {
            trigger: earlierLabelRef.current,
            start: 'top 80%',
            once: true,
          },
        });
      }

      // ─────────────────────────────────────────────────────────
      // EARLIER RECORDS — lighter, grouped stagger
      // ─────────────────────────────────────────────────────────
      if (earlierRef.current) {
        const rows = earlierRef.current.querySelectorAll('.exp-secondary-entry');
        gsap.from(rows, {
          y: 14, opacity: 0, duration: 0.45, ease: 'power2.out', stagger: 0.1,
          scrollTrigger: {
            trigger: earlierRef.current,
            start: 'top 78%',
            once: true,
          },
        });
      }

    }, pageRef); // scoped context

    return () => ctx.revert(); // cleanup on unmount — kills all triggers in scope

  }, []);

  return (
    <main className="exp-page" ref={pageRef}>
      <div className="exp-wrapper">

        {/* ── INTRO ── */}
        <header className="exp-intro">
          <p className="exp-marker" ref={markerRef}>EXPERIENCE / 01</p>
          <h1 className="exp-heading" ref={headingRef}>Work, in practice.</h1>
          <p className="exp-supporting" ref={supportingRef}>
            The environments where design met constraints, collaboration and responsibility.
          </p>
        </header>

        {/* ─── DESIGN EXPERIENCE ─── */}
        <section className="exp-design-group" aria-labelledby="design-exp-label">
          <p className="exp-group-label" id="design-exp-label" ref={designLabelRef}>
            Design Experience
          </p>

          {/* 01 — 1 Artifact Decor */}
          <article className="exp-primary-entry" ref={primaryRef}>
            {/* Animatable rule — separate from the ::before pseudo so GSAP can target it */}
            <div className="exp-record-rule-anim" aria-hidden="true" />

            <div className="exp-meta-col">
              <span className="exp-entry-num">{DESIGN_ENTRIES[0].num}</span>
              <span className="exp-entry-year">{DESIGN_ENTRIES[0].year}</span>
              <span className="exp-entry-period">{DESIGN_ENTRIES[0].period}</span>
              <span className="exp-entry-location">{DESIGN_ENTRIES[0].location}</span>
            </div>

            <div className="exp-content-col">
              <h2 className="exp-entry-org">{DESIGN_ENTRIES[0].org}</h2>
              <p className="exp-entry-role">{DESIGN_ENTRIES[0].role}</p>
              <p className="exp-entry-context">{DESIGN_ENTRIES[0].context}</p>
              <ul className="exp-contributions" aria-label="Contributions">
                {DESIGN_ENTRIES[0].contributions.map((c, i) => (
                  <li key={i} className="exp-contribution">
                    <span className="exp-c-num" aria-hidden="true">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <p className="exp-c-text">{c}</p>
                  </li>
                ))}
              </ul>
            </div>
          </article>

          {/* 02 — GVPS — typographic only. No image. No Ethos Share. No artifact. */}
          <article className="exp-secondary-entry" ref={gvpsRef}>
            <div className="exp-record-rule-anim" aria-hidden="true" />

            <div className="exp-meta-col">
              <span className="exp-entry-num">{DESIGN_ENTRIES[1].num}</span>
              <span className="exp-entry-year">{DESIGN_ENTRIES[1].year}</span>
              <span className="exp-entry-period">{DESIGN_ENTRIES[1].period}</span>
              <span className="exp-entry-location">{DESIGN_ENTRIES[1].location}</span>
            </div>

            <div className="exp-content-col">
              <h2 className="exp-entry-org">{DESIGN_ENTRIES[1].org}</h2>
              <p className="exp-entry-role">{DESIGN_ENTRIES[1].role}</p>
              <p className="exp-entry-context">{DESIGN_ENTRIES[1].context}</p>
            </div>
          </article>
        </section>

        {/* ─── BRIDGE ─── */}
        <div className="exp-bridge" role="separator" ref={bridgeRef}>
          <p className="exp-bridge-label">Earlier</p>
          <p className="exp-bridge-statement">
            Earlier roles added customer-facing and commercial experience before design practice became the focus.
          </p>
        </div>

        {/* ─── EARLIER EXPERIENCE ─── */}
        <section className="exp-earlier-group" aria-labelledby="earlier-exp-label">
          <p
            className="exp-group-label"
            id="earlier-exp-label"
            ref={earlierLabelRef}
            style={{ borderTop: 'none', paddingTop: 0 }}
          >
            Earlier Experience
          </p>
          <div className="exp-earlier-entries" ref={earlierRef}>
            {EARLIER_ENTRIES.map((e) => (
              <article className="exp-secondary-entry" key={e.id}>
                <div className="exp-record-rule-anim" aria-hidden="true" />

                <div className="exp-meta-col">
                  <span className="exp-entry-num">{e.num}</span>
                  <span className="exp-entry-year">{e.year}</span>
                  <span className="exp-entry-period">{e.period}</span>
                  <span className="exp-entry-location">{e.location}</span>
                </div>

                <div className="exp-content-col">
                  <h2 className="exp-entry-org">{e.org}</h2>
                  <p className="exp-entry-role">{e.role}</p>
                  <p className="exp-entry-context">{e.context}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}
