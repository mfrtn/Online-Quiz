const categoryService = require("./category.service");
const { questionService } = require("../question");

const categoryController = {
  index: async (req, res) => {
    try {
      id = req.params.id;
      if (id === undefined) {
        const categories = await categoryService.findMany();
        return res.json(categories).end();
      } else if (!isNaN(id)) {
        const category = await categoryService.findById(parseInt(id));
        if (category) {
          return res.json(category).end();
        }
      }
      return res.sendStatus(404);
    } catch (error) {
      throw error;
    }
  },

  addQuestions: async (req, res, next) => {
    const result = {};
    categoryId = req.params.id;
    try {
      if (categoryId !== undefined && !isNaN(categoryId)) {
        const category = await categoryService.findById(parseInt(categoryId));

        if (category) {
          const validQuestionIDs = req.query.ids;

          for (const questionId of validQuestionIDs) {
            let question;
            if (!isNaN(questionId)) {
              question = await questionService.findById(parseInt(questionId));
            }
            if (question) {
              const isQuestionBelongsToCategory =
                await categoryService.isQuestionBelongsToCategory(
                  category.id,
                  question.id
                );
              if (!isQuestionBelongsToCategory) {
                // Add Question to the category
                await categoryService.addQuestonToCategory(
                  category.id,
                  question.id
                );
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
          const error = new Error("Invalid Category");
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
    difficulty = req.query.difficulty
      ? req.query.difficulty.toUpperCase()
      : null;
    id = req.params.id;
    try {
      if (id !== undefined && !isNaN(id)) {
        const questions = await categoryService.getAllQuestions(
          parseInt(id),
          difficulty
        );

        return res.json(questions);
      } else {
        return res.sendStatus(404);
      }
    } catch (error) {
      throw error;
    }
  },

  getAllQuizzes: async (req, res) => {
    difficulty = req.query.difficulty
      ? req.query.difficulty.toUpperCase()
      : null;
    id = req.params.id;
    try {
      if (id !== undefined && !isNaN(id)) {
        const quizzes = await categoryService.getAllQuizzes(
          parseInt(id),
          difficulty
        );

        return res.json(quizzes);
      } else {
        return res.sendStatus(404);
      }
    } catch (error) {
      throw error;
    }
  },

  getAllQuizzesWithQuestions: async (req, res) => {
    id = req.params.id;
    try {
      if (id !== undefined && !isNaN(id)) {
        const quizzes = await categoryService.getAllQuizzesWithQuestions(
          parseInt(id)
        );

        return res.json(quizzes);
      } else {
        return res.sendStatus(404);
      }
    } catch (error) {
      throw error;
    }
  },
};

module.exports = categoryController;
