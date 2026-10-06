import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Phone } from 'lucide-react';
import { LinkedinIcon } from '../../components/contact/LinkedinIcon';
import { GmailIcon } from '../../components/contact/GmailIcon';
import './ContactPage.css';

const VERIFIED_EMAIL = 'Satwikpachauri@gmail.com';
const VERIFIED_PHONE = '+91 97185 50488';
const VERIFIED_PHONE_TEL = 'tel:+919718550488';
const VERIFIED_LINKEDIN = 'https://www.linkedin.com/in/satwik-pachauri-18474a369';

const CONTACT_ROWS = [
  {
    id: 'linkedin',
    label: 'LINKEDIN',
    action: 'View profile',
    href: VERIFIED_LINKEDIN,
    isExternal: true,
    icon: <LinkedinIcon size={22} className="cp-row-icon brand-linkedin" />,
    ariaLabel: "Open Satwik's LinkedIn profile in a new tab",
  },
  {
    id: 'email',
    label: 'EMAIL',
    action: 'Open Gmail',
    href: `https://mail.google.com/mail/?view=cm&fs=1&to=${VERIFIED_EMAIL}`,
    isExternal: true,
    icon: <GmailIcon size={22} className="cp-row-icon brand-gmail" />,
    ariaLabel: 'Open Gmail to email Satwik',
  },
  {
    id: 'call',
    label: 'CALL',
    action: 'Call Satwik',
    href: VERIFIED_PHONE_TEL,
    isExternal: false,
    icon: <Phone size={22} fill="currentColor" stroke="none" className="cp-row-icon brand-phone" />,
    ariaLabel: 'Call Satwik',
  },
];

