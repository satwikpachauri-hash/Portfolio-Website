import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import figmaLogo from '../../assets/logos/figma-1-logo-svgrepo-com.svg';
import photoshopLogo from '../../assets/logos/adobe-photoshop-cs6-logo-svgrepo-com.svg';
import illustratorLogo from '../../assets/logos/adobe-illustrator-cc-logo-svgrepo-com.svg';
import framerBlackLogo from '../../assets/logos/framer-Black.svg';
import framerBlueLogo from '../../assets/logos/framer-icon Blue.svg';
import antigravityLogo from '../../assets/logos/Google_Antigravity_Logo_2025.svg';
import vscodeLogo from '../../assets/logos/Visual Studio Code (VS Code).svg';
import './Skills.css';

const SOFTWARE_SKILLS = [
  'Figma',
  'Adobe Photoshop',
  'Adobe Illustrator',
  'Framer',
  'Antigravity',
  'VS Code'
];

const DESIGN_SKILLS = [
  'User Experience Design',
  'Product Design',
  'UX Research',
  'Interaction Design',
  'Design Systems',
  'Information Architecture',
  'Usability Testing',
  'Material Design 3',
  'User-Centered Design',
  'Product Strategy',
  'UI Design',
  'User Flows',
  'Wireframing',
  'Prototyping',
  'Problem Solving'
];

const getLogo = (name) => {
  switch(name) {
    case 'Figma':
      return <img src={figmaLogo} alt="Figma logo" className="software-logo-img" />;
    case 'Adobe Photoshop':
      return <img src={photoshopLogo} alt="Photoshop logo" className="software-logo-img" />;
    case 'Adobe Illustrator':
      return <img src={illustratorLogo} alt="Illustrator logo" className="software-logo-img" />;
    case 'Framer':
      return (
        <>
          <img src={framerBlackLogo} alt="Framer logo" className="software-logo-img framer-logo-light" />
          <img src={framerBlueLogo} alt="Framer logo" className="software-logo-img framer-logo-dark" />
        </>
      );
    case 'Antigravity':
      return <img src={antigravityLogo} alt="Antigravity logo" className="software-logo-img antigravity-logo-img" />;
    case 'VS Code':
      return <img src={vscodeLogo} alt="VS Code logo" className="software-logo-img" />;
    default:
      return null;
  }
};

const SoftwareRail = ({ items, firstGroupRef }) => {
  return (
    <div className="skill-category">
      <h3 className="skill-label font-display">
        <span className="skill-parent">SKILLS / </span>SOFTWARE
      </h3>
      <div className="skill-rail-container">
        <div className="skill-rail-track dir-right">
          {[0, 1, 2, 3].map((groupIndex) => (
            <div 
              key={`group-${groupIndex}`} 
              ref={groupIndex === 0 ? firstGroupRef : null}
              className="skill-rail-group software-group"
              aria-hidden={groupIndex > 0 ? "true" : undefined}
            >
              {items.map((item, idx) => (
                <div key={idx} className="software-item font-body">
                  <span className="software-logo">{getLogo(item)}</span>
                  <span className="software-name">{item}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const DesignSkillRail = ({ items, firstGroupRef, computedDuration }) => {
  return (
    <div className="skill-category">
      <h3 className="skill-label font-display">
        <span className="skill-parent">SKILLS / </span>DESIGN SKILLS
      </h3>
      <div className="skill-rail-container">
        <div 
          className="skill-rail-track dir-left"
          style={{ animationDuration: computedDuration ? `${computedDuration}s` : undefined }}
        >
          {[0, 1, 2, 3].map((groupIndex) => (
            <div 
              key={`group-${groupIndex}`} 
              ref={groupIndex === 0 ? firstGroupRef : null}
              className="skill-rail-group design-skill-group"
              aria-hidden={groupIndex > 0 ? "true" : undefined}
            >
              {items.map((item, idx) => (
                <React.Fragment key={idx}>
                  <div className="design-skill-item font-display">
                    {item}
                  </div>
                  <span className="design-skill-separator" aria-hidden="true">/</span>
                </React.Fragment>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function Skills() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const softwareGroupRef = useRef(null);
  const designGroupRef = useRef(null);
  const [designDuration, setDesignDuration] = useState(45); // Base fallback

  useEffect(() => {
    if (!softwareGroupRef.current || !designGroupRef.current) return;
    
    // The Software track is the source of truth (45s base)
    const SOFTWARE_MARQUEE_SPEED = 45; 
    
    const syncSpeed = () => {
      const swWidth = softwareGroupRef.current.getBoundingClientRect().width;
      const dsWidth = designGroupRef.current.getBoundingClientRect().width;
      
      if (swWidth > 0 && dsWidth > 0) {
        // Calculate the exact exact ratio needed so Design travels at identical pixels/second
        const speedRatio = dsWidth / swWidth;
        const DESIGN_SKILLS_MARQUEE_SPEED = SOFTWARE_MARQUEE_SPEED * speedRatio;
        setDesignDuration(DESIGN_SKILLS_MARQUEE_SPEED);
      }
    };

    // Run once on mount
    syncSpeed();

    // Use ResizeObserver to ensure it stays perfectly synced even if fonts load or layout shifts
    const observer = new ResizeObserver(syncSpeed);
    observer.observe(softwareGroupRef.current);
    observer.observe(designGroupRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" className="skills-section">
      
      <div className="skills-container">
        <motion.h2 
          className="skills-heading font-display"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          SKILLS
        </motion.h2>
      </div>

      <motion.div 
        className="skills-rails-wrapper"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
      >
        <motion.div variants={itemVariants}>
          <SoftwareRail items={SOFTWARE_SKILLS} firstGroupRef={softwareGroupRef} />
        </motion.div>

        <motion.div variants={itemVariants}>
          <DesignSkillRail items={DESIGN_SKILLS} firstGroupRef={designGroupRef} computedDuration={designDuration} />
        </motion.div>
      </motion.div>

    </section>
  );
}
