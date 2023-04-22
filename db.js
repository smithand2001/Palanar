const { Sequelize } = require('sequelize')

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database/palanar.sqlite'
})

module.exports = sequelize