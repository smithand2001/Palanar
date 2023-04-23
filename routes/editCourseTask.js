const express = require('express');
const CourseTask = require('../models/CourseTask');
const Course = require('../models/Course');
const router = express.Router();

router.get('/:taskID', async function(req, res, next) {
    const task = await CourseTask.findCourseTask(req.params.taskID);
    const instructorCourses = await Course.findInstructorsCourses(req.session.user.username);

    if(req.query.tar)
    {
        res.render("editCourseTask", { task, instructorCourses, taskAlertResponse : req.query.tar} );
    }
    else
    {
        res.render("editCourseTask", {task, instructorCourses});
    }
})

router.post('/update/:taskID', async function(req, res, next) {
    try {
        await CourseTask.update({ctaskName: req.body.formAssignmentName,
                                cdueDate: req.body.formDueDate,
                                ctaskType: req.body.formAssignmentType,
                                ctaskPriority: req.body.formAssignmentPriority,
                                ctaskDescription: req.body.formAssignmentDescription,
                                CourseCourseid: req.body.formAssignmentClass},
                            {
                                where: {
                                    ctaskID: req.params.taskID
                                }
                            });
        res.redirect("/editCourseTask/" + req.params.taskID + "?tar=successEdit");
    } catch (error) {
        console.log(error);
        res.redirect("/editCourseTask/" + req.params.taskID + "?tar=error");
    }
})

router.post('/delete/:taskID', async function(req, res, next) {
    try {
        const task = await CourseTask.findCourseTask(req.params.taskID)
        if(task)
        {
            await task.destroy();
            res.redirect("/newCourseTask?tar=successDelete");
        }
    } catch(error) {
        console.log(error);
        res.redirect("/editCourseTask/" + req.params.taskID + "?tar=error"); 
    }
})

module.exports = router;