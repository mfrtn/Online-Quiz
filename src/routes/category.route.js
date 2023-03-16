const { categoryController } = require("../api").categoryApp;
const { authJWT, operator } = require("../middlewares").auth;

const express = require("express");
const router = express.Router();

router.use(authJWT);
router.get("/", categoryController.index);
router.get("/:id", categoryController.index);
router.post("/:id", operator, categoryController.addQuestions);
router.get("/:id/questions", operator, categoryController.getAllQuestions);
module.exports = router;
