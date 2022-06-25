const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
// const User = require('../models/user');

const verify = token => {
  console.log(jwt.verify(token, JWT_SECRET));
};
