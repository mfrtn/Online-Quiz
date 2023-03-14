const userRouter = require("./user.route");
const authRouter = require("./auth.route");

function router(app) {
  app.use("/", authRouter);
  app.use("/users", userRouter);
}

module.exports = router;
