const request = require('supertest');
const {
  describe,
  test,
  expect,
  beforeEach,
  beforeAll,
  afterAll,
} = require('@jest/globals');
const knex = require('../src/services/db');
const app = require('../app');
const { authenticate } = require('../src/services/auth');

beforeAll(async () => {
  process.env.NODE_ENV = 'test';
  await knex.migrate.rollback();
  await knex.migrate.latest();
});

beforeEach(async () => {
  await knex.seed.run();
});

afterAll(async () => {
  await knex.destroy();
});

// POST '/users/login'
describe('testes de login', () => {
  test.each([
    { id: 1, username: 'jaozin', password: '123456' },
    { id: 2, username: 'mariazinha', password: '123456' },
  ])(
    '%# deve logar o usuário $username e retornar um token como cookie',
    async ({ id, username, password }) => {
      const response = await request(app).post('/users/login').send({
        username,
        password,
      });

      expect(response.status).toBe(200);

      const cookies = response.headers['set-cookie'];
      expect(cookies).toHaveLength(1);
      expect(cookies[0]).toMatch(/token/);
      expect(cookies[0]).toMatch(/HttpOnly/);

      const user = response.body;

      expect(user).toBeDefined();
      expect(user.id).toBeDefined();
      expect(user.id).toBe(id);
      expect(user.username).toBe(username);

      expect(user.password).toBeUndefined();
      expect(user.admin).toBeUndefined();
      expect(user.active).toBeUndefined();
    },
    10000
  );

  test.each([
    { username: 'jaozin', password: 123456 },
    { username: 'jaozin', password: ['123', '456'] },
    { username: { firstName: 'joao', lastName: 'zin' }, password: '123456' },
    { username: undefined, password: '123456' },
    { username: 'jaozin', password: undefined },
  ])(
    '%# deve retornar erro ao tentar logar com dados inválidos',
    async ({ username, password }) => {
      const response = await request(app).post('/users/login').send({
        username,
        password,
      });

      expect(response.status).toBe(400);
      expect(response.body).toBeDefined();
      expect(response.body.errors).toBeDefined();
    }
  );

  test.each([
    { username: 'jaozin', password: '1234567' },
    { username: 'mariazinha', password: '1234567' },
    { username: 'jaozi', password: '123456' },
  ])(
    '%# deve retornar erro ao tentar logar com usuário ou senha errados',
    async ({ username, password }) => {
      const response = await request(app).post('/users/login').send({
        username,
        password,
      });

      expect(response.status).toBe(401);
      expect(response.body).toBeDefined();
      expect(response.body.errors).toBeDefined();
    }
  );
});

// POST '/users/logout'
describe('testes de logout', () => {
  test('deve deslogar o usuário e retornar status 204', async () => {
    const { token } = authenticate({ id: 1 });
    const response = await request(app)
      .post('/users/logout')
      .set({
        cookie: `token=${token}; HttpOnly; SameSite=Strict`,
      });

    expect(response.status).toBe(204);
    expect(response.headers['set-cookie']).toHaveLength(1);
    expect(response.headers['set-cookie'][0]).toMatch(/token/);
  }, 10000);

  test('deve retornar erro ao tentar deslogar sem token', async () => {
    const response = await request(app).post('/users/logout');

    expect(response.status).toBe(401);
    expect(response.body).toBeDefined();
    expect(response.body.errors).toBeDefined();
  });
});

