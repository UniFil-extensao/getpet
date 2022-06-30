const knex = require('../services/db');

const schema = async () => {
  return await knex.table('adoptions').columnInfo();
};

const getById = async (id, conn = knex) => {
  // TODO: criar e utilizar view retornando os usernames dos donos
  const [adoption] = await conn('adoptions').select('*').where('id', id);

  Object.keys(adoption).forEach(key => {
    adoption[key] === null && delete adoption[key];
  });

  return adoption;
};

const getByOwner = async (id, type = { old: true, new: true }) => {
  // REFAC: mover para o list com opção de owner_id?
  const options = {};
  Object.entries(type).forEach(([key, value]) => {
    options[`${key}_owner_id`] = (value && id) || null;
  });

  const adoptions = await knex('adoptions').select('*').where(options);
  return adoptions;
};

const create = async data => {
  const adoption = await knex.transaction(async trx => {
    const [id] = await trx('adoptions').insert(data);
    return await getById(id, trx);
  });

  return adoption;
};

// eslint-disable-next-line no-unused-vars
const list = async options => {
  // TODO: implementar
  // filtros, pesquisa, paginação
};

const update = async (id, data) => {
  const adoption = await knex.transaction(async trx => {
    await trx('adoptions').update(data).where('id', id);
    return await getById(id, trx);
  });

  return adoption;
};

// eslint-disable-next-line no-unused-vars
const close = async id => {
  // TODO: definir como vai ser feito e implementar
  // status = 'F', closed_at = now();
};

const deleteById = async id => {
  await knex.transaction(async trx => {
    await trx('adoptions').delete().where('id', id);
  });

  return id;
};

module.exports = {
  schema,
  getById,
  getByOwner,
  create,
  list,
  update,
  close,
  deleteById,
};
