const userService = require("./user.service");
const { quizService } = require("../quiz");
const { questionService } = require("../question");

const userController = {
  index: async (req, res, next) => {
    try {
      id = req.params.id;
      if (id === undefined) {
        const users = await userService.findMany();
        return res.json(users).end();
      } else if (!isNaN(id)) {
        const user = await userService.findById(parseInt(id));
        if (user) {
          return res.json(user).end();
        }
      }
      return res.sendStatus(404);
    } catch (error) {
      error.status = 500;
      next(error);
    }
  },

  takeQuiz: async (req, res, next) => {
    quizId = req.params.quizId;
    try {
      if (quizId !== undefined && !isNaN(quizId)) {
        quiz = await quizService.findById(parseInt(quizId));

        if (quiz) {
          const userQuiz = await userService.userQuiz(req.user.id, quiz.id);
          if (!userQuiz) {
            await userService.takeQuiz(req.user.id, quiz.id);

            return res.json({
              message: "User taked the Quiz",
            });
          } else {
            const error = new Error("This Quiz has been taken by you before");
            error.status = 403;
            next(error);
          }
        }
      }
      const error = new Error("Invalid Quiz");
      error.status = 400;
      next(error);
    } catch (error) {
      error.message = error.message;
      error.status = 500;
      next(error);
    }
  },

  getAllUserQuizzes: async (req, res, next) => {
    id = req.params.id;
    try {
      if (id !== undefined && !isNaN(id)) {
        const quizzes = await userService.getAllUserQuizzes(parseInt(id));
        return res.json(quizzes);
      }
      const error = new Error("Invalid User");
      error.status = 400;
      next(error);
    } catch (error) {
      error.message = error.message;
      error.status = 500;
      next(error);
    }
  },

  getAUserQuizWithQuestions: async (req, res, next) => {
    quizId = req.params.quizId;
    try {
      if (quizId !== undefined && !isNaN(quizId)) {
        const quizzes = await userService.getAUserQuizWithQuestions(
          parseInt(quizId)
        );
        return res.json(quizzes);
      }
      const error = new Error("Invalid Request");
      error.status = 400;
      next(error);
    } catch (error) {
      error.message = error.message;
      error.status = 500;
      next(error);
    }
  },

  answerQuiz: async (req, res, next) => {
    quizId = req.params.quizId;
    validatedUserAnswers = req.body;

    const result = {
      corrects: 0,
      wrongs: 0,
      empties: 0,
    };

    try {
      if (quizId !== undefined && !isNaN(quizId)) {
        quiz = await quizService.findById(parseInt(quizId));

        if (quiz) {
          const userQuiz = await userService.userQuiz(req.user.id, quiz.id);
          if (userQuiz) {
            for (const key in validatedUserAnswers) {
              // Check Question does bleong to the Quiz

              const isQuestionBelongsToQuiz =
                await quizService.isQuestionBelongsToQuiz(
                  quiz.id,
                  validatedUserAnswers[key].questionId
                );

              if (!isQuestionBelongsToQuiz) {
                const error = new Error("Invalid Question ID");
                error.status = 400;
                return next(error);
              }

              const question = await questionService.findById(
                validatedUserAnswers[key].questionId
              );

              if (
                ![0, 1, 2, 3, 4].includes(
                  validatedUserAnswers[key].answerChosen
                )
              ) {
                validatedUserAnswers[key].answerChosen = 0;
              }

              if (validatedUserAnswers[key].answerChosen === 0) {
                result.empties++;
              } else {
                validatedUserAnswers[key].answerChosen ===
                question.correctAnswer
                  ? result.corrects++
                  : result.wrongs++;
              }

              validatedUserAnswers[key].userQuizId = userQuiz.id;
            }

            result.score =
              (100 * (3 * result.corrects - result.wrongs)) /
              (3 * (result.corrects + result.wrongs + result.empties));

            // Transaction with score
            const userAnswers = await userService.answerQuiz(
              validatedUserAnswers,
              userQuiz.id,
              result.score
            );

            return res.json(result);
          } else {
            const error = new Error("Quiz does not belong to you");
            error.status = 403;
            return next(error);
          }
        }
      }
      const error = new Error("Invalid Quiz");
      error.status = 400;
      next(error);
    } catch (error) {
      error.message = error.message;
      error.status = 500;
      return next(error);
    }
  },
};

module.exports = userController;
