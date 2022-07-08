/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex('favorites').del();

  await knex('favorites').insert([
    { user_id: 1, adoption_id: 5 },
    { user_id: 2, adoption_id: 4 },
    { user_id: 2, adoption_id: 5 },
    { user_id: 3, adoption_id: 2 },
    { user_id: 3, adoption_id: 3 },
  ]);

  await knex.raw('ALTER TABLE favorites AUTO_INCREMENT=6');
};
