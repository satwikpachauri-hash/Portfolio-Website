import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll } from 'motion/react';
import { AlertCircle, BarChart2, Check, CheckCircle, TrendingUp } from 'lucide-react';
import './YouTube.css';

const ProcessTimeline = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"]
  });

  return (
    <div className="process-box" ref={ref}>
      <div className="process-line"></div>
      <motion.div 
        className="process-fill" 
        style={{ scaleY: scrollYProgress, transformOrigin: 'top' }}
      ></motion.div>
      
      <ProcessStep 
        title="1. Empathize" 
        desc="Surveyed 52 users via Google Forms to find out why they stop using the Watch Later list. Found that it feels like &quot;manual labor&quot; to find videos." 
      />
      <ProcessStep 
        title="2. Define" 
        desc="Identified the core issue: Visibility. If a user doesn't see their saved videos on the homepage, they won't watch them." 
      />
      <ProcessStep 
        title="3. Ideate" 
        desc="Created sketches for a &quot;Collections Hub&quot; that brings saved content back to the user automatically." 
      />
      <ProcessStep 
        title="4. Prototype" 
        desc="Built high-fidelity mockups in Figma showing the new one-tap save and AI playlists." 
      />
    </div>
  );
};

const ProcessStep = ({ title, desc }) => {
  return (
    <motion.div 
      className="process-step"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: "-20%" }}
      variants={{
        hidden: { opacity: 0.5 },
        visible: { opacity: 1 }
      }}
    >
      <motion.div 
        className="process-dot"
        variants={{
          hidden: { scale: 1, backgroundColor: 'var(--bg-primary)', boxShadow: 'none' },
          visible: { scale: 1.3, backgroundColor: 'var(--accent)', boxShadow: '0 0 15px var(--accent)' }
        }}
      ></motion.div>
      <h4>{title}</h4>
      <p>{desc}</p>
    </motion.div>
  );
};

