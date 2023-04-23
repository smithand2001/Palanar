const sequelize = require('../db');
const { Model, DataTypes } = require('sequelize');

class CourseTask extends Model {
    static async findAllTasksOfCourse(courseid)
    {
        try {
            const tasks = await CourseTask.findAll({where: {CourseCourseid: courseid}});
            if(tasks)
            {
                return tasks;
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

    static async findCourseTask(ctaskID)
    {
        try {
            const task = await CourseTask.findByPk(ctaskID);
            return task ? task : null;
        } catch(error) {
            console.log(error);
            return null;
        }
    }
}

CourseTask.init({
    ctaskID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    ctaskName:{
        type: DataTypes.STRING,
        allowNull: false
    },
    cdueDate:{
        type: DataTypes.STRING,
        allowNull: false
    },
    ctaskType:{
        type: DataTypes.STRING,
        allowNull: false
    },
    ctaskPriority:{
        type: DataTypes.STRING,
        allowNull: false
    },
    ctaskDescription:{
        type: DataTypes.STRING
    }
}, {
    sequelize,
    modelName: 'CourseTask'
});

module.exports = CourseTask;