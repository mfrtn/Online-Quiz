const { userController } = require("../api").userApp;
const { authJWT, admin, self } = require("../middlewares").auth;
const checkError = require("../middlewares/validator");
const { userValidator } = require("../validators");

const express = require("express");
const router = express.Router();

router.use(authJWT);
router.get("/", admin, userController.index);
router.get("/:id", self, userController.index);
router.post("/take/:quizId", userController.takeQuiz);
router.get("/:id/quizzes", self, userController.getAllUserQuizzes);
router.get(
  "/:id/quizzes/:quizId",
  self,
  userController.getAUserQuizWithQuestions
);
router.post(
  "/answer/:quizId",
  userValidator.userAnswerValidator,
  checkError,
  userController.answerQuiz
);

module.exports = router;
