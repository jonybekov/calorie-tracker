const express = require("express");
const router = express.Router();

const foodsController = require("../controllers/foods.controller");

/* GET foods. */
router.get("/", foodsController.getAll);

/* GET one food. */
router.get("/:id", foodsController.getOne);

/* POST food */
router.post("/", foodsController.create);

/* PUT food */
router.put("/:id", foodsController.update);

/* DELETE food */
router.delete("/:id", foodsController.deleteOne);

module.exports = router;
