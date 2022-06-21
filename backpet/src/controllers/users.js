//camada lógica

module.exports = {
  getUsers
};
const data = require('../data/users');

async function getUsers(req) {
  //testa requisição blablabla (fazer logs(?))
  var result = await data.getUsers();
  return 'oiiiii';
}