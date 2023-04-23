const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const CourseTask = require('../models/CourseTask');

const sessionChecker = (req, res, next)=> {
    if(req.session.user === undefined)
    {
      res.redirect("/login")
    }
    else if(req.session.user.isAdmin){
      next()
    } else{
      res.redirect("/?msg=raf")
    }
  }
router.use(sessionChecker)

router.get('/', async function(req, res, next) {
    // get all the instructor's courses
    const instructorCourses = await Course.findInstructorsCourses(req.session.user.username);

    // res.render("newCourseTask", { instructorCourses });

    if(req.query.tar)
    {
        res.render("newCourseTask", { instructorCourses, taskAlertResponse : req.query.tar } );
    }
    else
    {
        res.render("newCourseTask", { instructorCourses });
    }
})

router.post('/create', async function(req, res, next) {
    let taskAlertResponse = "error";
    const instructorCourses = await Course.findInstructorsCourses(req.session.user.username);

    // input validation handled client-side, all incoming information
    // should be valid
    try 
    {
        await CourseTask.create({ctaskName: req.body.formAssignmentName,
                                cdueDate: req.body.formDueDate,
                                ctaskType: req.body.formAssignmentType,
                                ctaskPriority: req.body.formAssignmentPriority,
                                ctaskDescription: req.body.formAssignmentDescription,
                                CourseCourseid: req.body.formAssignmentClass});

        taskAlertResponse = "successAdd";
        let alertTaskName = req.body.formAssignmentName;
        res.render("newCourseTask", { instructorCourses, taskAlertResponse, alertTaskName });
    }
    catch (error)
    {
        console.log(error);
        taskAlertResponse = "error";
        res.render("newCourseTask", { instructorCourses, taskAlertResponse });
    }
})

module.exports = router;