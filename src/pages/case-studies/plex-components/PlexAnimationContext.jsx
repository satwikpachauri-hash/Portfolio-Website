import React, { createContext, useContext, useState, useEffect } from 'react';

const PlexAnimationContext = createContext({ isReady: false });

export function PlexAnimationProvider({ children }) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const initialize = async () => {
      // 1. Wait for critical fonts to resolve
      await document.fonts.ready;

      // 2. Give layout a small tick to settle any responsive CSS
      await new Promise(resolve => requestAnimationFrame(resolve));
      await new Promise(resolve => setTimeout(resolve, 50)); 

      if (isMounted) {
        setIsReady(true);
      }
    };

    initialize();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <PlexAnimationContext.Provider value={{ isReady }}>
      {children}
    </PlexAnimationContext.Provider>
  );
}

export function usePlexAnimation() {
  return useContext(PlexAnimationContext);
}
