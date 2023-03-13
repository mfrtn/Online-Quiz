const { PrismaClient, Role, Difficulty } = require("@prisma/client");

const db = new PrismaClient();

module.exports = { db, Role, Difficulty };
