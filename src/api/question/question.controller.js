const questionService = require("./question.service");

const questionController = {
  index: async (req, res) => {
    try {
      id = req.params.id;
      if (id === undefined) {
        const questions = await questionService.findMany();
        return res.json(questions).end();
      } else if (!isNaN(id)) {
        const question = await questionService.findById(parseInt(id));
        if (question) {
          return res.json(question).end();
        }
      }
      return res.sendStatus(404);
    } catch (error) {
      throw error;
    }
  },

  create: async (req, res) => {
    const validQuestion = req.body;

    try {
      newQuestion = await questionService.create(validQuestion);
      return res.status(201).json({
        id: newQuestion.id,
      });
    } catch (error) {
      throw error;
    }
  },
};

module.exports = questionController;
