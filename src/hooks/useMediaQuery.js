import { useState, useEffect } from 'react';

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    window.addEventListener('resize', listener);
    return () => window.removeEventListener('resize', listener);
  }, [matches, query]);

  return matches;
}

export function useViewportClasses() {
  const isMobile = useMediaQuery('(max-width: 767px)');
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
  const isLaptop = useMediaQuery('(min-width: 1024px) and (max-width: 1439px)');
  const isDesktop = useMediaQuery('(min-width: 1440px)');

  if (isMobile) return 'mobile';
  if (isTablet) return 'tablet';
  if (isLaptop) return 'laptop';
  if (isDesktop) return 'desktop';
  
  return 'desktop'; // fallback
}
