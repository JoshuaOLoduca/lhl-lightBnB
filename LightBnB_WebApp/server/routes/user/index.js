const createUser = require('./createUser');
const login = require('./login');
const logout = require('./logout');
const me = require('./me');

module.exports = function(router, database) {
  createUser(router, database);
  login(router, database);
  logout(router, database);
  me(router, database);
  return router;
}