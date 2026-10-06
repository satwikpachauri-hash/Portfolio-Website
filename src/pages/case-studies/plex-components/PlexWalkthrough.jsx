import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CaseStudySectionChip from './CaseStudySectionChip';
import './PlexWalkthrough.css';

gsap.registerPlugin(ScrollTrigger);

/* ─── Asset paths ─────────────────────────────────────────── */
const ASSETS = {
  homepage:    '/case-studies/plex/assets/mockups/Homepage.webp',
  schedule:    '/case-studies/plex/assets/mockups/Schedule Page.webp',
  futureGoals: '/case-studies/plex/assets/mockups/Future Goals Page.webp',
  analytics1:  '/case-studies/plex/assets/mockups/Analytics Page 1.webp',
  analytics2:  '/case-studies/plex/assets/mockups/Analytics Page 2.webp',
  sleep:       '/case-studies/plex/assets/mockups/Sleep Schedule Page.webp',
  privacy:     '/case-studies/plex/assets/mockups/Privacy Page.webp',
};

/* ─── Typed lines for Brain Dump ──────────────────────────── */
const TYPED_LINES = [
  'Need to finish portfolio by Friday',
  'Practice JLPT for 45 minutes',
  'Gym tomorrow evening',
  'Apply to Oracle internship',
];

const TAGS = [
  '→ Deadline detected',
  '→ Estimated duration',
  '→ Preferred time identified',
  '→ High priority',
];

const TASK_CARDS = [
  { title: 'Portfolio',             meta: 'Today • 2h 30m • High Priority' },
  { title: 'JLPT Practice',        meta: '45 min • Study' },
  { title: 'Gym Session',          meta: 'Tomorrow • Recovery' },
  { title: 'Oracle Internship',    meta: 'Application • Medium Priority' },
];

/* ─── Responsive helper ────────────────────────────────────── */
function getBreakpoint() {
  const w = window.innerWidth;
  if (w >= 1280) return 'desktop';
  if (w >= 1024) return 'laptop';
  if (w >= 768)  return 'tablet';
  return 'phone';
}

/* ══════════════════════════════════════════════════════════════
   BRAIN DUMP — Desktop / Laptop cinematic (GSAP pinned)
   ══════════════════════════════════════════════════════════════ */