// POST /users
describe('testes de criação de usuário', () => {
  test.each([
    {
      username: 'flaminga',
      cpf: '000000000-01',
      password: '123456',
      email: 'flaminga@email.com',
      phone: '82980569837',
      city: 'Londrina',
      uf: 'PR',
    },
    {
      username: 'flaminga',
      cpf: '000.000.000-01',
      password: 'senhaforte@123',
      email: 'flaminga@edu.unifil.br',
      phone: '(82) 98056-9837',
      city: 'Campo Grande',
      uf: 'MS',
      admin: true,
    },
  ])(
    '%# deve criar um usuário',
    async user => {
      const response = await request(app).post('/users').send(user);

      expect(response.status).toBe(201);

      const newUser = response.body;

      expect(newUser).toBeDefined();
      expect(newUser.id).toBeDefined();
      expect(newUser.password).toBeUndefined();
      expect(newUser.admin).toBeUndefined();
      expect(newUser.active).toBeUndefined();
    },
    10000
  );

  test.each([
    {
      username: 'flaminga',
      cpf: '000.000.000-a1',
      password: '123456',
      email: 'flaminga@edu.unifil.br',
      phone: '67998325892',
      city: 'Londrina',
      uf: 'PR',
    },
    {
      username: 'flaminga',
      cpf: '000000000001',
      password: 'senhaforte@123',
      email: 'flaminga@edu.unifil.br',
      phone: '(67) 99832-5892',
      city: 'Campo Grande',
      uf: 'MS',
    },
    {
      username: 'flaminga',
      cpf: '000.000.000-01',
      password: 'senhaforte@123',
      email: 'flaminga@edu.unifil.br',
      phone: '(67) 99832-5892',
      city: 'Campo Grande',
      uf: 'XJ',
    },
  ])(
    '%# deve retornar erro ao criar um usuário com dados inválidos',
    async user => {
      const response = await request(app).post('/users').send(user);

      expect(response.status).toBe(422);
      expect(response.body).toBeDefined();
      expect(response.body.errors).toBeDefined();
    },
    10000
  );

  test.each([
    {
      username: 'flaminga',
      cpf: '12345678901',
      password: '123456',
      email: 'flaminga@edu.unifil.br',
      phone: '(87) 9190-3737',
      city: 'Campo Grande',
      uf: 'MS',
    },
    {
      username: 'flaminga',
      cpf: '000000000-01',
      password: '123456',
      email: 'jao@email.com',
      phone: '8791903737',
      city: 'Campo Grande',
      uf: 'MS',
    },
    {
      username: 'jaozin',
      cpf: '000000000-01',
      password: '123456',
      email: 'flaminga@edu.unifil.br',
      phone: '8791903737',
      city: 'Campo Grande',
      uf: 'MS',
    },
    {
      username: 'flaminga',
      cpf: '000000000-01',
      password: '123456',
      email: 'flaminga@edu.unifil.br',
      phone: '(54) 98654-6571',
      city: 'Campo Grande',
      uf: 'MS',
    },
  ])(
    '%# deve retornar erro ao criar um usuário com dados repetidos',
    async user => {
      const response = await request(app).post('/users').send(user);

      expect(response.status).toBe(422);
      expect(response.body).toBeDefined();
      expect(response.body.errors).toBeDefined();
    },
    10000
  );

  test.each([
    {
      username: 'flaminga',
      cpf: '00000000-01',
    },
    {
      username: 'flaminga',
      cpf: '00000000-01',
      password: '123456',
      email: 'flaminga@gmail.com',
      phone: '(67) 99832-5892',
    },
    {},
  ])(
    '%# deve retornar erro ao criar um usuário com dados incompletos',
    async user => {
      const response = await request(app).post('/users').send(user);

      expect(response.status).toBe(400);
      expect(response.body).toBeDefined();
      expect(response.body.errors).toBeDefined();
    },
    10000
  );
});

