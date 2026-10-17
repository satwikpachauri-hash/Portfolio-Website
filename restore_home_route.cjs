const fs = require('fs');
let content = fs.readFileSync('src/components/projects/Projects.jsx', 'utf8');

// Replace empty href with the correct internal route
content = content.replace(
  /id:\s*'cubicon',\s*title:\s*'Cubicon',([\s\S]*?)href:\s*''/,
  "id: 'cubicon',\n    title: 'Cubicon',$1href: '/projects/cubicon'"
);

fs.writeFileSync('src/components/projects/Projects.jsx', content, 'utf8');
