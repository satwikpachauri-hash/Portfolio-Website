import React, { useEffect } from 'react';
import AboutSceneOne from './components/AboutSceneOne';
import AboutSceneTwo from './components/AboutSceneTwo';
import AboutSceneThree from './components/AboutSceneThree';

export default function About() {
  // Ensure we start at the top when routing
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "About - Satwik Pachauri";
  }, []);

  return (
    <main className="about-page">
      <AboutSceneOne />
      <AboutSceneTwo />
      <AboutSceneThree />
    </main>
  );
}
