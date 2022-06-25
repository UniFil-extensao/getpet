const validator = require('validator');
const { InputValidationError, NotFoundError } = require('../utils/errors');
const User = require('../models/user');
const authenticator = require('./auth');

const create = async data => {
  // TODO: filtrar campos válidos de `data` (garantir que não existem campos inesperados ou proibidos)
  const { username, password, email, phone, cpf, city, uf } = data;
  const errors = {};

  // validar que campos obrigatórios estão todos presentes
  !username && (errors.username = 'O campo username é obrigatório');
  !password && (errors.password = 'O campo senha é obrigatório');
  !email && (errors.email = 'O campo email é obrigatório');
  !phone && (errors.phone = 'O campo telefone é obrigatório');
  !cpf && (errors.cpf = 'O campo CPF é obrigatório');
  !city && (errors.city = 'O campo cidade é obrigatório');
  !uf && (errors.uf = 'O campo UF é obrigatório');

  if (Object.entries(errors).length)
    throw new InputValidationError(errors, 400);

  // verificar que os dados são válidos
  // prettier-ignore
  const validUFs = ['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'];
  (!validator.isLength(username, { min: 3, max: 15 }) ||
    !validator.isAlphanumeric(username)) &&
    (errors.username =
      'O campo username deve ter entre 3 e 15 caracteres alfanuméricos');
  !validator.isEmail(email) && (errors.email = 'Email inválido');
  !validator.isMobilePhone(phone, 'pt-BR') &&
    (errors.phone = 'Telefone inválido');
  (!validator.isLength(uf, { min: 2, max: 2 }) || !validUFs.includes(uf)) &&
    (errors.uf = 'UF inválida');
  // TODO: validar que cidade existe
  // TODO: validar CPF
  // REM: validação temporária para garantir que cabe no banco.
  !validator.matches(cpf, /^\d{3}\.?\d{3}\.?\d{3}\-?\d{2}$/) &&
    (errors.cpf = 'CPF inválido');

  if (Object.entries(errors).length)
    throw new InputValidationError(errors, 422);

  // TODO: normalizar os dados (remover espaços em branco, etc)

  // Dados já devem estar no formato correto ao chegar aqui
  const user = await User.create(data);
  return user;
};

const getAll = async () => {
  const users = await User.getAll();
  return users;
};

const getById = async id => {
  const user = await User.getById(id);
  if (!user) throw new NotFoundError('Usuário não encontrado');
  return user;
};

const update = async (id, data) => {};

const remove = async id => {
  const user = await User.remove(+id);
  if (!user) throw new NotFoundError('Usuário não encontrado');
  return user;
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};
