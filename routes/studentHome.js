var express = require('express');
var router = express.Router();
const UserTask = require('../models/UserTask');

/* GET home page. */
router.get('/', async function(req, res, next) {
  const tasks = await UserTask.findAllTasksOfUser(req.session.user.username);
  // for(task of tasks)
  // {
  //   console.log(task.dataValues);
  // }
  res.render('studentHome', {req: req, tasks : tasks});

  // get all of the user's user tasks
  // console.log("hello");
  // console.log(tasks);
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