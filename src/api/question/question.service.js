const { db, difficulties } = require("../../database");

const questionService = {
  findMany: async (difficulty) => {
    difficulty = difficulties.includes(difficulty) ? difficulty : false;

    return await db.question.findMany({
      where: {
        difficulty: {
          in: difficulty ? difficulty : difficulties,
        },
      },
      orderBy: {
        id: "asc",
      },
    });
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
