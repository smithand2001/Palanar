const sequelize = require('../db')
const { Model, DataTypes } = require('sequelize')
const Course = require('./Course')

class Admin extends Model {
    static async findAdmin(username, password) {
        try {
            const admin = await Admin.findByPk(username)
            if (admin && admin.password === password) {
                return admin
            } else {
                return null
            }
        } catch (error) {
            console.log(error)
            return null
        }
    }
}

Admin.init({
    username: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    },
    firstName:{
        type: DataTypes.STRING
    },
    lastName:{
        type: DataTypes.STRING
    },
    phoneNumber:{
        type: DataTypes.STRING
    },
    isAdmin:{
        type:DataTypes.BOOLEAN,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Admin'

});
// Admin has many Courses, Courses have only one admin, mandatory assoc.
Admin.hasMany(Course, {
    onDelete: 'CASCADE',
    foreignKey:{
        allowNull:false
    }})
Course.belongsTo(Admin, {onDelete: 'CASCADE'})

module.exports = Admin