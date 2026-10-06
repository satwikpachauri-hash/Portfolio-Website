const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { execSync } = require('child_process');

const MAX_WIDTH = 1920;
const QUALITY = 80;

const directories = [
  path.join(__dirname, 'public'),
  path.join(__dirname, 'src', 'assets')
];

function findImages(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      findImages(filePath, fileList);
    } else {
      if (/\.(png|jpg|jpeg)$/i.test(filePath)) {
        fileList.push(filePath);
      }
    }
  }
  return fileList;
}

async function processImages() {
  let allImages = [];
  for (const dir of directories) {
    allImages = allImages.concat(findImages(dir));
  }

  const largeImages = allImages.filter(file => fs.statSync(file).size > 1024 * 500); // > 500KB

  console.log(`Found ${largeImages.length} images larger than 500KB.`);

  const replacements = [];

  for (const file of largeImages) {
    const ext = path.extname(file);
    const newFile = file.replace(new RegExp(`${ext}$`, 'i'), '.webp');
    
    console.log(`Processing: ${file} (${(fs.statSync(file).size / 1024 / 1024).toFixed(2)} MB)`);
    
    // Backup
    const backupFile = file + '.bak';
    fs.copyFileSync(file, backupFile);

    try {
      await sharp(file)
        .resize({ width: MAX_WIDTH, withoutEnlargement: true })
        .webp({ quality: QUALITY, effort: 4 })
        .toFile(newFile);
      
      console.log(` -> Created ${newFile} (${(fs.statSync(newFile).size / 1024 / 1024).toFixed(2)} MB)`);
      
      // Delete original so we only use webp
      fs.unlinkSync(file);

      // We need to replace the reference in code
      // We will search for the path relative to 'public' or 'src'
      let relativePath = '';
      if (file.includes('public')) {
        relativePath = file.split('public')[1].replace(/\\/g, '/');
      } else if (file.includes('src')) {
        relativePath = file.split('src')[1].replace(/\\/g, '/');
      }

      const oldRef = relativePath;
      const newRef = relativePath.replace(new RegExp(`${ext}$`, 'i'), '.webp');
      
      // Also account for just filename in some cases
      const oldName = path.basename(file);
      const newName = path.basename(newFile);

      replacements.push({ oldRef, newRef, oldName, newName });
    } catch (e) {
      console.error(`Error processing ${file}:`, e);
      fs.renameSync(backupFile, file); // Restore
    }
  }

  fs.writeFileSync('replacements.json', JSON.stringify(replacements, null, 2));
  console.log('Done optimizing images.');
}

processImages();
