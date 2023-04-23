var express = require('express');
var router = express.Router();
const Course = require('../models/Course');
const Admin = require('../models/Admin');

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

/* GET home page. */
router.get('/', async function (req, res, next) {
  const admin = await Admin.findAdmin(req.session.user.username, req.session.user.password)
  const courses = await Course.findAll({
    where:{
      AdminUsername: req.session.user.username
    }
  });
  if(req.query.Umsg){
    res.locals.Umsg = req.query.Umsg
  }
  if(req.query.msg){
    res.locals.msg = req.query.msg
    res.locals.courseid = req.query.courseid
  }
  const courseCount = await admin.countCourses();
  res.render('adminHome', { courses, courseCount});
});

router.get('/createCourse', (req, res, next) => {
  res.render('createCourse');
});

router.get("/:courseid", async function(req, res, next) {
  const course = await Course.findCourse(req.params.courseid)
  const isAdmin = true
  if(course){
    res.render('coursedetails', {course, isAdmin})

  }else{
    res.redirect('/adminHome/?msg=course+not+found&?courseid='+req.params.courseid)
  }
})

// Create course submit button
router.post('/createCourse/create', async function(req,res,next) {
 try {
  await Course.create(
    {
      courseid: req.body.courseid,
      courseName: req.body.coursename,
      semester: req.body.semester,
      courseDesc: req.body.coursedesc,
      enrollNum: req.body.enrollnum,
      AdminUsername: req.session.user.username,
      enrollCount: 0
    }
  )
  res.redirect('/adminHome?msg=success&courseid'+req.body.courseid)
  
 } catch (error) {
  res.redirect('/adminHome?msg='+new URLSearchParams(error.toString()).toString()+'fail&courseid'+req.body.courseid)
 }
 
})

router.get("/delete/:courseid", async function(req, res, next) {
  const course = await Course.findCourse(req.params.courseid)
  if(course){
    await course.destroy()
    res.redirect('/adminHome/?msg=successdel&?courseid='+req.params.courseid)
  }else{
    res.redirect('/adminHome/?msg=course+not+found&?courseid='+req.params.courseid)
  }
})


module.exports = router;