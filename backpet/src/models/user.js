const bcrypt = require('bcryptjs');
const knex = require('../services/db');
const { PASSWD_SALT } = require('../../config/general.config');

const schema = async () => {
  return await knex.table('users').columnInfo();
};

const hashPassword = password => {
  return bcrypt.hashSync(password, PASSWD_SALT);
};

const getById = async (id, conn = knex) => {
  const [user] = await conn('users').select('*').where('id', id);
  if (!user) return;

  delete user.password;
  return user;
};

const create = async data => {
  const user = await knex.transaction(async trx => {
    const [id] = await trx('users').insert(data);
    return await getById(id, trx);
  });

  delete user.active;
  delete user.admin;

  return user;
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

const findByCredentials = async (username, password) => {
  const [user] = await knex('users').where({
    username,
    active: 'S',
  });
  if (!user) return;

  const correctPassword = await bcrypt.compare(password, user.password);
  if (!correctPassword) return;

  delete user.password;
  delete user.active;
  delete user.admin;

  return user;
};

const update = async (id, data, conn) => {
  const updateTransaction = async trx => {
    await trx('users').update(data).where('id', id);
    return await getById(id, trx);
  };

  const user = !conn
    ? await knex.transaction(updateTransaction)
    : await updateTransaction(conn);

  return user;
};

const remove = async id => {
  await knex.transaction(async trx => {
    await trx('users').delete().where('id', id);
  });

  return id;
};

module.exports = {
  schema,
  hashPassword,
  create,
  getAll,
  getById,
  findByCredentials,
  update,
  remove,
};
