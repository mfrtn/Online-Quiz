const { db } = require("../../database");
const { userInfoDao } = require("./user.dao");

const userService = {
  findMany: async () => {
    const users = await db.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        updatedAt: true,
        createdAt: true,
      },
    });
    return users;
  },

  findById: async (id) => {
    const user = await db.user.findUnique({
      where: {
        id,
      },
    });
    if (user) {
      return userInfoDao(user);
    } else {
      return user;
    }
  },

  findByEmail: async (email) => {
    return await db.user.findUnique({
      where: {
        email,
      },
    });
  },

  userQuiz: async (userId, quizId) => {
    return await db.userQuiz.findUnique({
      where: {
        userId_quizId: {
          userId,
          quizId,
        },
      },
    });
  },

  takeQuiz: async (userId, quizId) => {
    return await db.userQuiz.create({
      data: {
        userId,
        quizId,
      },
    });
  },

  getAllUserQuizzes: async (id) => {
    return await db.quiz.findMany({
      where: {
        users: {
          some: {
            userId: id,
          },
        },
      },
      include: {
        users: {
          select: {
            score: true,
            startTime: true,
            endTime: true,
          },
        },
      },
    });
  },

  getAUserQuizWithQuestions: async (quizId) => {
    return await db.quiz.findUnique({
      where: {
        id: quizId,
      },
      include: {
        questions: {
          select: {
            question: {
              select: {
                id: true,
                title: true,
                answer1: true,
                answer2: true,
                answer3: true,
                answer4: true,
              },
            },
          },
        },
      },
    });
  },

  answerQuiz: async (userAnswers, userQuizId, score) => {
    return await db.$transaction([
      db.userAnswer.createMany({
        data: userAnswers,
      }),

      db.userQuiz.update({
        where: {
          id: userQuizId,
        },
        data: {
          score,
        },
      }),
    ]);
  },
};

module.exports = userService;
