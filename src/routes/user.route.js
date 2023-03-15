const express = require("express");
const { userController } = require("../api").userApp;
const { authJWT, admin, self } = require("../middlewares").auth;
const router = express.Router();

router.get("/", authJWT, admin, userController.index);
router.get("/:id", authJWT, self, userController.index);

module.exports = router;
