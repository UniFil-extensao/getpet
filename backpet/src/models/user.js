const bcrypt = require('bcryptjs');
const knex = require('../services/db');
const { PASSWORD_SALT } = require('../../config/general.config');

const schema = async () => {
  return await knex.table('users').columnInfo();
};

const hashPassword = async password => {
  return await bcrypt.hash(password, PASSWORD_SALT);
};

const create = async data => {
  try {
    const user = await knex('users').insert(data).returning(['id', 'username']);
    return user;
  } catch (error) {
    return error;
  }
};

const getAll = async () => {
  const users = await knex('users').select(
    'id',
    'username',
    'phone',
    'email',
    'city',
    'uf',
    'adopter_score',
    'donor_score'
  );

  return users;
};

const getById = async id => {
  const [user] = await knex('users').where('id', id);
  if (!user) return;

  delete user.password;
  return user;
};

const getByCredentials = async (username, password) => {
  const user = await knex('users').where('username', username)[0];
  if (user.length === 0) return;
  const correctPassword = await bcrypt.compare(password, user.password);
  if (correctPassword) return user;
};

// TODO
const update = async (id, data) => {};

const remove = async id => {
  const user = await knex('users').where('id', id).del();
  return { id };
};

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
