/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('users', table => {
    table.increments('id').primary();
    table.string('username', 15).unique().notNullable();
    table.string('password', 255).notNullable();
    table.string('city', 255).notNullable();
    table.string('uf', 255).notNullable();
    table.string('cpf', 11).unique().notNullable();
    table.string('phone', 11).unique().notNullable();
    table.string('email', 255).unique().notNullable();
    table.double('adopter_score', 2, 1).unsigned().nullable();
    table.double('donor_score', 2, 1).unsigned().nullable();
    table.string('profile_pic_path', 255).nullable();
    table.enum('admin', ['S', 'N']).defaultTo('N');
    table.enum('active', ['S', 'N', 'B']).defaultTo('S');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('users');
};
