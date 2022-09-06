const db = require("../services/db.service");

const QUERY_USERS = `
    SELECT * FROM simple_users
    ORDER BY first_name
`;

const QUERY_USER_BY_ID = `
    SELECT * FROM users
    WHERE role = 'USER' AND id = $1
`;

const QUERY_USER_FOODS_BY_ID = `
    SELECT * FROM simple_users_foods
    WHERE user_id = $1
    ORDER BY consumed_at DESC
`;

const QUERY_WEEKLY_FOOD_ENTRIES_COUNT = `
    SELECT COUNT(*) AS count FROM simple_users_foods
    WHERE consumed_at BETWEEN date_trunc('day', $1::timestamptz) - INTERVAL '7 day' AND date_trunc('day', $1::timestamptz) + INTERVAL '1 day' - INTERVAL '1 second'
`;

const QUERY_AVERAGE_CALORIES_PER_USER_FOR_LAST_WEEK = `
    SELECT user_id, first_name, last_name, SUM(calorie_value) / 7 AS average_calories FROM simple_users_foods
    INNER JOIN users u on u.id = simple_users_foods.user_id
    WHERE consumed_at BETWEEN date_trunc('day', NOW()) - INTERVAL '7 day' AND date_trunc('day', NOW()) + INTERVAL '1 day' - INTERVAL '1 second'
    GROUP BY user_id, first_name, last_name 
`;

async function findAllUsers() {
  const result = await db.query(QUERY_USERS);
  return {
    count: result.rowCount,
    data: result.rows,
  };
}

async function findUser(userId) {
  const result = await db.queryParams(QUERY_USER_BY_ID, [userId]);
  return result.rows[0];
}

async function findUserFoods(userId) {
  const result = await db.queryParams(QUERY_USER_FOODS_BY_ID, [userId]);
  return {
    count: result.rowCount,
    data: result.rows,
  };
}

async function calcWeeklyFoodEntriesCount(startDate) {
  const result = await db.queryParams(QUERY_WEEKLY_FOOD_ENTRIES_COUNT, [
    startDate,
  ]);
  return result.rows[0];
}

async function calcAverageCaloriesPerUserForLastWeek() {
  const result = await db.queryParams(
    QUERY_AVERAGE_CALORIES_PER_USER_FOR_LAST_WEEK
  );
  return {
    count: result.rowCount,
    data: result.rows,
  };
}

module.exports = {
  findAllUsers,
  findUser,
  findUserFoods,
  calcWeeklyFoodEntriesCount,
  calcAverageCaloriesPerUserForLastWeek,
};
