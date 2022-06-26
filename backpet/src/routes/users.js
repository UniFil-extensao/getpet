const router = require('express').Router();
// const authHandler = require('../middleware/auth');
const usersController = require('../controllers/users');

router.post("/", usersController.create);

if (process.env.NODE_ENV !== 'production') {
  router.get('/', usersController.getAll);
  router.delete('/:id', usersController.remove);
}

router.get('/:id', usersController.getById);

// TODO: requer autenticação
router.put('/:id', usersController.update);

module.exports = router;
