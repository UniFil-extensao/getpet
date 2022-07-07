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

const bodyParser = (req, res, next) => {
  const fields = Object.keys(req.body);

  if (!req.files) return next();
  if (fields.length !== 1) {
    return res.status(400).json({
      errors: {
        fields: 'Os dados devem ser passados no campo apropriado.',
      },
    });
  }

  req.body = JSON.parse(req.body[fields[0]]);
  req.body.files = req.files;
  next();
};

const validateUpload = function (pfp = false, img = false) {
  const fields = [];
  pfp && fields.push({ name: 'pfp', maxCount: 1 });
  img && fields.push({ name: 'img', maxCount: MAX_PET_PICS });

  return [uploadValidator.fields(fields), bodyParser];
};

module.exports = {
  validateUpload,
};
