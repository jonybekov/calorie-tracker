const db = require("../services/db.service");

const QUERY_USER_BY_TOKEN = `
    SELECT * FROM users
    WHERE access_token = $1
`;

const QUERY_USER_BY_LOGIN = `
    SELECT * FROM users
    WHERE login = $1
`;

const QUERY_USER_BY_ID = `
    SELECT * FROM users
    WHERE id = $1
`;

const UPDATE_USER_TOKEN_BY_ID = `
    UPDATE users
    SET access_token = $2
    WHERE id = $1
    RETURNING *;
`;

const INSERT_USER = `
    INSERT INTO users(first_name, last_name, avatar, login, password, access_token)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
`;

async function findUserByToken(token) {
  const result = await db.queryParams(QUERY_USER_BY_TOKEN, [token]);
  return result.rows[0];
}

async function findUserByLogin(login) {
  const result = await db.queryParams(QUERY_USER_BY_LOGIN, [login]);
  return result.rows[0];
}

async function findUserById(id) {
  const result = await db.queryParams(QUERY_USER_BY_ID, [id]);
  return result.rows[0];
}

async function updateUserTokenById(userId, token) {
  const result = await db.queryParams(UPDATE_USER_TOKEN_BY_ID, [userId, token]);
  return result.rows[0];
}

async function saveUser(
  firstName,
  lastName,
  avatar,
  login,
  password,
  accessToken
) {
  const result = await db.queryParams(INSERT_USER, [
    firstName,
    lastName,
    avatar,
    login,
    password,
    accessToken,
  ]);
  return result.rows[0];
}

module.exports = {
  findUserById,
  findUserByLogin,
  findUserByToken,
  updateUserTokenById,
  saveUser,
};
