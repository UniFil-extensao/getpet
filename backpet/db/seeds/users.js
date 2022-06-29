const { PASSWD_SALT } = require('../../config/general.config');
const password = require('bcryptjs').hashSync('123456', PASSWD_SALT);

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('users').del();

  // Reset auto-increment
  await knex.raw('ALTER TABLE users AUTO_INCREMENT=4');

  // Inserts seed entries
  return knex('users').insert([
    {
      id: 1,
      username: 'jaozin',
      password,
      city: 'Londrina',
      uf: 'PR',
      cpf: '12345678901',
      phone: '12345678901',
      email: 'jao@email.com',
      admin: 'S',
    },
    {
      id: 2,
      username: 'mariazinha',
      password,
      city: 'Maringá',
      uf: 'PR',
      cpf: '10987654321',
      phone: '10987654321',
      email: 'maria@maria.com.br',
    },
    {
      id: 3,
      username: 'josezinha',
      password,
      city: 'São Paulo',
      uf: 'SP',
      cpf: '20987654321',
      phone: '20987654321',
      email: 'josezinha@gmail.com',
    },
  ]);
};
