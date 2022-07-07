const fs = require('fs');
const path = require('path');

const createDirs = filePath => {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
};

const deleteAllFrom = (folderPath, deletePfp = true) => {
  if (!fs.existsSync(folderPath)) return;
  if (deletePfp) return fs.rmSync(folderPath, { recursive: true });
  const files = fs.readdirSync(folderPath);
  files.forEach(file => {
    const filePath = path.join(folderPath, file);
    if (file.match(/profile_picture\.(png|jpg)$/) && !deletePfp) return;
    fs.rmSync(filePath);
  });
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
  deleteAllFrom,
};
