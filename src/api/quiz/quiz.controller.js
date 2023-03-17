const quizService = require("./quiz.service");
const { questionService } = require("../question");

const quizController = {
  index: async (req, res) => {
    try {
      id = req.params.id;
      if (id === undefined) {
        const quizzez = await quizService.findMany();
        return res.json(quizzez).end();
      } else if (!isNaN(id)) {
        const quiz = await quizService.findById(parseInt(id));
        if (quiz) {
          return res.json(quiz).end();
        }
      }
      return res.sendStatus(404);
    } catch (error) {
      throw error;
    }
  },

  create: async (req, res) => {
    difficulty = req.body.difficulty;
    categoryId;
  },

  addQuestions: async (req, res, next) => {
    const result = {};
    quizId = req.params.id;
    try {
      if (quizId !== undefined && !isNaN(quizId)) {
        const quiz = await quizService.findById(parseInt(quizId));

        if (quiz) {
          const validQuestionIDs = req.query.ids;

          for (const questionId of validQuestionIDs) {
            let question;
            if (!isNaN(questionId)) {
              question = await questionService.findById(parseInt(questionId));
            }
            if (question) {
              const isQuestionBelongsToQuiz =
                await quizService.isQuestionBelongsToQuiz(quiz.id, question.id);
              if (!isQuestionBelongsToQuiz) {
                // Add Question to the quiz
                await quizService.addQuestonToQuiz(quiz.id, question.id);
                result[questionId] = "ADDED";
              } else {
                // The question has already been added
                result[questionId] = "REPETITIVE";
              }
            } else {
              // The Question does not exist
              result[questionId] = "NOTEXISTS";
            }
          }

          res.json({ result });
        } else {
          const error = new Error("Invalid Quiz");
          error.status = 500;
          next(error);
        }
      } else {
        return res.sendStatus(400);
      }
    } catch (error) {
      throw error;
    }
  },

  getAllQuestions: async (req, res) => {
    id = req.params.id;
    try {
      if (id !== undefined && !isNaN(id)) {
        const questions = await quizService.getAllQuestions(parseInt(id));

        return res.json(questions);
      } else {
        return res.sendStatus(404);
      }
    } catch (error) {
      throw error;
    }
  },
};

module.exports = quizController;
