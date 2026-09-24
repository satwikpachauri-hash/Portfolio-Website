import React from 'react';
import { motion } from 'motion/react';
import './Projects.css';
import { ArrowRight } from 'lucide-react';

const PROJECTS_DATA = [
  {
    id: 'plex',
    title: 'Plex',
    category: 'PRODUCT DESIGN',
    summary: 'Less planning. More progress.',
    description: 'An intelligent personal planner that transforms unstructured thoughts into organized, actionable tasks while dynamically adapting to your schedule.',
    chips: ['Product Development', 'UX Research', 'Frontend Dev', 'AI Architecture (Collab)'],
    metrics: [
      { value: '58%', label: 'WORK ABOUT WORK' },
      { value: '4.9h', label: 'RECOVERED TIME' },
    ],
    heroImage: '/case-studies/plex/assets/hero/Hero Page.png',
    accent: '#7C7BFF', // Authentic Plex Indigo
    objectPosition: 'center 20%',
    href: 'https://plex-case-study.netlify.app/'
  },
  {
    id: 'cubicon',
    title: 'Cubicon',
    category: 'DESIGN SYSTEM',
    summary: 'Building a foundation for scalable interfaces.',
    description: 'A comprehensive design system created to unify user experience and accelerate development across a diverse suite of digital products.',
    chips: ['Product Designer', 'Figma', 'Material Design 3', 'Usability Testing'],
    metrics: [
      { value: '72.5', label: 'SUS SCORE' },
      { value: '3', label: 'ITERATIONS' },
    ],
    heroImage: '/case-studies/cubicon/assets/hero/Hero Section.png',
    accent: '#a78bfa', // Authentic Cubicon Violet
    objectPosition: 'center center',
    href: 'https://amazing-marshmallow-e2b6ac.netlify.app/'
  },
  {
    id: 'youtube',
    title: 'YouTube Watchlater',
    category: 'UX REDESIGN',
    summary: 'Rethinking how we save videos for later.',
    description: 'A conceptual redesign focused on improving the organization, discoverability, and playback experience of YouTube\'s Watch Later playlist.',
    chips: ['UX Designer', 'Figma', 'User Research'],
    metrics: [
      { value: '+22%', label: 'ESTIMATED CTR' },
      { value: '+15%', label: 'ESTIMATED WATCH TIME' },
    ],
    heroImage: '/case-studies/youtube-watchlater/Hero Section.png',
    accent: '#ff0000', // Authentic YouTube Red
    objectPosition: 'center top',
    href: 'https://youtube-case-study.netlify.app/'
  }
];

// Extracted into a memoized component to prevent any unnecessary re-renders
const ProjectCard = React.memo(({ project, index }) => {
  const destination = project.href || '#pending-netlify-url';
  
  return (
    <motion.a
      id={project.id}
      href={destination}
      target={project.href ? "_blank" : undefined}
      rel={project.href ? "noopener noreferrer" : undefined}
      className="project-card"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
      aria-label={`View ${project.title} case study`}
    >
      <div className="pc-visual-area">
        <img 
          src={project.heroImage} 
          alt={`${project.title} product hero`} 
          className="pc-image" 
          loading={index === 0 ? "eager" : "lazy"}
          fetchPriority={index === 0 ? "high" : "auto"}
          style={{ objectPosition: project.objectPosition }}
        />
        <div 
          className="pc-category-pill font-display"
          style={{ color: project.accent }}
        >
          {project.category}
        </div>
        <div 
          className="pc-arrow"
          style={{ backgroundColor: project.accent }}
        >
          <ArrowRight size={20} color={project.id === 'youtube' ? '#ffffff' : '#000000'} strokeWidth={2.5} />
        </div>
      </div>
      
      <div className="pc-content">
        <h3 className="pc-title font-display">{project.title}</h3>
        <div className="pc-summary font-body" style={{ color: project.accent }}>
          {project.summary}
        </div>
        <p className="pc-desc font-body">{project.description}</p>
        
        <div className="pc-tags font-body">
          {project.chips.map((chip, idx) => (
            <span key={idx} className="pc-tag">{chip}</span>
          ))}
        </div>
        
        <div className="pc-metrics">
          {project.metrics.map((metric, idx) => (
            <div key={idx} className="pc-metric">
              <span className="pc-metric-value font-display">{metric.value}</span>
              <span className="pc-metric-label font-body">{metric.label}</span>
            </div>
          ))}
        </div>
        
        <div className="pc-cta font-display" style={{ color: project.accent }}>
          Read Case Study <ArrowRight size={18} className="pc-cta-icon" />
        </div>
      </div>
    </motion.a>
  );
});

ProjectCard.displayName = 'ProjectCard';

export default function Projects() {
  return (
    <section id="projects" className="projects-section">
      <div className="projects-container">
        <motion.div 
          className="projects-header"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h2 className="projects-title font-display">PROJECTS</h2>
          <p className="projects-intro font-body">
            Selected work across product design, systems, and UX.
          </p>
        </motion.div>

        <div className="projects-grid">
          {PROJECTS_DATA.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        <motion.div
          className="projects-footer"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
        >
          <span className="projects-closing font-body">
            The work usually gets better after the first idea.
          </span>
        </motion.div>
      </div>
    </section>
  );
}
