const validator = require('validator');
const { InputValidationError, NotFoundError } = require('../utils/errors');
const User = require('../models/user');
const authenticator = require('./auth');

const create = async data => {
  // filtrar campos válidos de `data` (garantir que não existem campos inesperados ou proibidos)

  // validar que campos obrigatórios estão todos presentes

  // normalizar os dados (remover espaços em branco, etc)

  // Dados já devem estar no formato correto ao chegar aqui
  const user = await User.create(data);
  return user;
};

const getAll = async () => {};

const getById = async id => {};

const update = async (id, data) => {};

const remove = async id => {};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};
