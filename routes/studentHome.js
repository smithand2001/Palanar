var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('studentHome', {req: req});
});

const sessionChecker = (req, res, next)=> {
  if(req.session.user.isStudent){
    next()
  } else{
    res.redirect("/?msg=raf")
  }
}
router.use(sessionChecker)

module.exports = router;