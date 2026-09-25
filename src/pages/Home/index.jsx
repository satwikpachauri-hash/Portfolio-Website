import React from 'react';
import Hero from '../../components/hero/Hero';
import About from '../../components/about/About';
import Projects from '../../components/projects/Projects';
import Experience from '../../components/experience/Experience';
import Skills from '../../components/skills/Skills';
import Education from '../../components/education/Education';
import Contact from '../../components/contact/Contact';
import Footer from '../../components/footer/Footer';

export default function Home() {
  return (
    <div style={{ width: '100%', minHeight: '100vh', backgroundColor: 'var(--bg)' }}>
      <Hero />
      <About />
      <Projects />
      <Experience />
      <Skills />
      <Education />
      <Contact />
      <Footer />
    </div>
  );
}
