const sequelize = require('../db')
const { Model, DataTypes } = require('sequelize')

class Admin extends Model {
    static async findAdmin(username, password) {
        try {
            const admin = await Admin.findByPk(username)
            if (admin && admin.password === password) {
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

Admin.init({
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
    modelName: 'Admin'

});

module.export = Admin