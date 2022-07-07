/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('adoption_pics', table => {
    table.increments('id').primary();
    table.string('path', 255).notNullable();
    table
      .integer('adoption_id', 10)
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('adoptions');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('adoption_pics');
};
