const fs = require('fs');
let c = fs.readFileSync('src/pages/case-studies/plex-components/PlexProductVision.css', 'utf8');

c = c.replace(
  /.plex-principle-text-stack {[\s\S]*?width: 100%;\n}/,
  \\.plex-principle-text-stack {
  position: relative;
  min-height: 280px; 
  width: 100%;
  display: grid;
  align-items: center;
}\
);

c = c.replace(
  /.plex-principle-block {[\s\S]*?transform: translateY\(-50%\); \/\* Centered vertically relative to phone \*\/\n}/,
  \\.plex-principle-block {
  grid-area: 1 / 1;
  width: 100%;
}\
);

fs.writeFileSync('src/pages/case-studies/plex-components/PlexProductVision.css', c);
