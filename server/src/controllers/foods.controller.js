const foodsService = require("../services/foods.service");
const userService = require("../services/user.service");

async function create(req, res, next) {
  const { name, caloriesValue, consumedAt, price } = req.body;
  const [_, token] = req.headers.authorization.split(" ");
  const user = await userService.getUserByToken(token);

  try {
    const newFood = await foodsService.createFood({
      userId: user.id,
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
  const { startDate, endDate, page, size } = req.query;

  const foods = await foodsService.getAllFoods({
    userId: req.user.id,
    startDate,
    endDate,
    page,
    size,
  });

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
