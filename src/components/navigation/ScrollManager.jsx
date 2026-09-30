import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollManager() {
  const location = useLocation();

  useEffect(() => {
    // We always want to ensure we are at the top on a fresh route change or reload 
    // unless there is a specific hash.
    if (location.hash) {
      setTimeout(() => {
        const id = location.hash.replace('#', '');
        if (window.lenis) {
          window.lenis.scrollTo(`#${id}`, { offset: 0 });
        } else {
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }, 50);
    } else {
      setTimeout(() => {
        if (window.lenis) {
          window.lenis.scrollTo(0, { immediate: true });
        } else {
          window.scrollTo(0, 0);
        }
      }, 50);
    }
  }, [location.pathname, location.hash]);

  return null;
}
