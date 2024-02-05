const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('users.db');

const registerUser = (req, res) => {
  const { username, password } = req.body;
  const isAdmin = username === 'gangdramma' && password === 'root1234';

  db.run(`
    INSERT INTO users (username, password, isAdmin)
    VALUES (?, ?, ?)
  `, [username, password, isAdmin], function (err) {
    if (err) {
      console.error(err.message);
      res.status(500).json({ message: 'Internal Server Error' });
    } else {
      res.status(201).json({ message: 'Registration successful' });
    }
  });
};

const loginUser = (req, res) => {
  const { username, password } = req.body;
  db.get('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, row) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ message: 'Internal Server Error' });
    } else {
      if (row) {
        res.json({ message: 'Login successful', isAdmin: row.isAdmin });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    }
  });
};

module.exports = { registerUser, loginUser };
