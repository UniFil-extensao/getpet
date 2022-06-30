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
    table.enum('pet_size', ['S', 'M', 'L']).notNullable();
    table.string('pet_name', 20).nullable();
    table
      .integer('pet_age', 4)
      .unsigned()
      .nullable()
      .comment('Idade do pet em meses.'); //
    table.string('pet_species', 20).nullable();
    table.string('pet_breed', 15).nullable();
    table.string('pet_color', 15).nullable();
    table.string('thumbnail_path', 255).nullable();
    table.double('adopter_score', 2, 0).unsigned().nullable();
    table.double('donor_score', 2, 0).unsigned().nullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('adoptions');
};
