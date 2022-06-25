const userService = require('../services/user');

const create = async (req, res, next) => {
  res.send('createUser');
};

const getAll = async (req, res, next) => {
  res.send('listUsers');
};

const getById = async (req, res, next) => {
  res.send('getUser');
};

const update = async (req, res, next) => {
  res.send('updateUser');
};

const remove = async (req, res, next) => {
  res.send('removeUser');
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};
