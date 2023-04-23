var express = require('express');
var router = express.Router();
const Student = require('../models/Student');
const Admin = require('../models/Admin');

router.get('/', function (req, res, next) {
    res.render('register')
});

// Register submit button
router.post('/create', async function (req, res, next) {
    // Admin account
    if (req.body.admin === 'on') {
        try {
            await Admin.create(
                {
                    username: req.body.username,
                    password: req.body.password,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    phoneNumber: req.body.phoneNumber,
                    isAdmin: true
                }
            )
            req.session.user = await Admin.findAdmin(req.body.username, req.body.password)
            req.session.isAdmin = true
            res.redirect('/adminHome?Umsg=RegisterSuccess')
    
        } catch (error) {
            res.redirect('/register?Umsg=' + new URLSearchParams(error.toString()).toString())
        }
    }
    // Student Account
    else{
        try {
            await Student.create(
                {
                    username: req.body.username,
                    password: req.body.password,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    phoneNumber: req.body.phoneNumber,
                    isStudent: true
                }
            )
            req.session.user = await Student.findStudent(req.body.username, req.body.password)
            req.session.isStudent = true
            res.redirect('/studentHome?Umsg=RegisterSuccess')
    
        } catch (error) {
            res.redirect('/register?Umsg=' + new URLSearchParams(error.toString()).toString())
        }
    }
})

module.exports = router;