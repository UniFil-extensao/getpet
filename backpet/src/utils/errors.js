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
  this.errors = errors;
  this.status = status;
  this.shouldLog = shouldLog;
};
InputValidationError.prototype = new CustomError();
InputValidationError.prototype.name = 'InputValidationError';

const ForbiddenError = function (errors = {}, status = 403, shouldLog = false) {
  this.errors = errors;
  this.status = status;
  this.shouldLog = shouldLog;
};
ForbiddenError.prototype = new CustomError();
ForbiddenError.prototype.name = 'ForbiddenError';

const NotFoundError = function (errors = {}, shouldLog = false) {
  this.status = 404;
  this.errors = errors;
  this.shouldLog = shouldLog;
};
NotFoundError.prototype = new CustomError();
NotFoundError.prototype.name = 'NotFoundError';

module.exports = {
  CustomError,
  InputValidationError,
  NotFoundError,
  ForbiddenError,
};
