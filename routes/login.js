const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
    res.render('login');
  });

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Check if the username exists in the database
  const sql = 'SELECT * FROM users WHERE username = ?';
  db.get(sql, [username], (err, row) => {
    if (err) throw err;

    if (!row) {
      return res.status(401).send('Invalid username or password');
    }

    // Check if the password is correct
    bcrypt.compare(password, row.password, (err, result) => {
      if (err) throw err;

      if (!result) {
        return res.status(401).send('Invalid username or password');
      }

      console.log(`User ${row.username} has logged in`);
      res.redirect('/home');
    });
  });
});

module.exports = router;
