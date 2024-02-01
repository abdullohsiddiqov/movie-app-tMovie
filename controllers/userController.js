const userService = require('../services/userService');

const registerUser = (req, res) => {
  userService.registerUser(req, res);
};

const loginUser = (req, res) => {
  userService.loginUser(req, res);
};

module.exports = { registerUser, loginUser };
