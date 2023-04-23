const sequelize = require('../db')
const { Model, DataTypes } = require('sequelize')
const Student = require('./Student')
const Enrolled = require ('./Enrolled')
const CourseTask = require('./CourseTask')


class Course extends Model {

    static async findCourse(courseid){
        try {
            const course = await Course.findByPk(courseid)
            return course ? course : null;
        } catch (error) {
            console.log(error)
            return null
        }
    }

    // get all courses of the instructor/admin
    static async findInstructorsCourses(adminUsername)
    {
      try {
        const courses = await Course.findAll({where: {AdminUsername: adminUsername}});
        
        if(courses)
        {
          return courses;
        }
        else
        {
          return null;
        }
      } catch(error) {
        console.log(error);
        return null;
      }
    }
}

Course.init({
  courseid: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false
  },
  courseName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  semester: {
    type: DataTypes.STRING,
    allowNull: false
  },
  courseDesc: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  enrollNum: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  enrollCount:{
    type: DataTypes.INTEGER,
    allowNull:false
  }
}, {
  sequelize, 
  modelName: 'Course'
});

// one student belongs to many courses, on course has many students, junction table = enrolled
Student.belongsToMany(Course, { through: Enrolled});
Course.belongsToMany(Student, { through: Enrolled});

Course.hasMany(CourseTask, {
  onDelete: 'CASCADE',
  foreignKey:{
        allowNull:false
}});

CourseTask.belongsTo(Course);


module.exports = Course