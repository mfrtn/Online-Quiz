const userService = require("./user.service");
const { quizService } = require("../quiz");

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
          const hasQuizTakenByUser = await userService.hasQuizTakenByUser(
            req.user.id,
            quiz.id
          );
          if (!hasQuizTakenByUser) {
            await userService.takeQuiz(req.user.id, quiz.id);

            res.json({
              meesage: "User taked the Quiz",
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
};

module.exports = userController;
