const userRouter = require("./user.route");
const authRouter = require("./auth.route");
const questionRouter = require("./question.route");
const categoryRouter = require("./category.route");

function apiRouter(app) {
  app.use("/", authRouter);
  app.use("/users", userRouter);
  app.use("/questions", questionRouter);
  app.use("/categories", categoryRouter);
}

module.exports = apiRouter;