export default function Contact() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [copied, setCopied] = useState(false);
  const prefersReduced = useRef(
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  // Refs for entrance animation
  const markerRef = useRef(null);
  const headlineRef = useRef(null);
  const subRef = useRef(null);
  const quickRef = useRef(null);
  const cardZoneRef = useRef(null);

  // Pointer tilt — only for fine pointer, non-touch
  const tiltRef = useRef(null);
  const canTilt = useRef(
    window.matchMedia('(hover: hover) and (pointer: fine)').matches
  );
  const tiltFrame = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Contact — Satwik Pachauri';
  }, []);

  // Entrance animation (CSS transition + requestAnimationFrame)
  useEffect(() => {
    if (prefersReduced.current) return;

    const elements = [
      markerRef.current,
      headlineRef.current,
      subRef.current,
      quickRef.current,
      cardZoneRef.current,
    ];

    elements.forEach((el) => el && el.classList.add('cp-anim-from'));

    const delays = [0, 80, 160, 280, 120];

    const timers = elements.map((el, i) => {
      if (!el) return null;
      return setTimeout(() => {
        el.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
        el.classList.remove('cp-anim-from');
      }, 100 + delays[i]);
    });

    return () => timers.forEach((t) => t && clearTimeout(t));
  }, []);

  // Pointer tilt handler — active only on front face
  const handlePointerMove = useCallback((e) => {
    if (!canTilt.current || isFlipped) return;
    if (tiltFrame.current) cancelAnimationFrame(tiltFrame.current);
    tiltFrame.current = requestAnimationFrame(() => {
      const el = tiltRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      // Max ±1.5 degrees
      const rx = -dy * 1.5;
      const ry = dx * 1.5;
      el.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
    });
  }, [isFlipped]);

  const handlePointerLeave = useCallback(() => {
    if (tiltFrame.current) cancelAnimationFrame(tiltFrame.current);
    const el = tiltRef.current;
    if (!el) return;
    el.style.transition = 'transform 0.5s ease';
    el.style.transform = 'rotateX(0deg) rotateY(0deg)';
    setTimeout(() => {
      if (el) el.style.transition = '';
    }, 500);
  }, []);

  const handleFlip = useCallback(() => {
    setIsFlipped((prev) => !prev);
  }, []);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsFlipped((prev) => !prev);
    }
  }, []);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(VERIFIED_EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard failed — email remains selectable
    }
  }, []);

  return (
    <main className="contact-page">
      <div className="cp-wrapper">
        <div className="cp-grid">

          {/* ── 1. INTRO (Top Left on Desktop, First on Mobile/Tablet) ── */}
          <div className="cp-intro">
            <p className="cp-marker" ref={markerRef}>CONTACT / 01</p>
            <h1 className="cp-headline" ref={headlineRef}>
              Good work usually starts with a conversation.
            </h1>
            <p className="cp-sub" ref={subRef}>
              I'm open to opportunities, collaborations and interesting problems.
            </p>
          </div>

          {/* ── 2. BUSINESS CARD (Right Column on Desktop, Second on Mobile/Tablet) ── */}
          <div className="cp-card-zone" ref={cardZoneRef}>
            {/* Tilt wrapper */}
            <div
              className="cp-card-tilt"
              ref={tiltRef}
              onPointerMove={handlePointerMove}
              onPointerLeave={handlePointerLeave}
            >
              {/* Flip wrapper — handles whole-card click to flip */}
              <div
                className={`cp-card-flip${isFlipped ? ' is-flipped' : ''}`}
                tabIndex={0}
                role="button"
                aria-label={
                  isFlipped
                    ? 'Digital business card back — click or press Enter to flip to front'
                    : 'Digital business card front — click or press Enter to view contact options'
                }
                onClick={handleFlip}
                onKeyDown={handleKeyDown}
              >
                {/* ── FRONT FACE ── */}
                <div
                  className="cp-card-face cp-card-front"
                  aria-hidden={isFlipped}
                  inert={isFlipped ? '' : undefined}
                >
                  <div className="cp-front-header">
                    <span className="cp-card-tag">DIGITAL BUSINESS CARD</span>
                  </div>

                  <div className="cp-front-main">
                    <img
                      src="/images/about/satwik-portrait.webp"
                      alt="Portrait of Satwik Pachauri"
                      className="cp-portrait"
                    />
                    <div className="cp-front-identity">
                      <h2 className="cp-front-name">Satwik Pachauri</h2>
                      <p className="cp-front-role">Interaction Designer</p>
                    </div>
                  </div>

                  <div className="cp-card-hint">
                    <span>FLIP CARD</span>
                    <span className="cp-hint-icon" aria-hidden="true">↻</span>
                  </div>
                </div>

                {/* ── BACK FACE ── */}
                <div
                  className="cp-card-face cp-card-back"
                  aria-hidden={!isFlipped}
                  inert={!isFlipped ? '' : undefined}
                >
                  <div className="cp-back-header">
                    <p className="cp-back-heading">GET IN TOUCH</p>
                  </div>

                  <div className="cp-contact-rows">
                    {CONTACT_ROWS.map((row) => (
                      <a
                        key={row.id}
                        href={row.href}
                        className={`cp-contact-row contact-${row.id}`}
                        target={row.isExternal ? '_blank' : undefined}
                        rel={row.isExternal ? 'noopener noreferrer' : undefined}
                        aria-label={row.ariaLabel}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="cp-row-left">
                          <div className="cp-row-icon-box">{row.icon}</div>
                          <div className="cp-row-text">
                            <span className="cp-row-label">{row.label}</span>
                            <span className="cp-row-action">{row.action}</span>
                          </div>
                        </div>
                        <span className="cp-row-arrow" aria-hidden="true">→</span>
                      </a>
                    ))}
                  </div>

                  <div className="cp-card-hint">
                    <span>FLIP BACK</span>
                    <span className="cp-hint-icon" aria-hidden="true">↶</span>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* ── 3. QUICK CONTACT (Bottom Left on Desktop, Third on Mobile/Tablet) ── */}
          <div className="cp-quick" ref={quickRef}>
            <p className="cp-quick-label">Quick contact</p>
            <div className="cp-quick-row">
              <a
                href={`mailto:${VERIFIED_EMAIL}`}
                className="cp-quick-email"
                aria-label="Send Satwik an email"
              >
                {VERIFIED_EMAIL}
              </a>
              <button
                className="cp-copy-btn"
                onClick={handleCopy}
                aria-label={copied ? 'Email copied to clipboard' : 'Copy email address'}
                aria-live="polite"
              >
                {copied ? 'COPIED' : 'COPY'}
              </button>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
