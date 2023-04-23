const express = require('express');
const router = express.Router();

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

router.get('/', function(req, res, next) {
    res.render("adminSettings");
})

router.post('/updatePassSubmit', function(req, res, next) {
    console.log("in admin updatePassSubmit");
    console.log(req.body);

    // TODO - check to see if old password is valid

    // check to see if new password was retyped correctly
    if(req.body.newPassword === req.body.confirmNewPassword)
    {
        let passAlertResponse = "success";
        // TODO - update the DB accordingly
        res.render("adminSettings", { passAlertResponse });
    }
    else
    {
        let passAlertResponse = "confirmationFailure";
        res.render("adminSettings", { passAlertResponse });
    }
})

router.post('/updateInfoSubmit', function(req, res, next) {
    console.log("in admin updateInfoSubmit");
    console.log(req.body);

    // TODO - update the DB accordingly

    let infoAlertResponse = "success"
    res.render("adminSettings", { infoAlertResponse });
})

module.exports = router;