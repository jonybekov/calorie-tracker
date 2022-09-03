const foodsRepository = require("../repositories/foods.repository");
const dayjs = require("dayjs");
const { isNone } = require("../utils/helpers");

const DEFAULT_START_DATE = dayjs().startOf("D").format();
const DEFAULT_END_DATE = dayjs().endOf("D").format();
const DEFAULT_SIZE = 2;
const DEFAULT_PAGE = 1;

async function getAllFoods({ startDate, endDate, size, page }) {
  const updateFood = await foodsRepository.findAllFoods({
    startDate: !isNone(startDate) ? startDate : DEFAULT_START_DATE,
    endDate: !isNone(endDate) ? endDate : DEFAULT_END_DATE,
    size: !isNone(size) ? size : DEFAULT_SIZE,
    page: page ?? DEFAULT_PAGE,
  });
  return updateFood;
}

async function createFood({
  name,
  userId,
  caloriesValue,
  price,
  consumedAt = dayjs().format(),
}) {
  const newFood = await foodsRepository.saveFood({
    userId,
    name,
    price,
    caloriesValue,
    consumedAt,
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
