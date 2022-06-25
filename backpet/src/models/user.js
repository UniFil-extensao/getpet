const bcrypt = require('bcryptjs');
const knex = require('../services/db');
const { PASSWORD_SALT } = require('../../config/general.config');

// get users schema from knex
const schema = async () => {
  return await knex.table('users').columnInfo();
};

const hashPassword = async password => {
  return await bcrypt.hash(password, PASSWORD_SALT);
};

const create = async data => {};

const getAll = async () => {};

const getById = async id => {};

const getByCredentials = async (username, password) => {};

const update = async (id, data) => {};

const remove = async id => {};

module.exports = {
  schema,
  hashPassword,
  create,
  getAll,
  getById,
  getByCredentials,
  update,
  remove,
};
