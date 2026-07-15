const fs = require('fs');
const path = require('path');

function renameApiFiles(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.lstatSync(filePath);
    
    if (stat.isDirectory()) {
      renameApiFiles(filePath);
    } else if (stat.isFile()) {
      // Skip already prefixed files, router.js, or hidden files
      if (file.startsWith('_') || file === 'router.js' || file.startsWith('.')) {
        continue;
      }
      const newFilePath = path.join(dir, '_' + file);
      fs.renameSync(filePath, newFilePath);
      console.log(`Renamed: ${filePath} -> ${newFilePath}`);
    }
  }
}

try {
  console.log('--- Starting Custom Vercel Build Step (Renaming API Files) ---');
  const apiDir = path.join(__dirname, 'api');
  if (fs.existsSync(apiDir)) {
    renameApiFiles(apiDir);
    console.log('Build step completed successfully!');
  } else {
    console.warn('API directory not found.');
  }
} catch (error) {
  console.error('Build step failed:', error);
  process.exit(1);
}
