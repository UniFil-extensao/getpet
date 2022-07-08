/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex('adoption_pics').del();
  await knex.raw('ALTER TABLE adoption_pics AUTO_INCREMENT=1');
};
