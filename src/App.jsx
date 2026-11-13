import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Lenis from 'lenis';
import { useTheme } from './hooks/useTheme';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Experience from './pages/Experience';
import Education from './pages/Education';
import Contact from './pages/Contact';
import Explorations from './pages/Explorations';
import Plex from './pages/case-studies/Plex';
import Cubicon from './pages/case-studies/cubicon/Cubicon';
import YouTube from './pages/case-studies/youtube/YouTube';

// Components
import DynamicIsland from './components/navigation/DynamicIsland/DynamicIsland';
import ThemeSwitcher from './components/navigation/ThemeSwitcher/ThemeSwitcher';
import HomeButton from './components/navigation/HomeButton/HomeButton';
import ScrollManager from './components/navigation/ScrollManager';
import PageTitleManager from './components/navigation/PageTitleManager';
import PageTransition from './components/navigation/PageTransition';

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
      stopInertiaOnNavigate: true,
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
      <PageTitleManager />
      <ScrollManager />
      <HomeButton />
      <DynamicIsland />
      <ThemeSwitcher />
      <Routes>
        <Route element={<PageTransition />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/explorations" element={<Explorations />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/education" element={<Education />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/projects/plex" element={<Plex />} />
          <Route path="/case-studies/plex" element={<Plex />} />
          <Route path="/projects/cubicon" element={<Cubicon />} />
          <Route path="/case-studies/cubicon" element={<Cubicon />} />
          <Route path="/projects/youtube-watchlater" element={<YouTube />} />
          <Route path="/case-studies/youtube-watchlater" element={<YouTube />} />
          <Route path="/projects/youtube" element={<YouTube />} />
          <Route path="/case-studies/youtube" element={<YouTube />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
