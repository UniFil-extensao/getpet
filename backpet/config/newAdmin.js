const User = require('../src/models/user');

const args = process.argv.slice(2);
const [
  username,
  password,
  city = '',
  uf = '',
  cpf = '',
  phone = '',
  email = '',
] = args;

if (!username || !password) {
  console.error('Não foram passados nome de usuário e senha');
  process.exit(1);
}

User.create({
  username,
  password: User.hashPassword(password),
  city,
  uf,
  cpf,
  phone,
  email,
  admin: 'S',
})
  .then(() => process.exit(0))
  .catch(err => {
    // eslint-disable-next-line no-console
    console.log('Erro ao criar usuário');
    console.error(err);
    process.exit(1);
  });
