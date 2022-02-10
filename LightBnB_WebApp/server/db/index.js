const { Pool } = require("pg");

const pool = new Pool({
  user: "vagrant",
  password: "123",
  host: "localhost",
  database: "lightbnb",
});

module.exports = {
  query: (text, params) => {
    const start = Date.now()
    return pool.query(text, params)
    .then(res => {

      const duration = Date.now() - start + ' ms';
      console.log('executed query',
      {
        text,
        params,
        duration,
        rows: res.rowCount,
        res: res.rows
      });

      return res;
    })
    .catch(err => {
      const duration = Date.now() - start + ' ms';
      console.log(err, {
          text,
          params,
          duration,
          rows: res.rowCount 
      });
      throw new Error(err);
    })
  },
}