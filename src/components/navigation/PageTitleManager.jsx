import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ROUTE_TITLES = {
  '/': 'Satwik Pachauri | Product & Interaction Designer',
  '/about': 'About | Satwik Pachauri',
  '/projects': 'Projects | Satwik Pachauri',
  '/education': 'Education | Satwik Pachauri',
  '/experience': 'Experience | Satwik Pachauri',
  '/contact': 'Contact | Satwik Pachauri',
  '/explorations': 'Explorations | Satwik Pachauri',
  '/projects/plex': 'Plex | Satwik Pachauri',
  '/projects/cubicon': 'Cubicon | Satwik Pachauri',
  '/projects/youtube': 'YouTube | Satwik Pachauri',
  '/projects/youtube-watchlater': 'YouTube Watch Later | Satwik Pachauri',
  // Case study route aliases
  '/case-studies/plex': 'Plex | Satwik Pachauri',
  '/case-studies/cubicon': 'Cubicon | Satwik Pachauri',
  '/case-studies/youtube': 'YouTube | Satwik Pachauri',
  '/case-studies/youtube-watchlater': 'YouTube Watch Later | Satwik Pachauri',
};

const DEFAULT_TITLE = 'Satwik Pachauri | Product & Interaction Designer';

export default function PageTitleManager() {
  const location = useLocation();

  useEffect(() => {
    const normalizedPath = location.pathname.replace(/\/+$/, '') || '/';
    
    let title = ROUTE_TITLES[normalizedPath];

    // Handle hash route for explorations if navigated via /#explorations
    if (!title && location.hash === '#explorations') {
      title = 'Explorations | Satwik Pachauri';
    }

    document.title = title || DEFAULT_TITLE;
  }, [location.pathname, location.hash]);

  return null;
}
