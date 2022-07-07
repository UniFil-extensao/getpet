const validator = require('validator');
const {
  InputValidationError,
  NotFoundError,
  ForbiddenError,
  InvalidDataHandler,
} = require('../utils/errors');
const { trim } = require('../utils/strings');
const User = require('../models/user');
const authService = require('./auth');

const validations = {
  id: (id, onFail) =>
    Number.isInteger(id) && id > 0 ? id : onFail('ID inválido'),

  username: (username, onFail) => {
    const options = { min: 3, max: 15 };
    return validator.isLength(username, options) &&
      validator.isAlphanumeric(username)
      ? username
      : onFail(
          'O nome de usuário deve ter entre 3 e 15 caracteres alfanuméricos'
        );
  },
  password: (password, onFail) => {
    const options = { min: 6 };
    return validator.isLength(password, options)
      ? User.hashPassword(password)
      : onFail(`A senha deve ter no mínimo ${options.min} caractéres`);
  },
  email: (email, onFail) => {
    // eslint-disable-next-line camelcase
    email = validator.normalizeEmail(email, { all_lowercase: false });
    return validator.isEmail(email)
      ? email
      : onFail('O email informado é inválido');
  },
  phone: (phone, onFail) => {
    phone = validator.whitelist(phone, '0123456789');
    return validator.isMobilePhone(phone, 'pt-BR') &&
      validator.isLength(phone, { min: 10, max: 11 })
      ? phone
      : onFail('O telefone informado é inválido');
  },
  cpf: (cpf, onFail) => {
    if (!validator.matches(cpf, /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/))
      return onFail('CPF inválido');
    cpf = validator.whitelist(cpf, '0123456789');
    return cpf;
  },
  city: (city, onFail) => {
    city = validator.whitelist(city.toLowerCase(), '[a-zA-Z ]');
    const options = { min: 3 };
    return validator.isLength(city, options) ? city : onFail('Cidade inválida');
  },
  uf: (uf, onFail) => {
    uf = validator.whitelist(uf.toUpperCase(), '[A-Z]');
    // prettier-ignore
    return (validator.isIn(uf, [
      'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
      'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
      'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
    ])) ? uf : onFail('UF inválida');
  },
  active: (active, onFail) => {
    if (['S', 'N', 'B'].includes(trim(active))) return active;
    if (typeof active !== 'boolean') return onFail('Status Inválido');
    return active ? 'S' : 'N';
  },
  files: files => files,
};

const create = async data => {
  // prettier-ignore
  const requiredFields = ['username', 'password', 'email', 'phone', 'cpf', 'city', 'uf'];
  const errors = {};

  requiredFields.forEach(field => {
    data[field] = trim(data[field]);
    if (!data[field]) errors[field] = `${field} é obrigatório`;
  });

  if (Object.entries(errors).length)
    throw new InputValidationError(errors, 400);

  requiredFields.forEach(field => {
    data[field] = validations[field](data[field], msg => (errors[field] = msg));
  });

  if (Object.entries(errors).length)
    throw new InputValidationError(errors, 422);

  try {
    const user = await User.create(data);
    return authService.authenticate(user);
  } catch (err) {
    if (err.sqlMessage) InvalidDataHandler(err);
    throw err;
  }
};

const getAll = async () => {
  const users = await User.getAll();
  return users;
};

const getById = async id => {
  validations.id(id, msg => {
    throw new InputValidationError({ id: msg }, 404);
  });
  const user = await User.getById(id);
  if (!user) throw new NotFoundError({ user: 'Usuário não encontrado' });
  return user;
};

const update = async (author, data) => {
  if (!authService.isAuthorized(author, data)) {
    throw new ForbiddenError({
      accessDenied: 'Você não tem permissão para fazer isso.',
    });
  }

  const id = validations.id(data.id, msg => {
    throw new InputValidationError({ id: msg }, 404);
  });
  delete data.id;

  if (!Object.keys(data).length) {
    throw new InputValidationError(
      { data: 'Não foi passado nenhum dado para atualizar' },
      400
    );
  }

  if (data.address) {
    if (!data.address.city || !data.address.uf) {
      throw new InputValidationError(
        { address: 'Devem ser informados a cidade e o estado' },
        400
      );
    }
    data.city = data.address.city;
    data.uf = data.address.uf;

    delete data.address;
  }

  const errors = {};
  Object.keys(data).forEach(field => {
    if (field !== 'active')
      data[field] = field !== 'files' ? trim(data[field]) : data[field];

    if (!data[field] && data[field] !== false)
      // eslint-disable-next-line array-callback-return
      return (errors[field] = 'Valor inválido');
    data[field] = validations[field](data[field], msg => (errors[field] = msg));
  });

  if (Object.entries(errors).length)
    throw new InputValidationError(errors, 422);

  if (data.active === 'B' && !author.admin) {
    throw new ForbiddenError(
      { perms: 'Você não tem permissão para fazer isso' },
      403
    );
  }

  try {
    const updatedUser = await User.update(id, data);
    if (!updatedUser)
      throw new NotFoundError({ user: 'Usuário não encontrado' });
    return updatedUser;
  } catch (err) {
    if (err.sqlMessage) InvalidDataHandler(err);
    throw err;
  }
};

const remove = async id => {
  const user = await User.remove(+id);
  if (!user) throw new NotFoundError({ user: 'Usuário não encontrado' });
  return user;
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};
