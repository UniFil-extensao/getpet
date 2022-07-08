const favoriteService = require('../services/favorite');

const add = async (req, res, next) => {
  const data = { adoption_id: req.body.adoptionId, user_id: req.user.id };
  try {
    const favorite = await favoriteService.add(data);

    res.status(201).json(favorite);
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const favorite = await favoriteService.remove(req.user, +req.params.id);

    res.json(favorite);
  } catch (err) {
    next(err);
  }
};

const getFavUsers = async (req, res, next) => {
  try {
    const users = await favoriteService.getFavUsers(
      req.user,
      +req.params.adoptionId
    );

    res.json(users);
  } catch (err) {
    next(err);
  }
};

const getAllFromUser = async (req, res, next) => {
  try {
    const favorites = await favoriteService.getAllFromUser(req.user.id);

    res.json(favorites);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  add,
  remove,
  getFavUsers,
  getAllFromUser,
};
