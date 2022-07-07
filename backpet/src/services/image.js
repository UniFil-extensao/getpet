const fs = require('fs');
const path = require('path');

const createDirs = filePath => {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
};

const clearFile = filePath => {
  // check if file exists as another extension
  const dir = path.dirname(filePath);
  const ext = path.extname(filePath);
  const base = path.basename(filePath, ext);
  const files = [
    path.join(dir, `${base}${ext}`),
    path.join(dir, `${base}${ext === '.png' ? '.jpg' : '.png'}`),
  ];
  files.forEach(file => {
    if (fs.existsSync(file)) fs.rmSync(file);
  });
};

const saveToDisk = (fileData, filePath) => {
  const finalPath = path.join(__dirname, '../../uploads/', filePath);
  createDirs(finalPath);
  clearFile(finalPath);
  fs.writeFileSync(finalPath, fileData);

  return finalPath.match(/(\/uploads\/.*)$/)[1];
};

module.exports = {
  saveToDisk,
};
