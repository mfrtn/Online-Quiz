const config = require("../config");
const router = require("../routes");
const { errorHandler } = require("../middlewares").error;

const express = require("express");

class ExpressLoader {
  constructor() {
    this.app = express();
    this.app.use(express.json());

    router(this.app);

    this.app.use(errorHandler);

    this.app.use((req, res) => {
      res.status(404).json({
        error: {
          status: true,
          code: 404,
          message: "The page you are looking for deos not exist",
        },
      });
    });
  }
  run() {
    this.app.listen(config.PORT, () => {
      console.log(`OnlineQuiz app server is running on port ${config.PORT}`);
    });
  }
}

module.exports = ExpressLoader;
