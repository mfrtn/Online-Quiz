const { body, check } = require("express-validator");

exports.userCreateValidator = [body("email").isEmail().trim().escape()];
exports.userAnswerValidator = [];
