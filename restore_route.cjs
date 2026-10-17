const fs = require('fs');
let app = fs.readFileSync('src/App.jsx', 'utf8');

// Add import if not present
if (!app.includes("const Cubicon = lazy(() => import('./pages/case-studies/cubicon/Cubicon'));")) {
  app = app.replace(
    "const Plex = lazy(() => import('./pages/case-studies/Plex'));",
    "const Plex = lazy(() => import('./pages/case-studies/Plex'));\nconst Cubicon = lazy(() => import('./pages/case-studies/cubicon/Cubicon'));"
  );
}

// Add route if not present
if (!app.includes('<Route path="/projects/cubicon" element={<Cubicon />} />')) {
  app = app.replace(
    '<Route path="/projects/plex" element={<Plex />} />',
    '<Route path="/projects/plex" element={<Plex />} />\n          <Route path="/projects/cubicon" element={<Cubicon />} />'
  );
}

fs.writeFileSync('src/App.jsx', app, 'utf8');
