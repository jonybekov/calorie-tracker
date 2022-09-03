const dbConfig = require("../configs/db.config");
const { Pool } = require("pg");
const pool = new Pool(dbConfig);

pool.on("error", (err, client) => {
  console.error("Unexpected error on idle client", err); // your callback here
  process.exit(-1);
});

(async function () {
  const client = await pool.connect();
  const response = await client.query("SELECT NOW()");

  console.log("XDATA", response.rows[0]);
  client.release();
})();

module.exports = {
  async query(query) {
    return pool.query(query);
  },

  async queryParams(query, params) {
    return pool.query(query, params);
  },
};
