var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  // destroy the session and redirect to login page
  req.session.destroy(function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log("successfully logged out")
      res.redirect('/login');
    }
  });
});

module.exports = router;
