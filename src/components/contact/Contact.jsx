import React from 'react';
import { motion } from 'motion/react';
import { Phone } from 'lucide-react';
import { LinkedinIcon } from './LinkedinIcon';
import { GmailIcon } from './GmailIcon';
import './Contact.css';

export default function Contact() {
  const CONTACT_OPTIONS = [
    {
      id: 'linkedin',
      label: 'LINKEDIN',
      action: 'View profile',
      href: 'https://www.linkedin.com/in/satwik-pachauri-18474a369',
      isExternal: true,
      ariaLabel: "Open Satwik's LinkedIn profile",
      icon: <LinkedinIcon size={32} className="contact-icon brand-linkedin" />
    },
    {
      id: 'email',
      label: 'EMAIL',
      action: 'Open Gmail',
      href: 'https://mail.google.com/mail/?view=cm&fs=1&to=Satwikpachauri@gmail.com',
      isExternal: true,
      ariaLabel: "Email Satwik",
      icon: <GmailIcon size={32} className="contact-icon brand-gmail" />
    },
    {
      id: 'call',
      label: 'CALL',
      action: 'Call Satwik',
      href: 'tel:+919718550488',
      isExternal: false,
      ariaLabel: "Call Satwik",
      icon: <Phone size={32} strokeWidth={1.5} className="contact-icon brand-phone" />
    }
  ];

  const [activeId, setActiveId] = React.useState(null);

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        <div className="contact-grid">
          {/* Left Column: Editorial Statement */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="contact-editorial"
          >
            <h2 className="contact-title font-display">CONTACT</h2>
            <p className="contact-main-statement font-display">
              Got something<br/>worth figuring out?
            </p>
            <p className="contact-support-text font-body">
              Open to conversations around product, interaction, and UI/UX design.
            </p>
          </motion.div>

          {/* Right Column: Contact Actions */}
          <motion.div
            className="contact-actions"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            {CONTACT_OPTIONS.map((option) => (
              <motion.a
                key={option.id}
                href={option.href}
                target={option.isExternal ? "_blank" : undefined}
                rel={option.isExternal ? "noopener noreferrer" : undefined}
                className={`contact-action-row contact-${option.id} ${activeId === option.id ? 'is-touch-active' : ''}`}
                aria-label={option.ariaLabel}
                onPointerDown={() => setActiveId(option.id)}
                onPointerUp={() => setActiveId(null)}
                onPointerCancel={() => setActiveId(null)}
                onPointerLeave={() => setActiveId(null)}
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
                }}
              >
                <div className="ca-left">
                  <div className="ca-icon-wrapper">
                    {option.icon}
                  </div>
                  <div className="ca-text-group">
                    <span className="ca-label font-body">{option.label}</span>
                    <span className="ca-action font-body">{option.action}</span>
                  </div>
                </div>
                <div className="ca-right">
                  <span className="ca-arrow font-body">→</span>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
