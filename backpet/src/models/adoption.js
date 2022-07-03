const knex = require('../services/db');
const User = require('./user');

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

const getOwnerId = async id => {
  const [ownerId] = await knex('adoptions')
    .select('old_owner_id')
    .where('id', id);

  return ownerId.old_owner_id;
};

const getByOwner = async (id, type = { old: true, new: true }, conn = knex) => {
  // REFAC: mover para o list com opção de owner_id?
  const options = {};
  Object.entries(type).forEach(([key, value]) => {
    options[`${key}_owner_id`] = (value && id) || null;
  });

  const adoptions = await conn('adoptions').select('*').where(options);
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

const update = async (options, data) => {
  if (data.new_owner_id) {
    data.status = 'F';
    // eslint-disable-next-line camelcase
    data.closed_at = new Date();
  }
  return await knex.transaction(async trx => {
    const updatedRows = await trx('adoptions').update(data).where(options);
    if (updatedRows === 0) throw new Error('Adoção não encontrada');

    const adoption = await getById(options.id, trx);

    const getNewScore = async (adoption, scoreType) => {
      const userAdoptions = (
        await getByOwner(
          ...(scoreType === 'adopter_score'
            ? [adoption.new_owner_id, { new: true }]
            : [adoption.old_owner_id, { old: true }]),
          trx
        )
      ).filter(a => a[scoreType] !== null);
      const totalScore = userAdoptions.reduce(
        (acc, cur) => acc + (cur[scoreType] ?? 0),
        0
      );

      return totalScore / userAdoptions.length;
    };

    await Promise.all(
      ['donor_score', 'adopter_score'].map(async score => {
        if (!data[score]) return;
        const newScore = await getNewScore(adoption, score);
        return await User.update(
          score === 'adopter_score'
            ? adoption.new_owner_id
            : adoption.old_owner_id,
          { [score]: newScore },
          trx
        );
      })
    );

    return adoption;
  });
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
  getOwnerId, // esqueci pra que eu ia usar mas deixa q já eu lembro
  getByOwner,
  create,
  list,
  update,
  deleteById,
};
