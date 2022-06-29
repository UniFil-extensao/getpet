const validator = require('validator');
const {
  InputValidationError,
  NotFoundError,
  ForbiddenError,
} = require('../utils/errors');
const User = require('../models/user');
const authenticator = require('./auth');

const validations = {
  username: (username, onFail) => {
    username = validator.whitelist(username, '[a-zA-Z0-9_]');
    if (
      validator.isLength(username, { min: 3, max: 15 }) &&
      validator.isAlphanumeric(username)
    )
      return username;
    return onFail(
      'O nome de usuário deve ter entre 3 e 15 caracteres alfanuméricos'
    );
  },
  password: async (password, onFail) => {
    const options = { min: 6 };
    if (validator.isLength(password, options))
      return User.hashPassword(password);
    return await onFail(`A senha deve ter no mínimo ${options.min} caractéres`);
  },
  email: (email, onFail) => {
    // eslint-disable-next-line camelcase
    email = validator.normalizeEmail(email, { all_lowercase: false });
    if (validator.isEmail(email)) return email;
    return onFail('O email informado é inválido');
  },
  phone: (phone, onFail) => {
    phone = validator.whitelist(phone, '[0-9]');
    if (
      validator.isMobilePhone(phone, 'pt-BR') &&
      validator.isLength(phone, { min: 10, max: 11 })
    )
      return phone;
    return onFail('O telefone informado é inválido');
  },
  cpf: (cpf, onFail) => {
    cpf = validator.whitelist(cpf, '[0-9]');
    if (validator.matches(cpf, /^\d{11}$/)) return cpf;
    return onFail('CPF inválido');
  },
  city: (city, onFail) => {
    city = validator.whitelist(city.toLowerCase(), '[a-zA-Z ]');
    if (validator.isLength(city, { min: 3 })) return city;
    return onFail('Cidade inválida');
  },
  uf: (uf, onFail) => {
    uf = validator.whitelist(uf.toUpperCase(), '[A-Z]');
    // prettier-ignore
    if (validator.isIn(uf, ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'])) return uf;
    return onFail('UF inválida');
  },
  active: (active, onFail) => {
    if (['S', 'N', 'B'].includes(active.trim())) return active;
    if (typeof active !== 'boolean') return onFail('Status Inválido');
    return active ? 'S' : 'N';
  },
  // TODO: validar imagem
  // eslint-disable-next-line no-unused-vars
  profilePic: (profilePic, onFail) => {
    return profilePic;
  },
};

const create = async data => {
  // prettier-ignore
  const requiredFields = ['username', 'password', 'email', 'phone', 'cpf', 'city', 'uf'];
  const errors = {};

  requiredFields.forEach(field => {
    data[field] = data[field]?.trim();
    if (!data[field]) errors[field] = `${field} é obrigatório`;
  });

  if (Object.entries(errors).length)
    throw new InputValidationError(errors, 400);

  requiredFields.forEach(field => {
    if (field === 'password') return;
    data[field] = validations[field](data[field], msg => (errors[field] = msg));
  });
  data.password = await validations.password(data.password);

  if (Object.entries(errors).length)
    throw new InputValidationError(errors, 422);

  try {
    const user = await User.create(data);
    return authenticator.authenticate(user);
  } catch (err) {
    if (err.sqlMessage.includes("for key 'users_email_unique'"))
      throw new InputValidationError({ email: 'Email já cadastrado' }, 400);
    if (err.sqlMessage.includes("for key 'users_phone_unique'"))
      throw new InputValidationError({ phone: 'Telefone já cadastrado' }, 400);
    if (err.sqlMessage.includes("for key 'users_cpf_unique'"))
      throw new InputValidationError({ cpf: 'CPF já cadastrado' }, 400);
    if (err.sqlMessage.includes("for key 'users_username_unique'")) {
      throw new InputValidationError(
        { username: 'Nome de usuário já cadastrado' },
        400
      );
    }
    throw err;
  }
};

const getAll = async () => {
  const users = await User.getAll();
  return users;
};

const getById = async id => {
  const user = await User.getById(id);
  if (!user) throw new NotFoundError({ user: 'Usuário não encontrado' });
  return user;
};

const update = async (userOptions, data) => {
  if (!Object.keys(data).length) {
    throw new InputValidationError(
      'Não foi passado nenhum dado para atualizar',
      400
    );
  }

  const errors = {};

  if (data.address) {
    if (!data.address.city || !data.address.uf) {
      errors.address = 'Devem ser informados a cidade e o estado';
    } else {
      data.city = data.address.city;
      data.uf = data.address.uf;

      delete data.address;
    }
  }

  if (Object.entries(errors).length)
    throw new InputValidationError(errors, 400);

  if (Object.entries(errors).length) throw new ForbiddenError(errors, 403);

  Object.keys(data).forEach(async field => {
    if (field !== 'active')
      data[field] = field !== 'profilePic' ? data[field].trim() : data[field];
    if (field === 'password') return;
    data[field] = await validations[field](
      data[field],
      msg => (errors[field] = msg)
    );
  });
  if (data.password) data.password = await validations.password(data.password);

  if (Object.entries(errors).length)
    throw new InputValidationError(errors, 422);

  if (data.active === 'B' && !userOptions.admin) {
    throw new ForbiddenError(
      { perms: 'Você não tem permissão para fazer isso' },
      403
    );
  }

  const updatedUser = await User.update(userOptions.id, data);
  if (!updatedUser)
    throw new NotFoundError({ user: 'Usuário não encontrado' }, true);
  return updatedUser;
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
