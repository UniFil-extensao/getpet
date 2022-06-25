const app = require('./app');
const { PORT } = require('./config/general.config');

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
