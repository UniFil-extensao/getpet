const { CustomError } = require('../utils/errors');

const errorHandler = (error, req, res, next) => {
  const { status, errors, shouldLog } =
    error instanceof CustomError
      ? error
      : {
          status: 500,
          errors: {
            internal: 'Erro interno, contate um administrador',
            message: error.message,
          },
          shouldLog: true,
        };

  shouldLog && console.error(error);

  res.status(status).json({ errors });
};

module.exports = errorHandler;
