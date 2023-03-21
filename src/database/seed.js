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

function createStaticUser() {
  return [
    {
      name: "ADMIN",
      email: "ADMIN@yahoo.com",
      role: "ADMIN",
      password: "1234",
    },
    {
      name: "OPERATOR",
      email: "OPERATOR@yahoo.com",
      role: "OPERATOR",
      password: "1234",
    },
    {
      name: "CLIENT",
      email: "CLIENT@yahoo.com",
      role: "CLIENT",
      password: "1234",
    },
  ];
}

function createRandomUser() {
  return {
    name: faker.name.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    role: faker.helpers.arrayElement(roles),
  };
}

function createRandomCategory() {
  return {
    title: faker.lorem.word({ length: { min: 5, max: 12 } }),
    description: faker.lorem.sentence(),
  };
}

function createRandomQuestion() {
  return {
    title: faker.lorem.sentence(),
    answer1: faker.lorem.word(),
    answer2: faker.lorem.word(),
    answer3: faker.lorem.word(),
    answer4: faker.lorem.word(),
    correctAnswer: faker.datatype.number({ min: 1, max: 4 }),
    difficulty: faker.helpers.arrayElement(difficulties),
  };
}

function createRandomQuiz() {
  return {
    title: faker.lorem.word(),
    description: faker.lorem.paragraph(),
    difficulty: faker.helpers.arrayElement(difficulties),
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

    await prisma.user.createMany({ data: createStaticUser() });

    console.log(`${userCount + 3} new rows added to User Table`);

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
