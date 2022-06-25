// extrai as variáveis relacionadas ao sistema como um objeto
const environment = (({
  NODE_ENV,
  JWT_SECRET,
  PASSWORD_SALT,
  PORT,
  DB_DRIVER,
  DB_NAME,
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_ROOT_PASSWORD,
}) => ({
  NODE_ENV,
  JWT_SECRET,
  PASSWORD_SALT,
  PORT,
  DB_DRIVER,
  DB_NAME,
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_ROOT_PASSWORD,
}))(process.env);

module.exports = {
  ...environment,
};
