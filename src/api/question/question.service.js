const { db } = require("../../database");

const questionService = {
  findMany: async () => {
    return await db.question.findMany();
  },

  findById: async (id) => {
    return await db.question.findUnique({
      where: {
        id,
      },
    });
  },

  create: async (questionObjet) => {
    return await db.question.create({
      data: questionObjet,
    });
  },
};

module.exports = questionService;
