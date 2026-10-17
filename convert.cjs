const fs = require('fs');
const content = fs.readFileSync('src/pages/case-studies/cubicon/Cubicon.jsx', 'utf16le');
fs.writeFileSync('src/pages/case-studies/cubicon/Cubicon.jsx', content, 'utf8');
