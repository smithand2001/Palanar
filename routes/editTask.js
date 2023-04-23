const express = require('express');
const UserTask = require('../models/UserTask');
const router = express.Router();

// invoked when user presses an edit button somewhere else
// should bring up the Edit Task screen, fill in with all existing
// task information
router.get('/:taskID', async function(req, res, next) {
    const task = await UserTask.findCourseTask(req.params.taskID);
    // console.log(task);

    if(req.query.tar)
    {
        res.render("editTask", { task, taskAlertResponse : req.query.tar} );
    }
    else
    {
        res.render("editTask", {task});
    }
})

// invoked when user presses "Save Changes"
// should update the task in question with the new values the user
// supplies
router.post('/update/:taskID', async function(req, res, next) {
    console.log("in task update handler");
    // console.log(req.params.taskID);

    try {
        await UserTask.update({taskName: req.body.formAssignmentName,
                                dueDate: req.body.formDueDate,
                                taskType: req.body.formAssignmentType,
                                taskClass: req.body.formAssignmentClass,
                                taskPriority: req.body.formAssignmentPriority,
                                taskDescription: req.body.formAssignmentDescription},
                            {
                                where: {
                                    taskID: req.params.taskID
                                }
                            });
        res.redirect("/editTask/" + req.params.taskID + "?tar=successEdit");
    } catch (error) {
        console.log(error);
        res.redirect("/editTask/" + req.params.taskID + "?tar=error");
    }
})

router.post('/delete/:taskID', async function(req, res, next) {
    console.log("in task delete handler");
    // console.log(req.params.taskID);

    try {
        const task = await UserTask.findTask(req.params.taskID)
        if(task)
        {
            await task.destroy();
            res.redirect("/newTask?tar=successDelete");
        }
    } catch(error) {
        console.log(error);
        res.redirect("/editTask/" + req.params.taskID + "?tar=error"); 
    }
})

// invoked when the user presses "Delete"
// should delete the task

module.exports = router;