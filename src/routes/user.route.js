const express = require("express");
const { userController } = require("../api").userApp;

const router = express.Router();

router.get("/", userController.index);
router.get("/:id", userController.index);

module.exports = router;
