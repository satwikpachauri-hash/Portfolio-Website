import React, { useEffect } from 'react';
import './ExperiencePage.css';

// ── Verified data: sourced directly from the homepage Experience component (CHAPTERS array).
// DO NOT modify the homepage component or its CHAPTERS — this is a separate, read-only copy.

const DESIGN_RECORDS = [
  {
    id: 'ui-ux-2025',
    num: '01',
    org: '1 Artifact Decor',
    role: 'UI/UX Designer',
    year: '2025',
    period: 'Jun – Jul 2025',
    location: 'Agra, Uttar Pradesh, India',
    context: 'Worked on UI/UX initiatives and collaborated with the graphic design team on a product catalogue, contributing to interface refinement, visual structure, and information layout.',
    contributions: [
      'Contributed to interface refinement and information layout for a product catalogue.',
      'Collaborated with the graphic design team to align visual structure across materials.',
      'Supported the bridge between product presentation and user-facing design decisions.',
    ],
    isActive: true,
  },
  {
    id: 'graphic-2024',
    num: '02',
    org: 'Gramrajya Vikas Evam Prashikshan Sansthan (GVPS)',
    role: 'Graphic Designer',
    year: '2024',
    period: 'Jun – Jul 2024',
    location: 'Jaipur, Rajasthan, India',
    context: 'Designed educational presentations and visual materials around social issues, translating complex topics into accessible visual communication.',
    contributions: null,
    isActive: false,
  },
];

const EARLIER_RECORDS = [
  {
    id: 'retail-2022',
    num: '03',
    org: 'India International Trade Fair',
    role: 'Retail Sales Lead',
    year: '2022',
    period: 'November 2022',
    location: 'Pragati Maidan, New Delhi',
    context: 'Led an assigned trade-fair stall, managing product selection, pricing, negotiation, and promotional offers. Generated ₹3.10L in sales over 14 days.',
    contributions: null,
    isActive: false,
  },
  {
    id: 'merchandiser-2022',
    num: '04',
    org: '1 Artifact Decor',
    role: 'Merchandiser',
    year: '2022',
    period: 'October 2022',
    location: 'Greater Noida, Uttar Pradesh, India',
    context: 'Represented 1 Artifact Décor at the IHGF Delhi Fair, handling international client enquiries and coordinating product requirements between two exhibition stalls.',
    contributions: null,
    isActive: false,
  },
  {
    id: 'retail-2021',
    num: '05',
    org: 'India International Trade Fair',
    role: 'Retail Sales Lead',
    year: '2021',
    period: 'November 2021',
    location: 'Pragati Maidan, New Delhi',
    context: 'Led an assigned trade-fair stall, managing product selection, pricing, negotiation, and promotional offers. Generated ₹2.97L in sales over 14 days.',
    contributions: null,
    isActive: false,
  },
];

function ExperienceRecord({ record }) {
  const cls = `exp-record ${record.isActive ? 'exp-record--active' : ''}`;
  return (
    <article className={cls}>
      <div className="exp-record-rule" aria-hidden="true" />
      <div className="exp-record-inner">

        {/* Date column */}
        <div className="exp-record-date-col">
          <span className="exp-record-num">{record.num}</span>
          <span className="exp-record-year">{record.year}</span>
          <span className="exp-record-period">{record.period}</span>
        </div>

        {/* Content column */}
        <div className="exp-record-content">
          <h2 className="exp-record-org">{record.org}</h2>
          <p className="exp-record-role">{record.role}</p>

          {/* Expanded content — active record only (phone shows all via CSS override) */}
          <div className="exp-record-expanded">
            <p className="exp-record-context">{record.context}</p>

            {record.contributions && (
              <ul className="exp-contributions" aria-label="Contributions">
                {record.contributions.map((c, i) => (
                  <li key={i} className="exp-contribution">
                    <span className="exp-contribution-num" aria-hidden="true">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <p className="exp-contribution-text">{c}</p>
                  </li>
                ))}
              </ul>
            )}

            <p className="exp-record-location">{record.location}</p>
          </div>
        </div>

      </div>
    </article>
  );
}

export default function ExperiencePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Experience — Satwik Pachauri';
  }, []);

  return (
    <main className="exp-page">
      <div className="exp-wrapper">

        {/* ── Intro ── */}
        <header className="exp-intro">
          <p className="exp-marker">EXPERIENCE / 01</p>
          <h1 className="exp-heading">Learning by doing.</h1>
          <p className="exp-supporting">
            The places where design stopped being an assignment and started carrying responsibility.
          </p>
        </header>

        {/* ── Design Records ── */}
        <section className="exp-records" aria-label="Design experience">
          {DESIGN_RECORDS.map(record => (
            <ExperienceRecord key={record.id} record={record} />
          ))}
        </section>

        {/* ── Transition marker ── */}
        <div className="exp-transition-record" role="separator" aria-label="Earlier experience">
          <span className="exp-transition-label">Earlier</span>
          <p className="exp-transition-text">Before design became the direction.</p>
        </div>

        {/* ── Earlier Records ── */}
        <section className="exp-records" aria-label="Earlier experience">
          {EARLIER_RECORDS.map(record => (
            <ExperienceRecord key={record.id} record={record} />
          ))}
        </section>

      </div>
    </main>
  );
}