function BrainDumpDesktop() {
  const sectionRef    = useRef(null);
  const sceneRef      = useRef(null);
  const linesRef      = useRef([]);
  const tagsRef       = useRef([]);
  const cardsRef      = useRef([]);
  const inputLayerRef = useRef(null);
  const cardLayerRef  = useRef(null);
  const dashWrapRef   = useRef(null);
  const masksRef      = useRef([]);
  const cursorRef     = useRef([]);

  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const bp = getBreakpoint();
    if (bp === 'tablet' || bp === 'phone') return;

    const ctx = gsap.context(() => {
      const vh = window.innerHeight;
      // Scroll distance: desktop ~6000px, laptop ~6000px (long pinning to give animation room to breathe)
      const scrollDist = Math.max(6000, vh * 6);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: `+=${scrollDist}`,
          pin: true,
          scrub: prefersReduced ? false : 1, // original smooth scrub
          pinSpacing: true,
          anticipatePin: 1,
        },
      });

      // ── Initial states ──────────────────────────────────────
      TYPED_LINES.forEach((_, i) => {
        if (linesRef.current[i]) linesRef.current[i].textContent = '';
        gsap.set(cursorRef.current[i], { opacity: 0 });
      });
      gsap.set(tagsRef.current,     { opacity: 0, x: -10 });
      gsap.set(cardLayerRef.current,{ opacity: 1 });
      gsap.set(cardsRef.current,    { opacity: 0, y: 20, scale: 0.95 });
      gsap.set(dashWrapRef.current, { opacity: 0 });
      gsap.set(masksRef.current,    { opacity: 1 }); // masks fully covering image initially
      gsap.set(sceneRef.current,    { scale: 1 });

      if (!prefersReduced) {
        // STAGE 1 — typing lines progressively
        TYPED_LINES.forEach((line, i) => {
          const lineObj = { chars: 0 };
          
          // Show cursor
          tl.set(cursorRef.current[i], { opacity: 1 });
          
          // Type text progressively
          tl.to(lineObj, {
            chars: line.length,
            duration: 2.5,
            ease: 'none',
            onUpdate: () => {
              if (linesRef.current[i]) {
                linesRef.current[i].textContent = line.substring(0, Math.round(lineObj.chars));
              }
            }
          });

          // Hold briefly
          tl.to({}, { duration: 0.5 }); 

          // Hide cursor
          tl.set(cursorRef.current[i], { opacity: 0 });
        });

        // STAGE 2 — interpretation tags
        tl.addLabel('tags', '>');
        tl.to(tagsRef.current, { 
          opacity: 1, 
          x: 0, 
          duration: 1, 
          stagger: 0.3,
          ease: 'power2.out' 
        }, 'tags');

        tl.to({}, { duration: 1.5 }); // hold to read

        // STAGE 3 — structuring (fade input layer, cards appear)
        tl.addLabel('structuring', '>');
        tl.to(inputLayerRef.current, { opacity: 0, y: -20, duration: 1 }, 'structuring');

        tl.addLabel('cardsIn', 'structuring+=0.5'); 
        tl.to(cardsRef.current, { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          duration: 1.5, 
          ease: 'power2.out',
          stagger: 0.4 
        }, 'cardsIn');

        // STAGE 4 — cards exit
        tl.addLabel('cardsHold', '>');
        tl.to({}, { duration: 2 }); // readable hold for cards

        tl.addLabel('cardsOut', '>');
        tl.to(cardsRef.current, { 
          opacity: 0, 
          y: 50, 
          duration: 1, 
          stagger: 0.2,
          ease: 'power1.inOut'
        }, 'cardsOut');

        // STAGE 5 — dashboard appears
        tl.addLabel('dashIn', 'cardsOut+=0.5'); // overlap slightly with cards leaving
        tl.to(dashWrapRef.current, { opacity: 1, duration: 1 }, 'dashIn');

        // STAGE 6 — mask assembly sequence
        tl.addLabel('masksOut', 'dashIn+=1'); 
        tl.to(masksRef.current, { 
          opacity: 0, 
          duration: 1, 
          stagger: {
            each: 0.8 // overlap of approx 0.2 (1s duration - 0.8s stagger delay)
          },
          ease: 'power1.inOut'
        }, 'masksOut');

        // Final hold before unpinning
        tl.to({}, { duration: 3 });

        // Separate continuous subtle camera push
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top top',
          end: `+=${scrollDist}`,
          scrub: 1,
          animation: gsap.to(sceneRef.current, { scale: 1.05, ease: 'none', force3D: true })
        });

      } else {
        // Reduced motion fallback
        TYPED_LINES.forEach((line, i) => {
          if (linesRef.current[i]) linesRef.current[i].textContent = line;
        });
        gsap.set(tagsRef.current,     { opacity: 1, x: 0 });
        gsap.set(cardLayerRef.current,{ opacity: 0 }); // cards hidden
        gsap.set(dashWrapRef.current, { opacity: 1 });
        gsap.set(masksRef.current,    { opacity: 0 });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="wt-braindum-desktop" ref={sectionRef}>
      <div className="wt-bd-inner">
        {/* ── Left: static label ────────────────────────── */}
        <div className="wt-bd-meta">
          <p className="wt-feature-num">01</p>
          <h3 className="wt-feature-title font-display">Brain Dump</h3>
          <p className="wt-feature-desc">
            Brain Dump transforms unstructured thoughts into organized, actionable tasks.
          </p>
        </div>

        {/* ── Right: animated scene ─────────────────────── */}
        <div className="wt-bd-scene-wrap">
          <div className="wt-bd-scene" ref={sceneRef}>
            {/* ── INPUT LAYER ──────────────────────────────── */}
            <div className="wt-bd-input-layer" ref={inputLayerRef}>
              <div className="wt-bd-input-box">
                <p className="wt-bd-input-hint">What's on your mind?</p>
                {TYPED_LINES.map((line, i) => (
                  <div key={i} className="wt-bd-line">
                    <div className="wt-bd-typing-wrapper">
                      <span className="wt-bd-line-text" ref={el => (linesRef.current[i] = el)} />
                      <span className="wt-bd-cursor" ref={el => (cursorRef.current[i] = el)}>|</span>
                    </div>
                    {/* Inline tag */}
                    <span className="wt-bd-tag" ref={el => (tagsRef.current[i] = el)}>
                      {TAGS[i]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── CARD LAYER ───────────────────────────────── */}
            <div className="wt-bd-card-layer" ref={cardLayerRef}>
              {TASK_CARDS.map((card, i) => (
                <div
                  key={i}
                  className="wt-bd-card"
                  ref={el => (cardsRef.current[i] = el)}
                >
                  <span className="wt-bd-card-title">{card.title}</span>
                  <span className="wt-bd-card-meta">{card.meta}</span>
                </div>
              ))}
            </div>

            {/* ── DASHBOARD LAYER ──────────────────────────── */}
            <div className="wt-bd-dash-wrap" ref={dashWrapRef}>
              <img
                src={ASSETS.homepage}
                alt="Plex Homepage"
                className="wt-bd-dash-img"
                draggable={false}
              />
              {/* Reveal masks covering sections of the image */}
              {['Greeting', 'Overview', 'Focus', 'Tasks', 'Goals'].map((label, i) => (
                <div
                  key={label}
                  className={`wt-bd-mask wt-bd-mask--${i + 1}`}
                  ref={el => (masksRef.current[i] = el)}
                  aria-hidden="true"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   BRAIN DUMP — Tablet / Phone  (vertical, NO pin)
   Each stage is independently triggered as it enters the viewport.
   ══════════════════════════════════════════════════════════════ */
function BrainDumpMobile() {
  /* Per-element refs so each item can animate individually */
  const lineRefs      = useRef([]);   // 4 raw input lines
  const tagRefs       = useRef([]);   // 4 interpretation rows
  const tagDividers   = useRef([]);   // dividers between tag rows
  const inputBoxRef   = useRef(null); // the whole input box (stage A container)
  const interpBoxRef  = useRef(null); // interpretation container
  const cardRefs      = useRef([]);   // 4 task cards
  const cardsWrapRef  = useRef(null); // outer wrapper for cards group
  const dashRef       = useRef(null); // homepage image

  useLayoutEffect(() => {
    const prefersReduced =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      /* ── If reduced motion: just show everything instantly ── */
      if (prefersReduced) {
        gsap.set(
          [
            ...lineRefs.current,
            ...tagRefs.current,
            ...tagDividers.current,
            interpBoxRef.current,
            ...cardRefs.current,
            cardsWrapRef.current,
            dashRef.current,
          ],
          { opacity: 1, clearProps: 'all' }
        );
        return;
      }

      /* ────────────────────────────────────────────────────────
         STAGE A  —  Raw input lines stagger in one by one
         Triggered when the input box approaches the viewport.
      ──────────────────────────────────────────────────────── */
      gsap.set(lineRefs.current, { opacity: 0, y: 14 });

      ScrollTrigger.create({
        trigger: inputBoxRef.current,
        start: 'top 82%',
        onEnter: () => {
          gsap.to(lineRefs.current, {
            opacity: 1,
            y: 0,
            duration: 0.52,
            ease: 'power2.out',
            stagger: 0.2,
          });
        },
        onLeaveBack: () => {
          gsap.to(lineRefs.current, {
            opacity: 0,
            y: 14,
            duration: 0.32,
            stagger: { each: 0.08, from: 'end' },
          });
        },
      });

      /* ────────────────────────────────────────────────────────
         STAGE B  —  Interpretation rows reveal one by one.
         The input box also softens slightly to signal "processed."
      ──────────────────────────────────────────────────────── */
      gsap.set(interpBoxRef.current, { opacity: 0, y: 20 });
      gsap.set(tagRefs.current, { opacity: 0, x: 14 });
      gsap.set(tagDividers.current, { scaleX: 0, transformOrigin: 'left center' });

      ScrollTrigger.create({
        trigger: interpBoxRef.current,
        start: 'top 82%',
        onEnter: () => {
          /* Slightly dim the raw input box to show it's been processed */
          gsap.to(inputBoxRef.current, {
            opacity: 0.45,
            y: -6,
            duration: 0.5,
            ease: 'power1.inOut',
          });

          /* Slide interpretation container up into view */
          gsap.to(interpBoxRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.55,
            ease: 'power2.out',
          });

          /* Stagger each tag row + its divider */
          tagRefs.current.forEach((el, i) => {
            const delay = 0.25 + i * 0.18;
            gsap.to(el, {
              opacity: 1,
              x: 0,
              duration: 0.42,
              delay,
              ease: 'power2.out',
            });
            if (tagDividers.current[i]) {
              gsap.to(tagDividers.current[i], {
                scaleX: 1,
                duration: 0.35,
                delay: delay + 0.1,
                ease: 'power1.out',
              });
            }
          });
        },
        onLeaveBack: () => {
          /* Restore raw input box */
          gsap.to(inputBoxRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.4,
          });
          gsap.to(interpBoxRef.current, { opacity: 0, y: 20, duration: 0.35 });
          gsap.to(tagRefs.current, { opacity: 0, x: 14, duration: 0.25 });
          gsap.to(tagDividers.current, { scaleX: 0, duration: 0.2 });
        },
      });

      /* ────────────────────────────────────────────────────────
         STAGE C  —  Task cards enter one by one.
         Interpretation block softens as cards appear.
      ──────────────────────────────────────────────────────── */
      gsap.set(cardsWrapRef.current, { opacity: 1 }); // wrapper stays visible
      gsap.set(cardRefs.current, { opacity: 0, y: 40, scale: 0.97 });

      ScrollTrigger.create({
        trigger: cardsWrapRef.current,
        start: 'top 82%',
        onEnter: () => {
          /* Interpretation box fades slightly as tasks emerge */
          gsap.to(interpBoxRef.current, {
            opacity: 0.4,
            y: -8,
            duration: 0.5,
            ease: 'power1.inOut',
          });

          /* Cards stagger in */
          cardRefs.current.forEach((el, i) => {
            const delay = i * 0.22;

            gsap.to(el, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.55,
              delay,
              ease: 'power2.out',
              onComplete: () => {
                /* Briefly accent the card as it arrives, then settle */
                gsap.to(el, {
                  borderColor: 'var(--accent)',
                  duration: 0.2,
                  ease: 'none',
                  yoyo: true,
                  repeat: 1,
                  onComplete: () =>
                    gsap.to(el, {
                      borderColor: 'var(--border)',
                      duration: 0.4,
                    }),
                });
              },
            });
          });
        },
        onLeaveBack: () => {
          /* Restore interpretation box */
          gsap.to(interpBoxRef.current, { opacity: 1, y: 0, duration: 0.35 });
          gsap.to(cardRefs.current, {
            opacity: 0,
            y: 40,
            scale: 0.97,
            duration: 0.35,
            stagger: { each: 0.08, from: 'end' },
          });
        },
      });

      /* ────────────────────────────────────────────────────────
         STAGE D  —  Homepage mockup reveals as the final result.
         dashRef is on the WRAPPER div, not the <img>.
         No scale — only opacity + tiny y to prevent layout jitter.
      ──────────────────────────────────────────────────────── */
      gsap.set(dashRef.current, {
        opacity: 0,
        y: 22,
        force3D: true,        // promote to GPU compositor layer from the start
        immediateRender: true, // apply the initial state NOW, not on first tick
      });

      ScrollTrigger.create({
        trigger: dashRef.current,
        start: 'top 85%',
        onEnter: () => {
          /* Card group settles slightly to make room for the dashboard */
          gsap.to(cardsWrapRef.current, {
            opacity: 0.55,
            y: -6,
            duration: 0.5,
            ease: 'power1.inOut',
            force3D: true,
          });

          gsap.to(dashRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            force3D: true,
            // Prevent any layout-triggering intermediate states
            clearProps: 'none',
          });
        },
        onLeaveBack: () => {
          /* Restore card group */
          gsap.to(cardsWrapRef.current, { opacity: 1, y: 0, duration: 0.4, force3D: true });
          gsap.to(dashRef.current, {
            opacity: 0,
            y: 22,
            duration: 0.35,
            force3D: true,
          });
        },
      });
    }); /* end gsap.context */

    return () => ctx.revert();
  }, []);

  return (
    <div className="wt-braindum-mobile">
      {/* Heading */}
      <div className="wt-feature-header">
        <p className="wt-feature-num">01</p>
        <h3 className="wt-feature-title font-display">Brain Dump</h3>
        <p className="wt-feature-desc">
          Brain Dump transforms unstructured thoughts into organized, actionable tasks.
        </p>
      </div>

      {/* ── Stage A — Raw input ───────────────────────────────── */}
      <div className="wt-mob-stage">
        <div className="wt-bd-input-box" ref={inputBoxRef}>
          <p className="wt-bd-input-hint">What's on your mind?</p>
          {TYPED_LINES.map((line, i) => (
            <div
              key={i}
              className="wt-bd-line"
              ref={el => (lineRefs.current[i] = el)}
            >
              <span className="wt-bd-line-text">{line}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Stage B — Interpretation ─────────────────────────── */}
      <div className="wt-mob-stage">
        <div className="wt-bd-input-box wt-bd-interp-box" ref={interpBoxRef}>
          {TAGS.map((tag, i) => (
            <React.Fragment key={i}>
              <div
                className="wt-bd-tag-row"
                ref={el => (tagRefs.current[i] = el)}
              >
                <span className="wt-bd-tag">{tag}</span>
              </div>
              {i < TAGS.length - 1 && (
                <div
                  className="wt-bd-tag-divider"
                  ref={el => (tagDividers.current[i] = el)}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* ── Stage C — Structured task cards ──────────────────── */}
      <div className="wt-mob-stage" ref={cardsWrapRef}>
        <div className="wt-bd-card-layer wt-bd-card-layer--static">
          {TASK_CARDS.map((card, i) => (
            <div
              key={i}
              className="wt-bd-card wt-bd-card--mobile"
              ref={el => (cardRefs.current[i] = el)}
            >
              <span className="wt-bd-card-title">{card.title}</span>
              <span className="wt-bd-card-meta">{card.meta}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Stage D — Homepage result ─────────────────────────── */}
      <div className="wt-mob-stage">
        {/* Stable wrapper — layout is reserved here so the image appearing
            cannot cause a reflow. GSAP only touches this wrapper. */}
        <div className="wt-bd-dash-wrapper" ref={dashRef}>
          <img
            src={ASSETS.homepage}
            alt="Plex Homepage — the result of Brain Dump"
            className="wt-mob-img"
            draggable={false}
            loading="eager"
            decoding="sync"
          />
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   SIMPLE FEATURE — scroll-reveal with image
   ══════════════════════════════════════════════════════════════ */
function SimpleFeature({ num, title, desc, imgs = [], imgAlts = [] }) {
  const refs = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      refs.current.forEach((el, i) => {
        if (!el) return;
        if (!prefersReduced) gsap.set(el, { opacity: 0, y: 32, scale: i > 0 ? 0.97 : 1 });
        ScrollTrigger.create({
          trigger: el,
          start: 'top 78%',
          onEnter:     () => gsap.to(el, { opacity: 1, y: 0, scale: 1, duration: 0.65, delay: i * 0.15, ease: 'power2.out' }),
          onLeaveBack: () => gsap.to(el, { opacity: 0, y: 32, scale: i > 0 ? 0.97 : 1, duration: 0.4 }),
        });
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="wt-simple-feature">
      <div className="wt-feature-header" ref={el => (refs.current[0] = el)}>
        <p className="wt-feature-num">{num}</p>
        <h3 className="wt-feature-title font-display">{title}</h3>
        <p className="wt-feature-desc">{desc}</p>
      </div>

      <div className={`wt-imgs-wrap ${imgs.length > 1 ? 'wt-imgs-wrap--dual' : ''}`}>
        {imgs.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={imgAlts[i] || title}
            className="wt-feature-img"
            draggable={false}
            ref={el => (refs.current[i + 1] = el)}
          />
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   PRIVACY — Desktop / Laptop (GSAP pinned)
   ══════════════════════════════════════════════════════════════ */
function PrivacyDesktop() {
  const sectionRef = useRef(null);
  const word1Ref   = useRef(null);
  const word2Ref   = useRef(null);
  const word3Ref   = useRef(null);
  const imgRef     = useRef(null);

  useLayoutEffect(() => {
    const bp = getBreakpoint();
    if (bp === 'tablet' || bp === 'phone') return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      const vh = window.innerHeight;
      const scrollDist = Math.max(1200, vh * 1.8);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: `+=${scrollDist}`,
          pin: true,
          scrub: prefersReduced ? false : 0.9,
          pinSpacing: true,
        },
      });

      gsap.set([word1Ref.current, word2Ref.current, word3Ref.current], { opacity: 0 });
      gsap.set(imgRef.current, { opacity: 0, scale: 0.97 });

      if (!prefersReduced) {
        tl.to(word1Ref.current, { opacity: 1, duration: 0.3 }, 0)
          .to(word1Ref.current, { opacity: 0, duration: 0.3 }, 0.35)
          .to(word2Ref.current, { opacity: 1, duration: 0.3 }, 0.5)
          .to(word2Ref.current, { opacity: 0, duration: 0.3 }, 0.85)
          .to(word3Ref.current, { opacity: 1, duration: 0.3 }, 1.0)
          .to(word3Ref.current, { opacity: 0, duration: 0.3 }, 1.35)
          .to(imgRef.current,   { opacity: 1, scale: 1, duration: 0.4 }, 1.55);
      } else {
        gsap.set([word3Ref.current, imgRef.current], { opacity: 1, scale: 1 });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="wt-privacy-desktop" ref={sectionRef}>
      <div className="wt-privacy-inner">
        <div className="wt-feature-header wt-feature-header--center">
          <p className="wt-feature-num">06</p>
          <h3 className="wt-feature-title font-display">Privacy</h3>
          <p className="wt-feature-desc">Your plans, preferences, and personal data remain on your device.</p>
        </div>
        <div className="wt-privacy-stage">
          <span className="wt-privacy-word" ref={word1Ref}>Local.</span>
          <span className="wt-privacy-word" ref={word2Ref}>Private.</span>
          <span className="wt-privacy-word" ref={word3Ref}>Yours.</span>
          <img
            src={ASSETS.privacy}
            alt="Plex Privacy Screen"
            className="wt-privacy-img"
            ref={imgRef}
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   PRIVACY — Tablet / Phone (vertical, no pin)
   ══════════════════════════════════════════════════════════════ */
function PrivacyMobile() {
  const refs = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      refs.current.forEach(el => {
        if (!el) return;
        if (!prefersReduced) gsap.set(el, { opacity: 0, y: 20 });
        ScrollTrigger.create({
          trigger: el,
          start: 'top 85%',
          onEnter:     () => gsap.to(el, { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' }),
          onLeaveBack: () => gsap.to(el, { opacity: 0, y: 20, duration: 0.35 }),
        });
      });
    });
    return () => ctx.revert();
  }, []);

  const words = ['Local.', 'Private.', 'Yours.'];

  return (
    <div className="wt-privacy-mobile">
      <div className="wt-feature-header">
        <p className="wt-feature-num">06</p>
        <h3 className="wt-feature-title font-display">Privacy</h3>
        <p className="wt-feature-desc">Your plans, preferences, and personal data remain on your device.</p>
      </div>
      {words.map((w, i) => (
        <div key={i} className="wt-privacy-word-row" ref={el => (refs.current[i] = el)}>
          <span className="wt-privacy-word wt-privacy-word--stacked">{w}</span>
        </div>
      ))}
      <img
        src={ASSETS.privacy}
        alt="Privacy screen"
        className="wt-mob-img"
        draggable={false}
        ref={el => (refs.current[3] = el)}
      />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   ROOT SECTION — orchestrates responsive display
   ══════════════════════════════════════════════════════════════ */
export default function PlexWalkthrough() {
  // Responsive: show desktop or mobile brain dump / privacy
  const [bp, setBp] = React.useState(() => getBreakpoint());

  React.useEffect(() => {
    const handler = () => setBp(getBreakpoint());
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  const isDesktopLaptop = bp === 'desktop' || bp === 'laptop';

  return (
    <section className="plex-walkthrough" id="walkthrough">
      {/* Section header */}
      <div className="wt-section-header">
        <CaseStudySectionChip number="08" title="WALKTHROUGH" />
      </div>

      {/* 01 — Brain Dump */}
      {isDesktopLaptop ? <BrainDumpDesktop /> : <BrainDumpMobile />}

      {/* 02 — Smart Scheduling */}
      <SimpleFeature
        num="02"
        title="Smart Scheduling"
        desc="Plans are created around real life instead of ideal conditions."
        imgs={[ASSETS.schedule]}
        imgAlts={['Plex Schedule Page']}
      />

      {/* 03 — Future Goals */}
      <SimpleFeature
        num="03"
        title="Future Goals"
        desc="Long-term ambitions become manageable through gradual, consistent progress."
        imgs={[ASSETS.futureGoals]}
        imgAlts={['Plex Future Goals Page']}
      />

      {/* 04 — Analytics */}
      <SimpleFeature
        num="04"
        title="Analytics"
        desc="Progress is measured through consistency, not pressure."
        imgs={[ASSETS.analytics1, ASSETS.analytics2]}
        imgAlts={['Analytics overview', 'Analytics detail']}
      />

      {/* 05 — Healthy Productivity */}
      <SimpleFeature
        num="05"
        title="Healthy Productivity"
        desc="Productive days begin with sustainable routines and proper recovery."
        imgs={[ASSETS.sleep]}
        imgAlts={['Plex Sleep Schedule Page']}
      />

      {/* 06 — Privacy */}
      {isDesktopLaptop ? <PrivacyDesktop /> : <PrivacyMobile />}
    </section>
  );
}
