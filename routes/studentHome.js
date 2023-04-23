var express = require('express');
var router = express.Router();
const UserTask = require('../models/UserTask');
const Course = require('../models/Course')
const Student = require('../models/Student')
const Enrolled = require('../models/Enrolled')

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

/* GET home page. */

router.get('/', async function (req, res, next) {
  const tasks = await UserTask.findAllTasksOfUser(req.session.user.username);
  // for(task of tasks)
  // {
  //   console.log(task.dataValues);
  // }
  const isEnrolled = await Enrolled.findAllEnrolled(req.session.user.username)
  res.render('studentHome', { req: req, tasks: tasks, isEnrolled: isEnrolled });

  // get all of the user's user tasks
  // console.log("hello");
  // console.log(tasks);
});

router.get('/viewCourses', async function (req, res, next) {
  const courses = await Course.findAll();
  const courseCount = await Course.count();
  res.render('viewCourses', { courses, courseCount })
})


router.get('/boardView', async function (req, res, next) {
  try {
    const tasks = await UserTask.findAllTasksOfUser(req.session.user.username);
    res.render('boardView', { req: req, tasks: tasks });
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
});


router.get("/:courseid", async function (req, res, next) {
  const course = await Course.findCourse(req.params.courseid)
  const isAdmin = false
  const enrolled = await Enrolled.isEnrolled(req.session.user.username, req.params.courseid)
  console.log(enrolled)
  if (course) {
    res.render('coursedetails', { course, isAdmin, enrolled})

  } else {
    res.redirect('/studentHome/?msg=course+not+found&?courseid=' + req.params.courseid)
  }
})

router.get('/enroll/:courseid', async function (req, res, next) {
  const course = await Course.findCourse(req.params.courseid)
  const user = await Student.findStudent(req.session.user.username, req.session.user.password)
  if (course && user) {
    if (course.enrollCount == course.enrolNum) {
      res.redirect('/studentHome/?msg=course+enrollment+is+full&?courseid=' + req.params.courseid)
    }
    else {
      await course.increment('enrollCount')
      await user.addCourses(course)
      res.redirect('/studentHome/?msg=successEnroll&?courseid=' + req.params.courseid)
    }

  } else {
    res.redirect('/studentHome/?msg=course+not+found&?courseid=' + req.params.courseid)
  }

})

router.get('/unenroll/:courseid', async function (req, res, next) {
  const course = await Course.findCourse(req.params.courseid)
  const user = await Student.findStudent(req.session.user.username, req.session.user.password)
  const enrolled = await Enrolled.findOne({
    where:{
      StudentUsername: user.username,
      CourseCourseid: course.courseid
    }
  })
  if (course && user && enrolled) {
    await enrolled.destroy()
    course.decrement('enrollCount')
    res.redirect('/studentHome/?msg=successfulUnenroll?courseid='+req.params.courseid)
  } else {
    res.redirect('/studentHome/?msg=course+not+found&?courseid=' + req.params.courseid)
  }

})


module.exports = router;