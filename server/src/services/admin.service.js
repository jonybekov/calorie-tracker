const dayjs = require("dayjs");
const { faker } = require("@faker-js/faker");

const adminRepository = require("../repositories/admin.repository");
const userRepository = require("../repositories/user.repository");
const userService = require("../services/user.service");
const foodsService = require("../services/foods.service");

function getAllUsers() {
  const users = adminRepository.findAllUsers();
  return users;
}

function getUser(userId) {
  const user = userRepository.findUserById(userId);
  return user;
}

function getUserFoods(userId) {
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

async function createRandomFoods(userId) {
  const foodEntries = [];

  for (let i = 0; i < 10; i++) {
    const fakeFoodEntry = {
      userId,
      name: faker.commerce.productName(),
      caloriesValue: parseFloat(faker.finance.amount(4, 200, 0)),
      price: parseInt(faker.finance.amount(1, 10, 0)),
      consumedAt: faker.date.between(
        dayjs().subtract(20, "day").format(),
        dayjs().format()
      ),
    };

    foodEntries.push(fakeFoodEntry);
  }

  return Promise.all(foodEntries.map((food) => foodsService.createFood(food)));
}

async function createRandomUsers() {
  const fakeUsers = [];

  for (let i = 0; i < 10; i++) {
    const fakeUser = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      avatar: faker.image.avatar(),
      login: faker.internet.userName(),
      password: "12345",
    };

    fakeUsers.push(fakeUser);
  }

  const newUsers = await Promise.all(
    fakeUsers.map((user) =>
      userService.registerUser(
        user.firstName,
        user.lastName,
        user.avatar,
        user.login,
        user.password
      )
    )
  );

  await Promise.all(newUsers.map((user) => createRandomFoods(user.id)));

  return newUsers;
}

module.exports = {
  getAllUsers,
  getUser,
  getUserFoods,
  getWeeklyEntriesCount,
  getAverageCaloriesPerUserForLastWeek,
  createRandomUsers,
  createRandomFoods,
};
