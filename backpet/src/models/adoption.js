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

const list = async options => {
  const adjustQuery = queryBuilder => {
    if (options.search) {
      queryBuilder
        .where('pet_name', 'like', `%${options.search}%`)
        .orWhere('desc', 'like', `%${options.search}%`);
    }

    if (options.old_owner_id)
      queryBuilder.where('old_owner_id', options.old_owner_id);
    if (options.new_owner_id)
      queryBuilder.where('new_owner_id', options.new_owner_id);

    if (options.minAge) queryBuilder.where('pet_age', '>=', options.minAge);
    if (options.maxAge) queryBuilder.where('pet_age', '<=', options.maxAge);

    if (options.species)
      queryBuilder.where('pet_species', 'like', `%${options.species}%`);

    if (options.breeds) queryBuilder.whereIn('pet_breed', options.breeds);

    if (options.colors) queryBuilder.whereIn('pet_color', options.colors);
    if (options.sizes) queryBuilder.whereIn('pet_size', options.sizes);
  };

  const results = await knex.transaction(async trx => {
    const adoptionsQry = trx('adoptions')
      .select('*')
      .limit(options.limit)
      .offset(options.offset)
      .orderBy([options.sort])
      .modify(adjustQuery);

    const pagesQry = trx('adoptions')
      .modify(adjustQuery)
      .count('* as total_records')
      .then(([res]) => Math.ceil(res.total_records / options.limit));

    const [adoptions, total_pages] = await Promise.all([
      adoptionsQry,
      pagesQry,
    ]);

    return { adoptions, total_pages };
  });

  return results;
};

const update = async (options, data) => {
  if (data.new_owner_id) {
    data.status = 'F';
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
  const deletedRows = await knex.transaction(async trx => {
    await trx('adoptions').delete().where('id', id);
  });

  if (deletedRows === 0) throw new Error('Adoção não encontrada');
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