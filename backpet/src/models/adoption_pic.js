const knex = require('../services/db');
// const imgService = require('../services/image');
// const Adoption = require('./adoption');

const schema = async () => {
  return await knex.table('adoptions').columnInfo();
};

const getPicturesFrom = async id => {
  const pictures = await knex('adoption_pics').where('adoption_id', id);
  return pictures;
};

module.exports = {
  schema,
  getPicturesFrom,
};
