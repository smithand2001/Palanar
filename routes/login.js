var express = require('express');
var router = express.Router();
const Student = require('../models/Student');
const Admin = require('../models/Admin');

router.get('/', function (req, res, next) {
  res.render('login')
});

router.post('/LoggingIn', async function (req, res, next) {
  console.log(req.body.admin)
  // Admin user
  if (req.body.admin === 'on') {
    try {
      const user = await Admin.findAdmin(req.body.username, req.body.password)
      if (user !== null) {
        req.session.user = user
        req.session.isAdmin = true
        res.redirect('/adminHome?Lmsg=LogInSuccess')
      } else {
        res.redirect('/login?msg=fail')
      }
    } catch (error) {
      res.redirect('/login?Lmsg=' + new URLSearchParams(error.toString()).toString())
    }
  }
  // Student User
  else {
    try {
      console.log("here")
      const user = await Student.findStudent(req.body.username, req.body.password)
      if (user !== null) {
        req.session.user = user
        req.session.isStudent = true
        res.redirect('/studentHome?Lmsg=LogInSuccess')
      } else {
        res.redirect('/login?msg=fail')
      }
    } catch (error) {
      res.redirect('/login?Lmsg=' + new URLSearchParams(error.toString()).toString())
    }
  }
})


module.exports = router;