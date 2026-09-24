import { useState, useEffect } from 'react';

export function usePointerCapability() {
  const [hasPointer, setHasPointer] = useState(false);

  useEffect(() => {
    const checkPointer = () => window.matchMedia('(pointer: fine)').matches;
    setHasPointer(checkPointer());

    const mediaQuery = window.matchMedia('(pointer: fine)');
    const listener = (e) => setHasPointer(e.matches);
    
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  return hasPointer;
}
