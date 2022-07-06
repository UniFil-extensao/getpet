const adoptionsService = require('../services/adoption');
const { filterData } = require('../services/data');

const create = async (req, res, next) => {
  const allowedFields = [
    'desc',
    'petSize',
    'petName',
    'petAge',
    'petSpecies',
    'petBreed',
    'petColor',
    'thumbnailPath',
  ];

  const data = filterData(allowedFields, req.body);

  try {
    const adoption = await adoptionsService.create(req.user, data);
    res.status(201).json(adoption);
  } catch (err) {
    next(err);
  }
};

const list = async (req, res, next) => {
  try {
    const allowedFields = [
      'search',
      'page',
      'noLimit',
      'orderBy',
      'orderDir',
      'species',
      'breeds',
      'minAge',
      'maxAge',
      'colors',
      'sizes',
      'oldOwnerId',
      'newOwnerId',
    ];
    const options = filterData(allowedFields, req.query);

    const adoptions = await adoptionsService.list(options);
    res.json(adoptions);
  } catch (err) {
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const adoption = await adoptionsService.getById(+req.params.id);
    res.json(adoption);
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  const allowedUpdates = [
    'desc',
    'petSize',
    'petName',
    'petAge',
    'petSpecies',
    'petBreed',
    'petColor',
    'thumbnailPath',
  ];

  const data = filterData(allowedUpdates, req.body);

  data.id = +req.params.id;
  try {
    const adoption = await adoptionsService.update(req.user, data);
    res.json(adoption);
  } catch (err) {
    next(err);
  }
};

const close = async (req, res, next) => {
  try {
    const allowedFields = ['newOwnerId', 'adopterScore', 'donorScore'];
    const data = filterData(allowedFields, req.body);
    data.id = +req.params.id;

    const adoption = await adoptionsService.close(req.user, data);
    res.json(adoption);
  } catch (err) {
    next(err);
  }
};

const deleteById = async (req, res, next) => {
  try {
    const adoption = await adoptionsService.deleteById(
      req.user,
      +req.params.id
    );
    res.json(adoption);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  create,
  list,
  getById,
  update,
  close,
  deleteById,
};
