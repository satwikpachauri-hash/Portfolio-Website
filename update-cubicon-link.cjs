const fs = require('fs');
let content = fs.readFileSync('src/pages/Projects/ProjectsIndex.jsx', 'utf-8');
content = content.replace(
  "to: 'https://amazing-marshmallow-e2b6ac.netlify.app/',\n    external: true,",
  "to: '/projects/cubicon',\n    external: false,"
);
fs.writeFileSync('src/pages/Projects/ProjectsIndex.jsx', content);
console.log('ProjectsIndex updated.');
