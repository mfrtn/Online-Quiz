const { quizController } = require("../api").quizApp;
const { authJWT, operator } = require("../middlewares").auth;

const express = require("express");
const router = express.Router();

router.use(authJWT);
router.get("/", operator, quizController.index);
router.get("/:id", quizController.index);
router.post("/:id", operator, quizController.addQuestions);
router.get("/:id/questions", operator, quizController.getAllQuestions);

module.exports = router;
