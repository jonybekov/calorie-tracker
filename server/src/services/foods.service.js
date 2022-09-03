const foodsRepository = require("../repositories/foods.repository");

async function getAllFoods() {
  const updateFood = await foodsRepository.findAllFoods();
  return updateFood;
}

async function createFood({ name, userId, caloriesValue, price, consumedAt }) {
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
