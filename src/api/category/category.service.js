const { db, difficulties } = require("../../database");

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
      orderBy: {
        id: "asc",
      },
    });
  },

  getAllQuizzesWithQuestions: async (id, difficulty) => {
    return await db.quiz.findMany({
      where: {
        categoryId: id,
      },
      include: {
        questions: {
          select: {
            question: {},
          },
        },
      },
    });
  },

  getAllQuizzes: async (id, difficulty) => {
    difficulty = difficulties.includes(difficulty) ? difficulty : false;
    return await db.quiz.findMany({
      where: {
        difficulty: {
          in: difficulty ? difficulty : difficulties,
        },
        categoryId: id,
      },
    });
  },
};

module.exports = categoryService;
