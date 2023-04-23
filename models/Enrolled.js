const sequelize = require('../db')
const { Model, DataTypes } = require('sequelize')

class Enrolled extends Model { 
}
Enrolled.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
}, {
    sequelize,
    modelName: 'Enrolled',
    timestamps: false
});

module.exports = Enrolled