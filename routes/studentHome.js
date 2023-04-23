var express = require('express');
var router = express.Router();
const UserTask = require('../models/UserTask');
const Course = require('../models/Course')

/* GET home page. */
router.get('/', async function(req, res, next) {
  const tasks = await UserTask.findAllTasksOfUser(req.session.user.username);
  // for(task of tasks)
  // {
  //   console.log(task.dataValues);
  // }
  res.render('studentHome', {req: req, tasks : tasks});

  // get all of the user's user tasks
  // console.log("hello");
  // console.log(tasks);
});

router.get('/viewCourses', async function(req,res,next) {
  const courses = await Course.findAll();
  const courseCount = await Course.count();
  res.render('viewCourses', {courses, courseCount})
})

router.get('/boardView', async function(req, res, next) {
  try {
    const tasks = await UserTask.findAllTasksOfUser(req.session.user.username);
    res.render('boardView', { req: req, tasks: tasks });
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
});


router.get("/:courseid", async function(req, res, next) {
  const course = await Course.findCourse(req.params.courseid)
  if(course){
    res.render('coursedetails', {course})

  }else{
    res.redirect('/courses/?msg=course+not+found&?courseid='+req.params.courseid)
  }
})
const sessionChecker = (req, res, next)=> {
  if(req.session.user.isStudent){
    next()
  } else{
    res.redirect("/?msg=raf")
  }
}
router.use(sessionChecker)

module.exports = router;