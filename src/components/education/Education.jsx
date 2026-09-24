import React from 'react';
import { motion } from 'motion/react';
import './Education.css';

const EDUCATION_DATA = [
  {
    index: "01",
    date: "2023 – 2027",
    degree: "BACHELOR OF DESIGN, UI/UX",
    institution: "UPES",
    description: "Studying comprehensive UI/UX, covering user research, user-centered design, interaction design, and Figma prototyping. Building a strong foundation for digital product innovation."
  },
  {
    index: "02",
    date: "May 2019 – Mar 2023",
    degree: "SENIOR SECONDARY EDUCATION",
    institution: "Delhi Public World School",
    description: "Completed CBSE Senior Secondary education from the Humanities stream. Gained a broad perspective and analytical skills valuable for understanding diverse user behaviors."
  }
];

const headingVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const listVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

const entryVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

export default function Education() {
  const [activeEntry, setActiveEntry] = React.useState(null);

  // Clear active state if user clicks outside
  React.useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.education-entry')) {
        setActiveEntry(null);
      }
    };
    document.addEventListener('touchstart', handleClickOutside);
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <section id="education" className="education-section">
      <div className="education-container">
        
        <motion.h2 
          className="education-heading font-display"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          EDUCATION
        </motion.h2>

        <div className="education-list">
          {EDUCATION_DATA.map((entry, idx) => {
            const isActive = activeEntry === idx;
            
            return (
              <motion.article 
                key={idx} 
                className={`education-entry ${isActive ? 'is-active' : ''}`}
                variants={entryVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-10%" }}
                transition={{ delay: idx * 0.15 }}
                tabIndex="0"
                onClick={() => setActiveEntry(idx)}
                onFocus={() => setActiveEntry(idx)}
                onBlur={() => setActiveEntry(null)}
              >
                <div className="edu-node-marker">
                  <div className="edu-node-halo"></div>
                </div>
                
                <div className="edu-meta">
                  <span className="edu-index font-display">{entry.index}</span>
                  <span className="edu-date font-body">{entry.date}</span>
                </div>

                <div className="edu-content">
                  <div className="edu-header">
                    <h3 className="edu-degree font-display">{entry.degree}</h3>
                    <p className="edu-institution font-body">{entry.institution}</p>
                  </div>
                  <p className="edu-description font-body">{entry.description}</p>
                </div>
              </motion.article>
            );
          })}
        </div>

      </div>
    </section>
  );
}
