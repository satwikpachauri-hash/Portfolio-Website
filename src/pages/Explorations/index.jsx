import React, { useEffect } from 'react';
import VisualExplorations from '../../components/explorations/VisualExplorations';

export default function Explorations() {
  return (
    <main className="explorations-page" style={{ paddingTop: '40px', minHeight: '100svh', backgroundColor: 'var(--bg)' }}>
      <VisualExplorations />
    </main>
  );
}
