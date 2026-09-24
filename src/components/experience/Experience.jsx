import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useViewportClasses } from '../../hooks/useMediaQuery';
import './Experience.css';

const CHAPTERS = [
  {
    id: 'ui-ux-2025',
    type: 'job',
    year: '2025',
    role: 'UI/UX DESIGNER',
    company: '1 Artifact Decor',
    date: 'Jun 2025 – Jul 2025',
    location: 'Agra, Uttar Pradesh, India',
    description: 'Worked on UI/UX initiatives and collaborated with the graphic design team on a product catalogue, contributing to interface refinement, visual structure, and information layout.',
  },
  {
    id: 'graphic-2024',
    type: 'job',
    year: '2024',
    role: 'GRAPHIC DESIGNER',
    company: 'Gramrajya Vikas Evam Prashikshan Sansthan (GVPS)',
    date: 'Jun 2024 – Jul 2024',
    location: 'Jaipur, Rajasthan, India',
    description: 'Designed educational presentations and visual materials around social issues, translating complex topics into accessible visual communication.',
  },
  {
    id: 'earlier-transition',
    type: 'transition',
    title: 'EARLIER EXPERIENCE',
    subtitle: 'Before design became the direction.',
    year: 'EARLIER'
  },
  {
    id: 'retail-2022',
    type: 'job',
    year: '2022',
    role: 'RETAIL SALES LEAD',
    company: 'India International Trade Fair',
    date: 'November 2022',
    location: 'Pragati Maidan, New Delhi',
    metrics: [
      { value: '₹3.10L', label: 'SALES' },
      { value: '14', label: 'DAYS' }
    ],
    description: 'Led an assigned trade-fair stall, managing product selection, pricing, negotiation, and promotional offers.'
  },
  {
    id: 'merchandiser-2022',
    type: 'job',
    year: '2022',
    role: 'MERCHANDISER',
    company: '1 Artifact Decor',
    date: 'October 2022',
    location: 'Noida, Uttar Pradesh, India',
  },
  {
    id: 'retail-2021',
    type: 'job',
    year: '2021',
    role: 'RETAIL SALES LEAD',
    company: 'India International Trade Fair',
    date: 'November 2021',
    location: 'Pragati Maidan, New Delhi',
    metrics: [
      { value: '₹2.97L', label: 'SALES' },
      { value: '14', label: 'DAYS' }
    ],
    description: 'Led an assigned trade-fair stall, managing product selection, pricing, negotiation, and promotional offers.'
  }
];

export default function Experience() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const viewport = useViewportClasses();
  const isMobileOrTablet = viewport === 'mobile' || viewport === 'tablet';

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    if (!containerRef.current) return;
    const triggers = containerRef.current.querySelectorAll('.scroll-trigger');
    
    // We determine active chapter by finding which trigger is intersecting the viewport's middle zone
    const handleIntersect = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = Number(entry.target.dataset.index);
          setActiveIndex(index);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, {
      root: null,
      // Target the upper-middle of the screen (35% to 55% from top)
      rootMargin: "-35% 0px -45% 0px", 
      threshold: 0
    });

    triggers.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="experience" className="experience-section" ref={containerRef}>
      <div className="experience-container">
        <motion.h2 
          className="experience-heading font-display"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          EXPERIENCE
        </motion.h2>

        <div className="career-rail">
          <div className="rail-line"></div>
          {isMobileOrTablet && (
            <motion.div 
              className="rail-line-fill" 
              style={{ height: lineHeight }}
            />
          )}
          
          {CHAPTERS.map((chapter, i) => {
            const isActive = activeIndex === i;
            const isPast = activeIndex > i;

            return (
              <div className="chapter-node" key={chapter.id}>
                
                <div 
                  className={`chapter-marker-area scroll-trigger ${isActive ? 'is-active' : ''}`}
                  data-index={i}
                >
                  <div className="chapter-year font-display">{chapter.year}</div>
                  <div className="chapter-marker"></div>
                </div>

                <div 
                  className={`chapter-content-area ${isActive ? 'is-active' : ''} ${isPast ? 'is-past' : ''}`}
                  style={{ gridRow: `1 / span ${CHAPTERS.length}` }}
                >
                  {chapter.type === 'transition' ? (
                    <div className="transition-chapter">
                      <h3 className="transition-title font-display">{chapter.title}</h3>
                      <p className="transition-subtitle font-body">{chapter.subtitle}</p>
                      <div className="transition-divider"></div>
                    </div>
                  ) : (
                    <div className="job-chapter">
                      <h3 className="role-title font-display">{chapter.role}</h3>
                      <div className="company-name font-body">{chapter.company}</div>
                      
                      <div className="job-meta font-body">
                        {chapter.date && <span className="meta-date">{chapter.date}</span>}
                        {chapter.date && chapter.location && <span className="meta-sep">•</span>}
                        {chapter.location && <span className="meta-location">{chapter.location}</span>}
                      </div>

                      {chapter.description && (
                        <p className="job-description font-body">{chapter.description}</p>
                      )}

                      {chapter.metrics && (
                        <div className="job-metrics">
                          {chapter.metrics.map((m, idx) => (
                            <div className="metric-box" key={idx}>
                              <span className="metric-value font-display">{m.value}</span>
                              <span className="metric-label font-body">{m.label}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Right side contextual detail panel (Desktop only) */}
                <div 
                  className={`chapter-context-area ${isActive ? 'is-active' : ''} ${isPast ? 'is-past' : ''}`}
                  style={{ gridRow: `1 / span ${CHAPTERS.length}` }}
                >
                  {chapter.type !== 'transition' && (
                    <div className="context-detail">
                      {chapter.location && (
                        <div className="context-location font-display">
                          {chapter.location.split(',')[0].toUpperCase()}
                        </div>
                      )}
                      <div className="context-line"></div>
                      <div className="context-company font-display">
                        {chapter.company}
                      </div>
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
