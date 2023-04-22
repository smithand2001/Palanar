const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database/palanar1.sqlite', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the palanar database.');
});

const createUserTable = `CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL,
  password TEXT NOT NULL
);`;

db.run(createUserTable, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Created the users table.');
});

module.exports = db;
