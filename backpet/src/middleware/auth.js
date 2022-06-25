const authenticator = require('../services/auth');

auth = (req, res, next) => {
  // const token = req.cookies?.token;
  // const user = authenticator.verify(token);
  // req.user = user;
  // next();
};

module.exports = auth;
