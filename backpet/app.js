const express = require('express');
const app = express();
const errorHandler = require('./src/middleware/error');
const userRoutes = require('./src/routes/users');
const cors = require('cors');
const helmet = require('helmet');

app.use(helmet()); 
app.use(cors({
  credentials: true,
  origin: true
}));

app.use(express.json());
app.use('/users', userRoutes);

// REM: remover no futuro
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use(errorHandler);

module.exports = app;
