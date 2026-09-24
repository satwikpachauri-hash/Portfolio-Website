import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import './Plex.css';

export default function PlexCaseStudy() {
  useEffect(() => {
    if (window.lucide) {
      window.lucide.createIcons();
    } else {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/lucide@latest';
      script.onload = () => window.lucide.createIcons();
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className="case-study-content plex-case-study">
      
<section className="hero" id="hero">
<motion.div className="hero-bg-cover hero-anim-bg"
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, margin: "-10%" }}
>
<img alt="Plex Application Homepage" className="hero-anim-phone" src="/case-studies/plex/assets/hero/Hero Page.png" loading="lazy" />
</motion.div>
<motion.div className="hero-content-overlay hero-anim-card"
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, margin: "-10%" }}
>
<div className="hero-header-row">
<motion.div className="hero-title hero-anim-title"
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, margin: "-10%" }}
>Plex</motion.div>
</div>
<motion.div className="hero-lead hero-anim-tagline"
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, margin: "-10%" }}
>Less planning. More progress.</motion.div>
<motion.div className="hero-meta-grid hero-anim-specs"
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, margin: "-10%" }}
>
<div className="spec-item">
<p className="section-number">Role</p>
<h4>Product Designer</h4>
</div>
<div className="spec-item">
<p className="section-number">Category</p>
<h4>Product Design</h4>
</div>
<div className="spec-item">
<p className="section-number">Project</p>
<h4>Plex</h4>
</div>
<div className="spec-item">
<p className="section-number">Platform</p>
<h4>Android</h4>
</div>
</motion.div>
</motion.div>
</section>
<section className="section the-problem" id="the-problem">
<div className="problem-use-case-container">
<div className="problem-statement-intro">
<span className="section-label">01 — THE PROBLEM</span>
<h2 className="section-title massive-headline">You can stay busy and still miss what matters most.</h2>
<h3 className="section-title st-muted supporting-line">When priorities compete, easier tasks can feel more rewarding than important ones.</h3>
</div>
<div className="use-case-cinematic">
<div className="uc-time-header">
<span className="uc-time-clock">09:00</span>
<span className="uc-time-date">TODAY</span>
</div>
<div className="uc-focus-ring"></div>
<div className="uc-tasks-grid">
<div className="uc-task-item uc-important" id="task-important">
<div className="uc-task-info">
<span className="uc-task-name" id="uc-important-title">Portfolio Deadline</span>
<span className="uc-task-meta uc-meta-alert" id="uc-important-meta">DUE TODAY</span>
</div>
<div className="uc-task-status"></div>
</div>
<div className="uc-task-item uc-easy uc-e1" id="task-easy1">
<div className="uc-task-info">
<span className="uc-task-name">Mail to HR</span>
<span className="uc-task-meta">10 MIN</span>
</div>
<div className="uc-task-status"><svg viewBox="0 0 24 24" className="uc-check"><path d="M20 6L9 17l-5-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg></div>
</div>
<div className="uc-task-item uc-easy uc-e2" id="task-easy2">
<div className="uc-task-info">
<span className="uc-task-name">Client Call</span>
<span className="uc-task-meta">15 MIN</span>
</div>
<div className="uc-task-status"><svg viewBox="0 0 24 24" className="uc-check"><path d="M20 6L9 17l-5-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg></div>
</div>
</div>
<div className="uc-progress-reward">
<span className="uc-reward-text">0 TASKS COMPLETE</span>
<div className="uc-reward-bar"><div className="uc-reward-fill"></div></div>
</div>
</div>
<div className="problem-statement-mid">
<h2 className="section-title">Staying busy isn't the same as making progress.</h2>
</div>
</div>
<div className="research-insights-header text-center">
<span className="section-label">RESEARCH INSIGHTS</span>
<motion.div className="section-title gsap-reveal" style={{ 'fontSize': 'clamp(1.8rem, 4vw, 3rem)' }}
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, margin: "-10%" }}
>The data behind the problem.</motion.div>
</div>
<div className="problem-data-panel container">
<div className="data-grid">
<div className="data-card dc-1">
<div className="dc-visual-container">
<div className="dc-radial-chart">
<svg viewBox="0 0 100 100" className="radial-svg">
<circle cx="50" cy="50" r="40" className="radial-bg"></circle>
<circle cx="50" cy="50" r="40" className="radial-fill"></circle>
</svg>
<div className="radial-center-text">58%</div>
<div className="dc-hover-annotation">WORK ABOUT WORK</div>
</div>
</div>
<div className="dc-text-content">
<h3 className="dc-number">58%</h3>
<p className="dc-label">58% of the workday can go to managing work instead of doing it.</p>
<span className="dc-citation">Asana — Anatomy of Work</span>
</div>
</div>
<div className="data-card dc-2">
<div className="dc-visual-container">
<div className="dc-time-ruler">
<div className="tr-track"></div>
<div className="tr-fill"></div>
<div className="tr-ticks">
<div className="tr-tick t-0"><span className="tr-label">0h</span></div>
<div className="tr-tick t-1"><span className="tr-label">1h</span></div>
<div className="tr-tick t-2"><span className="tr-label">2h</span></div>
<div className="tr-tick t-3"><span className="tr-label">3h</span></div>
<div className="tr-tick t-4"><span className="tr-label">4h</span></div>
<div className="tr-tick t-end"><span className="tr-label-end">4.9h</span></div>
</div>
</div>
</div>
<div className="dc-text-content">
<h3 className="dc-number">4.9 HOURS</h3>
<p className="dc-label">Better processes could recover 4.9 hours of work time each week.</p>
<span className="dc-citation">Asana - Anatomy of Work</span>
</div>
</div>
<div className="data-card dc-3">
<div className="dc-visual-container">
<div className="dc-premium-timeline">
<div className="pt-line pt-planned">
<div className="pt-track"></div>
<div className="pt-fill" style={{ 'width': '61%' }}></div>
<div className="pt-marker" style={{ 'left': '61%' }}></div>
<span className="pt-label" style={{ 'left': '61%' }}>33.9</span>
</div>
<div className="pt-gap-region">
<div className="pt-gap-fill" style={{ 'left': '61%', 'width': '39%' }}></div>
<div className="pt-gap-annotation">+21.6 DAYS</div>
</div>
<div className="pt-line pt-actual">
<div className="pt-track"></div>
<div className="pt-fill" style={{ 'width': '100%' }}></div>
<div className="pt-marker" style={{ 'left': '100%' }}></div>
<span className="pt-label" style={{ 'left': '100%' }}>55.5</span>
</div>
</div>
</div>
<div className="dc-text-content">
<h3 className="dc-number">33.9 <span style={{ 'opacity': '0.5', 'fontSize': '0.6em' }}>→</span> 55.5 DAYS</h3>
<p className="dc-label">Planned completion took 33.9 days. Actual completion took 55.5.</p>
<span className="dc-citation">Buehler, Griffin & Ross, 1994</span>
</div>
</div>
</div>
</div>
<div className="problem-statement-outro text-center">
<h2 className="massive-question" style={{ 'fontSize': 'clamp(2rem, 5vw, 3.5rem)' }}>Planning can become part of the workload.</h2>
</div>
</section>
<section className="section project-context" id="problem">
<div className="context-pin-container">
<div className="context-headline-area">
<span className="section-label context-label">02 — PROJECT CONTEXT</span>
<h2 className="massive-headline">Everything felt important.</h2>
</div>
<div className="tags-container">
<div className="floating-tag tag-1"><i data-lucide="book" className="tag-icon"></i> JLPT N5</div>
<div className="floating-tag tag-2"><i data-lucide="code" className="tag-icon"></i> Frontend</div>
<div className="floating-tag tag-3"><i data-lucide="pen-tool" className="tag-icon"></i> Design Projects</div>
<div className="floating-tag tag-4"><i data-lucide="folder" className="tag-icon"></i> Portfolio</div>
<div className="floating-tag tag-5"><i data-lucide="file-text" className="tag-icon"></i> Resume</div>
<div className="floating-tag tag-6"><i data-lucide="briefcase" className="tag-icon"></i> Internships</div>
<div className="floating-tag tag-7"><i data-lucide="library" className="tag-icon"></i> Coursework</div>
<div className="floating-tag tag-8"><i data-lucide="check-square" className="tag-icon"></i> Assignments</div>
<div className="floating-tag tag-9"><i data-lucide="microscope" className="tag-icon"></i> Research</div>
<div className="floating-tag tag-10"><i data-lucide="calendar" className="tag-icon"></i> Deadlines</div>
<div className="floating-tag tag-11"><i data-lucide="mail" className="tag-icon"></i> Emails</div>
<div className="floating-tag tag-12"><i data-lucide="target" className="tag-icon"></i> Personal Goals</div>
</div>
<div className="context-final-question">
<h2 className="massive-question">What should I do next?</h2>
<p className="supporting-sentence">The workload wasn't the problem. Deciding what deserved my attention was.</p>
</div>
</div>
</section>
<section className="section looking-solution" id="existing-tools">
<div className="friction-pin-container">
<div className="friction-content-wrapper">
<div className="friction-header-area">
<span className="section-label">03 — EXISTING TOOLS</span>
<h2 className="massive-headline">Looking For A Solution</h2>
<p className="friction-supporting-text">I explored existing productivity tools hoping they would reduce planning effort.</p>
</div>
<div className="fictional-dashboard">
<div className="dash-topnav">
<div className="nav-left">
<span className="nav-title">Workspace</span>
</div>
<div className="nav-center">
<div className="nav-search">
<i data-lucide="search" className="search-icon"></i>
<span className="search-placeholder">Search...</span>
</div>
</div>
<div className="nav-right">
<i data-lucide="bell" className="nav-icon"></i>
<i data-lucide="settings" className="nav-icon"></i>
<div className="nav-avatar"></div>
</div>
</div>
<div className="dash-body">
<div className="dash-sidebar">
<div className="sidebar-icon active"><i data-lucide="layout-dashboard"></i></div>
<div className="sidebar-icon"><i data-lucide="check-square"></i></div>
<div className="sidebar-icon"><i data-lucide="calendar"></i></div>
<div className="sidebar-icon"><i data-lucide="folder"></i></div>
<div className="sidebar-icon"><i data-lucide="target"></i></div>
<div className="sidebar-icon"><i data-lucide="bar-chart-2"></i></div>
<div className="sidebar-spacer"></div>
<div className="sidebar-icon"><i data-lucide="settings"></i></div>
</div>
<div className="dash-content">
<div className="dash-task-list">
<div className="dash-task-row">
<div className="task-checkbox"></div>
<span className="task-title">Review Q3 Marketing Strategy</span>
<span className="task-date">Today</span>
<span className="task-chip">High</span>
</div>
<div className="dash-task-row">
<div className="task-checkbox"></div>
<span className="task-title">Draft Client Proposal</span>
<span className="task-date">Tomorrow</span>
<span className="task-chip draft">Draft</span>
</div>
<div className="dash-task-row">
<div className="task-checkbox"></div>
<span className="task-title">Update Design System Components</span>
<span className="task-date">Oct 12</span>
<span className="task-chip">Medium</span>
</div>
<div className="dash-task-row">
<div className="task-checkbox"></div>
<span className="task-title">Weekly Team Sync Setup</span>
<span className="task-date">Oct 14</span>
<span className="task-chip routine">Routine</span>
</div>
</div>
<div className="dash-right-panel">
<div className="mini-calendar">
<div className="cal-header">October</div>
<div className="cal-grid">
<span></span><span></span><span></span><span></span><span></span>
<span></span><span></span><span></span><span></span><span></span>
</div>
</div>
<div className="schedule-block">
<div className="block-title">Today's Schedule</div>
<div className="schedule-item">10:00 AM - Design Sync</div>
</div>
<div className="reminder-block">
<div className="block-title">Upcoming Reminder</div>
<div className="reminder-item">Review budget docs</div>
</div>
</div>
</div>
</div>
<div className="friction-modals-container">
<div className="friction-modal mod-1 ui-dropdown">Choose Priority <i data-lucide="chevron-down"></i></div>
<div className="friction-modal mod-2 ui-datepicker"><i data-lucide="calendar"></i> Add Due Date</div>
<div className="friction-modal mod-3 ui-small"><i data-lucide="clock"></i> Estimate Time</div>
<div className="friction-modal mod-4 ui-input">Create Project...</div>
<div className="friction-modal mod-5 ui-tags"><i data-lucide="tag"></i> Choose Labels</div>
<div className="friction-modal mod-6 ui-dialog"><i data-lucide="bell"></i> Set Reminder</div>
<div className="friction-modal mod-7 ui-dropdown">Select Workspace <i data-lucide="chevron-down"></i></div>
<div className="friction-modal mod-8 ui-toggle">Repeat Weekly? <div className="toggle-switch"></div></div>
<div className="friction-modal mod-9 ui-popup">Archive Completed? <button className="btn-primary">Yes</button></div>
<div className="friction-modal mod-10 ui-color"><div className="color-dot"></div> Choose Color</div>
</div>
</div>
</div>
<div className="friction-final-conclusion">
<h2 className="massive-question">Planning became another task.</h2>
<p className="supporting-sentence">The tools organized tasks. They never reduced decisions.</p>
</div>
</div>
</section>
<section className="section problem-statement" id="philosophy">
<div className="philosophy-pin-container">
<div className="philosophy-text-block">
<div className="philosophy-line">
<div className="line-mask"><span className="phrase part-1">Spend</span></div>
<div className="line-mask"><span className="phrase part-2"> less time</span></div>
<div className="line-mask"><span className="phrase part-3 dim-target"> planning.</span></div>
</div>
<div className="philosophy-line">
<div className="line-mask"><span className="phrase part-4">More time</span></div>
<div className="line-mask"><span className="phrase part-5 highlight-target"> getting work done.</span></div>
</div>
</div>
</div>
</section>
<section className="section introduce-plex" id="solution">
<div className="introduce-container">
<div className="introduce-text">
<span className="section-label reveal-label">04 — THE SOLUTION</span>
<div className="line-mask title-mask">
<h2 className="massive-headline reveal-title">Plex</h2>
</div>
</div>
<div className="reveal-video-wrapper">
<video className="reveal-video" loop={true} muted={true} playsInline preload="metadata">
<source media="(max-width: 768px)" type="video/mp4" src="/case-studies/plex/assets/Plex/Introducing%20Plex%20Phone%20%26%20Tablet.mp4" />
<source type="video/mp4" src="/case-studies/plex/assets/Plex/Introducing%20Plex%20Laptop%20%26%20Desktop.mp4" />
                    Your browser does not support the video tag.
                </video>
