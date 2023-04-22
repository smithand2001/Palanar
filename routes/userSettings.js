const express = require('express');
const router = express.Router();

// TODO - update to include the information of the user themselves
router.get('/', function(req, res, next) {
    res.render("userSettings");
})

router.post('/updatePassSubmit', function(req, res, next) {
    console.log("in updatePassSubmit");
    console.log(req.body);

    // TODO - check to see if old password is valid

    // check to see if new password was retyped correctly
    if(req.body.newPassword === req.body.confirmNewPassword)
    {
        let passAlertResponse = "success";
        // TODO - update the DB accordingly
        res.render("userSettings", { passAlertResponse });
    }
    else
    {
        let passAlertResponse = "confirmationFailure";
        res.render("userSettings", { passAlertResponse });
    }
})

router.post('/updateInfoSubmit', function(req, res, next) {
    console.log("in updateInfoSubmit");
    console.log(req.body);

    // TODO - update the DB accordingly

    let infoAlertResponse = "success"
    res.render("userSettings", { infoAlertResponse });
})


module.exports = router;