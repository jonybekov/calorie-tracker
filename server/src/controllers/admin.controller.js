const adminService = require("../services/admin.service");

async function getAllUsers(req, res, next) {
  res.send({ ok: true });
}
async function getUser(req, res, next) {
  res.send({ ok: true });
}
async function getUserFoods(req, res, next) {
  res.send({ ok: true });
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

module.exports = {
  getAllUsers,
  getUser,
  getUserFoods,
  getStatistics,
};
