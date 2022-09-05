const express = require("express");
const router = express.Router();

const adminController = require("../controllers/admin.controller");
const { authRole } = require("../middleware/protected.middleware");
const { ROLE } = require("../utils/consts");

router.use(authRole(ROLE.ADMIN));

router.get("/users", adminController.getAllUsers);
router.get("/users/:id/", adminController.getUser);
router.get("/users/:id/foods", adminController.getUserFoods);
router.post("/users/:id/foods", adminController.createUserFood);
router.put("/users/:id/foods/:foodId", adminController.updateUserFood);
router.delete("/users/:id/foods/:foodId", adminController.deleteUserFood);
router.get("/statistics", adminController.getStatistics);

module.exports = router;
