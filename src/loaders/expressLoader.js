const express = require("express");
const config = require("../config");
const router = require("../routes");

class ExpressLoader {
  constructor() {
    this.app = express();
    this.app.use(express.json());

    router(this.app);
  }
  run() {
    this.app.listen(config.PORT, () => {
      console.log(`OnlineQuiz app server is running on port ${config.PORT}`);
    });
  }
}

module.exports = ExpressLoader;
