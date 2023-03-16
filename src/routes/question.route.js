const { questionController } = require("../api").questionApp;
const { authJWT, operator } = require("../middlewares").auth;

const express = require("express");
const router = express.Router();

router.use(authJWT, operator);
router.get("/", questionController.index);
router.get("/:id", questionController.index);
router.post("/", questionController.create);

module.exports = router;
