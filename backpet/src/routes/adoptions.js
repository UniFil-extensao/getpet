const router = require('express').Router();
const authHandler = require('../middleware/auth');
const { validateUpload } = require('../middleware/upload');
const adoptionsController = require('../controllers/adoptions');

router.post(
  '/',
  authHandler,
  validateUpload(true, true),
  adoptionsController.create
);

router.get('/', adoptionsController.list);

router.get('/:id', adoptionsController.getById);

router.patch(
  '/:id',
  authHandler,
  validateUpload(true, false),
  adoptionsController.update
);

router.patch('/:id/close', authHandler, adoptionsController.close);

router.delete('/:id', authHandler, adoptionsController.deleteById);

// TODO: implementar
// router.get('/:id/pictures', adoptionsController.getPictures);
// router.put('/:id/pictures', authHandler, adoptionsController.updatePictures);

module.exports = router;
