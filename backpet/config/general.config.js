// extrai as variáveis relacionadas ao sistema como um objeto
const env = (({
  NODE_ENV,
  JWT_SECRET,
  PASSWD_SALT,
  PORT,
  DB_DRIVER,
  DB_NAME,
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
}) => ({
  NODE_ENV,
  JWT_SECRET,
  PASSWD_SALT,
  PORT,
  DB_DRIVER,
  DB_NAME,
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
}))(process.env);

const PAGE_LIMIT = 3;
const MAX_PET_PICS = 4;

const DISABLE_AUTH = env.NODE_ENV !== 'production' && false;
const USE_SSL = env.NODE_ENV === 'production' && false;

module.exports = {
  ...env,
  DISABLE_AUTH,
  USE_SSL,
  PAGE_LIMIT,
  MAX_PET_PICS,
};
