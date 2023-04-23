var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var seqeuelize = require('./db')
const session = require('express-session')
const Student = require('./models/Student')
const Course = require('./models/Course')
const UserTask = require('./models/UserTask')

var landingRouter = require('./routes/landing');
// var usersRouter = require('./routes/users');
const adminSettingsRouter = require('./routes/adminSettings');
const editTaskRouter = require('./routes/editTask');
const newTaskRouter = require('./routes/newTask');
const userSettingsRouter = require('./routes/userSettings');
var studentHomeRouter = require('./routes/studentHome');
var adminHomeRouter = require('./routes/adminHome');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');

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
  secret: 'wsu489',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

app.use('/', landingRouter);
// app.use('/users', usersRouter);
app.use('/adminSettings', adminSettingsRouter);
app.use('/editTask', editTaskRouter);
app.use('/newTask', newTaskRouter);
app.use('/userSettings', userSettingsRouter)
app.use('/studentHome', studentHomeRouter);
app.use('/adminHome', adminHomeRouter)
app.use('/login', loginRouter)
app.use('/register', registerRouter)

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

// START OF NEW CODE
async function setup() {
  const subu = await Student.create({ username: "subu", password: "1234" });
  console.log("subu instance created...")
  const webdev = await Course.create(
    {
      courseid: "CPTS489",
      courseName: "Web Development",
      semester: "Spring",
      courseDesc: "Introduction to Web Development",
      enrollNum: 80
    }
  )
  const t1 = await UserTask.create({taskName: "Homework 1",
                                    dueDate: "2023-04-28",
                                    taskType: "Homework",
                                    taskClass: "CptS489",
                                    taskPriority: "High",
                                    taskDescription: "Full-stack web app.",
                                    StudentUsername: "subu"})

  const e1 = await UserTask.create({taskName: "Final Exam",
                                    dueDate: "2023-05-01",
                                    taskType: "Test",
                                    taskClass: "CptS489",
                                    taskPriority: "Very High",
                                    taskDescription: "Final exam.",
                                    StudentUsername: "subu"})
}

seqeuelize.sync({force: true}).then(()=>{
  console.log("Sequelize Sync Completed...")
  setup().then(()=> console.log("User setup complete"))
})

module.exports = app;
