const userService = require('../services/user');
// const { ForbiddenError } = require('../utils/errors');

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

    const user = await userService.create(insertData);
    res.json(user);
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
    const user = await userService.getById(req.params.id);
    res.json(user);
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    // if (req.user.id !== req.params.id) {
    //   throw new ForbiddenError({
    //     accessDenied: 'Você não tem permissão para alterar este usuário',
    //   });
    // }

    // REM: temporário, remover ao implementar autenticação
    if (process.env.NODE_ENV !== 'production') {
      req.user = {
        id: req.params.id,
        admin: true,
      };
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

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};
