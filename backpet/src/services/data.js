const { InputValidationError } = require('../utils/errors');
const { camelToSnakeCase } = require('../utils/strings');

const validate = function (data, requiredFields = []) {
  const allFields = [...Object.keys(data), ...requiredFields];

  let status;
  const errors = {};
  const sanitizedData = allFields.reduce(
    (acc, field) => ({
      ...acc,
      ...{
        [camelToSnakeCase(field)]: this.validations[field](
          data[field],
          (msg, wasSet) => {
            if (wasSet) {
              errors[field] = msg;
              status ??= 422;
              return;
            }
            if (!requiredFields.includes(field)) return;

            errors[field] = msg;
            status = 400;
          }
        ),
      },
    }),
    {}
  );

  if (Object.entries(errors).length)
    throw new InputValidationError(errors, status);

  return sanitizedData;
};

const DataValidator = function (validations) {
  this.validations = validations;
  this.validate = validate.bind(this);
};

const filterData = function (filter, data) {
  return Object.entries(data)
    .filter(([field]) => filter.includes(field))
    .reduce((acc, [field, value]) => ({ ...acc, [field]: value }), {});
};

const validateId = (id, onFail) => {
  if (!Number.isInteger(id)) return onFail('ID é obrigatório', false);
  return id > 0 ? id : onFail('ID inválido', true);
};

module.exports = {
  DataValidator,
  filterData,
  validateId,
};
