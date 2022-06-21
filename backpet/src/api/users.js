//rotas da api

const express = require('express'),
      app     = express(),
      users   = require('../controllers/users'), 
      api     = express.Router();

api.get('/users', async (req, res) => {
    const users = await users.getUsers();
    res.json(users);
});

module.exports = app;