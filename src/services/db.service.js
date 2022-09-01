const dbConfig = require("../configs/db.config");
const { Pool } = require("pg");
const pool = new Pool(dbConfig);

pool.on("error", (err, client) => {
  console.error("Unexpected error on idle client", err); // your callback here
  process.exit(-1);
});

module.exports = {
  async query(query) {
    return pool.query(query);
  },

  async queryParams(query, params) {
    return pool.query(query, params);
  },
};
