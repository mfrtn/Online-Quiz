const { PrismaClient, Role, Difficulty } = require("@prisma/client");

const db = new PrismaClient();

const difficulties = [];
for (const key in Difficulty) {
  difficulties.push(Difficulty[key]);
}

module.exports = { db, Role, difficulties };
