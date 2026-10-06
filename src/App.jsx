import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Lenis from 'lenis';
import { useTheme } from './hooks/useTheme';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Pages (Lazy loaded)
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Projects = lazy(() => import('./pages/Projects'));
const Experience = lazy(() => import('./pages/Experience'));
const Education = lazy(() => import('./pages/Education'));
const Contact = lazy(() => import('./pages/Contact'));
const Plex = lazy(() => import('./pages/case-studies/Plex'));

// Components
import DynamicIsland from './components/navigation/DynamicIsland/DynamicIsland';
import ScrollManager from './components/navigation/ScrollManager';
import GoogleAnalytics from './components/GoogleAnalytics';

function App() {
  useTheme(); // Initialize theme

  // Disable native scroll restoration to prevent conflicts with Lenis
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    window.lenis = lenis;

    const updateScrollTrigger = () => ScrollTrigger.update();
    lenis.on('scroll', updateScrollTrigger);

    const tick = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off('scroll', updateScrollTrigger);
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return (
    <Router>
      <GoogleAnalytics />
      <ScrollManager />
      <DynamicIsland />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/education" element={<Education />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/projects/plex" element={<Plex />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;



