const { db } = require("../../database");

const quizService = {
  findMany: async () => {
    return await db.quiz.findMany();
  },

  findById: async (id) => {
    return await db.quiz.findUnique({
      where: {
        id,
      },
    });
  },

  create: async (newQuiz, dificulty, categoryId) => {
    const questions = await db.question.findMany({
      where: {
        dificulty,
      },
      select: {
        cat,
      },
    });
  },

  isQuestionBelongsToQuiz: async (quizId, questionId) => {
    return await db.quizQuestion.findUnique({
      where: {
        quizId_questionId: {
          quizId,
          questionId,
        },
      },
    });
  },

  addQuestonToQuiz: async (quizId, questionId) => {
    return await db.quizQuestion.create({
      data: {
        quizId,
        questionId,
      },
    });
  },

  getAllQuestions: async (id) => {
    return await db.question.findMany({
      where: {
        quizzes: {
          some: {
            quiz: {
              id,
            },
          },
        },
      },
      orderBy: {
        id: "asc",
      },
    });
  },
};

module.exports = quizService;
