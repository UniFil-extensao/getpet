const { CustomError } = require('../utils/errors');

// eslint-disable-next-line no-unused-vars
const errorHandler = (error, req, res, next) => {
  const { status, errors, shouldLog } =
    error instanceof CustomError
      ? error
      : {
          status: error.status ?? 500,
          errors: {
            internal: 'Erro interno, contate um administrador',
            ...(process.env.NODE_ENV !== 'production' && {
              message: error.message,
            }),
          },
          shouldLog: !error.status && true,
        };

  shouldLog && console.error(error);

  res.status(status).json({ errors });
};

module.exports = errorHandler;
