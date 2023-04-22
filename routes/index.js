var express = require('express');
const User = require('../models/User');
var router = express.Router();
const db = require('../models/User');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', (req, res) => {
  res.render('login.ejs');
});

router.post('/login', async function(req, res, next) {
  const user = await User.findUser(req.body.username, req.body.password)
  if(user!== null){
    req.session.user = user
    res.redirect("/home")
  }else{
    res.redirect("/?msg=fail")
  }
  
});


router.get('/signup', function(req, res, next) {
  res.render('signup.ejs', { title: 'signup'});
});


router.post('/signup', async function(req, res, next){
  try{
    await User.create(
      {
        username: req.body.username,
        password: req.body.password
      }
    )
  
  console.log({username, password});
  
  res.redirect('/login?msg=success')
  } catch (error) {
  res.redirect('/signup?msg=fail')
  }
  
});
  




module.exports = router;
