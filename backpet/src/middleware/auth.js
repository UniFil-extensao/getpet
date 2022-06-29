const { DISABLE_AUTH } = require('../../config/general.config');
const authenticator = require('../services/auth');
const errorHandler = require('./error');

const auth = async function (req, res, next) {
  if (DISABLE_AUTH) {
    req.user = {
      id: req.params.id,
      admin: true,
    };
    return next();
  }

  const token = req.cookies.token;
  try {
    const user = await authenticator.validateToken(token);
    req.user = {
      id: user.id,
      admin: user.admin === 'S',
    };
    next();
  } catch (err) {
    errorHandler(err, req, res);
  }
};

module.exports = auth;
