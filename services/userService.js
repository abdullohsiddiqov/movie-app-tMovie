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

const updateUserProfile = (req, res) => {
  const { userId, newPassword } = req.body;

  const sql = 'UPDATE users SET password = ? WHERE id = ?';
  db.run(sql, [newPassword, userId], function (err) {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }

    console.log(`Password updated for user with ID ${userId}`);

    db.get('SELECT * FROM users WHERE id = ?', [userId], (err, row) => {
      if (err) {
        console.error(err.message);
        return res.status(500).json({ message: 'Internal Server Error', error: err.message });
      }

      console.log('Updated user:', row);
      res.json({ message: 'Profile updated successfully', user: row });
    });
  });
};



const getCurrentUser = (req, res) => {
  const userId = req.params.id;

  db.get('SELECT * FROM users WHERE id = ?', [userId], (err, row) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ message: 'Internal Server Error' });
    } else {
      if (row) {
        res.json({ user: row });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    }
  });
};

module.exports = { registerUser, loginUser, updateUserProfile, getCurrentUser };
