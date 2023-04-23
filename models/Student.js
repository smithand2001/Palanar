const sequelize = require('../db')
const { Model, DataTypes } = require('sequelize')


class Student extends Model {
    static async findStudent(username, password) {
        try {
            const student = await Student.findByPk(username)
            if (student && student.password === password) {
                return student
            } else {
                return null
            }
        } catch (error) {
            console.log(error)
            return null
        }
    }
}

Student.init({
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
    isStudent:{
        type:DataTypes.BOOLEAN,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Student'

});

module.exports = Student