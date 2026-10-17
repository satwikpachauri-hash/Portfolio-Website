const fs = require('fs');
let content = fs.readFileSync('src/pages/Projects/ProjectsIndex.jsx', 'utf8');

content = content.replace(
  /id:\s*'cubicon',\s*num:\s*'02',([\s\S]*?)to:\s*'',\s*external:\s*false,/,
  "id: 'cubicon',\n      num: '02',$1to: '/projects/cubicon',\n      external: false,"
);

fs.writeFileSync('src/pages/Projects/ProjectsIndex.jsx', content, 'utf8');
