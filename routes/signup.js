const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../db');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('signup');
});

router.post('/', async (req, res) => {
  const { username, password } = req.body;

  // Validate the user's input
  if (!username || !password) {
    return res.status(400).send('Please provide a username and password.');
  }

  // Check if the user already exists in the database
  const existingUser = await db.get('SELECT * FROM users WHERE username = ?', username);
  if (existingUser) {
    return res.status(400).send('A user with that username already exists.');
  }

  // Hash the user's password
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // Insert the new user into the database
  await db.run('INSERT INTO users (username, password) VALUES (?, ?)', username, hashedPassword);

  res.redirect('/login');
});

module.exports = router;
