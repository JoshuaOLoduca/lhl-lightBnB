const properties = require('./properties');
const reservations = require('./reservations');

module.exports = function(router, database) {
  properties(router, database);
  reservations(router, database);
  
  return router;
};