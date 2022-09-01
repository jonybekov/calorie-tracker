const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const userRepository = require("../repositories/user.repository");

const SALT = 10;

async function getUserByToken(token) {
  return userRepository.findUserByToken(token);
}

async function checkAuth(login, password) {
  const user = await userRepository.findUserByLogin(login);

  if (!user) {
    throw Error(`User not found by ${login}`);
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Username or password is wrong");
  }

  const accessToken = uuidv4();
  const updatedUser = await userRepository.updateUserTokenById(
    user.id,
    accessToken
  );
  delete updatedUser.password;
  return updatedUser;
}

async function registerUser(firstName, lastName, avatar, login, password) {
  const passwordHash = await bcrypt.hash(password, SALT);
  const token = uuidv4();

  const newUser = await userRepository.saveUser(
    firstName,
    lastName,
    avatar,
    login,
    passwordHash,
    token
  );
  delete newUser.password;
  return newUser;
}

module.exports = {
  getUserByToken,
  checkAuth,
  registerUser,
};
