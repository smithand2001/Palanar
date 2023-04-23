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
    };
    // get all enrolled corresponding to the current user
    static async findAllEnrolledCourses(courseid) {
        try {
            const enrolled = await Enrolled.findAll({where: {CourseCourseid: courseid}})
            if (enrolled) {
                return enrolled
            } else {
                return null
            }
        } catch (error) {
            console.log(error)
            return null
        }
    };
    static async isEnrolled(username, courseid){
        try{
            const enrolled = await Enrolled.findAll({
                where: {
                    StudentUsername: username,
                    CourseCourseid: courseid
            }})
            if(Object.keys(enrolled).length !== 0){
                return true
            }
            else {
                return false
            }
        } catch(error) {
            console.log(error)
            return null
        }
    };
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