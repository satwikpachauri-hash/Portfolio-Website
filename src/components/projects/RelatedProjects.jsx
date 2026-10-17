import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import './RelatedProjects.css';

const PROJECTS_MAP = {
  plex: {
    id: 'plex',
    title: 'Plex',
    description: 'AI-powered personal planning.',
    image: '/case-studies/plex/assets/hero/Hero Page.webp',
    route: '/projects/plex',
    accent: '#7C7BFF',
    objectPosition: 'center 20%',
  },
  cubicon: {
    id: 'cubicon',
    title: 'Cubicon',
    description: 'Material Design 3 for cube shopping.',
    image: '/case-studies/cubicon/assets/hero/Hero Section.webp',
    route: '/projects/cubicon',
    accent: '#a78bfa',
    objectPosition: 'center center',
  },
  youtube: {
    id: 'youtube',
    title: 'YouTube Watch Later',
    description: 'Making saved videos easier to rediscover.',
    image: '/case-studies/youtube-watchlater/Hero Section.webp',
    route: '/projects/youtube-watchlater',
    accent: '#ff0000',
    objectPosition: 'center top',
  },
};

// Exact order mapping as mandated:
// Plex -> Cubicon, YouTube Watch Later
// Cubicon -> Plex, YouTube Watch Later
// YouTube -> Plex, Cubicon
const RECOMMENDATIONS_ORDER = {
  plex: ['cubicon', 'youtube'],
  cubicon: ['plex', 'youtube'],
  youtube: ['plex', 'cubicon'],
  'youtube-watchlater': ['plex', 'cubicon'],
};

export default function RelatedProjects({ currentProject }) {
  const shouldReduceMotion = useReducedMotion();

  const targetKeys = RECOMMENDATIONS_ORDER[currentProject] || [];
  const recommendedProjects = targetKeys
    .map((key) => PROJECTS_MAP[key])
    .filter(Boolean);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
        delayChildren: shouldReduceMotion ? 0 : 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="related-projects-section" aria-label="Related projects">
      <div className="related-projects-container">
        {/* Clickable Heading + Arrow leading to /projects */}
        <div className="related-projects-header">
          <Link
            to="/projects"
            className="related-heading-link font-display"
            aria-label="See more projects in portfolio"
          >
            <span className="related-heading-text">See more projects</span>
            <span className="related-heading-arrow-box" aria-hidden="true">
              <ArrowUpRight size={22} className="related-heading-arrow" strokeWidth={2.2} />
            </span>
          </Link>
        </div>

        {/* 2 Compact Recommended Cards */}
        <motion.div
          className="related-projects-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-10%' }}
        >
          {recommendedProjects.map((project) => (
            <motion.div key={project.id} variants={itemVariants} className="related-card-wrapper">
              <Link
                to={project.route}
                className="related-project-card"
                aria-label={`View ${project.title} case study`}
              >
                {/* 1. Authentic Thumbnail */}
                <div className="related-card-visual">
                  <img
                    src={project.image}
                    alt={`${project.title} preview`}
                    className="related-card-img"
                    loading="lazy"
                    style={{ objectPosition: project.objectPosition }}
                  />
                </div>

                {/* Content: Title, Description, and Navigation Arrow */}
                <div className="related-card-content">
                  <div className="related-card-header">
                    <h3 className="related-card-title font-display">{project.title}</h3>
                    <div
                      className="related-card-arrow"
                      aria-hidden="true"
                      style={{ backgroundColor: project.accent }}
                    >
                      <ArrowUpRight
                        size={18}
                        color={project.id === 'youtube' ? '#ffffff' : '#000000'}
                        strokeWidth={2.5}
                      />
                    </div>
                  </div>
                  <p className="related-card-desc font-body">{project.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
