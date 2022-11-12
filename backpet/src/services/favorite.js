const {
  InputValidationError,
  NotFoundError,
  ForbiddenError,
} = require('../utils/errors');

const adoptionService = require('./adoption');
const userService = require('./user');
const Favorite = require('../models/favorite');

const getAllFromUser = async userId => {
  const favorites = await Favorite.getAllFromUser(userId);
  return favorites;
};

const add = async data => {
  const duplicateFavorite = await Favorite.findDuplicate(data);
  if (duplicateFavorite)
    throw new InputValidationError({ favorite: 'Adoção já favoritada' }, 422);

  await userService.getById(data.user_id);
  await adoptionService.getById(data.adoption_id);

  try {
    return await Favorite.add(data);
  } catch (err) {
    if (err.code === '23505')
      throw new InputValidationError({ favorite: 'Adoção já favoritada' }, 422);
    throw err;
  }
};

const remove = async (author, id) => {
  if (!Number.isInteger(id) || id < 1)
    throw new InputValidationError({ id: 'ID inválido' }, 422);

  const { user_id: ownerId } = await Favorite.getById(id);
  if (!author.admin && ownerId !== author.id) {
    throw new ForbiddenError({
      accessDenied: 'Você não tem permissão para fazer isso',
    });
  }

  try {
    const removedFavorite = await Favorite.remove(id);
    return removedFavorite;
  } catch (err) {
    if (err.code === '23503')
      throw new ForbiddenError({ favorite: 'Adoção não favoritada' });
    if (err.message === 'Adoção não encontrada')
      throw new NotFoundError({ adoption: 'Favorito não encontrado' });
    throw err;
  }
};

const getFavUsers = async (author, adoptionId) => {
  const { old_owner_id: ownerId } = await adoptionService.getById(adoptionId);
  if (!author.admin && ownerId !== author.id) {
    throw new ForbiddenError({
      accessDenied: 'Você não tem permissão para fazer isso',
    });
  }

  const favUsers = await Favorite.getFavUsers(adoptionId);
  return favUsers;
};

module.exports = {
  add,
  remove,
  getFavUsers,
  getAllFromUser,
};
