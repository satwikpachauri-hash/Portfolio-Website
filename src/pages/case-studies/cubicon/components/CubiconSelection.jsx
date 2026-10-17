import React from 'react';
import googleLogo from '../../../../assets/brand-logos/google-logo.svg';
import appleLogo from '../../../../assets/brand-logos/apple-logo.svg';
import shopifyLogo from '../../../../assets/brand-logos/shopify-logo.svg';

// Authentic Material Design Study Assets
import shrine1 from '../../../../assets/cubicon/material/shrine/shrine1.png';
import shrine3 from '../../../../assets/cubicon/material/shrine/shrine3.png';
import owl1 from '../../../../assets/cubicon/material/owl/owl1.png';
import owl4 from '../../../../assets/cubicon/material/owl/owl4.png';
import crane1 from '../../../../assets/cubicon/material/crane/crane1.png';
import crane2 from '../../../../assets/cubicon/material/crane/crane2.png';
import crane3 from '../../../../assets/cubicon/material/crane/crane3.png';

import CaseStudySectionChip from './CaseStudySectionChip';
import './CubiconSelection.css';

export default function CubiconSelection() {
  return (
    <section className="cubicon-selection-section" id="section-04">
      <div className="cs-container">

        {/* ===================================================================
            SECTION HEADER
            =================================================================== */}
        <header className="cs-header-block">
          <CaseStudySectionChip number="03" title="DESIGN SYSTEM SELECTION" />
          <h2 className="cs-section-title font-display">Why I chose Material Design&nbsp;3.</h2>
          <p className="cs-section-intro font-body">
            I chose Material Design 3 for its structured guidelines, familiar Android patterns and adaptability to Cubicon.
          </p>
        </header>

        {/* ===================================================================
            PART A: THE SELECTION & THREE DECISION FACTORS
            =================================================================== */}
        <div className="cs-part-a">
          {/* Design Systems Explored -> Selection Bar */}
          <div className="cs-systems-bar font-body">
            <div className="cs-system-pill cs-system-selected">
              <div className="cs-system-logo-wrap">
                <img src={googleLogo} alt="Google Material Design 3" className="cs-system-logo" />
              </div>
              <span className="cs-system-name">Material Design 3</span>
              <span className="cs-selected-tag">Selected</span>
            </div>

            <div className="cs-system-pill cs-system-muted">
              <div className="cs-system-logo-wrap cs-apple-logo-wrap">
                <img src={appleLogo} alt="Apple Human Interface Guidelines" className="cs-system-logo" />
              </div>
              <span className="cs-system-name">Apple HIG</span>
            </div>

            <div className="cs-system-pill cs-system-muted">
              <div className="cs-system-logo-wrap">
                <img src={shopifyLogo} alt="Shopify Polaris" className="cs-system-logo" />
              </div>
              <span className="cs-system-name">Shopify Polaris</span>
            </div>
          </div>

          {/* Three Decision Factors Restrained Composition */}
          <div className="cs-factors-row">
            {/* Factor 1: Familiar patterns */}
            <div className="cs-factor-card">
              <div className="cs-factor-preview">
                <svg viewBox="0 0 260 140" className="cs-factor-svg" aria-hidden="true">
                  {/* M3 Search / Top Bar */}
                  <rect x="16" y="14" width="228" height="28" rx="14" className="svg-m3-bar" />
                  <circle cx="32" cy="28" r="4.5" className="svg-m3-dot" />
                  <line x1="46" y1="28" x2="110" y2="28" className="svg-m3-line" />
                  <circle cx="230" cy="28" r="5.5" className="svg-m3-avatar" />

                  {/* Filter Chips with 8dp spacing */}
                  <rect x="16" y="50" width="66" height="20" rx="8" className="svg-m3-chip active" />
                  <circle cx="27" cy="60" r="3" className="svg-chip-icon" />
                  <line x1="36" y1="60" x2="68" y2="60" className="svg-chip-text active" />
                  
                  <rect x="90" y="50" width="60" height="20" rx="8" className="svg-m3-chip" />
                  <line x1="102" y1="60" x2="138" y2="60" className="svg-chip-text" />
                  
                  <rect x="158" y="50" width="60" height="20" rx="8" className="svg-m3-chip" />
                  <line x1="170" y1="60" x2="206" y2="60" className="svg-chip-text" />

                  {/* Surface Card with 12dp rounded corners and content hierarchy */}
                  <rect x="16" y="78" width="162" height="48" rx="12" className="svg-m3-card" />
                  <line x1="30" y1="94" x2="95" y2="94" className="svg-m3-line" />
                  <line x1="30" y1="106" x2="140" y2="106" className="svg-m3-line-light" />
                  
                  {/* Floating Action Button (FAB) with 16dp radius */}
                  <rect x="194" y="78" width="50" height="48" rx="16" className="svg-m3-fab" />
                  <line x1="219" y1="94" x2="219" y2="110" className="svg-m3-fab-icon" />
                  <line x1="211" y1="102" x2="227" y2="102" className="svg-m3-fab-icon" />
                </svg>
              </div>
              <h3 className="cs-factor-title font-body">Familiar patterns</h3>
            </div>

            {/* Factor 2: Clear structure */}
            <div className="cs-factor-card">
              <div className="cs-factor-preview">
                <svg viewBox="0 0 260 140" className="cs-factor-svg" aria-hidden="true">
                  {/* Structural 8dp rhythm baseline grid */}
                  <line x1="16" y1="18" x2="244" y2="18" className="svg-grid-line" />
                  <line x1="16" y1="66" x2="244" y2="66" className="svg-grid-line" />
                  <line x1="16" y1="122" x2="244" y2="122" className="svg-grid-line" />
                  <line x1="16" y1="18" x2="16" y2="122" className="svg-grid-line" />
                  <line x1="130" y1="18" x2="130" y2="122" className="svg-grid-line" />
                  <line x1="244" y1="18" x2="244" y2="122" className="svg-grid-line" />

                  {/* Modular blocks spaced by 8dp baseline with 4dp internal rhythm */}
                  <rect x="24" y="26" width="98" height="32" rx="8" className="svg-struct-block" />
                  <line x1="34" y1="38" x2="74" y2="38" className="svg-struct-line" />
                  <line x1="34" y1="46" x2="108" y2="46" className="svg-struct-sub" />

                  <rect x="138" y="26" width="98" height="32" rx="8" className="svg-struct-block" />
                  <line x1="148" y1="38" x2="188" y2="38" className="svg-struct-line" />
                  <line x1="148" y1="46" x2="222" y2="46" className="svg-struct-sub" />

                  <rect x="24" y="74" width="98" height="40" rx="8" className="svg-struct-block" />
                  <line x1="34" y1="88" x2="80" y2="88" className="svg-struct-line" />
                  <line x1="34" y1="98" x2="108" y2="98" className="svg-struct-sub" />

                  <rect x="138" y="74" width="98" height="40" rx="8" className="svg-struct-block" />
                  <line x1="148" y1="88" x2="194" y2="88" className="svg-struct-line" />
                  <line x1="148" y1="98" x2="222" y2="98" className="svg-struct-sub" />

                  {/* 8dp layout rhythm marker */}
                  <rect x="122" y="34" width="16" height="16" rx="4" className="svg-token-chip rhythm-8" />
                  <text x="130" y="45" textAnchor="middle" className="svg-token-txt">8</text>

                  {/* 4dp fine alignment marker */}
                  <rect x="122" y="86" width="16" height="16" rx="4" className="svg-token-chip rhythm-4" />
                  <text x="130" y="97" textAnchor="middle" className="svg-token-txt">4</text>
                </svg>
              </div>
              <h3 className="cs-factor-title font-body">Clear structure</h3>
            </div>

            {/* Factor 3: Learning from examples */}
            <div className="cs-factor-card">
              <div className="cs-factor-preview cs-examples-preview">
                <div className="cs-study-pills">
                  <span className="cs-mini-pill">Shrine · Retail</span>
                  <span className="cs-mini-pill">Owl · Education</span>
                  <span className="cs-mini-pill">Crane · Travel</span>
                </div>
                <div className="cs-study-accent-line"></div>
                <div className="cs-study-meta font-body">Official Google Case Studies</div>
              </div>
              <h3 className="cs-factor-title font-body">Learning from examples</h3>
            </div>
          </div>
        </div>

        {/* ===================================================================
            PART B: LEARNING FROM MATERIAL DESIGN EXAMPLES
            =================================================================== */}
        <div className="cs-part-b-editorial">
          {/* Part B Header */}
          <div className="cs-studies-header">
            <h3 className="cs-studies-title font-display">Learning from Material Design examples.</h3>
            <p className="cs-studies-intro font-body">
              I studied Shrine, Owl and Crane to see how Material Design adapts to different products.
            </p>
          </div>

          {/* ---------------------------------------------------------------
              01 · SHRINE SHOWCASE
              --------------------------------------------------------------- */}
          <article className="cs-showcase cs-showcase-shrine" aria-labelledby="shrine-heading">
            <div className="cs-showcase-meta">
              <div className="cs-showcase-tagline font-body">
                <span className="cs-study-indicator"></span>
                <span>Retail App</span>
              </div>
              <h4 id="shrine-heading" className="cs-showcase-name font-display">SHRINE</h4>
              <p className="cs-showcase-takeaway font-body">
                Demonstrates how minimalist aesthetics, branded shapes, and content-first layouts express retail branding.
              </p>
            </div>

            <div className="cs-showcase-gallery gallery-shrine">
              <figure className="cs-img-frame primary-frame">
                <img
                  src={shrine1}
                  alt="Shrine retail storefront demonstrating Material Design content-first layout"
                  className="cs-case-img"
                  loading="eager"
                  width="1064"
                  height="784"
                />
              </figure>
              <figure className="cs-img-frame supporting-frame">
                <img
                  src={shrine3}
                  alt="Shrine product detail and brand-shaped sheet interaction"
                  className="cs-case-img"
                  loading="eager"
                  width="1064"
                  height="532"
                />
              </figure>
            </div>
          </article>

          {/* ---------------------------------------------------------------
              02 · OWL SHOWCASE
              --------------------------------------------------------------- */}
          <article className="cs-showcase cs-showcase-owl" aria-labelledby="owl-heading">
            <div className="cs-showcase-meta">
              <div className="cs-showcase-tagline font-body">
                <span className="cs-study-indicator"></span>
                <span>Educational App</span>
              </div>
              <h4 id="owl-heading" className="cs-showcase-name font-display">OWL</h4>
              <p className="cs-showcase-takeaway font-body">
                Demonstrates how bold color, expressive typography, and distinct interaction models organize educational content.
              </p>
            </div>

            <div className="cs-showcase-gallery gallery-owl">
              <figure className="cs-img-frame primary-frame">
                <img
                  src={owl1}
                  alt="Owl educational app exploring expressive typography and energetic colors"
                  className="cs-case-img"
                  loading="eager"
                  width="1064"
                  height="784"
                />
              </figure>
              <figure className="cs-img-frame supporting-frame">
                <img
                  src={owl4}
                  alt="Owl learning modules structured across distinct theme spaces"
                  className="cs-case-img"
                  loading="eager"
                  width="1064"
                  height="784"
                />
              </figure>
            </div>
          </article>

          {/* ---------------------------------------------------------------
              03 · CRANE SHOWCASE
              --------------------------------------------------------------- */}
          <article className="cs-showcase cs-showcase-crane" aria-labelledby="crane-heading">
            <div className="cs-showcase-meta">
              <div className="cs-showcase-tagline font-body">
                <span className="cs-study-indicator"></span>
                <span>Travel App</span>
              </div>
              <h4 id="crane-heading" className="cs-showcase-name font-display">CRANE</h4>
              <p className="cs-showcase-takeaway font-body">
                Demonstrates how backdrop surfaces and filtering components structure complex, task-based booking workflows.
              </p>
            </div>

            <div className="cs-showcase-gallery gallery-crane">
              <figure className="cs-img-frame triptych-frame">
                <img
                  src={crane1}
                  alt="Crane travel app backdrop filter layout"
                  className="cs-case-img"
                  loading="eager"
                  width="1064"
                  height="784"
                />
              </figure>
              <figure className="cs-img-frame triptych-frame">
                <img
                  src={crane2}
                  alt="Crane booking task-based workflow and selection sheets"
                  className="cs-case-img"
                  loading="eager"
                  width="1064"
                  height="784"
                />
              </figure>
              <figure className="cs-img-frame triptych-frame">
                <img
                  src={crane3}
                  alt="Crane flight search results with refined aesthetic hierarchy"
                  className="cs-case-img"
                  loading="eager"
                  width="1064"
                  height="784"
                />
              </figure>
            </div>
          </article>
        </div>

        {/* ===================================================================
            PART C: APPLYING MATERIAL DESIGN 3 TO CUBICON
            =================================================================== */}
        <div className="cs-part-c-synthesis">
          <header className="cs-synthesis-header">
            <h3 className="cs-synthesis-title font-display">
              Applying Material Design 3 to Cubicon.
            </h3>
          </header>

          {/* Three Design Principles: Open Minimal Editorial Composition */}
          <div className="cs-principles-grid">
            {/* Principle 01: Consistent spacing */}
            <article className="cs-principle-module">
              <div className="cs-principle-visual" aria-hidden="true">
                <svg viewBox="0 0 200 120" className="cs-principle-svg" aria-hidden="true">
                  {/* Subtle alignment axis guides */}
                  <line x1="20" y1="24" x2="180" y2="24" className="svg-synth-guide" />
                  <line x1="20" y1="96" x2="180" y2="96" className="svg-synth-guide" />

                  {/* Evenly spaced modular blocks aligned on a shared rhythm */}
                  <rect x="20" y="32" width="40" height="56" rx="6" className="svg-synth-block" />
                  <rect x="68" y="32" width="64" height="56" rx="6" className="svg-synth-block" />
                  <rect x="140" y="32" width="40" height="56" rx="6" className="svg-synth-block" />

                  {/* Identical spacing rhythm indicators */}
                  <line x1="60" y1="60" x2="68" y2="60" className="svg-synth-rhythm" />
                  <line x1="132" y1="60" x2="140" y2="60" className="svg-synth-rhythm" />
                </svg>
              </div>
              <div className="cs-principle-content">
                <h4 className="cs-principle-heading font-display">
                  01. Consistent spacing
                </h4>
                <p className="cs-principle-copy font-body">
                  Keep layouts organised and predictable.
                </p>
              </div>
            </article>

            {/* Principle 02: Reusable components */}
            <article className="cs-principle-module">
              <div className="cs-principle-visual" aria-hidden="true">
                <svg viewBox="0 0 200 120" className="cs-principle-svg" aria-hidden="true">
                  {/* Repeated component pattern with shared geometry and tokens */}
                  <g className="svg-synth-group">
                    <rect x="24" y="24" width="152" height="20" rx="6" className="svg-synth-pill" />
                    <circle cx="36" cy="34" r="3.5" className="svg-synth-dot" />
                    <line x1="48" y1="34" x2="108" y2="34" className="svg-synth-stem" />
                  </g>

                  <g className="svg-synth-group">
                    <rect x="24" y="50" width="152" height="20" rx="6" className="svg-synth-pill active" />
                    <circle cx="36" cy="60" r="3.5" className="svg-synth-dot active" />
                    <line x1="48" y1="60" x2="124" y2="60" className="svg-synth-stem active" />
                  </g>

                  <g className="svg-synth-group">
                    <rect x="24" y="76" width="152" height="20" rx="6" className="svg-synth-pill" />
                    <circle cx="36" cy="86" r="3.5" className="svg-synth-dot" />
                    <line x1="48" y1="86" x2="96" y2="86" className="svg-synth-stem" />
                  </g>
                </svg>
              </div>
              <div className="cs-principle-content">
                <h4 className="cs-principle-heading font-display">
                  02. Reusable components
                </h4>
                <p className="cs-principle-copy font-body">
                  Use shared patterns across the interface.
                </p>
              </div>
            </article>

            {/* Principle 03: Clear hierarchy */}
            <article className="cs-principle-module">
              <div className="cs-principle-visual" aria-hidden="true">
                <svg viewBox="0 0 200 120" className="cs-principle-svg" aria-hidden="true">
                  {/* Primary element: Dominant weight & contrast */}
                  <rect x="20" y="22" width="160" height="34" rx="8" className="svg-synth-primary" />
                  <line x1="34" y1="39" x2="104" y2="39" className="svg-synth-lead" />

                  {/* Secondary element: Subordinate scale and tonal fill */}
                  <rect x="20" y="64" width="96" height="32" rx="6" className="svg-synth-secondary" />
                  <line x1="32" y1="80" x2="80" y2="80" className="svg-synth-sub" />

                  {/* Supporting element: Minimal tonal surface */}
                  <rect x="124" y="64" width="56" height="32" rx="6" className="svg-synth-tertiary" />
                  <line x1="136" y1="80" x2="164" y2="80" className="svg-synth-sub" />
                </svg>
              </div>
              <div className="cs-principle-content">
                <h4 className="cs-principle-heading font-display">
                  03. Clear hierarchy
                </h4>
                <p className="cs-principle-copy font-body">
                  Make important actions easy to identify.
                </p>
              </div>
            </article>
          </div>
        </div>

      </div>
    </section>
  );
}
