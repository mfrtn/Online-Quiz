const { PrismaClient, Role } = require("@prisma/client");

const prisma = new PrismaClient();

async function connectionCheck() {
  await prisma.$connect();
}

(function main() {
  connectionCheck()
    .then(async () => {
      console.log("Database is connected");
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      setTimeout(() => main(), 5000);
    });
})();

module.exports = { prisma, Role };
