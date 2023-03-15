const userService = require("./user.service");

const userController = {
  index: async (req, res) => {
    try {
      id = req.params.id;
      if (id === undefined) {
        const users = await userService.findMany();
        return res.json(users).end();
      } else if (!isNaN(id)) {
        const user = await userService.findById(parseInt(id));
        if (user) {
          return res.json(user).end();
        }
      }
      return res.sendStatus(404);
    } catch (error) {
      throw error;
      // return res.status(500).json({
      //   error: true,
      //   message: error.message,
      // });
    }
  },
};

module.exports = userController;
