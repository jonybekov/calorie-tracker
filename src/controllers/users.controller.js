const userService = require("../services/user.service");

async function getAuthUser(req, res, next) {
  const [_, token] = req.headers.authorization.split(" ");
  const user = await userService.getUserByToken(token);
  delete user.access_token;
  delete user.password;

  res.json(user);
}

async function checkCalorieLimit(req, res, next) {
  const { consumedAt } = req;
  const [_, token] = req.headers.authorization.split(" ");
  const user = await userService.getUserByToken(token);
  const result = foodsService.checkCalorieLimit(user.id, consumedAt);

  res.json(result);
}

module.exports = {
  getAuthUser,
  checkCalorieLimit,
};
