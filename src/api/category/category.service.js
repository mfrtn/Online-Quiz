const { db, Difficulty } = require("../../database");

const difficulties = [];
for (const key in Difficulty) {
  difficulties.push(Difficulty[key]);
}

const categoryService = {
  findMany: async () => {
    return await db.category.findMany();
  },

  findById: async (id) => {
    return await db.category.findUnique({
      where: {
        id,
      },
    });
  },

  isQuestionBelongsToCategory: async (categoryId, questionId) => {
    return await db.questionCategory.findUnique({
      where: {
        categoryId_questionId: {
          categoryId,
          questionId,
        },
      },
    });
  },

  addQuestonToCategory: async (categoryId, questionId) => {
    return await db.questionCategory.create({
      data: {
        categoryId,
        questionId,
      },
    });
  },

  getAllQuestions: async (id, difficulty) => {
    difficulty = difficulties.includes(difficulty) ? difficulty : false;
    return await db.question.findMany({
      where: {
        difficulty: {
          in: difficulty ? difficulty : difficulties,
        },
        categories: {
          some: {
            category: {
              id,
            },
          },
        },
      },
      include: {
        categories: {
          where: {
            categoryId: id,
          },
          select: {
            category: {
              select: {
                title: true,
              },
            },
          },
        },
      },
    });
  },

  getAllQuestions3: async (id) => {
    return await db.category.findUnique({
      where: {
        id,
      },
      include: {
        questions: true,
      },
    });
  },

  getAllQuestions2: async (id) => {
    return await db.question.findMany({
      where: {
        categories: {
          some: {
            category: {
              id,
            },
          },
        },
      },
    });
  },
};

module.exports = categoryService;
