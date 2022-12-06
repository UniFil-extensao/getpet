const fs = require('fs');
const https = require('https');

const app = require('./app');
const {
  NODE_ENV,
  PORT,
  USE_SSL,
  DISABLE_AUTH,
  IP_ADDRESS,
  SSL_KEY_PATH,
  SSL_CERT_PATH,
} = require('./config/general.config');

const isHttps = USE_SSL && SSL_KEY_PATH && SSL_CERT_PATH;
const onRunning = () => {
  // eslint-disable-next-line no-console
  console.log(
    'Server running on',
    `${isHttps ? 'https' : 'http'}://${IP_ADDRESS}:${PORT}`,
    `in ${NODE_ENV} mode${DISABLE_AUTH ? ' with no authentication' : ''}`
  );
};

if (isHttps) {
  const ssl = {
    key: fs.readFileSync(SSL_KEY_PATH),
    cert: fs.readFileSync(SSL_CERT_PATH),
  };

  https.createServer(ssl, app).listen(PORT, IP_ADDRESS, onRunning);
} else {
  app.listen(PORT, IP_ADDRESS, onRunning);
}
