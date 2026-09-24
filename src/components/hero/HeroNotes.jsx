import React from 'react';
import { useViewportClasses } from '../../hooks/useMediaQuery';
import './HeroNotes.css';

// All notes map to exactly calculated clamp centers to perfectly ring the text/portrait cross
// without overlapping each other, the text, or the portrait.
const notesData = [
  // TOP ROW (Above portrait)
  {
    id: 'ux',
    title: "USER EXPERIENCE DESIGN",
    desc: "Designing the overall experience across user needs, context and interaction.",
    clickable: false,
    nav: null,
    desktopStyle: { top: '15%', left: 'calc(50% - 22vw)', rotate: -2 },
    laptopStyle: { top: '14%', left: 'calc(50% - 24vw)', rotate: -2 },
  },
  {
    id: 'ia',
    title: "INFORMATION ARCHITECTURE",
    desc: "Organising content and structure so people can find what matters.",
    clickable: false,
    nav: null,
    desktopStyle: { top: '18%', left: '50%', rotate: -1 },
    laptopStyle: { top: '17%', left: '50%', rotate: -1 },
  },
  {
    id: 'product',
    title: "PRODUCT DESIGN",
    desc: "Turning a defined problem into a useful, usable product experience.",
    clickable: true,
    nav: "plex",
    desktopStyle: { top: '15%', left: 'calc(50% + 22vw)', rotate: 2 },
    laptopStyle: { top: '14%', left: 'calc(50% + 24vw)', rotate: 2 },
  },

  // MID ROW (Left and Right of text)
  {
    id: 'research',
    title: "UX RESEARCH",
    desc: "Finding patterns in behaviour, feedback and friction before the interface is refined.",
    clickable: true,
    nav: "youtube",
    desktopStyle: { top: '30%', left: 'calc(50% - 38vw)', rotate: 1 },
    laptopStyle: { top: '30%', left: 'calc(50% - 41vw)', rotate: 1 },
  },
  {
    id: 'usability',
    title: "USABILITY TESTING",
    desc: "Watching real interactions to uncover friction and unclear moments.",
    clickable: false,
    nav: null,
    desktopStyle: { top: '30%', left: 'calc(50% + 38vw)', rotate: 3 },
    laptopStyle: { top: '30%', left: 'calc(50% + 41vw)', rotate: 3 },
  },
  {
    id: 'strategy',
    title: "PRODUCT STRATEGY",
    desc: "Connecting user problems, product goals and design decisions.",
    clickable: false,
    nav: null,
    desktopStyle: { top: '70%', left: 'calc(50% - 38vw)', rotate: -2 },
    laptopStyle: { top: '70%', left: 'calc(50% - 41vw)', rotate: -2 },
  },
  {
    id: 'flows',
    title: "USER FLOWS",
    desc: "Mapping the paths people take through a product to keep interactions coherent.",
    clickable: false,
    nav: null,
    desktopStyle: { top: '70%', left: 'calc(50% + 38vw)', rotate: 1 },
    laptopStyle: { top: '70%', left: 'calc(50% + 41vw)', rotate: 1 },
  },

  // BOTTOM ROW (Below portrait)
  {
    id: 'ixd',
    title: "INTERACTION DESIGN",
    desc: "Shaping states, transitions and responses so the interface feels intentional.",
    clickable: false,
    nav: null,
    desktopStyle: { top: '88%', left: 'calc(50% - 22vw)', rotate: -1 },
    laptopStyle: { top: '90%', left: 'calc(50% - 24vw)', rotate: -1 },
  },
  {
    id: 'proto',
    title: "PROTOTYPING",
    desc: "Turning ideas into testable interactions before committing to final execution.",
    clickable: false,
    nav: null,
    desktopStyle: { top: '88%', left: '50%', rotate: 2 },
    laptopStyle: { top: '90%', left: '50%', rotate: 2 },
  },
  {
    id: 'systems',
    title: "DESIGN SYSTEMS",
    desc: "Building reusable rules and components that keep products coherent as they grow.",
    clickable: true,
    nav: "cubicon",
    desktopStyle: { top: '88%', left: 'calc(50% + 22vw)', rotate: -3 },
    laptopStyle: { top: '90%', left: 'calc(50% + 24vw)', rotate: -3 },
  }
];

export default function HeroNotes() {
  const viewport = useViewportClasses();

  const handleClick = (e, note) => {
    if (!note.clickable) return;
    e.preventDefault();
    const el = document.getElementById(note.nav);
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="hero-notes-layer">
      {notesData.map((note, index) => {
        // Fallback for tablet/mobile: completely hide on mobile to prevent squishing 10 notes
        // Tablet can use laptop styles as a fallback
        let style = note.desktopStyle;
        if (viewport === 'laptop') style = note.laptopStyle;
        if (viewport === 'tablet') style = note.laptopStyle; 
        if (viewport === 'mobile') return null;

        return (
          <div
            key={note.id}
            // Add a pseudo-random torn edge class based on the array index for subtle organic variety
            className={`hero-note torn-${(index % 4) + 1} ${note.clickable ? 'clickable' : 'non-clickable'}`}
            style={{ 
              top: style.top, 
              left: style.left, 
              // We keep the individual rotations but apply them via the transform style
              transform: `translate(-50%, -50%) rotate(${style.rotate}deg)`
            }}
            onClick={(e) => handleClick(e, note)}
          >
            <div className="note-screw">
              {/* The slot line gets a random rotation per screw for realism */}
              <div 
                className="screw-slot" 
                style={{ transform: `rotate(${(index * 45 + 15) % 180}deg)` }} 
              />
            </div>
            <div className="note-title font-display">{note.title}</div>
            <div className="note-desc font-body">{note.desc}</div>
          </div>
        );
      })}
    </div>
  );
}
