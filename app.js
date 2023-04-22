var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session')
const sequelize = require('./db')
const User = require('./models/User')

const sqlite3 = require('sqlite3').verbose();



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'palanar489',
  resave: false,
  saveUinitialized: true,
  cookie: { secure: false}
}))

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



async function setup() {
  const user = await User.create({username: "tom", password: "123"});
  console.log(`Created user ${user.username}`);

  const user1 = await User.create({username: "joe", password: "123"});
  console.log(`Created user ${user1.username}`);

  
}

sequelize.sync({ force: true }).then(()=>{
  console.log("Sequelize Sync Completed...")
  setup().then(()=> console.log("User setup complete"))
})



module.exports = app;
