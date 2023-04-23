const sequelize = require('../db');
const { Model, DataTypes } = require('sequelize');
const Course = require('./Course')

class CourseTask extends Model {

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