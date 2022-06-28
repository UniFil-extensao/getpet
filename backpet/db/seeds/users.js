/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('users').del();

  // reset autoincrement
  await knex.raw('ALTER TABLE users AUTO_INCREMENT=4');

  // Inserts seed entries
  return knex('users').insert([
    {
      id: 1,
      username: 'jaozin',
      password: '1234',
      city: 'Londrina',
      uf: 'PR',
      cpf: '12345678901',
      phone: '12345678901',
      email: 'jao@email.com',
    },
    {
      id: 2,
      username: 'mariazinha',
      password: '1234',
      city: 'Maringá',
      uf: 'PR',
      cpf: '10987654321',
      phone: '10987654321',
      email: 'maria@maria.com.br',
    },
    {
      id: 3,
      username: 'josezinha',
      password: '1234',
      city: 'São Paulo',
      uf: 'SP',
      cpf: '20987654321',
      phone: '20987654321',
      email: 'josezinha@gmail.com',
    },
  ]);
};
