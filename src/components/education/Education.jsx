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
  const [activeEntry, setActiveEntry] = React.useState(0); // Default to 0

  React.useEffect(() => {
    const handleScroll = () => {
      const entries = document.querySelectorAll('.education-entry');
      if (entries.length === 0) return;
      
      const viewportCenter = window.innerHeight / 2;
      let minDistance = Infinity;
      let closestIdx = 0;
      let isSectionVisible = false;

      entries.forEach((entry, idx) => {
        const rect = entry.getBoundingClientRect();
        // Check if the entry is visible in the viewport with some buffer
        if (rect.top < window.innerHeight + 200 && rect.bottom > -200) {
          isSectionVisible = true;
        }
        
        // Use a weighted center. The visual weight of an entry is often near the top
        // But geometric center works well enough. Let's use top + 25% of height as reading position
        const readingPoint = rect.top + (rect.height * 0.25);
        const distance = Math.abs(viewportCenter - readingPoint);
        
        if (distance < minDistance) {
          minDistance = distance;
          closestIdx = idx;
        }
      });
      
      if (isSectionVisible) {
        setActiveEntry(closestIdx);
      }
    };
    
    let ticking = false;
    const scrollListener = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', scrollListener, { passive: true });
    window.addEventListener('resize', handleScroll);
    
    // Initial evaluation
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', scrollListener);
      window.removeEventListener('resize', handleScroll);
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
