import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import './ProjectsPage.css';

// Projects-page-specific data — does NOT touch homepage project data
const PROJECTS = [
  {
    id: 'plex',
    num: '01',
    name: 'Plex',
    displayName: 'PLEX',
    territory: 'Product Design · Interaction · AI',
    meta: '2026 — Ongoing',
    image: '/assets/projects/plex-hero.png',
    imageAlt: 'Plex project preview',
    to: '/projects/plex',
    external: false,
  },
  {
    id: 'cubicon',
    num: '02',
    name: 'Cubicon',
    displayName: 'CUBICON',
    territory: 'Interaction Design · Design Systems · Usability',
    meta: '2026',
    image: '/assets/projects/cubicon-hero.png',
    imageAlt: 'Cubicon project preview',
    to: 'https://amazing-marshmallow-e2b6ac.netlify.app/',
    external: true,
  },
  {
    id: 'youtube',
    num: '03',
    name: 'YouTube',
    displayName: 'YOUTUBE',
    territory: 'UX Research · Interface Redesign',
    meta: null,
    image: '/assets/projects/youtube-hero.png',
    imageAlt: 'YouTube redesign project preview',
    to: 'https://youtube-case-study.netlify.app/',
    external: true,
  },
];

const DEFAULT_ID = 'plex';

// ──────────────────────────────────────────────────────────────
// Project Row (desktop / tablet)
// ──────────────────────────────────────────────────────────────
function ProjectRow({ project, isActive, onActivate, onDeactivate }) {
  const inner = (
    <>
      <span className="pj-row-num">{project.num}</span>
      <div className="pj-row-content">
        <h2 className="pj-row-name">{project.displayName}</h2>
        <p className="pj-row-territory">{project.territory}</p>
        {project.meta && <p className="pj-row-meta">{project.meta}</p>}
      </div>
      <span className="pj-row-arrow" aria-hidden="true">→</span>
    </>
  );

  const sharedProps = {
    className: `pj-row ${isActive ? 'active' : 'inactive'}`,
    'aria-label': `View ${project.name} project`,
    onMouseEnter: onActivate,
    onFocus: onActivate,
  };

  if (project.external) {
    return (
      <a href={project.to} target="_blank" rel="noreferrer" {...sharedProps}>
        {inner}
      </a>
    );
  }
  return (
    <Link to={project.to} {...sharedProps}>
      {inner}
    </Link>
  );
}

// ──────────────────────────────────────────────────────────────
// Preview Image layer — cross-fade via CSS transitions
// ──────────────────────────────────────────────────────────────
function PreviewImages({ activeId }) {
  return (
    <div className="pj-preview-images">
      {PROJECTS.map((p) => (
        <img
          key={p.id}
          src={p.image}
          alt={p.imageAlt}
          className={`pj-preview-img ${activeId === p.id ? 'visible' : ''}`}
          // Preload by rendering all three; only one is visible
        />
      ))}
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// Phone Entry (self-contained editorial card)
// ──────────────────────────────────────────────────────────────
function PhoneEntry({ project }) {
  const inner = (
    <>
      <div className="pj-phone-entry-top">
        <span className="pj-phone-num">{project.num}</span>
        <h2 className="pj-phone-name">{project.displayName}</h2>
      </div>
      <p className="pj-phone-territory">{project.territory}</p>
      <div className="pj-phone-img-frame">
        <img src={project.image} alt={project.imageAlt} />
      </div>
      <div className="pj-phone-meta-row">
        {project.meta ? (
          <span className="pj-phone-status">{project.meta}</span>
        ) : (
          <span />
        )}
        <span className="pj-phone-link">View project →</span>
      </div>
    </>
  );

  if (project.external) {
    return (
      <a
        href={project.to}
        target="_blank"
        rel="noreferrer"
        className="pj-phone-entry"
        aria-label={`View ${project.name} project`}
      >
        {inner}
      </a>
    );
  }
  return (
    <Link
      to={project.to}
      className="pj-phone-entry"
      aria-label={`View ${project.name} project`}
    >
      {inner}
    </Link>
  );
}

// ──────────────────────────────────────────────────────────────
// Page
// ──────────────────────────────────────────────────────────────
export default function ProjectsIndex() {
  const [activeId, setActiveId] = useState(DEFAULT_ID);
  const browserRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Projects — Satwik Pachauri';
  }, []);

  // Reset to default when pointer leaves the entire browser region
  const handleBrowserLeave = useCallback(() => {
    setActiveId(DEFAULT_ID);
  }, []);

  const activeProject = PROJECTS.find((p) => p.id === activeId);

  return (
    <main className="projects-page">
      <div className="pj-wrapper">

        {/* ── Header ── */}
        <header className="pj-header">
          <p className="pj-marker">PROJECTS / 01</p>
          <h1 className="pj-heading">Selected work.</h1>
          <p className="pj-supporting">
            Different problems. Different systems. Different ways of thinking through interaction.
          </p>
        </header>

        {/* ── Desktop / Tablet Body ── */}
        <div
          className="pj-body"
          ref={browserRef}
          onMouseLeave={handleBrowserLeave}
        >

          {/* Index Left */}
          <div className="pj-index">
            {PROJECTS.map((project) => (
              <ProjectRow
                key={project.id}
                project={project}
                isActive={project.id === activeId}
                onActivate={() => setActiveId(project.id)}
                onDeactivate={() => {}} // reset handled by browser-level mouseleave
              />
            ))}
          </div>

          {/* Preview Right */}
          <div className="pj-preview">
            <div className="pj-preview-frame">
              <PreviewImages activeId={activeId} />
            </div>
            <div className="pj-preview-caption">
              <span className="pj-preview-name">{activeProject.name}</span>
              {activeProject.meta && (
                <span className="pj-preview-status">{activeProject.meta}</span>
              )}
            </div>
          </div>

        </div>

        {/* ── Phone List (no hover dependency) ── */}
        <div className="pj-phone-list">
          {PROJECTS.map((project) => (
            <PhoneEntry key={project.id} project={project} />
          ))}
        </div>

      </div>
    </main>
  );
}
