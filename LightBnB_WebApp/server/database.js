const properties = require('./json/properties.json');
const users = require('./json/users.json');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function (email) {
  const queryString = `
  SELECT *
  FROM users
  WHERE email = $1;`;
  
  return pool.query(queryString, [email])
    .then(res => res.rows[0])
    .catch(err => console.log(err));
}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  const queryString = `
  SELECT *
  FROM users
  WHERE id = $1;`;
  
  return pool.query(queryString, [id])
    .then(res => res.rows[0])
    .catch(err => console.log(err));
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  const insertString = `
  INSERT INTO users (name, email, password)
  VALUES ($1,$2,$3);`;

  const email = user.email;

  const data = [
    user.name,
    email,
    user.password
  ]

  return getUserWithEmail(email)
    .then(user => {
      // if no user exists, create it
      if (!user) return;
      // if user exists, throw error
      throw new Error('email in use');
    })
    .then(() => pool.query(insertString, data))
    .then(() => getUserWithEmail(email))
    .catch(err => {
      throw new Error(err).message
    });
  
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function (guest_id, limit = 10) {
  const options = {
    query: `
      SELECT *
      FROM properties p
        JOIN reservations r
          ON p.id = r.property_id
      WHERE r.guest_id = $1
      LIMIT $2;`,
    values: [guest_id, limit]
  }
  return getAllProperties(options, limit);
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function (options, limit = 10) {
  if (Object.keys(options).length === 0) {
    options = {
      query: `
      SELECT *
      FROM properties
      LIMIT $1;`,
      values: [limit]
    }
  }
  
  return pool.query(options.query, options.values)
    .then((result) => result.rows)
    .catch((err) => err.message);
}
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
}
exports.addProperty = addProperty;
