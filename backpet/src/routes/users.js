const router = require('express').Router();
const authHandler = require('../middleware/auth');
const { validateUpload } = require('../middleware/upload');
const usersController = require('../controllers/users');

router.post('/', usersController.create);

if (process.env.NODE_ENV !== 'production') {
  router.get('/', usersController.getAll);
  router.delete('/:id', usersController.remove);
}

router.get('/:id', usersController.getById);

router.patch(
  '/:id',
  authHandler,
  ...validateUpload(true),
  usersController.update
);

router.post('/login', usersController.login);

router.post('/logout', authHandler, usersController.logout);

module.exports = router;
