const userService = require('../services/user');

const create = async (req, res, next) => {
  try {
    const user = await userService.create(req.body);
    res.json(user);
  } catch (err) {
    next(err);
  }
};

const getAll = async (req, res, next) => {
  try {
    const users = await userService.getAll();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const user = await userService.getById(req.params.id);
    res.json(user);
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const user = await userService.update(req.params.id, req.body);
    res.json(user);
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const user = await userService.remove(req.params.id);
    res.json(user);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};
