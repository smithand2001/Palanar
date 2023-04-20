const sequelize = require('../db')
const { Model, DataTypes } = require('sequelize')


class Student extends Model {
    static async findUser(username, password) {
        try {
            const student = await student.findByPk(username)
            if (student && student.password === password) {
                return user
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
        type: DataTypes.String,
        allowNull: false
    },
    firstName:{
        type: DataTypes.String
    },
    lastName:{
        type: DataTypes.String
    },
    phoneNumber:{
        type: DataTypes.String
    }
}, {
    sequelize,
    modelName: 'Student'

});

module.export = Student