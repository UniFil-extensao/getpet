const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');

const errorHandler = require('./src/middleware/error');
const userRoutes = require('./src/routes/users');
const adoptionRoutes = require('./src/routes/adoptions');
const favoriteRoutes = require('./src/routes/favorites');

const app = express();

app.use('/uploads', express.static('uploads'));
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(
  cors({
    credentials: true,
    origin: process.env.APP_FRONTEND_URL,
  })
);

app.use('/users', userRoutes);
app.use('/adoptions', adoptionRoutes);
app.use('/favorites', favoriteRoutes);

app.use(errorHandler);

module.exports = app;
