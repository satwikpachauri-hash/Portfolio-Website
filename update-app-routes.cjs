const fs = require('fs');
let content = fs.readFileSync('src/App.jsx', 'utf-8');
content = content.replace(
  "const Plex = lazy(() => import('./pages/case-studies/Plex'));",
  "const Plex = lazy(() => import('./pages/case-studies/Plex'));\nconst Cubicon = lazy(() => import('./pages/case-studies/cubicon/Cubicon'));"
);
content = content.replace(
  "<Route path=\"/projects/plex\" element={<Plex />} />",
  "<Route path=\"/projects/plex\" element={<Plex />} />\n          <Route path=\"/projects/cubicon\" element={<Cubicon />} />"
);
fs.writeFileSync('src/App.jsx', content);
console.log('App.jsx updated.');
