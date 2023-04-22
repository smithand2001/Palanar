const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/palanar1.sqlite');

router.get('/', (req, res) => {
  res.send('Welcome to Palanar!');
});


// Signup route
router.post('/signup', (req, res) => {
  const { username, password } = req.body;

  // Hash the password
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) throw err;

    // Insert the user into the database
    const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
    db.run(sql, [username, hash], function(err) {
      if (err) throw err;

      console.log(`User ${username} has been registered`);
      res.redirect('/login');
    });
  });
});


// Login route
router.post('/signup', (req, res) => {
  const { username, password } = req.body;

  // Hash the password
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) throw err;

    // Insert the user into the database
    const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
    db.run(sql, [username, hash], function(err) {
      if (err) throw err;

      console.log(`User ${username} has been registered`);
      res.redirect('/login');
    });
  });
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
