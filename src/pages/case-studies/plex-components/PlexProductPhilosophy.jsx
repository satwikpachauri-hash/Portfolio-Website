import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'motion/react';
import './PlexProductPhilosophy.css';

const PhilosophyPhrase = ({ children, yTransform, isMutedPhrase, isMutedState }) => {
  return (
    <span className="plex-phil-mask">
      <motion.span 
        className={`plex-phil-text ${isMutedPhrase && isMutedState ? 'muted-state' : ''}`}
        style={{ y: yTransform }}
      >
        {children}
      </motion.span>
    </span>
  );
};

export default function PlexProductPhilosophy() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // 1. Authoritative Muted State via Scroll Position (with Hysteresis)
  // Functional state update prevents stale closures in Framer Motion hooks.
  const [isMuted, setIsMuted] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setIsMuted(prev => {
      if (!prev && latest >= 0.62) return true;
      if (prev && latest <= 0.57) return false;
      return prev;
    });
  });

  // 2. TIMELINE REVEALS (y: 100% to 0%)
  // 0.00 - 0.14: Spend reveals
  const y1 = useTransform(scrollYProgress, [0.00, 0.14], ["100%", "0%"]);
  // 0.28 - 0.42: less time reveals
  const y2 = useTransform(scrollYProgress, [0.28, 0.42], ["100%", "0%"]);
  // 0.52 - 0.64: planning. reveals
  const y3 = useTransform(scrollYProgress, [0.52, 0.64], ["100%", "0%"]);
  // 0.72 - 0.82: More time reveals
  const y4 = useTransform(scrollYProgress, [0.72, 0.82], ["100%", "0%"]);
  // 0.82 - 0.93: getting work done. reveals
  const y5 = useTransform(scrollYProgress, [0.82, 0.93], ["100%", "0%"]);

  return (
    <section id="product-philosophy" className="plex-product-philosophy-wrapper" ref={containerRef}>
      <div className="plex-phil-sticky">
        
        <div className="plex-phil-container font-display">
          {/* LINE 1 */}
          <div className="plex-phil-line">
            <PhilosophyPhrase yTransform={y1} isMutedPhrase={false} isMutedState={isMuted}>
              Spend
            </PhilosophyPhrase>
            <PhilosophyPhrase yTransform={y2} isMutedPhrase={true} isMutedState={isMuted}>
              less time
            </PhilosophyPhrase>
            <PhilosophyPhrase yTransform={y3} isMutedPhrase={true} isMutedState={isMuted}>
              planning.
            </PhilosophyPhrase>
          </div>

          {/* LINE 2 */}
          <div className="plex-phil-line">
            <PhilosophyPhrase yTransform={y4} isMutedPhrase={false} isMutedState={isMuted}>
              More time
            </PhilosophyPhrase>
            <PhilosophyPhrase yTransform={y5} isMutedPhrase={false} isMutedState={isMuted}>
              getting work done.
            </PhilosophyPhrase>
          </div>
        </div>

      </div>
    </section>
  );
}
