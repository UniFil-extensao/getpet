const multer = require('multer');
const { MAX_PET_PICS } = require('../../config/general.config');

const uploadValidator = multer({
  limits: {
    fileSize: 1_500_000, // 1.5MB
  },
  fileFilter: function (req, file, cb) {
    if (!file.mimetype.match(/^image\/((jpe?|pn)g)$/))
      return cb(new Error('Por favor envie apenas imagens de até 1.5MB.'));

    cb(null, true);
  },
});

const validateUpload = function (pfp = true, img = true) {
  const fields = [];
  pfp && fields.push({ name: 'pfp', maxCount: 1 });
  img && fields.push({ name: 'img', maxCount: MAX_PET_PICS });

  return uploadValidator.fields(fields);
};

module.exports = {
  validateUpload,
};
