import React from 'react';
import AboutSceneOne from './components/AboutSceneOne';
import AboutSceneTwo from './components/AboutSceneTwo';
import AboutSceneThree from './components/AboutSceneThree';

export default function About() {
  return (
    <main className="about-page">
      <AboutSceneOne />
      <AboutSceneTwo />
      <AboutSceneThree />
    </main>
  );
}
