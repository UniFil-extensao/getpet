const validator = require('validator');
const { PAGE_LIMIT } = require('../../config/general.config');
const {
  InputValidationError,
  NotFoundError,
  ForbiddenError,
} = require('../utils/errors');
const { DataValidator, validateId } = require('./data');
const userService = require('./user');
const Adoption = require('../models/adoption');
const AdoptionPic = require('../models/adoption_pic');

// REFAC: organizar melhor essas validations
const validations = {
  id: validateId,
  desc: (desc, onFail) => {
    desc = typeof desc === 'string' && desc.trim();
    if (!desc) return onFail('Descrição é obrigatória', false);
    const options = { min: 20 };
    return validator.isLength(desc, options)
      ? desc
      : onFail('Descrição deve ter no mínimo 20 caracteres', true);
  },
  petSize: (petSize, onFail) => {
    petSize = typeof petSize === 'string' && petSize.trim().toUpperCase();
    if (!petSize) return onFail('Tamanho do animal é obrigatório', false);
    const validSizes = ['S', 'M', 'L'];
    return validator.isIn(petSize, validSizes)
      ? petSize
      : onFail('Tamanho do animal inválido', true);
  },
  petName: (petName, onFail) => {
    petName = typeof petName === 'string' && petName.trim();
    if (!petName) return onFail('Nome do animal é obrigatório', false);
    const options = { max: 30 };
    return validator.isLength(petName, options) &&
      validator.isAlpha(petName, 'pt-BR')
      ? petName
      : onFail('Nome do animal inválido', true);
  },
  petAge: (petAge, onFail) => {
    if (!Number.isInteger(petAge))
      return onFail('Idade do animal é obrigatória', false);
    return petAge >= 0 ? petAge : onFail('Idade do animal inválida', true);
  },
  petSpecies: (petSpecies, onFail) => {
    petSpecies =
      typeof petSpecies === 'string' && petSpecies.trim().toLowerCase();
    if (!petSpecies) return onFail('Espécie do animal é obrigatório', false);
    const validSpecies = ['cachorro', 'gato'];
    return validator.isIn(petSpecies, validSpecies)
      ? petSpecies
      : onFail('Espécie do animal inválida', true);
  },
  petBreed: (petBreed, onFail) => {
    petBreed = typeof petBreed === 'string' && petBreed.trim().toLowerCase();
    if (!petBreed) return onFail('Raça do animal é obrigatório', false);
    const options = { max: 40 };
    return validator.isLength(petBreed, options) &&
      validator.isAlpha(petBreed, 'pt-BR')
      ? petBreed
      : onFail('Raça do animal inválida', true);
  },
  petColor: (petColor, onFail) => {
    petColor = typeof petColor === 'string' && petColor.trim().toLowerCase();
    if (!petColor) return onFail('Cor do animal é obrigatório', false);
    const options = { max: 20 };
    return validator.isLength(petColor, options) &&
      validator.isAlpha(petColor, 'pt-BR')
      ? petColor
      : onFail('Cor do animal inválida', true);
  },
  newOwnerId: validateId,
  adopterScore: (adopterScore, onFail) => {
    if (!Number.isFinite(adopterScore))
      return onFail('Pontuação do adotante é obrigatória', false);
    return 0 <= adopterScore && adopterScore <= 5
      ? adopterScore
      : onFail('Pontuação inválida', true);
  },
  donorScore: (donorScore, onFail) => {
    if (!Number.isFinite(donorScore))
      return onFail('Pontuação do doador é obrigatória', false);
    return 0 <= donorScore && donorScore <= 5
      ? donorScore
      : onFail('Pontuação inválida', true);
  },
  files: files => files,
};
const adoptionValidator = new DataValidator(validations);

const create = async (author, data) => {
  const requiredFields = ['desc', 'petSize'];

  data = adoptionValidator.validate(data, requiredFields);

  data.old_owner_id = author.id;

  const adoption = await Adoption.create(data);
  return adoption;
};

