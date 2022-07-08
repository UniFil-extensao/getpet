const router = require('express').Router();
const authHandler = require('../middleware/auth');
const favoritesController = require('../controllers/favorites');

router.post('/', authHandler, favoritesController.add);

router.delete('/:id', authHandler, favoritesController.remove);

router.get('/', authHandler, favoritesController.getAllFromUser);

router.get('/:adoptionId', authHandler, favoritesController.getFavUsers);

module.exports = router;
