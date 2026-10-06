const fs = require('fs');
const path = require('path');

const replacements = JSON.parse(fs.readFileSync('replacements.json', 'utf-8'));

function findFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      findFiles(filePath, fileList);
    } else {
      if (/\.(jsx|js|css)$/i.test(filePath)) {
        fileList.push(filePath);
      }
    }
  }
  return fileList;
}

const codeFiles = findFiles(path.join(__dirname, 'src'));

for (const file of codeFiles) {
  let content = fs.readFileSync(file, 'utf-8');
  let originalContent = content;

  for (const rep of replacements) {
    // Escape for regex
    function escapeRegExp(string) {
      return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
    }

    // Try to replace absolute paths like /case-studies/...
    const escapedOldName = escapeRegExp(rep.oldName);
    const escapedNewName = escapeRegExp(rep.newName);
    
    // First pass: replace the exact basename if it appears with the old extension
    // We only want to replace it if it's inside quotes or part of a path
    const regex = new RegExp(escapedOldName, 'g');
    content = content.replace(regex, rep.newName);
  }

  if (content !== originalContent) {
    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
  }
}
console.log('Finished updating source files.');
