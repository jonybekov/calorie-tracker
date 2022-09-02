const express = require("express");
const router = express.Router();

const usersController = require("../controllers/users.controller");

/* GET users. */
// router.get("/", usersController.getAll);

/* GET auth user */
router.get("/me", usersController.getAuthUser);

router.post("/me/check-calories", usersController.checkCalorieLimit);

// router.post("/me/check/montly-budget", usersController.deleteOne);

/* PUT auth user */
// router.put("/me", usersController.updateAuthUser);

/* PUT user */
// router.put("/:id", usersController.update);

/* DELETE user */
// router.delete("/:id", usersController.remove);

module.exports = router;
