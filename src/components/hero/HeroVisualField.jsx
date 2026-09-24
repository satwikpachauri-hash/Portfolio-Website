import React from 'react';
import './Hero.css';

export default function HeroVisualField({ showPortrait = true }) {
  return (
    <div className="hero-visual-field">
      {/* Abstract Design System Layer */}
      <div className="abstract-layer">
        <div className="crop-mark top-right" />
        <div className="crop-mark bottom-left" />
      </div>

      {/* Project Images */}
      <div className="project-visuals">
        {showPortrait && (
          <div className="visual main-portrait-visual">
            <img src="/assets/portrait/main-portrait.jpg" alt="Satwik Pachauri" />
          </div>
        )}
      </div>
    </div>
  );
}
