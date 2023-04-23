const sequelize = require('../db')
const { Model, DataTypes } = require('sequelize')

class UserTask extends Model {
    // get all user tasks corresponding to the current user
    static async findAllTasksOfUser(_username) {
        try {
            const tasks = await UserTask.findAll({where: {Studentusername: _username}})
            if (tasks) {
                return tasks
            } else {
                return null
            }
        } catch (error) {
            console.log(error)
            return null
        }
    }

    static async findTask(taskID) {
        try {
            const task = await UserTask.findByPk(taskID);
            return task ? task : null;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}

UserTask.init({
    taskID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    taskName:{
        type: DataTypes.STRING,
        allowNull: false
    },
    dueDate:{
        type: DataTypes.STRING,
        allowNull: false
    },
    taskType:{
        type: DataTypes.STRING,
        allowNull: false
    },
    taskClass:{
        type: DataTypes.STRING,
        allowNull: false
    },
    taskPriority:{
        type: DataTypes.STRING,
        allowNull: false
    },
    taskDescription:{
        type: DataTypes.STRING
    }
}, {
    sequelize,
    modelName: 'UserTask'
});

module.exports = UserTask