const foodsRepository = require("../repositories/foods.repository");
const dayjs = require("dayjs");
const { isNone } = require("../utils/helpers");

async function getAllFoods({ userId, startDate, endDate, size, page }) {
  const DEFAULT_START_DATE = dayjs().startOf("D").toISOString();
  const DEFAULT_END_DATE = dayjs().endOf("D").toISOString();
  const DEFAULT_SIZE = 50;
  const DEFAULT_PAGE = 1;

  const foods = await foodsRepository.findAllFoods({
    userId,
    startDate: !isNone(startDate) ? startDate : null,
    endDate: !isNone(endDate) ? endDate : null,
    size: !isNone(size) ? size : DEFAULT_SIZE,
    page: page ?? DEFAULT_PAGE,
  });
  return foods;
}

async function createFood({ name, userId, caloriesValue, price, consumedAt }) {
  const newFood = await foodsRepository.saveFood({
    userId,
    name,
    price,
    caloriesValue,
    consumedAt: !isNone(consumedAt) ? consumedAt : dayjs().format(),
  });

  return newFood;
}

async function updatedFood(id, { name, caloriesValue, consumedAt, price }) {
  const updateFood = await foodsRepository.updateFood(id, {
    name,
    price,
    caloriesValue,
    consumedAt,
  });
  return updateFood;
}

async function getFoodById(id) {
  const food = await foodsRepository.findFoodById(id);
  return food;
}

async function deleteFood(id) {
  const deletedFood = await foodsRepository.deleteFood(id);
  return deletedFood;
}

module.exports = {
  getAllFoods,
  createFood,
  updatedFood,
  getFoodById,
  deleteFood,
};
