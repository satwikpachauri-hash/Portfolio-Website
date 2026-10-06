const fs = require('fs');
const path = require('path');

function findFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      findFiles(filePath, fileList);
    } else {
      if (/\.(jsx)$/i.test(filePath)) {
        fileList.push(filePath);
      }
    }
  }
  return fileList;
}

const codeFiles = findFiles(path.join(__dirname, 'src'));

let count = 0;

for (const file of codeFiles) {
  if (file.includes('HeroVisualField.jsx')) continue; // Skip LCP

  let content = fs.readFileSync(file, 'utf-8');
  let originalContent = content;

  // Find all <img ...> tags
  // Add loading="lazy" if not present
  // Add decoding="async" if not present
  
  content = content.replace(/<img\s([^>]+)>/gi, (match, p1) => {
    let newAttr = p1;
    let modified = false;

    if (!/loading\s*=/i.test(p1)) {
      newAttr += ' loading="lazy"';
      modified = true;
    }
    if (!/decoding\s*=/i.test(p1)) {
      newAttr += ' decoding="async"';
      modified = true;
    }

    if (modified) count++;
    return `<img ${newAttr}>`;
  });

  if (content !== originalContent) {
    fs.writeFileSync(file, content);
    console.log(`Lazy loaded images in ${path.basename(file)}`);
  }
}

console.log(`Added lazy loading to ${count} image instances.`);
