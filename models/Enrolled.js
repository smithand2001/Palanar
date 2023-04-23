const sequelize = require('../db')
const { Model, DataTypes } = require('sequelize')

class Enrolled extends Model { 
    // get all enrolled corresponding to the current user
    static async findAllEnrolled(username) {
        try {
            const enrolled = await Enrolled.findAll({where: {StudentUsername: username}})
            if (enrolled) {
                return enrolled
            } else {
                return null
            }
        } catch (error) {
            console.log(error)
            return null
        }
    }
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