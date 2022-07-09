const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const { PASSWD_SALT, SALT_ROUNDS } = process.env;

const generateSalt = function (rounds) {
  const salt = bcrypt.genSaltSync(rounds);

  const envFile = path.join(__dirname, '.env');

  const envFileContent = fs.readFileSync(envFile, 'utf8');
  const envFileContentUpdated = PASSWD_SALT
    ? envFileContent.replace(PASSWD_SALT, salt)
    : envFileContent + `\nPASSWD_SALT=${salt}`;

  fs.writeFileSync(envFile, envFileContentUpdated);

  return salt;
};

generateSalt(+SALT_ROUNDS);
