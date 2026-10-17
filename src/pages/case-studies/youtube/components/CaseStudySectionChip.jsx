import React from 'react';
import './CaseStudySectionChip.css';

export default function CaseStudySectionChip({ number, title }) {
  return (
    <div className="yt-section-chip font-body">
      {number && <span className="yt-chip-number">{number}</span>}
      {number && <span className="yt-chip-divider">/</span>}
      <span className="yt-chip-title">{title}</span>
    </div>
  );
}
