var express = require('express');
var router = express.Router();
const Course = require('../models/Course')
const Student = require('../models/Student')
const Enrolled = require('../models/Enrolled')

const sessionChecker = (req, res, next)=> {
  if(req.session.user === undefined)
  {
    res.redirect("/login")
  }
  if(req.session.user.isStudent){
    next()
  } else{
    res.redirect("/?msg=raf")
  }
}
router.use(sessionChecker)

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('studentHome', {req: req});
});

router.get('/viewCourses', async function(req,res,next) {
  const courses = await Course.findAll();
  const courseCount = await Course.count();
  res.render('viewCourses', {courses, courseCount})
})

router.get("/:courseid", async function(req, res, next) {
  const course = await Course.findCourse(req.params.courseid)
  const isAdmin = false
  if(Enrolled.count() !== 0)
  {
    const isEnrolled = await Enrolled.findAll({
      where:{
        studentUsername: req.session.user.username,
        CourseCourseid: course.courseid
      }
  })
}
  if(course){
    res.render('coursedetails', {course, isAdmin})

  }else{
    res.redirect('/courses/?msg=course+not+found&?courseid='+req.params.courseid)
  }
})

router.get('/enroll/:courseid', async function(req,res,next) {
  const course = await Course.findCourse(req.params.courseid)
  const user = await Student.findStudent(req.session.user.username, req.session.user.password)
  if(course && user){
    await user.addCourses(course)
    res.redirect('/studentHome/?msg=successEnroll&?courseid='+req.params.courseid)
  }else{
    res.redirect('/studentHome/?msg=course+not+found&?courseid='+req.params.courseid)
  }
  
 })


module.exports = router;