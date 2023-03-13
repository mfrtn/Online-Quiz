const { PrismaClient, Role, Difficulty } = require("@prisma/client");
const { faker } = require("@faker-js/faker");

const prisma = new PrismaClient();

const roles = [];
for (const key in Role) {
  roles.push(Role[key]);
}

const difficulties = [];
for (const key in Difficulty) {
  difficulties.push(Difficulty[key]);
}

function createRandomUser() {
  const random = Math.floor(Math.random() * roles.length);
  return {
    name: faker.name.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    role: roles[random],
  };
}

function createRandomCategory() {
  return {
    title: faker.lorem.word({ length: { min: 5, max: 12 } }),
    description: faker.lorem.sentence(),
  };
}

function createRandomQuestion() {
  const random = Math.floor(Math.random() * difficulties.length);
  return {
    title: faker.lorem.sentence(),
    answer1: faker.lorem.word(),
    answer2: faker.lorem.word(),
    answer3: faker.lorem.word(),
    answer4: faker.lorem.word(),
    correctAnswer: faker.datatype.number({ min: 1, max: 4 }),
    difficulty: difficulties[random],
  };
}

function createRandomQuiz() {
  const random = Math.floor(Math.random() * difficulties.length);

  return {
    title: faker.lorem.word(),
    description: faker.lorem.paragraph(),
    difficulty: difficulties[random],
  };
}

const userCount = 10;
const categoryCount = 10;
const questionCount = 100;
const quizCount = 20;

async function main() {
  try {
    console.log(`Start seeding ...`);

    // Users
    const users = await Promise.all(
      Array.from({ length: userCount }).map(async () => {
        return prisma.user.create({
          data: createRandomUser(),
        });
      })
    );
    console.log(`${userCount} new rows added to User Table`);

    // Categories
    const categories = await Promise.all(
      Array.from({ length: categoryCount }).map(async () => {
        return prisma.category.create({
          data: createRandomCategory(),
        });
      })
    );
    console.log(`${categoryCount} new rows added to Category Table`);

    // Questions
    const questions = await Promise.all(
      Array.from({ length: questionCount }).map(async () => {
        return prisma.question.create({
          data: createRandomQuestion(),
        });
      })
    );
    console.log(`${questionCount} new rows added to Question Table`);

    // Quizzes
    const quizzes = await Promise.all(
      Array.from({ length: quizCount }).map(async () => {
        return prisma.quiz.create({
          data: createRandomQuiz(),
        });
      })
    );
    console.log(`${quizCount} new rows added to Quiz Table`);

    console.log(`Seeding finished.`);
  } catch (error) {
    throw new Error(error.message);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
