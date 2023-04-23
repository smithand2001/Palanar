const express = require('express');
const router = express.Router();
const UserTask = require('../models/UserTask');

const sessionChecker = (req, res, next) => {
    if (req.session.user === undefined) {
      res.redirect("/login")
    }
    if (req.session.user.isStudent) {
      next()
    } else {
      res.redirect("/?msg=raf")
    }
  }
  router.use(sessionChecker)

router.get('/', function(req, res, next) {
    // res.render("newTask");
    if(req.query.tar)
    {
        res.render("newTask", { taskAlertResponse : req.query.tar } );
    }
    else
    {
        res.render("newTask");
    }
})

// invoked when user presses "Add Task"
// should add new task to DB
router.post('/create', async function(req, res, next) {
    console.log("in task create handler");
    // console.log(req.body);

    let taskAlertResponse = "error";

    // input validation handled client-side, all incoming information
    // should be valid
    try 
    {
        await UserTask.create({taskName: req.body.formAssignmentName,
                                dueDate: req.body.formDueDate,
                                taskType: req.body.formAssignmentType,
                                taskClass: req.body.formAssignmentClass,
                                taskPriority: req.body.formAssignmentPriority,
                                taskDescription: req.body.formAssignmentDescription,
                                StudentUsername: req.session.user.username});

        taskAlertResponse = "successAdd";
        let alertTaskName = req.body.formAssignmentName;
        res.render("newTask", { taskAlertResponse, alertTaskName });
    }
    catch (error)
    {
        console.log(error);
        taskAlertResponse = "error";
        res.render("newTask", { taskAlertResponse });
    }

    
})



// invoked when the user presses "Delete"
// should delete the task

module.exports = router;