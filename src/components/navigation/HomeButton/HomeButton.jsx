import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { House } from 'lucide-react';
import './HomeButton.css';

export default function HomeButton() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  // Sync scroll position with navbar and appearance switcher
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Contextual visibility: Hidden on homepage ('/'), visible everywhere else
  if (location.pathname === '/') {
    return null;
  }

  // Keyboard navigation support: Enter triggers Link natively; Spacebar activation handled explicitly
  const handleKeyDown = (e) => {
    if (e.key === ' ' || e.key === 'Spacebar') {
      e.preventDefault();
      navigate('/');
    }
  };

  return (
    <div className={`home-button-container ${isScrolled ? 'scrolled' : ''}`}>
      <Link
        to="/"
        className="home-button"
        onKeyDown={handleKeyDown}
        aria-label="Go to homepage"
      >
        <House className="home-button-icon" size={18} strokeWidth={2.2} aria-hidden="true" />
      </Link>
    </div>
  );
}