</div>
</div>
</section>
<section className="section product-vision" id="principles">
<div className="vision-pin-container">
<div className="vision-intro">
<span className="section-label">05 — PRINCIPLES</span>
<h2 className="massive-headline">Product Vision</h2>
</div>
<div className="vision-content-wrapper">
<div className="vision-left">
<div className="principle-text p-1">
<span className="p-number">01</span>
<h3 className="p-title">Reduce<br />Cognitive Load</h3>
<p className="p-desc">Minimal interfaces that only show what matters right now.</p>
</div>
<div className="principle-text p-2">
<span className="p-number">02</span>
<h3 className="p-title">Automation<br />Without<br />Losing Control</h3>
<p className="p-desc">AI handles complexity while the user remains in control.</p>
</div>
<div className="principle-text p-3">
<span className="p-number">03</span>
<h3 className="p-title">Support<br />Instead of<br />Pressure</h3>
<p className="p-desc">Guidance instead of guilt.</p>
</div>
<div className="principle-text p-4">
<span className="p-number">04</span>
<h3 className="p-title">Realistic<br />Planning</h3>
<p className="p-desc">Schedules adapt to real life.</p>
</div>
<div className="principle-text p-5">
<span className="p-number">05</span>
<h3 className="p-title">Local<br />Processing</h3>
<p className="p-desc">Your information stays on your device.</p>
</div>
<div className="principle-text p-6">
<span className="p-number">06</span>
<h3 className="p-title">Intelligent<br />Planning</h3>
<p className="p-desc">Plex turns your tasks, goals, and time into a plan that works around your day.</p>
</div>
</div>
<div className="vision-right">
<div className="vision-phone-container">
<div className="vision-phone-frame">
<img alt="Homepage UI" className="p-screen s-1" src="/case-studies/plex/assets/mockups/Homepage.png" loading="lazy" />
<img alt="Automation UI" className="p-screen s-2" src="/case-studies/plex/assets/mockups/Automation%20Without%20Losing%20Control.png" loading="lazy" />
<img alt="Analytics UI" className="p-screen s-3" src="/case-studies/plex/assets/mockups/Analytics%20Page%201.png" loading="lazy" />
<img alt="Schedule UI" className="p-screen s-4" src="/case-studies/plex/assets/mockups/Schedule%20Page.png" loading="lazy" />
<img alt="Privacy UI" className="p-screen s-5" src="/case-studies/plex/assets/mockups/Privacy%20Page.png" loading="lazy" />
<img alt="Local AI UI" className="p-screen s-6" src="/case-studies/plex/assets/mockups/Local%20Intelligence.png" loading="lazy" />
</div>
</div>
</div>
</div>
</div>
</section>
<section className="section design-exploration" id="exploration">
<div className="container">
<div className="exploration-header text-center mx-auto">
<span className="section-label">06 — PROCESS</span>
<motion.div className="massive-headline gsap-reveal"
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, margin: "-10%" }}
>Design Exploration</motion.div>
<div className="editorial-text mx-auto" style={{ 'maxWidth': '700px' }}>
<motion.div className="gsap-reveal-text mt-spacing"
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, margin: "-10%" }}
>Every screen went through multiple iterations before reaching its final form. Each redesign solved specific usability problems rather than simply improving aesthetics.</motion.div>
</div>
</div>
<motion.div className="exploration-overview mt-huge gsap-reveal"
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, margin: "-10%" }}
>
<div className="overview-boards">
<img alt="Exploration Board 1" src="/case-studies/plex/assets/wireframes/image 5.png" loading="lazy" />
<img alt="Exploration Board 2" src="/case-studies/plex/assets/wireframes/image 6.png" loading="lazy" />
</div>
<div className="overview-caption text-center mt-spacing">
<span className="stat-huge">150+</span>
<p className="stat-sub">Design iterations created throughout<br />the development of Plex.</p>
</div>
</motion.div>
<motion.div className="comparison-block mt-huge gsap-reveal"
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, margin: "-10%" }}
>
<h3 className="comp-title">Homepage</h3>
<div className="comp-phones">
<div className="comp-phone-col">
<span className="comp-tag">INITIAL DESIGN</span>
<img alt="Iteration 1" src="/case-studies/plex/assets/wireframes/Iteration 1.png" loading="lazy" />
</div>
<div className="comp-phone-col">
<span className="comp-tag">FINAL DESIGN</span>
<img alt="Iteration 1 Fixed" src="/case-studies/plex/assets/wireframes/Iteration 1 Fixed.png" loading="lazy" />
</div>
</div>
<div className="comp-details">
<div className="comp-problems">
<h4 className="detail-heading">Problems</h4>
<ul>
<li><i data-lucide="hand" className="comp-icon"></i> Brain Dump required excessive thumb reach during one-handed use.</li>
<li><i data-lucide="layers" className="comp-icon"></i> The interface prioritized planning before helping users understand their day.</li>
</ul>
</div>
<div className="comp-solutions">
<h4 className="detail-heading">Solutions</h4>
<ul>
<li><i data-lucide="mouse-pointer-click" className="comp-icon"></i> Brain Dump moved into the natural interaction zone.</li>
<li><i data-lucide="layout-template" className="comp-icon"></i> Information hierarchy reorganized to emphasize today's workload first.</li>
</ul>
</div>
</div>
</motion.div>
<motion.div className="comparison-block mt-huge gsap-reveal"
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, margin: "-10%" }}
>
<h3 className="comp-title">Schedule</h3>
<div className="comp-phones">
<div className="comp-phone-col">
<span className="comp-tag">INITIAL DESIGN</span>
<img alt="Iteration 2" src="/case-studies/plex/assets/wireframes/Iteration 2.png" loading="lazy" />
</div>
<div className="comp-phone-col">
<span className="comp-tag">FINAL DESIGN</span>
<img alt="Iteration 2 Fixed" src="/case-studies/plex/assets/wireframes/Iteration 2 Fixed.png" loading="lazy" />
</div>
</div>
<div className="comp-details">
<div className="comp-problems">
<h4 className="detail-heading">Problems</h4>
<ul>
<li><i data-lucide="align-justify" className="comp-icon"></i> Active tasks blended with upcoming tasks, reducing scanability.</li>
<li><i data-lucide="link-2-off" className="comp-icon"></i> Long-term goals felt disconnected from today's schedule.</li>
</ul>
</div>
<div className="comp-solutions">
<h4 className="detail-heading">Solutions</h4>
<ul>
<li><i data-lucide="target" className="comp-icon"></i> Active work is visually prioritized.</li>
<li><i data-lucide="link" className="comp-icon"></i> Goals and daily planning are connected through contextual scheduling.</li>
</ul>
</div>
</div>
</motion.div>
<motion.div className="comparison-block mt-huge gsap-reveal"
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, margin: "-10%" }}
>
<h3 className="comp-title">Analytics</h3>
<div className="comp-phones">
<div className="comp-phone-col">
<span className="comp-tag">INITIAL DESIGN</span>
<img alt="Iteration 3" src="/case-studies/plex/assets/wireframes/Iteration 3.png" loading="lazy" />
</div>
<div className="comp-phone-col">
<span className="comp-tag">FINAL DESIGN</span>
<img alt="Iteration 3 Fixed" src="/case-studies/plex/assets/wireframes/Iteration 3 Fixed.png" loading="lazy" />
</div>
</div>
<div className="comp-details">
<div className="comp-problems">
<h4 className="detail-heading">Problems</h4>
<ul>
<li><i data-lucide="pie-chart" className="comp-icon"></i> Every metric competed equally for attention.</li>
<li><i data-lucide="scan-line" className="comp-icon"></i> Users had to interpret multiple charts before understanding progress.</li>
</ul>
</div>
<div className="comp-solutions">
<h4 className="detail-heading">Solutions</h4>
<ul>
<li><i data-lucide="bar-chart" className="comp-icon"></i> Primary insights receive clear visual priority.</li>
<li><i data-lucide="eye" className="comp-icon"></i> Analytics communicate progress at a glance.</li>
</ul>
</div>
</div>
</motion.div>
<motion.div className="comparison-block mt-huge gsap-reveal"
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, margin: "-10%" }}
>
<h3 className="comp-title">Profile</h3>
<div className="comp-phones">
<div className="comp-phone-col">
<span className="comp-tag">INITIAL DESIGN</span>
<img alt="Iteration 4" src="/case-studies/plex/assets/wireframes/Iteration 4.png" loading="lazy" />
</div>
<div className="comp-phone-col">
<span className="comp-tag">FINAL DESIGN</span>
<img alt="Iteration 4 Fixed" src="/case-studies/plex/assets/wireframes/Iteration 4 Fixed.png" loading="lazy" />
</div>
</div>
<div className="comp-details">
<div className="comp-problems">
<h4 className="detail-heading">Problems</h4>
<ul>
<li><i data-lucide="settings" className="comp-icon"></i> Settings lacked clear organization.</li>
<li><i data-lucide="align-left" className="comp-icon"></i> Frequently used controls were mixed with secondary options.</li>
</ul>
</div>
<div className="comp-solutions">
<h4 className="detail-heading">Solutions</h4>
<ul>
<li><i data-lucide="folder" className="comp-icon"></i> Related settings are grouped logically.</li>
<li><i data-lucide="star" className="comp-icon"></i> Frequently accessed controls receive higher visual priority.</li>
</ul>
</div>
</div>
</motion.div>
</div>
</section>
<section className="section product-evolution" id="evolution">
<div className="container">
<div className="roadmap-header text-center mx-auto" style={{ 'maxWidth': '800px' }}>
<span className="section-label">07 — ROADMAP</span>
<motion.div className="section-title gsap-reveal"
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, margin: "-10%" }}
>Product Evolution</motion.div>
<div className="editorial-text mx-auto" style={{ 'maxWidth': '700px' }}>
<motion.div className="gsap-reveal-text huge-quote" style={{ 'fontSize': '3rem' }}
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, margin: "-10%" }}
>Make it exist first.<br /><span style={{ 'color': 'var(--accent)' }}>Make it good later.</span></motion.div>
<motion.div className="gsap-reveal-text mt-spacing"
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, margin: "-10%" }}
>Version One intentionally focuses only on solving the core problem. The roadmap reflects a gradual expansion of intelligence.</motion.div>
</div>
</div>
<div className="evolution-timeline">
<div className="timeline-progress-track">
<div className="timeline-progress-fill"></div>
</div>
<div className="evolution-milestone milestone-1">
<div className="milestone-content">
<span className="milestone-caption">IN DEVELOPMENT</span>
<h3 className="milestone-heading">Version One</h3>
<ul className="issue-list mt-spacing">
<li><i data-lucide="check" className="list-icon-success"></i> Natural language capture</li>
<li><i data-lucide="check" className="list-icon-success"></i> Basic automatic scheduling</li>
<li><i data-lucide="check" className="list-icon-success"></i> Local-first architecture</li>
</ul>
</div>
</div>
<div className="evolution-milestone milestone-2">
<div className="milestone-content">
<span className="milestone-caption">NEXT PHASE</span>
<h3 className="milestone-heading">Next Milestone</h3>
<ul className="issue-list mt-spacing">
<li><i data-lucide="diamond" className="list-icon-accent"></i> Improved AI reasoning</li>
<li><i data-lucide="diamond" className="list-icon-accent"></i> Better schedule adaptation</li>
<li><i data-lucide="diamond" className="list-icon-accent"></i> More personalized planning</li>
</ul>
</div>
</div>
<div className="evolution-milestone milestone-3">
<div className="milestone-content">
<span className="milestone-caption">CONTINUOUS EVOLUTION</span>
<h3 className="milestone-heading">Beyond Mobile</h3>
<p className="milestone-philosophy mt-spacing">The long-term direction is to bring Plex to desktop, evolving it from an intelligent planner into a more proactive system that can understand context and take action across your workflow.</p>
</div>
</div>
</div>
</div>
</section>
<section className="section walkthrough" id="product">
<div className="container" style={{ 'maxWidth': '1200px' }}>
<div className="text-center mx-auto" style={{ 'marginBottom': '120px' }}>
<span className="section-label">08 — WALKTHROUGH</span>
</div>
<div className="feature-moment fm-braindump">
<div className="fm-text text-center mx-auto">
<h3 className="fm-heading">Brain Dump</h3>
<p className="fm-desc">Brain Dump transforms unstructured thoughts into organized, actionable tasks.</p>
</div>
<div className="fm-visual-container bd-cinematic-container">
<div className="bd-typing-layer">
<div className="bd-typing-line line-1">
<span className="bd-text bd-t1"></span><span className="bd-cursor cursor-1">|</span>
<span className="bd-tag tag-1">→ Deadline detected</span>
</div>
<div className="bd-typing-line line-2">
<span className="bd-text bd-t2"></span><span className="bd-cursor cursor-2" style={{ 'opacity': '0' }}>|</span>
<span className="bd-tag tag-2">→ Estimated duration</span>
</div>
<div className="bd-typing-line line-3">
<span className="bd-text bd-t3"></span><span className="bd-cursor cursor-3" style={{ 'opacity': '0' }}>|</span>
<span className="bd-tag tag-3">→ Preferred time identified</span>
</div>
<div className="bd-typing-line line-4">
<span className="bd-text bd-t4"></span><span className="bd-cursor cursor-4" style={{ 'opacity': '0' }}>|</span>
<span className="bd-tag tag-4">→ High priority</span>
</div>
</div>
<div className="bd-structured-layer">
<div className="bd-card card-1">
<div className="card-title">Portfolio</div>
<div className="card-meta">Today • 2h 30m • High Priority</div>
</div>
<div className="bd-card card-2">
<div className="card-title">JLPT Practice</div>
<div className="card-meta">45 min • Study</div>
</div>
<div className="bd-card card-3">
<div className="card-title">Gym Session</div>
<div className="card-meta">Tomorrow • Recovery</div>
</div>
<div className="bd-card card-4">
<div className="card-title">Oracle Internship</div>
<div className="card-meta">Application • Medium Priority</div>
</div>
</div>
<div className="bd-dashboard-layer">
<img alt="Brain Dump Dashboard" className="bd-dashboard-img" src="/case-studies/plex/assets/mockups/Homepage.png" loading="lazy" />
<div className="dash-mask mask-greeting"></div>
<div className="dash-mask mask-overview"></div>
<div className="dash-mask mask-focus"></div>
<div className="dash-mask mask-tasks"></div>
<div className="dash-mask mask-goals"></div>
</div>
</div>
</div>
<div className="feature-moment fm-scheduling mt-large">
<div className="fm-text text-center mx-auto">
<h3 className="fm-heading">Smart Scheduling</h3>
<p className="fm-desc">Plans are created around real life instead of ideal conditions.</p>
</div>
<div className="fm-visual-container" style={{ 'display': 'flex', 'gap': '40px', 'justifyContent': 'center' }}>
<div className="fm-schedule-wrapper">
<div className="schedule-mask"></div>
<img alt="Schedule Page" className="schedule-mockup" src="/case-studies/plex/assets/mockups/Schedule Page.png" loading="lazy" />
</div>
</div>
</div>
<div className="feature-moment fm-goals mt-huge">
<div className="fm-text text-center mx-auto">
<h3 className="fm-heading">Future Goals</h3>
<p className="fm-desc">Long-term ambitions become manageable through gradual, consistent progress.</p>
</div>
<div className="fm-visual-container">
<div className="fm-goal-cards text-center">
<img alt="Future Goals" className="goal-mockup" src="/case-studies/plex/assets/mockups/Future Goals Page.png" loading="lazy" />
</div>
</div>
</div>
<div className="feature-moment fm-analytics mt-huge">
<div className="fm-text text-center mx-auto">
<h3 className="fm-heading">Analytics</h3>
<p className="fm-desc">Progress is measured through consistency, not pressure.</p>
</div>
<div className="fm-visual-container analytics-container" style={{ 'display': 'flex', 'gap': '40px', 'justifyContent': 'center' }}>
<img alt="Analytics 1" className="analytics-img a-img-1" src="/case-studies/plex/assets/mockups/Analytics Page 1.png" loading="lazy" />
<img alt="Analytics 2" className="analytics-img a-img-2" src="/case-studies/plex/assets/mockups/Analytics Page 2.png" loading="lazy" />
</div>
</div>
<div className="feature-moment fm-healthy mt-huge">
<div className="fm-text text-center mx-auto">
<h3 className="fm-heading">Healthy Productivity</h3>
<p className="fm-desc">Productive days begin with sustainable routines and proper recovery.</p>
</div>
<div className="fm-visual-container text-center">
<img alt="Sleep Schedule" className="healthy-mockup" src="/case-studies/plex/assets/mockups/Sleep Schedule Page.png" loading="lazy" />
</div>
</div>
<div className="feature-moment fm-privacy mt-huge">
<div className="fm-text text-center mx-auto">
<h3 className="fm-heading">Privacy</h3>
<p className="fm-desc">Your plans, preferences, and personal data remain on your device.</p>
</div>
<div className="fm-visual-container fm-privacy-container">
<div className="privacy-words">
<span className="p-word pw-1">Local.</span>
<span className="p-word pw-2">Private.</span>
<span className="p-word pw-3">Yours.</span>
</div>
<img alt="Privacy Page" className="privacy-mockup" src="/case-studies/plex/assets/mockups/Privacy Page.png" loading="lazy" />
</div>
</div>
</div>
</section>
<section className="section intelligence">
<div className="container">
<div style={{ 'display': 'flex', 'flexDirection': 'column', 'alignItems': 'center', 'textAlign': 'center', 'width': '100%' }}>
<span className="section-label">09 — Architecture</span>
<motion.div className="section-title gsap-reveal"
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, margin: "-10%" }}
>Behind The Intelligence</motion.div>
<div className="editorial-text" style={{ 'display': 'flex', 'justifyContent': 'center' }}>
<motion.div className="gsap-reveal-text"
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, margin: "-10%" }}
>Meet the AI in Plex. Every schedule begins with understanding before planning.</motion.div>
</div>
</div>
<div className="arch-cinematic-container">
<div className="arch-request-layer">
<div className="arch-req-line arl-1">Finish my portfolio by Friday.</div>
<div className="arch-req-line arl-2">Practice JLPT tonight.</div>
<div className="arch-req-line arl-3">Go to the gym tomorrow.</div>
<div className="arch-req-line arl-4">Apply to Oracle internship.</div>
</div>
<div className="arch-understanding-pulse">
<div className="pulse-dot"></div>
<span className="pulse-text">Understanding...</span>
</div>
<div className="arch-structured-layer">
<div className="arch-card ac-1">
<div className="ac-title">Portfolio</div>
<div className="ac-meta">Deadline: Friday</div>
<div className="ac-meta">Est: 3 Hours</div>
</div>
<div className="arch-card ac-2">
<div className="ac-title">JLPT</div>
<div className="ac-meta">Duration: 45m</div>
<div className="ac-meta">Evening</div>
</div>
<div className="arch-card ac-3">
<div className="ac-title">Gym</div>
<div className="ac-meta">Tomorrow</div>
<div className="ac-meta">Recovery</div>
</div>
<div className="arch-context ctx-1">Working Hours</div>
<div className="arch-context ctx-2">Sleep Schedule</div>
<div className="arch-context ctx-3">Travel Time</div>
<div className="arch-context ctx-4">Existing Tasks</div>
<div className="arch-context ctx-5">Preferences</div>
<p className="arch-caption cap-context">Every recommendation begins with understanding your personal context.</p>
</div>
<div className="arch-decision-layer">
<div className="decision-chip dc-1">High Priority</div>
<div className="decision-chip dc-2">Deadline Conflict</div>
<div className="decision-chip dc-3">Available Time</div>
<div className="decision-chip dc-4">Estimated Duration</div>
<div className="decision-chip dc-5">Dependencies</div>
<p className="arch-caption cap-decisions">Priorities are evaluated before time is assigned.</p>
</div>
<div className="arch-schedule-layer">
<div className="sched-block sb-focus">Focus: Portfolio (3h)</div>
<div className="sched-block sb-lunch">Lunch Break</div>
<div className="sched-block sb-task">JLPT Practice (45m)</div>
<div className="sched-block sb-travel">Travel to Gym</div>
<div className="sched-block sb-gym">Gym Workout</div>
<p className="arch-caption cap-planning">Plans are created around real life instead of ideal conditions.</p>
</div>
<div className="arch-safety-layer">
<div className="safety-badge saf-1"><i data-lucide="shield"></i> Sleep Protected</div>
<div className="safety-badge saf-2"><i data-lucide="shield"></i> Recovery Preserved</div>
<div className="safety-badge saf-3"><i data-lucide="shield"></i> Break Maintained</div>
<p className="arch-caption cap-safety">Productivity should never come at the expense of recovery.</p>
</div>
<div className="arch-final-layer">
<div className="final-schedule-frame">
<img alt="Generated Schedule" className="arch-final-img" src="/case-studies/plex/assets/mockups/Schedule Page.png" loading="lazy" />
</div>
<p className="arch-caption cap-final" style={{ 'position': 'relative', 'bottom': 'auto', 'marginTop': '40px' }}>Every schedule is generated locally through Plex's intelligence, combining your goals, routines, and priorities into a realistic plan designed around your life.</p>
</div>
</div>
</div>
</section>
<section className="section collaboration">
<div className="container">
<div style={{ 'display': 'flex', 'flexDirection': 'column', 'alignItems': 'center', 'textAlign': 'center', 'width': '100%', 'maxWidth': '800px', 'margin': '0 auto' }}>
<span className="section-label">10 — Team</span>
<motion.div className="section-title gsap-reveal"
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, margin: "-10%" }}
>Collaboration</motion.div>
<motion.div className="gsap-reveal-text large-body mt-spacing"
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, margin: "-10%" }}
>Plex was built through close collaboration between product design and AI engineering. Clear responsibilities allowed both disciplines to contribute their expertise while building a single cohesive product.</motion.div>
</div>
<div className="team-editorial-grid mt-huge">
<div className="team-col team-col-left">
<h3 className="team-heading">Product Design & Frontend</h3>
<span className="team-label">Done by me</span>
<ul className="team-list mt-spacing">
<li className="team-item">Product Strategy</li>
<li className="team-item">Problem Definition</li>
<li className="team-item">UX Research</li>
<li className="team-item">Feature Planning</li>
<li className="team-item">Information Architecture</li>
<li className="team-item">User Flows</li>
<li className="team-item">Wireframing</li>
<li className="team-item">UI & Interaction Design</li>
<li className="team-item">Frontend Development</li>
</ul>
</div>
<div className="team-col team-col-right">
<h3 className="team-heading">AI/ML Engineering</h3>
<span className="team-label">Done by AI/ML Engineer</span>
<ul className="team-list mt-spacing">
<li className="team-item">AI Architecture</li>
<li className="team-item">Plex's AI Core & Backend</li>
<li className="team-item">Reasoning Engine</li>
<li className="team-item">Memory System</li>
<li className="team-item">Local AI</li>
<li className="team-item">Safety Layer</li>
<li className="team-item">Backend Implementation</li>
</ul>
</div>
</div>
<motion.div className="gsap-reveal-text team-closing-statement text-center" style={{ 'fontSize': '1.15rem', 'color': 'var(--text-muted)', 'maxWidth': '700px', 'margin': '4rem auto 0 auto' }}
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, margin: "-10%" }}
>Together, product design and AI engineering transformed Plex from an idea into a fully functioning product.</motion.div>
</div>
</section>
<section className="section finale">
<div className="finale-cinematic-container">
<div className="finale-thought-sequence">
<div className="finale-keyword kw-1">Planning</div>
<div className="finale-keyword kw-2">Mental Effort</div>
<div className="finale-keyword kw-3">Attention</div>
<div className="finale-keyword kw-4">Time</div>
<div className="finale-sentence st-1">Plex began as a way to organize everyday planning.</div>
<div className="finale-sentence st-2">The challenge was never managing tasks. It was reducing the effort required to think about them.</div>
<div className="finale-sentence st-3">Great products don't ask for more attention. They quietly give it back.</div>
<div className="finale-sentence st-4">In the end, time was never the feature. It was always the outcome.</div>
</div>
<h2 className="finale-main-title">The Output is Focus.</h2>
</div>
</section>

    </div>
  );
}
