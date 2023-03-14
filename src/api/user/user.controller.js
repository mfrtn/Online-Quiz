const userService = require("./user.service");

const userController = {
  index: async (req, res) => {
    try {
      id = req.params.id;
      if (id === undefined) {
        const users = await userService.findMany();
        return res.json(users);
      } else if (!isNaN(id)) {
        const user = await userService.findById(parseInt(id));
        if (user) {
          return res.json(user);
        }
      }
      return res.sendStatus(404);
    } catch (error) {
      return res.json({
        error: true,
        message: error.message,
      });
    }
  },
};

module.exports = userController;
