const express = require('express');
const Student = require('../models/Student');
const router = express.Router();

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

// TODO - update to include the information of the user themselves
router.get('/', function(req, res, next) {
    // console.log(req.session);
    res.render("userSettings");
})

router.post('/updatePassSubmit', async function(req, res, next) {
    console.log("in updatePassSubmit");

    // the inputted old password combined with the user's current
    // username should return a user
    const user = await Student.findStudent(req.session.user.username, req.body.currentPassword);
    let passAlertResponse = "unknown";

    if(user === null)
    {
        passAlertResponse = "currentPasswordFailure";
    }
    else
    {
        // check to see if new password was retyped correctly
        if(req.body.newPassword === req.body.confirmNewPassword)
        {
            passAlertResponse = "success";
            // https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#simple-update-queries
            await Student.update( {password: req.body.newPassword}, {
                where: {
                    username: req.session.user.username
                }
            });
            req.session.user.password = req.body.newPassword;
        }
        else
        {
            passAlertResponse = "confirmationFailure";
        }
    }

    res.render("userSettings", { passAlertResponse });
})

router.post('/updateInfoSubmit', async function(req, res, next) {
    console.log("in updateInfoSubmit");
    console.log(req.body);

    // TODO - update the DB accordingly
    await Student.update( { firstName: req.body.newFirstName, 
                            lastName: req.body.newLastName, 
                            phoneNumber: req.body.newPhoneNumber }, 
    {
        where: {
            username: req.session.user.username
        }
    });

    let infoAlertResponse = "success"
    res.render("userSettings", { infoAlertResponse });
})


module.exports = router;