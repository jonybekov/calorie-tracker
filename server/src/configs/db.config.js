const env = process.env;

const dbConfig = {
  host: env.DB_HOST,
  user: env.DB_USER,
  database: env.DB_NAME,
  password: env.DB_PASSWORD,
  port: env.DB_PORT || 5432,
};

module.exports = dbConfig;
