import React, { useEffect, useState } from 'react';
import { motion, animate, useMotionValue, useTransform } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { 
  Target, Puzzle, BookOpen, ArrowRight, Layers, CheckCircle, Circle, 
  Box, Check, AlertTriangle, X, Lightbulb, XCircle, Info, SlidersHorizontal, 
  MousePointerClick, AlignJustify, BellOff, MapPin, Navigation, Sparkles, 
  ChevronRight 
} from 'lucide-react';
import './Cubicon.css';

const AnimatedNumber = ({ value, isFloat = false }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => isFloat ? latest.toFixed(1) : Math.ceil(latest));
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });
  
  useEffect(() => {
    if (inView) {
      animate(count, value, { duration: 2, ease: "easeOut" });
    }
  }, [inView, count, value]);
  
  return <motion.span ref={ref}>{rounded}</motion.span>;
};

const TLXBar = ({ label, score, suffix = "", width, color = "var(--accent)" }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });
  
  return (
    <div className="tlx-item" ref={ref}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
        <span>{label}</span>
        <span className="tlx-score" style={{ color }}><AnimatedNumber value={score} />{suffix}</span>
      </div>
      <div className="tlx-bar-container">
        <motion.div 
          className="tlx-bar" 
          style={{ background: color }}
          initial={{ width: "0%" }}
          animate={{ width: inView ? width : "0%" }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  );
};

const FadeIn = ({ children, delay = 0, className = "" }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-10%" }}
    transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
  >
    {children}
  </motion.div>
);

