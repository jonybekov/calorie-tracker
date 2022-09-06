const express = require("express");
const router = express.Router();

const usersController = require("../controllers/users.controller");

router.get("/me", usersController.getAuthUser);

router.post("/me", usersController.updateAuthUser);

router.get("/me/check/daily-calories", usersController.checkCalorieLimit);

router.post("/me/check/monthly-budget", usersController.checkBudgetLimit);

module.exports = router;
