const userService = require('../services/userService');

const registerUser = (req, res) => {
  userService.registerUser(req, res);
};

const loginUser = (req, res) => {
  userService.loginUser(req, res);
};

const updateUserProfile = (req, res) => {
  userService.updateUserProfile(req, res);
};

const getCurrentUser = (req, res) => {
  userService.getCurrentUser(req, res);
};

module.exports = { registerUser, loginUser, updateUserProfile, getCurrentUser };
