import React, { useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import YouTubeHero from './components/YouTubeHero';
import YouTubeProblem from './components/YouTubeProblem';
import YouTubeProcess from './components/YouTubeProcess';
import YouTubeResearch from './components/YouTubeResearch';
import YouTubeFriction from './components/YouTubeFriction';
import YouTubeSolutions from './components/YouTubeSolutions';
import YouTubeProjectedImpact from './components/YouTubeProjectedImpact';
import YouTubeFinalImpact from './components/YouTubeFinalImpact';
import YouTubeFooter from './components/YouTubeFooter';
import './YouTube.css';

export default function YouTube() {
  useEffect(() => {
    let isMounted = true;
    if (document.fonts) {
      document.fonts.ready.then(() => {
        requestAnimationFrame(() => {
          if (isMounted) ScrollTrigger.refresh(true);
        });
      });
    }
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <article className="youtube-case-study">
      {/* Hero Section */}
      <YouTubeHero />

      {/* 01. The Problem */}
      <YouTubeProblem />

      {/* 02. Design Process */}
      <YouTubeProcess />

      {/* 03. Research Data */}
      <YouTubeResearch />

      {/* 04. Friction Analysis (Three Places It Breaks) */}
      <YouTubeFriction />

      {/* 05. Design Solutions */}
      <YouTubeSolutions />

      {/* 06. Projected Business Impact */}
      <YouTubeProjectedImpact />

      {/* 07. Final Impact */}
      <YouTubeFinalImpact />

      {/* Case Study Footer */}
      <YouTubeFooter />
    </article>
  );
}
