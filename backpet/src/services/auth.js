const jwt = require('jsonwebtoken');
const { InputValidationError, ForbiddenError } = require('../utils/errors');
const { trim } = require('../utils/strings');
const { JWT_SECRET } = require('../../config/general.config');
const User = require('../models/user');

const validateCredentials = async function (credentials) {
  const errors = {};

  const username = trim(credentials.username);
  if (!username) errors.username = 'Deve ser fornecido o nome de usuário';

  const password = trim(credentials.password);
  if (!password) errors.password = 'Deve ser fornecida a senha';

  if (Object.keys(errors).length) throw new InputValidationError(errors, 400);

  return { username, password };
};

const authenticate = user => ({
  user,
  token: jwt.sign({ id: user.id }, JWT_SECRET),
});

const validateToken = async function (token) {
  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await User.getById(id);
    if (!user) throw new Error();
    return user;
  } catch (error) {
    throw new ForbiddenError({ accessDenied: 'Login Necessário' }, 401);
  }
};

const login = async function (credentials) {
  const { username, password } = await validateCredentials(credentials);

  const user = await User.findByCredentials(username, password);
  if (!user) {
    throw new ForbiddenError(
      { accessDenied: 'Usuário ou senha inválidos' },
      401
    );
  }

  return authenticate(user);
};

const isAuthorized = (author, target) => {
  return author.admin || author.id === target.id;
};

module.exports = {
  login,
  validateToken,
  authenticate,
  isAuthorized,
};
