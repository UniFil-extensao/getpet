const CustomError = function (errors = {}, status = 500, shouldLog = false) {
  this.errors = errors;
  this.status = status;
  this.shouldLog = shouldLog;
};
CustomError.prototype = new Error();
CustomError.prototype.name = 'CustomError';

const InputValidationError = function (
  errors = {},
  status = 400,
  shouldLog = false
) {
  this.status = status;
  this.errors = errors;
};
InputValidationError.prototype = new CustomError();
InputValidationError.prototype.name = 'InputValidationError';

const NotFoundError = function (errors = {}, shouldLog = false) {
  this.status = 404;
  this.errors = errors;
};
NotFoundError.prototype = new CustomError();
NotFoundError.prototype.name = 'NotFoundError';

module.exports = {
  CustomError,
  InputValidationError,
  NotFoundError,
};
