const path = require('path');
const {
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
} = require('./general.config');

// banco de dados de desenvolvimento
const development = {
  client: 'mysql',
  connection: {
    database: `${DB_NAME}_dev`,
    user: DB_USER,
    password: DB_PASSWORD,
    host: DB_HOST,
    port: DB_PORT,
  },
  pool: {
    min: 0,
    max: 5,
  },
  migrations: {
    directory: path.join(__dirname, '../db/migrations'),
    tableName: 'knex_migrations',
  },
  seeds: {
    directory: path.join(__dirname, '../db/seeds'),
  },
};

// banco de dados de teste
const test = {
  client: 'mysql',
  connection: {
    database: `${DB_NAME}_test`,
    user: `${DB_USER}`,
    password: `${DB_PASSWORD}`,
  },
  pool: {
    min: 0,
    max: 5,
  },
  migrations: {
    directory: path.join(__dirname, '../db/migrations'),
    tableName: 'knex_migrations',
  },
  seeds: {
    directory: path.join(__dirname, '../db/seeds'),
  },
};

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development,
  test,
};
