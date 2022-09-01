const foodsService = require("../services/foods.service");

async function create(req, res, next) {
  const { userId, name, caloriesValue, consumedAt, price } = req.body;

  try {
    const newFood = await foodsService.createFood({
      userId,
      name,
      price,
      caloriesValue,
      consumedAt,
    });

    res.json(newFood);
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const { name, caloriesValue, consumedAt, price } = req.body;

    const food = await foodsService.updatedFood(req.params.id, {
      name,
      caloriesValue,
      consumedAt,
      price,
    });

    if (!food) {
      res.status(404).send({
        message: "Not found",
        code: 404,
      });
    } else {
      res.json(food);
    }
  } catch (err) {
    next(err);
  }
}

async function getAll(req, res) {
  const foods = await foodsService.getAllFoods();
  res.json(foods);
}

async function getOne(req, res, next) {
  try {
    const food = await foodsService.getFoodById(req.params.id);

    if (!food) {
      res.status(404).send({
        message: "Not found",
        code: 404,
      });
    } else {
      res.json(food);
    }
  } catch (err) {
    next(err);
  }
}
async function deleteOne(req, res, next) {
  try {
    const food = await foodsService.deleteFood(req.params.id);

    if (!food) {
      res.status(404).send({
        message: "Not found",
        code: 404,
      });
    } else {
      res.json(food);
    }
  } catch (err) {
    next(err);
  }
}

module.exports = {
  create,
  update,
  getAll,
  getOne,
  deleteOne,
};
