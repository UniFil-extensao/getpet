const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');

const errorHandler = require('./src/middleware/error');
const userRoutes = require('./src/routes/users');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(
  cors({
    credentials: true,
    origin: true, //'http://localhost:3000, http://localhost:8000',
  })
);

app.use('/users', userRoutes);

// REM: remover no futuro
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use(errorHandler);

module.exports = app;
