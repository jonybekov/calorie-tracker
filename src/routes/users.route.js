const express = require("express");
const router = express.Router();

/* GET users. */
router.get("/", programmingLanguagesController.get);

/* PUT user */
router.put("/:id", programmingLanguagesController.update);

/* DELETE user */
router.delete("/:id", programmingLanguagesController.remove);

module.exports = router;