export default function YouTubeCaseStudy() {
  const [scrollProgress, setScrollProgress] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      const scroll = window.scrollY;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      let percent = Math.round((scroll / height) * 100);
      if (percent < 0) percent = 0;
      if (percent > 100) percent = 100;
      setScrollProgress(percent);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const circumference = 62.83;
  const offset = circumference - (scrollProgress / 100) * circumference;

  return (
    <div className="case-study-content youtube-case-study">
      {/* PREMIUM READING PROGRESS ISLAND */}
      <div className={`reading-progress-island ${scrollProgress < 2 || scrollProgress >= 99 ? 'hidden' : ''}`}>
        <svg className="progress-ring" width="24" height="24" viewBox="0 0 24 24">
          <circle className="ring-bg" cx="12" cy="12" r="10"></circle>
          <circle className="ring-fill" cx="12" cy="12" r="10" strokeDashoffset={offset} strokeDasharray={circumference}></circle>
        </svg>
        <span className="reading-percentage">{scrollProgress}%</span>
        <span className="reading-text">Completed</span>
      </div>

      <div className="ambient-mesh">
        <div className="mesh-orb mesh-orb-1"></div>
        <div className="mesh-orb mesh-orb-2"></div>
      </div>

      {/* ===================== HERO ===================== */}
      <section className="yt-section hero">
        <div className="yt-container">
          <div className="hero-grid">
            <motion.div 
              className="hero-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6 }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                <div style={{ width: '40px', height: '40px', background: '#fff', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                   <img src="https://upload.wikimedia.org/wikipedia/commons/e/ef/Youtube_logo.png" style={{ width: '70%' }} alt="YouTube Logo" />
                </div>
                <span style={{ fontWeight: 600, letterSpacing: '0.1em', fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Case Study</span>
              </div>
              
              <h1 className="hero-title" style={{ marginBottom: '12px' }}>Youtube Watchlater</h1>
              <p className="yt-lead" style={{ marginBottom: 0 }}>Bridging the gap between intent and consumption by transforming a passive archive into an active discovery hub.</p>
              
              <div className="hero-meta">
                <div className="meta-item"><label>Designer</label><h4>Satwik Pachauri</h4></div>
                <div className="meta-item"><label>Tool</label><h4>Figma</h4></div>
                <div className="meta-item"><label>Category</label><h4>UX Redesign</h4></div>
                <div className="meta-item"><label>Project</label><h4>YouTube Watchlater</h4></div>
              </div>
            </motion.div>
            
            <motion.div 
              className="hero-img-box"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <img src="/case-studies/youtube-watchlater/Hero Section.png" alt="YouTube Mockups" loading="lazy" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===================== 01 PROBLEM (BULLETS) ===================== */}
      <section className="yt-section">
        <div className="yt-container">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6 }}
          >
            <h2>The Problem</h2>
            <ul className="bullet-p">
              <li><AlertCircle color="#f59e0b" size={24} style={{ flexShrink: 0 }} /> <span>Users save videos to "watch later" when they are busy, but the list becomes a messy dumping ground.</span></li>
              <li><AlertCircle color="#f59e0b" size={24} style={{ flexShrink: 0 }} /> <span>The feature is hidden deep in the Library menu, making it invisible to the user during their daily scrolling.</span></li>
              <li><AlertCircle color="#f59e0b" size={24} style={{ flexShrink: 0 }} /> <span>Because it is hard to find, users forget what they saved and end up searching for the same videos again.</span></li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* ===================== 02 PROCESS (ANIMATED) ===================== */}
      <section className="yt-section" id="process">
        <div className="yt-container">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6 }}
          >
            <h2>Design Process</h2>
            <ProcessTimeline />
          </motion.div>
        </div>
      </section>

      {/* ===================== 03 DATA (CHARTS) ===================== */}
      <section className="yt-section" id="data">
        <div className="yt-container">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: '60px' }}
          >
            <h2>Research Data</h2>
          </motion.div>
          
          <div className="chart-grid">
            {/* Card 1: Vertical Pillars */}
            <motion.div 
              className="glass-card premium-data-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6 }}
            >
              <div className="data-header" style={{ marginBottom: '40px' }}>
                <div className="data-icon"><BarChart2 color="#3b82f6" /></div>
                <div>
                  <h4 style={{ margin: 0 }}>App Saving Habits</h4>
                  <p style={{ fontSize: '0.85rem', margin: 0, color: 'var(--text-muted)' }}>Return rate for saved content</p>
                </div>
              </div>
              
              <div className="pillars-container">
                {/* Pillar 1 */}
                <div className="pillar-item">
                  <span className="pillar-value" style={{ color: '#3b82f6' }}>85%</span>
                  <div className="pillar-track">
                    <motion.div 
                      className="pillar-fill" 
                      initial={{ height: 0 }}
                      whileInView={{ height: "85%" }}
                      viewport={{ once: true, margin: "-10%" }}
                      transition={{ duration: 1.5, ease: [0.34, 1.56, 0.64, 1] }}
                      style={{ background: 'linear-gradient(180deg, #3b82f6, #1e3a8a)', boxShadow: '0 0 15px rgba(59,130,246,0.5)' }}
                    ></motion.div>
                  </div>
                  <span className="pillar-label">IG / Netflix</span>
                </div>
                {/* Pillar 2 */}
                <div className="pillar-item">
                  <span className="pillar-value" style={{ color: '#ef4444' }}>59%</span>
                  <div className="pillar-track">
                    <motion.div 
                      className="pillar-fill" 
                      initial={{ height: 0 }}
                      whileInView={{ height: "59%" }}
                      viewport={{ once: true, margin: "-10%" }}
                      transition={{ duration: 1.5, ease: [0.34, 1.56, 0.64, 1] }}
                      style={{ background: 'linear-gradient(180deg, #ef4444, #7f1d1d)', boxShadow: '0 0 15px rgba(239,68,68,0.5)' }}
                    ></motion.div>
                  </div>
                  <span className="pillar-label">Watchlater</span>
                </div>
              </div>
            </motion.div>
            
            {/* Card 2: Segmented Glass Capsule */}
            <motion.div 
              className="glass-card premium-data-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="data-header" style={{ justifyContent: 'center', marginBottom: '24px' }}>
                <h4 style={{ margin: 0 }}>Why Users Forget</h4>
              </div>
              
              <div className="capsule-wrapper" style={{ marginTop: '40px', marginBottom: '32px' }}>
                 <div className="capsule-track">
                   <motion.div 
                    className="capsule-segment" 
                    initial={{ width: 0 }}
                    whileInView={{ width: "40.7%" }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 1.5, ease: [0.34, 1.56, 0.64, 1] }}
                    style={{ background: 'linear-gradient(90deg, #ef4444, #991b1b)', boxShadow: '0 0 20px rgba(239,68,68,0.5)' }}
                   ></motion.div>
                   <motion.div 
                    className="capsule-segment" 
                    initial={{ width: 0 }}
                    whileInView={{ width: "33.3%" }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 1.5, delay: 0.1, ease: [0.34, 1.56, 0.64, 1] }}
                    style={{ background: 'linear-gradient(90deg, #3b82f6, #1e3a8a)', boxShadow: '0 0 20px rgba(59,130,246,0.5)' }}
                   ></motion.div>
                 </div>
                 
                 <div className="capsule-total">
                   <h3>74%</h3>
                   <span>Total Drop-off</span>
                 </div>
              </div>
              
              <div className="rings-legend" style={{ marginTop: '40px' }}>
                <div className="legend-item">
                  <div className="legend-dot" style={{ background: '#ef4444', boxShadow: '0 0 10px #ef4444' }}></div>
                  <span><strong>40.7%</strong> Forget it exists</span>
                </div>
                <div className="legend-item">
                  <div className="legend-dot" style={{ background: '#3b82f6', boxShadow: '0 0 10px #3b82f6' }}></div>
                  <span><strong>33.3%</strong> Save, no return</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===================== 04 SOLUTIONS ===================== */}
      <section className="yt-section" id="solution">
        <div className="yt-container">
          
          {/* Feature 1 */}
          <motion.div 
            className="feature-row"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <h4 style={{ color: 'var(--accent)' }}>Feature 01</h4>
              <h3>Direct Access</h3>
              <p>I added a Clock Icon directly to the video thumbnails on the homepage. Users can now save a video with just one tap, similar to how Instagram allows users to save posts instantly.</p>
              <ul className="bullet-p" style={{ marginTop: '24px' }}>
                 <li><Check color="#10b981" size={24} style={{ flexShrink: 0 }} /> <span>Faster saving process (1 tap instead of 3).</span></li>
                 <li><Check color="#10b981" size={24} style={{ flexShrink: 0 }} /> <span>Higher visual reminder on the home screen.</span></li>
              </ul>
            </div>
            <div className="mock-wrap">
              <div className="phone"><img src="/case-studies/youtube-watchlater/Mockup 1 homepage.png" alt="Homepage" loading="lazy" /></div>
              <div className="tag" style={{ top: '20%', right: '-20%' }}>One-Tap Save</div>
            </div>
          </motion.div>
          
          {/* Feature 2 */}
          <motion.div 
            className="feature-row reverse" 
            style={{ marginTop: '80px' }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <h4 style={{ color: 'var(--accent)' }}>Feature 02</h4>
              <h3>AI Organization</h3>
              <p>The app now automatically categorizes saved videos into playlists like "Tech," "Tutorials," and "Travel" using AI, so the list never feels cluttered.</p>
            </div>
            <div className="mock-wrap">
              <div className="multi-mockup-flex" style={{ display: 'flex', gap: '20px' }}>
                <div className="phone" style={{ maxWidth: '240px', transform: 'rotate(-5deg)' }}><img src="/case-studies/youtube-watchlater/Mockup 2.png" alt="Mockup" loading="lazy" /></div>
                <div className="phone" style={{ maxWidth: '240px', transform: 'rotate(5deg)' }}><img src="/case-studies/youtube-watchlater/Mockup 3.png" alt="Mockup" loading="lazy" /></div>
              </div>
              <div className="tag" style={{ bottom: '0%', left: '-20%' }}>Smart Sorting</div>
            </div>
          </motion.div>
          
          {/* Feature 3 */}
          <motion.div 
            className="feature-row" 
            style={{ marginTop: '80px' }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <h4 style={{ color: 'var(--accent)' }}>Feature 03</h4>
              <h3>Search Integration</h3>
              <p>When you search for a topic, the app reminds you about relevant videos you already saved, placing them right at the top of the search results.</p>
            </div>
            <div className="mock-wrap">
              <div className="phone"><img src="/case-studies/youtube-watchlater/Mockup 4.png" alt="Mockup" loading="lazy" /></div>
              <div className="tag" style={{ top: '15%', right: '-20%' }}>Search Nudge</div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ===================== 05 REVENUE ===================== */}
      <section className="yt-section">
        <div className="yt-container">
          <motion.div 
            className="glass-card metrics-grid"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <h2>Projected Business Impact</h2>
              <p>By making it easier to watch saved videos, we estimate an increase in the overall watch time on the platform. This hypothesized improvement leads to more ads being shown and higher potential revenue.</p>
              <div style={{ display: 'flex', gap: '40px', marginTop: '32px' }}>
                <div><h3 style={{ color: 'var(--chart-2)' }}>+22%</h3><p style={{ fontSize: '0.8rem' }}>Estimated CTR Potential</p></div>
                <div><h3 style={{ color: 'var(--chart-1)' }}>+15%</h3><p style={{ fontSize: '0.8rem' }}>Estimated Watch Time Growth</p></div>
              </div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '32px', borderRadius: '20px' }}>
              <h4 style={{ color: 'var(--chart-4)' }}>Ad Revenue</h4>
              <p style={{ fontSize: '0.9rem', margin: 0 }}>Intent-based watching allows for more relevant, higher-paying ads to be served to the user.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===================== 06 IMPACT (BULLETS) ===================== */}
      <section className="yt-section">
        <div className="yt-container">
          <motion.div 
            style={{ textAlign: 'center', marginBottom: '60px' }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6 }}
          >
            <h2>Final Impact</h2>
          </motion.div>
          <div className="chart-grid" style={{ marginTop: 0 }}>
            <motion.div 
              className="glass-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6 }}
            >
              <h4>For Users</h4>
              <ul className="bullet-p" style={{ marginTop: '16px' }}>
                <li><CheckCircle color="#10b981" size={24} style={{ flexShrink: 0 }} /> <span>No more stress managing a messy "Watch Later" list.</span></li>
                <li><CheckCircle color="#10b981" size={24} style={{ flexShrink: 0 }} /> <span>Instant access to content they actually care about.</span></li>
                <li><CheckCircle color="#10b981" size={24} style={{ flexShrink: 0 }} /> <span>Smarter reminders during search and browsing.</span></li>
              </ul>
            </motion.div>
            <motion.div 
              className="glass-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h4>For YouTube</h4>
              <ul className="bullet-p" style={{ marginTop: '16px' }}>
                <li><TrendingUp color="#ef4444" size={24} style={{ flexShrink: 0 }} /> <span>Increased user retention and session depth.</span></li>
                <li><TrendingUp color="#ef4444" size={24} style={{ flexShrink: 0 }} /> <span>Higher value ad inventory per session.</span></li>
                <li><TrendingUp color="#ef4444" size={24} style={{ flexShrink: 0 }} /> <span>Better monetization of existing user intent.</span></li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
}