// GET /users/:id
describe('testes de seleção de usuário', () => {
  test.each([1, 2])(
    '%# deve retornar um usuário sem dados sensíveis',
    async id => {
      const response = await request(app).get(`/users/${id}`);

      expect(response.status).toBe(200);

      const user = response.body;

      expect(user).toBeDefined();
      expect(user.id).toBeDefined();
      expect(user.password).toBeUndefined();
      expect(user.admin).toBeUndefined();
      expect(user.active).toBeUndefined();

      expect(user.cpf).toBeUndefined();
      expect(user.email).toBeUndefined();
    }
  );

  test.each(['0', 'sda', '-1'])(
    '%# deve retornar erro ao selecionar um usuário inexistente',
    async id => {
      const response = await request(app).get(`/users/${id}`);

      expect(response.status).toBe(404);
      expect(response.body).toBeDefined();
      expect(response.body.errors).toBeDefined();
    }
  );

  test.each([1, 2])(
    '%# deve retornar um usuário com dados sensíveis',
    async id => {
      const { token } = authenticate({ id });

      const response = await request(app)
        .get(`/users/${id}`)
        .set({
          cookie: `token=${token}; HttpOnly; SameSite=Strict`,
        });

      expect(response.status).toBe(200);

      const user = response.body;

      expect(user).toBeDefined();
      expect(user.id).toBeDefined();
      expect(user.password).toBeUndefined();
      expect(user.admin).toBeUndefined();
      expect(user.active).toBeUndefined();

      expect(user.cpf).toBeDefined();
      expect(user.email).toBeDefined();
    },
    10000
  );
});

