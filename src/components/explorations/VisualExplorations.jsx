import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useVelocity, useSpring, useTransform } from 'motion/react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import './VisualExplorations.css';

const photoData = [
  { id: 1, title: 'Warm Horizon', observation: 'Long lines, warm light, and architecture fading into the evening haze.', src: '/assets/photography/2.jpeg', alt: 'Rashtrapati Bhavan' },
  { id: 2, title: 'Pattern in the Wild', observation: 'Texture, pattern, and soft focus turn a small subject into a larger scene.', src: '/assets/photography/WhatsApp Image 2026-09-23 at 7.27.20 PM (3).jpeg', alt: 'Butterfly with white flowers' },
  { id: 3, title: 'After Rain', observation: 'Small droplets follow the curve of the leaf like temporary glass.', src: '/assets/photography/WhatsApp Image 2026-09-23 at 7.27.26 PM.jpeg', alt: 'Green leaf with droplets' },
  { id: 4, title: 'Blue in Sunlight', observation: 'Hard sunlight cuts across a weathered surface and reveals its texture.', src: '/assets/photography/WhatsApp Image 2026-09-23 at 7.27.30 PM.jpeg', alt: 'Blue door' },
  { id: 5, title: 'Framed in Green', observation: 'Foliage creates a natural frame around a quiet subject against the city.', src: '/assets/photography/WhatsApp Image 2026-09-23 at 7.26.48 PM.jpeg', alt: 'Peacock' },
  { id: 6, title: 'Against the Sky', observation: 'An open background isolates the butterfly and gives the frame a quiet sense of space.', src: '/assets/photography/WhatsApp Image 2026-09-23 at 7.27.21 PM.jpeg', alt: 'Second butterfly' },
  { id: 7, title: 'Quiet Structure', observation: 'A delicate web catches light while the world behind it falls softly away.', src: '/assets/photography/WhatsApp Image 2026-09-23 at 7.27.22 PM (1).jpeg', alt: 'Spider web' },
  { id: 8, title: 'Held in Water', observation: 'Tiny reflections gather along an ordinary branch and change how it reads.', src: '/assets/photography/WhatsApp Image 2026-09-23 at 7.27.20 PM.jpeg', alt: 'Yellow branch with droplets' },
  { id: 9, title: 'Suspended', observation: 'A sequence of droplets turns a distant landscape into a chain of reflections.', src: '/assets/photography/WhatsApp Image 2026-09-23 at 7.27.27 PM.jpeg', alt: 'Hanging droplets' },
  { id: 10, title: 'In Conversation', observation: 'Two opposing forms create a quiet visual relationship across the frame.', src: '/assets/photography/WhatsApp Image 2026-09-23 at 7.27.18 PM (2).jpeg', alt: 'Sculptures' },
  { id: 11, title: 'The Ship', observation: 'A wider frame establishes the miniature ship as a world of its own.', src: '/assets/photography/WhatsApp Image 2026-09-23 at 7.26.51 PM (1).jpeg', alt: 'Ship frame 01' },
  { id: 12, title: 'Deck', observation: 'Closer framing brings the timber, ropes, and structure into focus.', src: '/assets/photography/WhatsApp Image 2026-09-23 at 7.26.51 PM (2).jpeg', alt: 'Ship frame 02' },
  { id: 13, title: 'Detail', observation: 'Shallow focus isolates the deck mechanisms and softens everything around them.', src: '/assets/photography/WhatsApp Image 2026-09-23 at 7.26.51 PM (3).jpeg', alt: 'Ship frame 03' },
  { id: 14, title: 'Rigging', observation: 'Ropes, masts, and lines create a dense pattern of texture and depth.', src: '/assets/photography/WhatsApp Image 2026-09-23 at 7.26.52 PM (1).jpeg', alt: 'Ship frame 04' },
  { id: 15, title: 'Pulley', observation: 'Repeated wooden forms turn functional details into a visual rhythm.', src: '/assets/photography/WhatsApp Image 2026-09-23 at 7.26.52 PM (2).jpeg', alt: 'Ship frame 05' },
  { id: 16, title: 'Through Glass', observation: 'Reflection and transparency turn the miniature ship into a layered scene.', src: '/assets/photography/WhatsApp Image 2026-09-23 at 7.26.52 PM.jpeg', alt: 'Ship reflection' },
  { id: 17, title: 'Reflected Landscape', observation: 'A single hanging droplet acts as a natural lens.', src: '/assets/photography/WhatsApp Image 2026-09-23 at 7.27.26 PM (1).jpeg', alt: 'Droplet lens' }
];

