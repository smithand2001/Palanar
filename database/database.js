const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database/palanar1.sqlite'
});

module.exports = sequelize;
