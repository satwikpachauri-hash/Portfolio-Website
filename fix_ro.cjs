const fs = require('fs');
let c = fs.readFileSync('src/pages/case-studies/plex-components/PlexProblemSection.jsx', 'utf8');
const search = /updateFocus\(\);\s*window\.addEventListener\('resize', updateFocus\);\s*return \(\) => window\.removeEventListener\('resize', updateFocus\);/;
const replacement = "      updateFocus();\n      window.addEventListener('resize', updateFocus);\n      \n      let ro;\n      if (containerRef.current) {\n        ro = new ResizeObserver(() => updateFocus());\n        ro.observe(containerRef.current);\n      }\n      \n      return () => {\n        window.removeEventListener('resize', updateFocus);\n        if (ro) ro.disconnect();\n      };";
c = c.replace(search, replacement);
fs.writeFileSync('src/pages/case-studies/plex-components/PlexProblemSection.jsx', c);
