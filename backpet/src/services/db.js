const knexConfig = require('../../config/knexfile');
const { NODE_ENV } = require('../../config/general.config');

module.exports = require('knex')(knexConfig[NODE_ENV]);
