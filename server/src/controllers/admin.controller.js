const adminService = require("../services/admin.service");
const foodsService = require("../services/foods.service");

async function getAllUsers(req, res) {
  const users = await adminService.getAllUsers();
  res.json(users);
}
async function getUser(req, res) {
  const { id } = req.params;
  const users = await adminService.getUser(id);
  res.json(users);
}

async function getUserFoods(req, res, next) {
  const { id } = req.params;
  const foods = await adminService.getUserFoods(id);
  res.json(foods);
}

async function createUserFood(req, res, next) {
  const { id } = req.params;
  const { name, caloriesValue, price, consumedAt } = req.body;
  const newFood = await foodsService.createFood({
    userId: id,
    name,
    caloriesValue,
    price,
    consumedAt,
  });
  res.json(newFood);
}

async function updateUserFood(req, res, next) {
  const { id, foodId } = req.params;
  const { name, caloriesValue, price, consumedAt } = req.body;
  const updatedFood = await foodsService.updatedFood(foodId, {
    userId: id,
    name,
    caloriesValue,
    price,
    consumedAt,
  });
  res.json(updatedFood);
}

async function deleteUserFood(req, res, next) {
  const { foodId } = req.params;
  const deletedFood = await foodsService.deleteFood(foodId);
  res.json(deletedFood);
}

async function getStatistics(req, res, next) {
  const [weeklyEntriesReport, weeklyAverageCaloriesReport] = await Promise.all([
    adminService.getWeeklyEntriesCount(),
    adminService.getAverageCaloriesPerUserForLastWeek(),
  ]);

  res.send({
    ...weeklyEntriesReport,
    average_calories_per_user: weeklyAverageCaloriesReport,
  });
}

async function createRandomUsers(req, res) {
  const result = await adminService.createRandomUsers();
  res.send(result);
}

async function createRandomFoodsForUser(req, res) {
  const { userId } = req.query;

  if (!userId) {
    res.status(400).send({
      message: "userId must be provided",
      code: 400,
    });
  }

  const result = await adminService.createRandomFoods(userId);

  res.send(result);
}

module.exports = {
  getAllUsers,
  getUser,
  getUserFoods,
  createUserFood,
  updateUserFood,
  deleteUserFood,
  getStatistics,
  createRandomUsers,
  createRandomFoodsForUser,
};