export default function CubiconCaseStudy() {
  return (
    <div className="case-study-content cubicon-case-study">
      
      <div className="ambient-mesh">
        <div className="mesh-orb mesh-orb-1"></div>
        <div className="mesh-orb mesh-orb-2"></div>
        <div className="mesh-orb mesh-orb-3"></div>
      </div>

      {/* HERO */}
      <section className="hero">
        <div className="hero-image-wrapper">
          <img src="/case-studies/cubicon/assets/hero/Hero Section.png" alt="Cubicon Hero" />
        </div>
        
        <FadeIn className="hero-content-overlay">
          <div className="logo-container" style={{ width: 'clamp(60px, 10vw, 80px)', height: 'clamp(60px, 10vw, 80px)', marginBottom: '24px', borderRadius: '20px' }}>
            <img src="/case-studies/cubicon/assets/logo/cubicon-logo.png" alt="Cubicon Logo" style={{ filter: 'none', width: '60%' }} />
          </div>
          <h1 className="hero-title">Cubicon</h1>
          <p className="lead hero-lead">A niche e-commerce app designed exclusively for Rubik's cube enthusiasts, built using Google's Material Design 3.</p>
          
          <div className="hero-meta-grid">
            <div><p className="section-number">Designer</p><h4>Satwik Pachauri</h4></div>
            <div><p className="section-number">Design System</p><h4>Material 3</h4></div>
            <div><p className="section-number">Category</p><h4>E-Commerce</h4></div>
            <div><p className="section-number">Platform</p><h4>iOS / Android</h4></div>
            <div><p className="section-number">Tool</p><h4>Figma</h4></div>
          </div>
        </FadeIn>

        <div className="hero-scroll-indicator">
          <span>Scroll</span>
          <div className="scroll-line"></div>
        </div>
      </section>

      <div className="section-divider"></div>

      {/* 01 THE BRIEF */}
      <section className="section">
        <div className="container">
          <FadeIn className="text-center" style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span className="section-label">01 — The Brief</span>
            <h2>The Brief</h2>
            <p className="lead" style={{ margin: '0 auto 24px auto' }}>Explore design systems and build an application from scratch by applying one completely.</p>
            <ul className="issue-list" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'left' }}>
              <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <span className="issue-icon pass" style={{ flexShrink: 0, marginTop: '2px' }}><Target size={18} /></span> 
                <span><strong>Align with Domain:</strong> The system must make sense for the core function, not just look good.</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <span className="issue-icon pass" style={{ flexShrink: 0, marginTop: '2px' }}><Puzzle size={18} /></span> 
                <span><strong>Natural Fit:</strong> E.g., Carbon Design System wouldn't fit a creative, Pinterest-like app. It must complement the experience.</span>
              </li>
            </ul>
          </FadeIn>
          <div className="grid-3">
            <FadeIn delay={0.1} className="glass-card brief-interactive">
              <BookOpen className="card-icon" />
              <h3 style={{ minHeight: '70px' }}>Understanding Systems</h3>
              <ul className="issue-list" style={{ marginTop: '12px' }}>
                <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <ArrowRight size={14} color="var(--accent)" style={{ marginTop: '4px', flexShrink: 0 }} /> 
                  <span>Learned purpose & structure</span>
                </li>
                <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <ArrowRight size={14} color="var(--accent)" style={{ marginTop: '4px', flexShrink: 0 }} /> 
                  <span>Studied brand consistency</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <ArrowRight size={14} color="var(--accent)" style={{ marginTop: '4px', flexShrink: 0 }} /> 
                  <span>Read official guidelines</span>
                </li>
              </ul>
            </FadeIn>
            <FadeIn delay={0.2} className="glass-card brief-interactive">
              <Layers className="card-icon" />
              <h3 style={{ minHeight: '70px' }}>Systems Explored</h3>
              <ul className="issue-list" style={{ marginTop: '12px' }}>
                <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <CheckCircle size={16} color="var(--success)" style={{ marginTop: '3px', flexShrink: 0 }} /> 
                  <span><strong>Material Design</strong></span>
                </li>
                <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <Circle size={16} color="var(--text-muted)" style={{ marginTop: '3px', flexShrink: 0 }} /> 
                  <span><strong>Polaris (Shopify)</strong></span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <Circle size={16} color="var(--text-muted)" style={{ marginTop: '3px', flexShrink: 0 }} /> 
                  <span><strong>Apple HIG</strong></span>
                </li>
              </ul>
            </FadeIn>
            <FadeIn delay={0.3} className="glass-card brief-interactive">
              <Box className="card-icon" />
              <h3 style={{ minHeight: '70px' }}>Why Material 3?</h3>
              <ul className="issue-list" style={{ marginTop: '12px' }}>
                <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <Check size={14} color="var(--accent)" style={{ marginTop: '4px', flexShrink: 0 }} /> 
                  <span>Systematic elevation</span>
                </li>
                <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <Check size={14} color="var(--accent)" style={{ marginTop: '4px', flexShrink: 0 }} /> 
                  <span>Structured components</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <Check size={14} color="var(--accent)" style={{ marginTop: '4px', flexShrink: 0 }} /> 
                  <span>Perfect for e-commerce</span>
                </li>
              </ul>
            </FadeIn>
          </div>
        </div>
      </section>

      <div className="section-divider"></div>

      {/* 02 MATERIAL EXPLORATION */}
      <section className="section">
        <div className="container">
          <FadeIn style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span className="section-label">02 — Material Exploration</span>
            <h2>Learning from the Source</h2>
            <p className="lead" style={{ margin: '0 auto' }}>I studied Material Design through Google's official Material 3 website and their Figma kit — learning about component anatomy, spacing rules, and interaction patterns. While researching, I found case studies that helped me understand how Google applies their own system.</p>
          </FadeIn>

          <FadeIn className="glass-card" style={{ marginBottom: '32px' }}>
            <h3>Shrine — Retail App</h3>
            <p>A retail app using Material Design to express branding for fashion and lifestyle items. Shrine's minimalist aesthetic lets content take the forefront, using angled cuts as a visual theme and overlapping sheets for navigation.</p>
            <div className="cs-image-grid cols-2" style={{ marginTop: '24px' }}>
              <div className="cs-image-card"><img loading="lazy" src="/case-studies/cubicon/assets/material/shrine/shrine1.png" alt="Shrine" /></div>
              <div className="cs-image-card"><img loading="lazy" src="/case-studies/cubicon/assets/material/shrine/shrine3.png" alt="Shrine" /></div>
            </div>
          </FadeIn>

          <FadeIn className="glass-card" style={{ marginBottom: '32px' }}>
            <h3>Crane — Travel App</h3>
            <p>A travel app for booking flights, hotels, and restaurants. Crane uses a backdrop component where changes to filters immediately update content — demonstrating how Material Design handles complex, task-based flows with a refined aesthetic.</p>
            <div className="cs-image-grid cols-3" style={{ marginTop: '24px' }}>
              <div className="cs-image-card"><img loading="lazy" src="/case-studies/cubicon/assets/material/crane/crane1.png" alt="Crane" /></div>
              <div className="cs-image-card"><img loading="lazy" src="/case-studies/cubicon/assets/material/crane/crane2.png" alt="Crane" /></div>
              <div className="cs-image-card"><img loading="lazy" src="/case-studies/cubicon/assets/material/crane/crane3.png" alt="Crane" /></div>
            </div>
          </FadeIn>

          <FadeIn className="glass-card">
            <h3>Owl — Educational App</h3>
            <p>An educational app that uses bold color, shape, and typography to express energy and exploration. Owl is divided into three color-themed sections — Personalize, Browse, and Learn — each with their own interaction model.</p>
            <div className="cs-image-grid cols-2" style={{ marginTop: '24px' }}>
              <div className="cs-image-card"><img loading="lazy" src="/case-studies/cubicon/assets/material/owl/owl1.png" alt="Owl" /></div>
              <div className="cs-image-card"><img loading="lazy" src="/case-studies/cubicon/assets/material/owl/owl4.png" alt="Owl" /></div>
            </div>
          </FadeIn>
        </div>
      </section>

      <div className="section-divider"></div>

      {/* 03 PRODUCT IDEATION */}
      <section className="section">
        <div className="container">
          <FadeIn style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span className="section-label">03 — Product Ideation</span>
            <h2>From Chaos to Niche</h2>
            <p className="lead" style={{ margin: '0 auto' }}>After analyzing Material Design's clean aesthetic, I realized a broad e-commerce app would have too much visual noise, clashing with Material's minimal philosophy.</p>
          </FadeIn>
          <div className="grid-2">
            <FadeIn className="glass-card">
              <AlertTriangle className="card-icon" color="var(--error)" />
              <h3>General E-commerce</h3>
              <ul className="issue-list" style={{ marginTop: '12px' }}>
                <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <X size={16} color="var(--error)" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span><strong>Visual Chaos:</strong> A broad marketplace with thousands of unrelated products naturally creates a cluttered interface.</span>
                </li>
                <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <X size={16} color="var(--error)" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span><strong>System Clash:</strong> Material Design relies on clean hierarchy and structured layouts; forcing it onto a cluttered interface defeats its purpose.</span>
                </li>
              </ul>
            </FadeIn>
            <FadeIn className="glass-card">
              <Lightbulb className="card-icon" color="var(--success)" />
              <h3>The Cubicon Idea</h3>
              <ul className="issue-list" style={{ marginTop: '12px' }}>
                <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <Check size={16} color="var(--success)" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span><strong>Niche Focus:</strong> Selling only Rubik's cubes provides a limited, curated scope that perfectly complements Material's minimal design.</span>
                </li>
                <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <Check size={16} color="var(--success)" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span><strong>System Harmony:</strong> A niche marketplace is where Material Design can truly shine. That is how Cubicon was born.</span>
                </li>
              </ul>
            </FadeIn>
          </div>
        </div>
      </section>

      <div className="section-divider"></div>

      {/* 04 ITERATIONS */}
      <section className="section">
        <div className="container">
          <FadeIn style={{ textAlign: 'center', marginBottom: '80px' }}>
            <span className="section-label">04 — Iterations</span>
            <h2>Evolution of the Interface</h2>
            <p className="lead" style={{ margin: '0 auto' }}>Placing the initial Phase One designs alongside the refined Phase Two solutions to highlight the progression of visual hierarchy, semantic clarity, and proper affordances.</p>
          </FadeIn>

          {/* Home Page Iteration */}
          <FadeIn style={{ marginBottom: '80px' }}>
            <h3 style={{ textAlign: 'center', marginBottom: '32px', color: 'var(--accent)' }}>Home Page</h3>
            <div className="grid-2" style={{ alignItems: 'start' }}>
              <div>
                <div className="mockup-phone" style={{ margin: '0 auto 24px auto' }}><img loading="lazy" src="/case-studies/cubicon/assets/mockups/iteration1/iter1_home.png" alt="V1 Home" /></div>
                <div className="ps-content" style={{ textAlign: 'center' }}>
                  <span className="ps-badge problem icon-badge"><XCircle size={16} /> Phase 1: Problem</span>
                  <h3 style={{ textAlign: 'center', marginBottom: '16px' }}>Poor Visual Hierarchy</h3>
                  <ul className="issue-list" style={{ maxWidth: '300px', margin: '0 auto', textAlign: 'left', fontSize: '1.1rem' }}>
                    <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'flex-start', gap: '8px' }}><X size={14} color="var(--error)" style={{ marginTop: '3px', flexShrink: 0 }} /> <span>Foreground blending into background</span></li>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}><X size={14} color="var(--error)" style={{ marginTop: '3px', flexShrink: 0 }} /> <span>Categories felt disorganized & chaotic</span></li>
                  </ul>
                </div>
              </div>
              <div>
                <div className="mockup-phone" style={{ margin: '0 auto 24px auto' }}><img loading="lazy" src="/case-studies/cubicon/assets/mockups/iteration2/iter2_home.png" alt="V2 Home" /></div>
                <div className="ps-content" style={{ textAlign: 'center' }}>
                  <span className="ps-badge improvement icon-badge"><CheckCircle size={16} /> Phase 2: Solution</span>
                  <h3 style={{ textAlign: 'center', marginBottom: '16px' }}>Restructured Homepage</h3>
                  <ul className="issue-list" style={{ maxWidth: '300px', margin: '0 auto', textAlign: 'left', fontSize: '1.1rem' }}>
                    <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'flex-start', gap: '8px' }}><Check size={14} color="var(--success)" style={{ marginTop: '3px', flexShrink: 0 }} /> <span>Clear depth and visual hierarchy</span></li>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}><Check size={14} color="var(--success)" style={{ marginTop: '3px', flexShrink: 0 }} /> <span>Proper separation of UI layers</span></li>
                  </ul>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Search Page Iteration */}
          <FadeIn style={{ marginBottom: '80px' }}>
            <h3 style={{ textAlign: 'center', marginBottom: '32px', color: 'var(--accent)' }}>Search Page</h3>
            <div className="grid-2" style={{ alignItems: 'start' }}>
              <div>
                <div className="mockup-phone" style={{ margin: '0 auto 24px auto' }}><img loading="lazy" src="/case-studies/cubicon/assets/mockups/iteration1/iter1_search.png" alt="V1 Search" /></div>
                <div className="ps-content" style={{ textAlign: 'center' }}>
                  <span className="ps-badge problem icon-badge"><XCircle size={16} /> Phase 1: Problem</span>
                  <h3 style={{ textAlign: 'center', marginBottom: '16px' }}>Missing Signifiers</h3>
                  <ul className="issue-list" style={{ maxWidth: '300px', margin: '0 auto', textAlign: 'left', fontSize: '1.1rem' }}>
                    <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'flex-start', gap: '8px' }}><X size={14} color="var(--error)" style={{ marginTop: '3px', flexShrink: 0 }} /> <span>No voice search or back icons</span></li>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}><X size={14} color="var(--error)" style={{ marginTop: '3px', flexShrink: 0 }} /> <span>Users lacked visual cues for actions</span></li>
                  </ul>
                </div>
              </div>
              <div>
                <div className="mockup-phone" style={{ margin: '0 auto 24px auto' }}><img loading="lazy" src="/case-studies/cubicon/assets/mockups/iteration2/iter2_search.png" alt="V2 Search" /></div>
                <div className="ps-content" style={{ textAlign: 'center' }}>
                  <span className="ps-badge improvement icon-badge"><CheckCircle size={16} /> Phase 2: Solution</span>
                  <h3 style={{ textAlign: 'center', marginBottom: '16px' }}>Proper Signifiers</h3>
                  <ul className="issue-list" style={{ maxWidth: '300px', margin: '0 auto', textAlign: 'left', fontSize: '1.1rem' }}>
                    <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'flex-start', gap: '8px' }}><Check size={14} color="var(--success)" style={{ marginTop: '3px', flexShrink: 0 }} /> <span>Added standard back arrow</span></li>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}><Check size={14} color="var(--success)" style={{ marginTop: '3px', flexShrink: 0 }} /> <span>Included voice search indicator</span></li>
                  </ul>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Product Page Iteration */}
          <FadeIn style={{ marginBottom: '80px' }}>
            <h3 style={{ textAlign: 'center', marginBottom: '32px', color: 'var(--accent)' }}>Product Page</h3>
            <div className="grid-2" style={{ alignItems: 'start' }}>
              <div>
                <div className="mockup-phone" style={{ margin: '0 auto 24px auto' }}><img loading="lazy" src="/case-studies/cubicon/assets/mockups/iteration1/iter1_product.png" alt="V1 Product" /></div>
                <div className="ps-content" style={{ textAlign: 'center' }}>
                  <span className="ps-badge problem icon-badge"><XCircle size={16} /> Phase 1: Problem</span>
                  <h3 style={{ textAlign: 'center', marginBottom: '16px' }}>Weak CTA Weight</h3>
                  <ul className="issue-list" style={{ maxWidth: '300px', margin: '0 auto', textAlign: 'left', fontSize: '1.1rem' }}>
                    <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'flex-start', gap: '8px' }}><X size={14} color="var(--error)" style={{ marginTop: '3px', flexShrink: 0 }} /> <span>"Add to Cart" blended into page</span></li>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}><X size={14} color="var(--error)" style={{ marginTop: '3px', flexShrink: 0 }} /> <span>Failed to drive primary action</span></li>
                  </ul>
                </div>
              </div>
              <div>
                <div className="mockup-phone" style={{ margin: '0 auto 24px auto' }}><img loading="lazy" src="/case-studies/cubicon/assets/mockups/iteration2/iter2_product.png" alt="V2 Product" /></div>
                <div className="ps-content" style={{ textAlign: 'center' }}>
                  <span className="ps-badge improvement icon-badge"><CheckCircle size={16} /> Phase 2: Solution</span>
                  <h3 style={{ textAlign: 'center', marginBottom: '16px' }}>Stronger CTA</h3>
                  <ul className="issue-list" style={{ maxWidth: '300px', margin: '0 auto', textAlign: 'left', fontSize: '1.1rem' }}>
                    <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'flex-start', gap: '8px' }}><Check size={14} color="var(--success)" style={{ marginTop: '3px', flexShrink: 0 }} /> <span>Redesigned with proper visual weight</span></li>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}><Check size={14} color="var(--success)" style={{ marginTop: '3px', flexShrink: 0 }} /> <span>High-contrast color & rounded shape</span></li>
                  </ul>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Checkout Flow Iteration */}
          <FadeIn>
            <h3 style={{ textAlign: 'center', marginBottom: '32px', color: 'var(--accent)' }}>Checkout Flow</h3>
            <div style={{ maxWidth: '480px', margin: '0 auto 48px auto', background: 'rgba(226, 232, 240, 0.03)', padding: '24px', borderRadius: '16px', border: '1px solid rgba(226, 232, 240, 0.1)' }}>
              <div style={{ textAlign: 'center' }}>
                <span className="ps-badge problem icon-badge" style={{ marginBottom: '16px', display: 'inline-flex' }}><Info size={16} /> Phase 1 Limitation</span>
              </div>
              <ul className="issue-list" style={{ margin: '0 auto', textAlign: 'left', fontSize: '0.95rem' }}>
                <li style={{ marginBottom: '4px', display: 'flex', alignItems: 'flex-start', gap: '8px', padding: '6px 12px', background: 'transparent', border: 'none' }}><X size={14} color="var(--error)" style={{ marginTop: '3px', flexShrink: 0 }} /> <span>Scope was limited to product discovery</span></li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', padding: '6px 12px', background: 'transparent', border: 'none' }}><X size={14} color="var(--error)" style={{ marginTop: '3px', flexShrink: 0 }} /> <span>Cart and checkout flows did not exist</span></li>
              </ul>
            </div>

            <div style={{ maxWidth: '400px', margin: '0 auto' }}>
              <div className="mockup-phone" style={{ margin: '0 auto 24px auto' }}><img loading="lazy" src="/case-studies/cubicon/assets/mockups/iteration2/iter2_cart.png" alt="V2 Cart" /></div>
              <div className="ps-content" style={{ textAlign: 'center' }}>
                <span className="ps-badge improvement icon-badge"><CheckCircle size={16} /> Phase 2: Solution</span>
                <h3 style={{ textAlign: 'center', marginBottom: '16px' }}>End-to-End Checkout</h3>
                <ul className="issue-list" style={{ maxWidth: '300px', margin: '0 auto', textAlign: 'left', fontSize: '1.1rem' }}>
                  <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'flex-start', gap: '8px' }}><Check size={14} color="var(--success)" style={{ marginTop: '3px', flexShrink: 0 }} /> <span>Added active & empty Cart states</span></li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}><Check size={14} color="var(--success)" style={{ marginTop: '3px', flexShrink: 0 }} /> <span>Integrated full Google Pay flow</span></li>
                </ul>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <div className="section-divider"></div>

      {/* 05 SEMANTICS */}
      <section className="section">
        <div className="container">
          <FadeIn style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span className="section-label">05 — Semantics Analysis</span>
            <h2>Designing for Meaning</h2>
            <p className="lead" style={{ margin: '0 auto' }}>In the second iteration, I analyzed the semantic meaning of UI elements. A visually pleasing interface is useless if users misinterpret its signals. I focused on reducing cognitive load through clear visual cues.</p>
          </FadeIn>

          {/* Bell vs Badge */}
          <FadeIn className="problem-solution">
            <div className="mockup-phone has-signifier">
              <img loading="lazy" src="/case-studies/cubicon/assets/mockups/iteration2/iter2_home.png" alt="V2 Home" />
              <div className="signifier-dot" style={{ top: '9%', right: '5%' }}></div>
            </div>
            <div className="ps-content">
              <span className="ps-badge improvement">1. The "Bell" Icon</span>
              <h3>Ambiguous Notifications</h3>
              <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '12px' }}>
                  <XCircle color="var(--error)" size={18} style={{ marginTop: '2px', flexShrink: 0 }} />
                  <p style={{ margin: 0 }}><strong>The Issue:</strong> A plain bell lacks context. Users guess if it's for price drops, shipping, or news.</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <CheckCircle color="var(--success)" size={18} style={{ marginTop: '2px', flexShrink: 0 }} />
                  <p style={{ margin: 0 }}><strong>The Solution:</strong> Added a numerical badge. It shifts meaning to "Actionable Updates", clearly showing new items.</p>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Add vs Buy */}
          <FadeIn className="problem-solution reverse">
            <div className="mockup-phone has-signifier">
              <img loading="lazy" src="/case-studies/cubicon/assets/mockups/iteration2/iter2_product.png" alt="V2 Product" />
              <div className="signifier-dot" style={{ bottom: '14%', left: '10%' }}></div>
            </div>
            <div className="ps-content">
              <span className="ps-badge improvement">2. Affordance</span>
              <h3>"Add to Cart" vs. "Buy"</h3>
              <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '12px' }}>
                  <XCircle color="var(--error)" size={18} style={{ marginTop: '2px', flexShrink: 0 }} />
                  <p style={{ margin: 0 }}><strong>The Issue:</strong> "Add" keeps users on-page, "Buy" goes to checkout. Sharing identical visual weight confuses their distinct functions.</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <CheckCircle color="var(--success)" size={18} style={{ marginTop: '2px', flexShrink: 0 }} />
                  <p style={{ margin: 0 }}><strong>The Solution:</strong> Established hierarchy. Outline buttons for secondary ("Add"), solid buttons for primary ("Buy").</p>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Remove vs Save */}
          <FadeIn className="problem-solution">
            <div className="mockup-phone has-signifier">
              <img loading="lazy" src="/case-studies/cubicon/assets/mockups/iteration2/iter2_cart.png" alt="V2 Cart" />
              <div className="signifier-dot" style={{ top: '35%', left: '30%' }}></div>
            </div>
            <div className="ps-content">
              <span className="ps-badge improvement">3. Semantic Clarity</span>
              <h3>"Remove" vs. "Save"</h3>
              <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '12px' }}>
                  <XCircle color="var(--error)" size={18} style={{ marginTop: '2px', flexShrink: 0 }} />
                  <p style={{ margin: 0 }}><strong>The Issue:</strong> Identical text links side-by-side risk misclicks. Users might accidentally delete instead of save.</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <CheckCircle color="var(--success)" size={18} style={{ marginTop: '2px', flexShrink: 0 }} />
                  <p style={{ margin: 0 }}><strong>The Solution:</strong> Replaced text with universal icons (Trash Can, Bookmark). Prevents misclicks and speeds up recognition.</p>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Navigation */}
          <FadeIn className="problem-solution reverse">
            <div className="mockup-phone has-signifier">
              <img loading="lazy" src="/case-studies/cubicon/assets/mockups/iteration2/iter2_pay1.png" alt="V2 Navigation" />
              <div className="signifier-dot" style={{ top: '9%', left: '18%' }}></div>
            </div>
            <div className="ps-content">
              <span className="ps-badge improvement">4. Navigation Cues</span>
              <h3>The 'X' Ambiguity</h3>
              <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '12px' }}>
                  <XCircle color="var(--error)" size={18} style={{ marginTop: '2px', flexShrink: 0 }} />
                  <p style={{ margin: 0 }}><strong>The Issue:</strong> 'X' usually means closing or canceling an app. Using it for back navigation causes hesitation.</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <CheckCircle color="var(--success)" size={18} style={{ marginTop: '2px', flexShrink: 0 }} />
                  <p style={{ margin: 0 }}><strong>The Solution:</strong> Standardized with a left-pointing arrow, aligning with mental models for returning to previous screens.</p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <div className="section-divider"></div>

      {/* 06 USABILITY ISSUES */}
      <section className="section">
        <div className="container">
          <FadeIn style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span className="section-label">06 — Usability Issues</span>
            <h2>Friction Points Discovered</h2>
            <p className="lead" style={{ margin: '0 auto' }}>Further analysis and testing of Iteration 2 revealed hidden usability barriers that hindered a seamless shopping experience.</p>
          </FadeIn>

          <FadeIn className="friction-pair">
            {/* Left Column: Home Page */}
            <div className="friction-col">
              <div className="mockup-phone">
                <img loading="lazy" src="/case-studies/cubicon/assets/mockups/iteration2/iter2_home.png" alt="V2 Home — friction points" />
              </div>
              <div className="friction-issues">
                <div className="glass-card tilt-card" style={{ marginBottom: '24px', padding: '40px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                    <SlidersHorizontal color="var(--error)" size={32} />
                    <span className="ps-badge problem" style={{ margin: 0, fontSize: '1rem', padding: '6px 16px' }}>Carousel Navigation</span>
                  </div>
                  <h3 style={{ fontSize: '1.6rem', marginBottom: '16px' }}>Invisible Boundaries</h3>
                  <p style={{ fontSize: '1.15rem', lineHeight: 1.7, margin: 0, maxWidth: 'none' }}>The image carousel lacked pagination dots. Users had no indication of how many images were available or which one they were viewing.</p>
                </div>
                <div className="glass-card tilt-card" style={{ padding: '40px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                    <MousePointerClick color="var(--error)" size={32} />
                    <span className="ps-badge problem" style={{ margin: 0, fontSize: '1rem', padding: '6px 16px' }}>Misleading Links</span>
                  </div>
                  <h3 style={{ fontSize: '1.6rem', marginBottom: '16px' }}>Underlined Headings</h3>
                  <p style={{ fontSize: '1.15rem', lineHeight: 1.7, margin: 0, maxWidth: 'none' }}>Section headings with underlines and arrows were perceived as interactive hyperlinks (false affordance), causing interaction errors.</p>
                </div>
              </div>
            </div>

            {/* Right Column: Product Detail Page */}
            <div className="friction-col">
              <div className="mockup-phone">
                <img loading="lazy" src="/case-studies/cubicon/assets/mockups/iteration2/iter2_product.png" alt="V2 Product — friction points" />
              </div>
              <div className="friction-issues">
                <div className="glass-card tilt-card" style={{ marginBottom: '24px', padding: '40px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                    <AlignJustify color="var(--error)" size={32} />
                    <span className="ps-badge problem" style={{ margin: 0, fontSize: '1rem', padding: '6px 16px' }}>Cognitive Overload</span>
                  </div>
                  <h3 style={{ fontSize: '1.6rem', marginBottom: '16px' }}>Walls of Text</h3>
                  <p style={{ fontSize: '1.15rem', lineHeight: 1.7, margin: 0, maxWidth: 'none' }}>The product detail page presented a massive block of text, increasing cognitive load and making it difficult to scan for key information.</p>
                </div>
                <div className="glass-card tilt-card" style={{ padding: '40px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                    <BellOff color="var(--error)" size={32} />
                    <span className="ps-badge problem" style={{ margin: 0, fontSize: '1rem', padding: '6px 16px' }}>Feedback Failure</span>
                  </div>
                  <h3 style={{ fontSize: '1.6rem', marginBottom: '16px' }}>Unnoticed Cart Updates</h3>
                  <p style={{ fontSize: '1.15rem', lineHeight: 1.7, margin: 0, maxWidth: 'none' }}>Even after adding a numerical badge, users frequently missed the cart state change. The feedback mechanism wasn't grabbing attention properly.</p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <div className="section-divider"></div>

      {/* 07 THE SWIGGY EFFECT */}
      <section className="section">
        <div className="container">
          <FadeIn className="glass-card" style={{ padding: 'clamp(40px, 6vw, 80px)' }}>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <span className="section-label">07 — Industry Insight</span>
              <h2>The Swiggy Case Study: Micro-Interactions</h2>
              <p className="lead" style={{ margin: '0 auto' }}>A lesson from a food delivery app on guiding user attention naturally.</p>
            </div>
            <div className="grid-3">
              {/* Swiggy Styled Problem */}
              <div className="glass-card tilt-card" style={{ padding: '24px', background: 'rgba(252, 128, 25, 0.05)', borderTop: '4px solid #fc8019' }}>
                <span style={{ background: 'rgba(252, 128, 25, 0.15)', color: '#fc8019', padding: '4px 10px', borderRadius: '100px', fontSize: '0.8rem', fontWeight: 600, marginBottom: '12px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}><MapPin size={14} /> The Problem</span>
                <ul className="issue-list" style={{ marginTop: '12px', fontSize: '1.1rem' }}>
                  <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <X size={16} color="#fc8019" style={{ marginTop: '2px', flexShrink: 0 }} />
                    <span>Users frequently ordered food to the wrong address because the app defaulted to their last location.</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <X size={16} color="#fc8019" style={{ marginTop: '2px', flexShrink: 0 }} />
                    <span>They only realized the error when the driver called, leading to canceled orders and lost revenue.</span>
                  </li>
                </ul>
              </div>
              
              {/* Swiggy Styled Solution */}
              <div className="glass-card tilt-card" style={{ padding: '24px', background: 'rgba(252, 128, 25, 0.05)', borderTop: '4px solid #fc8019' }}>
                <span style={{ background: 'rgba(252, 128, 25, 0.15)', color: '#fc8019', padding: '4px 10px', borderRadius: '100px', fontSize: '0.8rem', fontWeight: 600, marginBottom: '12px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}><Navigation size={14} /> Swiggy's Solution</span>
                <ul className="issue-list" style={{ marginTop: '12px', fontSize: '1.1rem' }}>
                  <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <Check size={16} color="#fc8019" style={{ marginTop: '2px', flexShrink: 0 }} />
                    <span>Instead of using static warning text that users often ignore, they used an animated micro-interaction.</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <Check size={16} color="#fc8019" style={{ marginTop: '2px', flexShrink: 0 }} />
                    <span>Their logo physically moved to the top address bar on launch, naturally drawing the user's eye to verify location.</span>
                  </li>
                </ul>
              </div>
              
              {/* Cubicon Application */}
              <div className="glass-card tilt-card" style={{ padding: '24px', border: '1px solid var(--glass-border-hover)', background: 'var(--glass-bg)', borderTop: '4px solid var(--accent)' }}>
                <h3 style={{ color: 'var(--accent)', fontSize: '1.1rem', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}><Sparkles size={18} /> Applying it to Cubicon</h3>
                <ul className="issue-list" style={{ marginTop: '12px', fontSize: '1.1rem' }}>
                  <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <ArrowRight size={16} color="var(--accent)" style={{ marginTop: '2px', flexShrink: 0 }} />
                    <span>I solved the unnoticed cart updates by introducing an <strong>animated snackbar notification</strong>.</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <ArrowRight size={16} color="var(--accent)" style={{ marginTop: '2px', flexShrink: 0 }} />
                    <span>The dynamic motion immediately grabs attention and provides clear system feedback without interrupting the flow.</span>
                  </li>
                </ul>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <div className="section-divider"></div>

      {/* 08 USABILITY TESTING */}
      <section className="section">
        <div className="container">
          <FadeIn style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span className="section-label">08 — Validation</span>
            <h2>Usability Testing</h2>
            <p className="lead" style={{ margin: '0 auto' }}>Rigorous testing across 14 participants to validate the design decisions and measure overall system usability.</p>
          </FadeIn>

          {/* Task Success */}
          <FadeIn style={{ marginBottom: '60px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <h3>Task Success Rate</h3>
                <p style={{ marginBottom: 0 }}>Evaluated across three core shopping tasks.</p>
              </div>
              <div className="stat-card" style={{ padding: 0, textAlign: 'right' }}>
                <div className="stat-value success"><AnimatedNumber value={83.3} isFloat={true} />%</div>
                <div className="stat-label">Overall Success</div>
              </div>
            </div>
            <div className="data-table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Participant</th>
                    <th>Task 1: Add 3x3 to Cart</th>
                    <th>Task 2: Complete Purchase</th>
                    <th>Task 3: Find 3 ways to buy</th>
                    <th>Success Rate</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>User 01</td><td><span className="badge badge-pass">Pass</span></td><td><span className="badge badge-pass">Pass</span></td><td><span className="badge badge-pass">Pass</span></td><td>100%</td></tr>
                  <tr><td>User 02</td><td><span className="badge badge-pass">Pass</span></td><td><span className="badge badge-pass">Pass</span></td><td><span className="badge badge-fail">Fail (Found 2)</span></td><td>66%</td></tr>
                  <tr><td>User 05</td><td><span className="badge badge-pass">Pass (Friction)</span></td><td><span className="badge badge-pass">Pass</span></td><td><span className="badge badge-fail">Fail (Abandoned)</span></td><td>66%</td></tr>
                  <tr><td>User 09</td><td><span className="badge badge-fail">Fail (Nav Error)</span></td><td><span className="badge badge-pass">Pass</span></td><td><span className="badge badge-fail">Fail (Abandoned)</span></td><td>33%</td></tr>
                  <tr><td>Average (N=14)</td><td>92.8% Pass</td><td>100% Pass</td><td>57.1% Pass</td><td>83.3%</td></tr>
                </tbody>
              </table>
            </div>
          </FadeIn>

          {/* SUS */}
          <FadeIn>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <h3>System Usability Scale (SUS)</h3>
                <p style={{ marginBottom: 0 }}>Measuring the perceived usability of the final design.</p>
              </div>
              <div className="stat-card" style={{ padding: 0, textAlign: 'right' }}>
                <div className="stat-value accent"><AnimatedNumber value={72.5} isFloat={true} /></div>
                <div className="stat-label">Good Rating</div>
              </div>
            </div>
            <div className="data-table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Participant</th>
                    <th>Calculated Score</th>
                    <th>Adjective Rating</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>User 01</td><td>90.0</td><td><span className="badge badge-pass">Excellent</span></td></tr>
                  <tr><td>User 04</td><td>52.5</td><td><span className="badge badge-fail">Poor</span></td></tr>
                  <tr><td>User 06</td><td>82.5</td><td><span className="badge badge-pass">Excellent</span></td></tr>
                  <tr><td>User 12</td><td>62.5</td><td><span className="badge badge-fail">Marginal</span></td></tr>
                  <tr><td>Average (N=14)</td><td>72.5</td><td><span className="badge badge-pass">Good</span></td></tr>
                </tbody>
              </table>
            </div>
          </FadeIn>
          
          {/* NASA TLX */}
          <FadeIn className="glass-card" style={{ marginTop: '40px' }}>
            <h3>NASA TLX Scoreboard</h3>
            <p>Measuring subjective workload assessment across participants.</p>
            
            <div style={{ marginTop: '32px' }}>
              <TLXBar label="Mental Demand (Low)" score={22} width="22%" />
              <TLXBar label="Physical Demand (Low)" score={15} width="15%" />
              <TLXBar label="Temporal Demand (Low)" score={28} width="28%" />
              <TLXBar label="Performance (High Success)" score={85} width="85%" color="var(--success)" />
              <TLXBar label="Effort (Low)" score={30} width="30%" />
              <TLXBar label="Frustration (Low)" score={18} width="18%" />
            </div>
          </FadeIn>
        </div>
      </section>

      <div className="section-divider"></div>

      {/* 09 FINAL ITERATION */}
      <section className="section">
        <div className="container-wide">
          <FadeIn style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span className="section-label">09 — The Result</span>
            <h2>Final Iteration</h2>
            <p className="lead" style={{ margin: '0 auto' }}>Implementing the insights from testing to create the refined, final experience.</p>
          </FadeIn>

          <FadeIn style={{ maxWidth: '800px', margin: '0 auto 60px auto' }}>
            <h3>Key Improvements Made</h3>
            <ul className="issue-list">
              <li><span className="issue-icon pass"><Check size={16} /></span> Replaced text-heavy product details with scannable infographics to reduce cognitive load.</li>
              <li><span className="issue-icon pass"><Check size={16} /></span> Implemented an animated snackbar notification for cart additions, ensuring immediate system feedback.</li>
              <li><span className="issue-icon pass"><Check size={16} /></span> Removed misleading underlines from headings to prevent false affordances.</li>
              <li><span className="issue-icon pass"><Check size={16} /></span> Fixed the carousel navigation by adding pagination dots, allowing users to understand image boundaries.</li>
            </ul>
          </FadeIn>

          <FadeIn className="mockup-row">
            <div className="mockup-phone mockup-phone-lg tilt-card"><img loading="lazy" src="/case-studies/cubicon/assets/mockups/iteration3/Image 1 (Home page).png" alt="Final Home" /></div>
            <div className="mockup-phone mockup-phone-lg tilt-card"><img loading="lazy" src="/case-studies/cubicon/assets/mockups/iteration3/Image 2 (3x3 category page).png" alt="Final Category" /></div>
            <div className="mockup-phone mockup-phone-lg tilt-card"><img loading="lazy" src="/case-studies/cubicon/assets/mockups/iteration3/Image 3 (Search page).png" alt="Final Search" /></div>
          </FadeIn>
          <FadeIn className="mockup-row">
            <div className="mockup-phone mockup-phone-lg tilt-card"><img loading="lazy" src="/case-studies/cubicon/assets/mockups/iteration3/Image 4 (Product detail page).png" alt="Final Product" /></div>
            <div className="mockup-phone mockup-phone-lg tilt-card"><img loading="lazy" src="/case-studies/cubicon/assets/mockups/iteration3/Image 4 scrolled down (Product description section).png" alt="Product Description" /></div>
            <div className="mockup-phone mockup-phone-lg tilt-card"><img loading="lazy" src="/case-studies/cubicon/assets/mockups/iteration3/Image 4 scrolled down (specification section).png" alt="Product Specs" /></div>
          </FadeIn>
          <FadeIn className="mockup-row">
            <div className="mockup-phone mockup-phone-lg tilt-card"><img loading="lazy" src="/case-studies/cubicon/assets/mockups/iteration3/Image 5 (Product added to cart notification screen).png" alt="Cart Notification" /></div>
            <div className="mockup-phone mockup-phone-lg tilt-card"><img loading="lazy" src="/case-studies/cubicon/assets/mockups/iteration3/Image 6 (Cart page).png" alt="Final Cart" /></div>
          </FadeIn>
        </div>
      </section>

    </div>
  );
}
