const db = require("../services/db.service");

const QUERY_FOODS = `
  SELECT * FROM foods
  WHERE consumed_at BETWEEN $1 and $2
  ORDER BY created_at DESC
  LIMIT $3
  OFFSET (($4 - 1) * $3);
`;

const QUERY_FOOD_BY_ID = `
  SELECT * FROM foods
  WHERE id = $1
`;

const QUERY_FOOD_BY_USER_ID = `
  SELECT * FROM foods
  WHERE user_id = $1
`;

const UPDATE_FOOD_BY_ID = `
  UPDATE foods
  SET name = $2,
  calorie_value = $3,
  consumed_at = $4,
  modified_at = NOW(),
  price = $5
  WHERE id = $1
  RETURNING *;
`;

const INSERT_FOOD = `
  INSERT INTO foods(name, calorie_value, consumed_at, price, user_id)
  VALUES ($1, $2, $3, $4, $5)
  RETURNING *;
`;

const QUERY_CALORIES_SUM_BY_DATE = `
  SELECT SUM(calorie_value) FROM foods
  WHERE user_id = $1
`;

const QUERY_USER_SPENDINGS_FOR_ONE_MONTH = `
  SELECT SUM(price) FROM foods
  WHERE consumed_at > $1 - INTERVAL '1 month'
  AND consumed_at <= $1
`;

const DELETE_FOOD = `
  DELETE FROM foods
  WHERE id = $1
  RETURNING *;
`;

async function findAllFoods({ startDate, endDate, size, page }) {
  const { rows, rowCount } = await db.queryParams(QUERY_FOODS, [
    startDate,
    endDate,
    size,
    page,
  ]);
  return {
    data: rows,
    count: rowCount,
  };
}

async function findFoodById(id) {
  const result = await db.queryParams(QUERY_FOOD_BY_ID, [id]);
  return result.rows[0];
}

async function findFoodByUserId(userId) {
  const result = await db.queryParams(QUERY_FOOD_BY_USER_ID, [userId]);
  return result.rows[0];
}

async function saveFood({ name, caloriesValue, consumedAt, price, userId }) {
  const result = await db.queryParams(INSERT_FOOD, [
    name,
    caloriesValue,
    consumedAt,
    price,
    userId,
  ]);
  return result.rows[0];
}

async function deleteFood(id) {
  const result = await db.queryParams(DELETE_FOOD, [id]);
  return result.rows[0];
}

async function updateFood(id, data) {
  const { name, caloriesValue, consumedAt, price } = data;

  const result = await db.queryParams(UPDATE_FOOD_BY_ID, [
    id,
    name,
    caloriesValue,
    consumedAt,
    price,
  ]);

  return result.rows[0];
}

async function getUserTotalCaloriesByDate(userId, date) {
  const result = await db.queryParams(QUERY_CALORIES_SUM_BY_DATE, [userId]);

  return result.rows[0];
}

async function getUserTotalSpendingsForOneMonth(userId, endDate) {
  const result = await db.queryParams(QUERY_USER_SPENDINGS_FOR_ONE_MONTH, [
    userId,
    endDate,
  ]);

  return result.rows[0];
}

module.exports = {
  findAllFoods,
  findFoodById,
  findFoodByUserId,
  saveFood,
  updateFood,
  deleteFood,
  getUserTotalCaloriesByDate,
  getUserTotalSpendingsForOneMonth,
};
