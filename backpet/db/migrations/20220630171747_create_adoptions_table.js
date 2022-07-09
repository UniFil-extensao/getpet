const { DB_ALLOWS } = require('../../config/general.config');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('adoptions', table => {
    table.increments('id').primary();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('closed_at').nullable();
    table
      .enum('status', ['A', 'F'])
      .defaultTo('A')
      .comment('A: Aberta, F: Finalizada'); //
    table
      .integer('old_owner_id', 10)
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
    table
      .integer('new_owner_id', 10)
      .unsigned()
      .references('id')
      .inTable('users')
      .onDelete('SET NULL');
    table.text('desc').notNullable();
    table.enum('pet_size', DB_ALLOWS.allowedSizes).notNullable();
    table.string('pet_name', 20).nullable();
    table
      .integer('pet_age', 4)
      .unsigned()
      .nullable()
      .comment('Idade do pet em meses.'); //
    table
      .enum('pet_species', DB_ALLOWS.allowedSpecies)
      .notNullable()
      .defaultTo(DB_ALLOWS.allowedSpecies[0]);
    table.string('pet_breed', 40).nullable();
    table
      .enum('pet_color', DB_ALLOWS.allowedColors)
      .defaultTo(DB_ALLOWS.allowedColors[0]);
    table.string('thumbnail_path', 255).nullable();
    table.double('adopter_score', 2, 1).unsigned().nullable();
    table.double('donor_score', 2, 1).unsigned().nullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('adoptions');
};
