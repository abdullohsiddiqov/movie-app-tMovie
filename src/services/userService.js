const User = require('../models/userModel');

const users = [];

const registerUser = (req, res) => {
  const { username, password } = req.body;
  const newUser = new User(users.length + 1, username, password);
  users.push(newUser);
  res.status(201).json({ message: 'Registration successful' });
};

const loginUser = (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    res.json({ message: 'Login successful' });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};

module.exports = { registerUser, loginUser };