// PATCH /users/:id
describe('testes de atualização de usuário', () => {
  /* 200 - OK */
  test.each([
    {
      username: 'flaminga',
      password: 'senhamtoboamds*12#@',
      email: 'flaminga@microsoft.com',
      phone: '(49) 98612-1321',
      address: {
        city: 'Arapongas',
        uf: 'PR',
      },
    },
    {
      active: false,
    },
    {
      active: 'N',
    },
    {
      active: true,
    },
    {
      active: 'S',
    },
  ])(
    '%# deve atualizar o usuário',
    async data => {
      const { token } = authenticate({ id: 2 });

      const response = await request(app)
        .patch('/users/2')
        .set({
          cookie: `token=${token}; HttpOnly; SameSite=Strict`,
        })
        .send(data);

      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();

      expect(response.body.id).toBe(2);
      expect(response.body.password).toBeUndefined();
      expect(response.body.admin).toBeUndefined();
      expect(response.body.active).toBeUndefined();
    },
    10000
  );

  // TODO:
  test.todo('deve atualizar a foto de perfil do usuário');

  test.each([
    {
      id: 1,
      username: 'flaminga',
    },
    {
      id: 2,
      username: 'flaminga',
    },
  ])(
    '%# deve atualizar o usuário utilizando a permissão de administrador',
    async ({ id, username }) => {
      const { token } = authenticate({ id: 1 });

      const response = await request(app)
        .patch(`/users/${id}`)
        .set({
          cookie: `token=${token}; HttpOnly; SameSite=Strict`,
        })
        .send({ username });

      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
      expect(response.body.id).toBe(id);
      expect(response.body.username).toBe(username);
    },
    10000
  );

  test('deve banir o usuário utilizando permissão de administrador', async () => {
    const { token } = authenticate({ id: 1 });

    const response = await request(app)
      .patch('/users/2')
      .set({
        cookie: `token=${token}; HttpOnly; SameSite=Strict`,
      })
      .send({ active: 'B' });

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body.id).toBe(2);
  }, 10000);

  /* 400 - Bad Request */
  test('deve retornar erro ao tentar atualizar um usuário sem passar dados', async () => {
    const { token } = authenticate({ id: 2 });

    const response = await request(app)
      .patch('/users/2')
      .set({
        cookie: `token=${token}; HttpOnly; SameSite=Strict`,
      })
      .send({});

    expect(response.status).toBe(400);
    expect(response.body).toBeDefined();
    expect(response.body.errors).toBeDefined();
  }, 10000);

  test.each([
    {
      address: {
        city: 'Arapongas',
      },
    },
    {
      address: {
        uf: 'PR',
      },
    },
  ])(
    '%# deve retornar erro ao tentar atualizar o endereço sem ambos os campos uf e city',
    async data => {
      const { token } = authenticate({ id: 2 });

      const response = await request(app)
        .patch('/users/2')
        .set({
          cookie: `token=${token}; HttpOnly; SameSite=Strict`,
        })
        .send(data);

      expect(response.status).toBe(400);
      expect(response.body).toBeDefined();
      expect(response.body.errors).toBeDefined();
    },
    10000
  );

  test('deve retornar erro ao tentar atualizar um usuário sem estar logado', async () => {
    const response = await request(app).patch('/users/2');

    expect(response.status).toBe(401);
    expect(response.body).toBeDefined();
    expect(response.body.errors).toBeDefined();
  }, 10000);

  test.todo('deve retornar erro ao tentar o upload de uma foto muito grande');

  test.todo('deve retornar erro ao não encontrar a imagem no url passado');

  /* 403 - Forbidden */
  test.each([1, 3])(
    '%# deve retornar erro ao tentar atualizar outro usuário sem ser administrador',
    async id => {
      const { token } = authenticate({ id: 2 });

      const response = await request(app)
        .patch(`/users/${id}`)
        .set({
          cookie: `token=${token}; HttpOnly; SameSite=Strict`,
        })
        .send({ username: 'flaminga' });

      expect(response.status).toBe(403);
      expect(response.body).toBeDefined();
      expect(response.body.errors).toBeDefined();
    },
    10000
  );

  test.each([1, 2, 3])(
    '%# deve retornar erro ao tentar banir um usuário sem permissão de administrador',
    async id => {
      const { token } = authenticate({ id: 2 });

      const response = await request(app)
        .patch(`/users/${id}`)
        .set({
          cookie: `token=${token}; HttpOnly; SameSite=Strict`,
        })
        .send({ active: 'B' });

      expect(response.status).toBe(403);
      expect(response.body).toBeDefined();
      expect(response.body.errors).toBeDefined();
    }
  );

  /* 404 - Not Found */
  test.each(['0', 'sda', '-1'])(
    '%# deve retornar erro ao atualizar um usuário inexistente',
    async id => {
      const { token } = authenticate({ id: 1 });
      const response = await request(app)
        .patch(`/users/${id}`)
        .send({
          username: 'flaminga',
        })
        .set({
          cookie: `token=${token}; HttpOnly; SameSite=Strict`,
        });

      expect([400, 404]).toContain(response.status);
      expect(response.body).toBeDefined();
      expect(response.body.errors).toBeDefined();
    },
    10000
  );

  /* 422 - Unprocessable Entity */
  test.each([
    {
      username: 4123,
    },
    {
      password: true,
    },
    {
      email: 43234,
    },
    {
      email: 'fsfsfefs',
    },
    {
      phone: '00000000000',
    },
    {
      address: {
        city: 'Arapongas',
        uf: 'XJ',
      },
    },
    {
      active: 'fsdfssdfsfs',
    },
    {
      active: 1230,
    },
  ])(
    '%# deve retornar erro ao atualizar um usuário com dados inválidos',
    async data => {
      const { token } = authenticate({ id: 2 });

      const response = await request(app)
        .patch('/users/2')
        .set({
          cookie: `token=${token}; HttpOnly; SameSite=Strict`,
        })
        .send(data);

      expect(response.status).toBe(422);
      expect(response.body).toBeDefined();
      expect(response.body.errors).toBeDefined();
    },
    10000
  );

  test.each([
    {
      id: 1,
      email: 'jao@email.com',
    },
    {
      id: 2,
      email: 'jao@email.com',
    },
    {
      id: 1,
      username: 'jaozin',
    },
    {
      id: 2,
      username: 'jaozin',
    },
    {
      id: 1,
      phone: '(54) 98654-6571',
    },
    {
      id: 2,
      phone: '(54) 98654-6571',
    },
  ])(
    '%# deve retornar erro ao atualizar um usuário com dados repetidos',
    async ({ id, ...data }) => {
      const { token } = authenticate({ id });

      const response = await request(app)
        .patch(`/users/2`)
        .set({
          cookie: `token=${token}; HttpOnly; SameSite=Strict`,
        })
        .send(data);

      expect(response.status).toBe(422);
      expect(response.body).toBeDefined();
      expect(response.body.errors).toBeDefined();
    },
    10000
  );
});
