import React, { Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import './PageTransition.css';

export default function PageTransition() {
  const location = useLocation();
  // Normalize pathname: trim trailing slashes, fallback to root
  // Disregards hash and search query so local interactions and anchor navigation do not restart the fade
  const normalizedPath = location.pathname.replace(/\/+$/, '') || '/';

  return (
    <Suspense fallback={null}>
      <div key={normalizedPath} className="page-transition-wrapper">
        <Outlet />
      </div>
    </Suspense>
  );
}
