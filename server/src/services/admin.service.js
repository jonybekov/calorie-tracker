const dayjs = require("dayjs");
const adminRepository = require("../repositories/admin.repository");
const { DATE_FORMAT } = require("../utils/consts");

function getAllUsers() {
  const users = adminRepository.findAllUsers();
  return users;
}
function getUser() {}
function getUserFoods() {
  const foods = adminRepository.findUserFoods(userId);
  return foods;
}

async function getWeeklyEntriesCount() {
  const [lastWeek, beforeLastWeek] = await Promise.all([
    adminRepository.calcWeeklyFoodEntriesCount(dayjs().format()),
    adminRepository.calcWeeklyFoodEntriesCount(
      dayjs().subtract("7", "day").format()
    ),
  ]);

  return {
    last_week: lastWeek.count,
    before_last_week: beforeLastWeek.count,
  };
}

async function getAverageCaloriesPerUserForLastWeek() {
  const result = await adminRepository.calcAverageCaloriesPerUserForLastWeek();
  return result;
}

module.exports = {
  getAllUsers,
  getUser,
  getUserFoods,
  getWeeklyEntriesCount,
  getAverageCaloriesPerUserForLastWeek,
};
