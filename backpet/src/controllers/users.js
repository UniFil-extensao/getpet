const userService = require('../services/user');
const authService = require('../services/auth');
const { ForbiddenError } = require('../utils/errors');
const { USE_SSL } = require('../../config/general.config');

const authCookie = token => [
  'token',
  token,
  {
    httpOnly: true,
    secure: USE_SSL,
    sameSite: 'strict',
  },
];

const create = async (req, res, next) => {
  try {
    const allowedFields = [
      'username',
      'password',
      'email',
      'phone',
      'cpf',
      'city',
      'uf',
    ];

    const insertData = Object.entries(req.body)
      .filter(([field]) => allowedFields.includes(field))
      .reduce((acc, [field, value]) => ({ ...acc, [field]: value }), {});

    const { user, token } = await userService.create(insertData);
    res.cookie(...authCookie(token));
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

const getAll = async (req, res, next) => {
  try {
    const users = await userService.getAll();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (token) req.user = await authService.validateToken(token);

    const user = await userService.getById(req.params.id);
    delete user.admin;
    delete user.active;
    if (!req.user || req.user.id !== user.id) {
      delete user.cpf;
      delete user.email;
    }

    res.json(user);
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    req.params.id = +req.params.id;
    if (!req.user.admin && req.user.id !== req.params.id) {
      throw new ForbiddenError({
        accessDenied: 'Você não tem permissão para fazer isso.',
      });
    }

    const allowedUpdates = [
      'username',
      'password',
      'email',
      'phone',
      'address',
      'profilePic',
      'active',
    ];

    const updateData = Object.entries(req.body)
      .filter(([field]) => allowedUpdates.includes(field))
      .reduce((acc, [field, value]) => ({ ...acc, [field]: value }), {});

    // TODO: instalar multer e implementar upload de imagens

    // passar o id do usuário a ser alterado (quando for admin params.id !== user.id)
    req.user.id = req.params.id;
    const user = await userService.update(req.user, updateData);
    res.json(user);
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const user = await userService.remove(req.params.id);
    res.json(user);
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const { user, token } = await authService.login({ username, password });
    res.cookie(...authCookie(token));
    res.json(user);
  } catch (err) {
    next(err);
  }
};

const logout = async (req, res, next) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
  login,
  logout,
};
