var express = require('express');
var router = express.Router();
const Course = require('../models/Course')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('studentHome');
});

router.get('/viewCourses', async function(req,res,next) {
  const courses = await Course.findAll();
  const courseCount = await Course.count();
  res.render('viewCourses', {courses, courseCount})
})

router.get("/:courseid", async function(req, res, next) {
  const course = await Course.findCourse(req.params.courseid)
  if(course){
    res.render('coursedetails', {course})

  }else{
    res.redirect('/courses/?msg=course+not+found&?courseid='+req.params.courseid)
  }
})

module.exports = router;