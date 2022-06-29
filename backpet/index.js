const app = require('./app');
const {
  NODE_ENV,
  PORT,
  USE_SSL,
  DISABLE_AUTH,
} = require('./config/general.config');

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(
    `Server running at`,
    `${USE_SSL ? 'https' : 'http'}://localhost:${PORT}`,
    `in ${NODE_ENV} mode${DISABLE_AUTH ? ' with no authentication' : ''}`
  );
});
