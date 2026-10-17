import React from 'react';
import './CaseStudySectionChip.css';

export default function CaseStudySectionChip({ number, title }) {
  return (
    <div className="case-study-section-chip font-body">
      {number && <span className="chip-number">{number}</span>}
      <span className="chip-title">{title}</span>
    </div>
  );
}