const graphicWorks = [
  {
    id: 1,
    image: '/assets/graphic-design/EIPF Poster.jpg',
    title: 'Ethos Share',
    observation: 'Poster submission · Emirates International Poster Festival',
    alt: 'Ethos Share - Emirates International Poster Festival'
  }
];

export default function VisualExplorations() {
  const [viewerPhotoId, setViewerPhotoId] = useState(null);
  const [isGraphicViewerOpen, setIsGraphicViewerOpen] = useState(false);
  const viewportRef = useRef(null);
  
  // Drag suppression state
  const isDragging = useRef(false);
  const isGraphicDragging = useRef(false);

  // Physics-based sway for photography dragging
  const x = useMotionValue(0);
  const velocity = useVelocity(x);
  const smoothVelocity = useSpring(velocity, { damping: 40, stiffness: 400 });
  const dragTilt = useTransform(smoothVelocity, [-1000, 0, 1000], [-3, 0, 3]);

  // Graphic Design Pendulum Drag
  const graphicRotation = useSpring(1, { damping: 15, stiffness: 150 });

  const handleGraphicPan = (e, info) => {
    if (Math.abs(info.offset.x) > 3) {
      isGraphicDragging.current = true;
    }
    // Pulling right (positive x offset) swings bottom right -> counter-clockwise rotation (negative)
    let tilt = info.offset.x * -0.06;
    tilt = Math.max(Math.min(tilt, 10), -10); // Restrain max tilt
    graphicRotation.set(tilt + 1); // Add the resting 1deg tilt
  };

  const handleGraphicPanEnd = () => {
    graphicRotation.set(1); // Settle back to resting 1deg tilt
    setTimeout(() => {
      isGraphicDragging.current = false;
    }, 50);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setViewerPhotoId(null);
        setIsGraphicViewerOpen(false);
      }
      if (!viewerPhotoId) return;
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [viewerPhotoId]);

  const handleNext = () => {
    if (viewerPhotoId < photoData.length) {
      setViewerPhotoId(viewerPhotoId + 1);
    }
  };

  const handlePrev = () => {
    if (viewerPhotoId > 1) {
      setViewerPhotoId(viewerPhotoId - 1);
    }
  };

  const openViewer = (id) => setViewerPhotoId(id);
  const closeViewer = () => setViewerPhotoId(null);

  const renderPhotoCard = (item, index) => {
    const baseRot = [-2, -1, 0, 1, 2][index % 5];
    return (
      <div 
        key={item.id}
        className="contact-card-wrapper"
        onClick={(e) => {
          if (isDragging.current) {
            e.preventDefault();
            e.stopPropagation();
            return;
          }
          openViewer(item.id);
        }}
        onPointerDown={() => isDragging.current = false}
        role="button"
        aria-label={`Open photograph: ${item.title}`}
        tabIndex={0}
      >
        <motion.div 
          className="drag-tilt-layer" 
          style={{ rotate: dragTilt, transformOrigin: '50% 4px' }}
        >
          <div className="base-tilt-layer" style={{ transform: `rotate(${baseRot}deg)` }}>
            <div className="card-pin"></div>
            <div className={`contact-card sway-${index % 3}`}>
              <div className="contact-card-frame">
                <img src={item.src} alt={item.alt} loading="lazy" draggable={false} />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  };

  const activePhotoIndex = viewerPhotoId ? photoData.findIndex(p => p.id === viewerPhotoId) : -1;
  const activePhoto = activePhotoIndex !== -1 ? photoData[activePhotoIndex] : null;

  return (
    <section className="explorations-section" id="explorations">
      <div className="explorations-container">
        <div className="explorations-header">
          <h2 className="explorations-title font-display">EXPLORATIONS</h2>
        </div>

        <div className="exploration-subsection">
          <div className="subsection-header main-sub">
            <h3 className="subsection-title font-display">
              01<span className="title-spacer"></span>PHOTOGRAPHY
            </h3>
          </div>

          <div className="contact-sheet-wrapper">
            <div className="drag-signifier font-body">&larr; DRAG TO EXPLORE &rarr;</div>
            
            <div className="drag-viewport" ref={viewportRef}>
              <motion.div 
                className="drag-track"
                style={{ x }} drag="x" dragConstraints={viewportRef} dragElastic={0.05} dragTransition={{ bounceStiffness: 600, bounceDamping: 60 }} onDragStart={() => isDragging.current = true} onDragEnd={() => { setTimeout(() => isDragging.current = false, 50); }}
              >
                {photoData.map((item, index) => renderPhotoCard(item, index))}
              </motion.div>
            </div>
          </div>
        </div>

        <div className="exploration-subsection graphic-design-section">
          <div className="subsection-header main-sub">
            <h3 className="subsection-title font-display">
              02<span className="title-spacer"></span>GRAPHIC DESIGN
            </h3>
          </div>

          <div className="graphic-design-presentation">
              <div 
                className="graphic-poster-wrapper"
                onClick={(e) => {
                  if (isGraphicDragging.current) {
                    e.preventDefault();
                    e.stopPropagation();
                    return;
                  }
                  setIsGraphicViewerOpen(true);
                }}
                onPointerDown={() => isGraphicDragging.current = false}
                role="button"
                tabIndex={0}
                aria-label="Open Ethos Share poster"
                style={{ touchAction: "pan-y" }}
              >
                <div className="card-pin" style={{ zIndex: 10, position: "absolute", top: "4px", left: "50%", transform: "translateX(-50%)" }}></div>
                
                <motion.div 
                  className="base-tilt-layer"
                  style={{ rotate: graphicRotation, originX: 0.5, originY: 0 }}
                  onPan={handleGraphicPan}
                  onPanEnd={handleGraphicPanEnd}
                >
                  <div className="graphic-poster-card">
                    <img src={graphicWorks[0].image} alt={graphicWorks[0].alt} loading="lazy" />
                  </div>
                </motion.div>
              </div>

            <div className="graphic-metadata">
              <h4 className="graphic-title font-display">{graphicWorks[0].title}</h4>
              <p className="graphic-observation font-body">{graphicWorks[0].observation}</p>
            </div>
          </div>
        </div>

      </div>

      <AnimatePresence>
        {viewerPhotoId && activePhoto && (
          <motion.div 
            className="photo-viewer-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="viewer-top-bar">
              <div className="viewer-index font-body">
                {String(activePhoto.id).padStart(2, '0')} / {photoData.length}
              </div>
              <button 
                className="viewer-close" 
                onClick={closeViewer}
                aria-label="Close photograph"
              >
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>

            <div className="viewer-image-container">
              <img src={activePhoto.src} alt={activePhoto.alt} className="viewer-image" />
            </div>

            <div className="viewer-bottom-bar">
              <div className="viewer-text">
                <h3 className="viewer-title font-display">{activePhoto.title}</h3>
                <p className="viewer-observation font-body">{activePhoto.observation}</p>
              </div>
              
              <div className="viewer-controls">
                <button 
                  className="viewer-arrow" 
                  onClick={handlePrev}
                  disabled={viewerPhotoId === 1}
                  aria-label="Previous photograph"
                >
                  <ChevronLeft size={24} strokeWidth={1.5} />
                </button>
                <button 
                  className="viewer-arrow" 
                  onClick={handleNext}
                  disabled={viewerPhotoId === photoData.length}
                  aria-label="Next photograph"
                >
                  <ChevronRight size={24} strokeWidth={1.5} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isGraphicViewerOpen && (
          <motion.div 
            className="photo-viewer-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="viewer-top-bar">
              <div className="viewer-index font-body">
                01 / 01
              </div>
              <button 
                className="viewer-close" 
                onClick={() => setIsGraphicViewerOpen(false)}
                aria-label="Close poster"
              >
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>

            <div className="viewer-image-container graphic-viewer-container">
              <img src={graphicWorks[0].image} alt={graphicWorks[0].alt} className="viewer-image" />
            </div>

            <div className="viewer-bottom-bar graphic-bottom-bar">
              <div className="viewer-text">
                <h3 className="viewer-title font-display">{graphicWorks[0].title}</h3>
                <p className="viewer-observation font-body">{graphicWorks[0].observation}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}










