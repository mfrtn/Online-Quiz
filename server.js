const { db } = require("./src/database");
const { ExpressLoader } = require("./src/loader");

async function connectionCheck() {
  await db.$connect();
}

(function main() {
  connectionCheck()
    .then(async () => {
      console.log("Database is connected");
      const app = new ExpressLoader();
      app.run();
    })
    .catch(async (e) => {
      console.error(e);
      await db.$disconnect();
      //   setTimeout(() => main(), 5000);
      //   process.exit(1);
    });
})();