const list = async options => {
  const filters = {
    sort: {
      column: 'created_at',
      order: 'desc',
    },
    limit: 50,
    offset: 0,
  };

  const splitOpts = field => {
    return field
      ?.split(',')
      .map(s => s.trim().toLowerCase())
      .filter(s => s);
  };

  options.search = options.search?.trim();
  options.page = +options.page || 1;
  options.orderBy = options.orderBy?.trim().toLowerCase();
  options.species = options.species?.trim().toLowerCase();
  options.breeds = splitOpts(options.breeds);
  options.colors = splitOpts(options.colors);
  options.sizes = splitOpts(options.sizes);
  options.minAge = +options.minAge >= 0 ? +options.minAge : 0;
  options.maxAge = +options.maxAge >= 0 ? +options.maxAge : 0;
  options.newOwnerId = +options.newOwnerId >= 0 ? +options.newOwnerId : 0;
  options.oldOwnerId = +options.oldOwnerId >= 0 ? +options.oldOwnerId : 0;

  if (options.search) filters.search = options.search;

  if (!options.noLimit) {
    filters.limit = PAGE_LIMIT;
    filters.offset = PAGE_LIMIT * (options.page - 1);
  }

  if (
    options.orderBy &&
    ['created_at', 'breed', 'age', 'color', 'size'].includes(options.orderBy)
  ) {
    filters.sort.column = options.orderBy;
    filters.sort.order =
      options.orderBy === 'created_at' &&
      options.orderDir?.toLowerCase() === 'asc'
        ? 'asc'
        : 'desc';
  }

  if (options.species) filters.species = options.species;
  if (options.breeds) filters.breeds = options.breeds;
  if (options.colors) filters.color = options.colors;
  if (options.size) filters.sizes = options.sizes;
  if (options.minAge) filters.min_age = options.minAge;
  if (options.maxAge) filters.max_age = options.maxAge;
  if (options.newOwnerId) filters.new_owner_id = options.newOwnerId;
  if (options.oldOwnerId) filters.old_owner_id = options.oldOwnerId;

  return await Adoption.list(filters);
};

const getById = async id => {
  id = validations.id(id, msg => {
    throw new InputValidationError({ id: msg }, 404);
  });

  const adoption = await Adoption.getById(id);
  if (!adoption) throw new NotFoundError({ adoption: 'Adoção não encontrada' });
  return adoption;
};

const getPictures = async id => {
  id = validations.id(id, msg => {
    throw new InputValidationError({ id: msg }, 404);
  });

  await getById(id);

  const pictures = await AdoptionPic.getPicturesFrom(id);
  return pictures;
};

const update = async (author, data, openOnly = true) => {
  const options = {
    ...(openOnly && { status: 'A' }),
  };
  options.id = validations.id(data.id, msg => {
    throw new InputValidationError({ id: msg }, 404);
  });
  delete data.id;

  const ownerId = await Adoption.getOwnerId(options.id);
  if (!author.admin && ownerId !== author.id) {
    throw new ForbiddenError({
      accessDenied: 'Você não tem permissão para fazer isso',
    });
  }
  options.old_owner_id = ownerId;

  if (!Object.keys(data).length) {
    throw new InputValidationError(
      { data: 'Não foi passado nenhum dado para atualizar' },
      400
    );
  }

  data = adoptionValidator.validate(data);
  try {
    const adoption = await Adoption.update(options, data);
    return adoption;
  } catch (error) {
    if (error.message === 'Adoção não encontrada') {
      throw new NotFoundError({
        adoption: 'Adoção não encontrada',
      });
    }
    throw error;
  }
};

const close = async (author, data) => {
  if (data.newOwnerId) {
    const newOwnerId = validations.id(data.newOwnerId, msg => {
      throw new InputValidationError({ id: msg }, 404);
    });
    await userService.getById(newOwnerId);
  }
  return update(author, data, false);
};

const deleteById = async (author, id) => {
  id = validations.id(id, msg => {
    throw new InputValidationError({ id: msg }, 404);
  });

  const ownerId = await Adoption.getOwnerId(id);
  if (!author.admin && ownerId !== author.id) {
    throw new ForbiddenError({
      accessDenied: 'Você não tem permissão para fazer isso',
    });
  }

  try {
    const adoptionId = await Adoption.deleteById(id);
    return adoptionId;
  } catch (error) {
    if (error.message === 'Adoção não encontrada') {
      throw new NotFoundError({
        adoption: 'Adoção não encontrada',
      });
    }
    throw error;
  }
};

module.exports = {
  create,
  list,
  getById,
  getPictures,
  update,
  close,
  deleteById,
};
