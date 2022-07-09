const knex = require('../services/db');
// const Adoption = require('./adoption');
// const User = require('./user');

const schema = async () => {
  return await knex.table('adoptions').columnInfo();
};

const getById = async id => {
  const favorite = await knex('favorites').select('*').where('id', id);
  if (!favorite) throw new Error('Favorito não encontrado');
  return favorite[0];
};

const getFavUsers = async adoptionId => {
  const users = await knex('favorites')
    .select('users.id', 'users.username', 'users.profile_pic_path')
    .join('users', 'favorites.user_id', '=', 'users.id')
    .where('favorites.adoption_id', adoptionId);

  return users;
};

const getAllFromUser = async userId => {
  const favoriteAdoptions = await knex('favorites')
    .select(
      'favorites.id as favorite_id',
      'adoptions.id',
      'adoptions.pet_species',
      'adoptions.desc',
      'adoptions.thumbnail_path'
    )
    .join('adoptions', 'favorites.adoption_id', '=', 'adoptions.id')
    .where('favorites.user_id', userId);

  return favoriteAdoptions;
};

const add = async data => {
  const favoriteId = await knex('favorites').insert(data);

  return await getById(favoriteId[0]);
};

const remove = async id => {
  const affectedRows = await knex('favorites').where('id', id).del();

  if (!affectedRows) throw new Error('Favorito não encontrado');
  return id;
};

module.exports = {
  schema,
  add,
  remove,
  getById,
  getFavUsers,
  getAllFromUser,
};
