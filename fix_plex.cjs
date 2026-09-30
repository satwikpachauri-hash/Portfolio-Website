const fs = require('fs');
let c = fs.readFileSync('src/pages/case-studies/Plex.jsx', 'utf8');
c = c.replace(
  "import PlexSolutionReveal from './plex-components/PlexSolutionReveal';",
  "import PlexSolutionReveal from './plex-components/PlexSolutionReveal';\nimport PlexProductVision from './plex-components/PlexProductVision';"
);
c = c.replace(
  "<PlexSolutionReveal />",
  "<PlexSolutionReveal />\n        <PlexProductVision />"
);
fs.writeFileSync('src/pages/case-studies/Plex.jsx', c);
