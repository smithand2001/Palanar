var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var seqeuelize = require('./db')
const session = require('express-session')
const Student = require('./models/Student')
const Course = require('./models/Course')
const Admin = require('./models/Admin')
const UserTask = require('./models/UserTask')
var landingRouter = require('./routes/landing');
//var usersRouter = require('./routes/users');
const adminSettingsRouter = require('./routes/adminSettings');
const editTaskRouter = require('./routes/editTask');
const newTaskRouter = require('./routes/newTask');
const userSettingsRouter = require('./routes/userSettings');
var studentHomeRouter = require('./routes/studentHome');
var adminHomeRouter = require('./routes/adminHome');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');
var logoutRouter = require('./routes/logout');
const CourseTask = require('./models/CourseTask');
const newCourseTaskRouter = require('./routes/newCourseTask');
const editCourseTaskRouter = require('./routes/editCourseTask');


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
//app.use('/users', usersRouter);
app.use('/adminSettings', adminSettingsRouter);
app.use('/editTask', editTaskRouter);
app.use('/newTask', newTaskRouter);
app.use('/userSettings', userSettingsRouter)
app.use('/studentHome', studentHomeRouter);
app.use('/adminHome', adminHomeRouter)
app.use('/login', loginRouter)
app.use('/register', registerRouter)
app.use('/logout', logoutRouter)
app.use('/newCourseTask', newCourseTaskRouter)
app.use('/editCourseTask', editCourseTaskRouter)

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
  const subu = await Student.create({ username: "subu", password: "1234", isStudent: true });
  const admin = await Admin.create({username: 'abc', password: '123', isAdmin: true})
  console.log("subu instance created...")
  const webdev = await Course.create(
    {
      courseid: "CPTS489",
      courseName: "Web Development",
      semester: "Spring",
      courseDesc: "Introduction to Web Development",
      enrollNum: 80,
      AdminUsername: admin.username,
      enrollCount: 0
    }
  )
  const t1 = await UserTask.create({taskName: "Homework 1",
                                    dueDate: "2023-04-28",
                                    taskType: "Homework",
                                    taskClass: "UW-CSE403",
                                    taskPriority: "High",
                                    taskDescription: "Full-stack web app.",
                                    StudentUsername: "subu"})

  const e1 = await UserTask.create({taskName: "Final Exam",
                                    dueDate: "2023-05-01",
                                    taskType: "Test",
                                    taskClass: "UW-CSE403",
                                    taskPriority: "Very High",
                                    taskDescription: "Final exam.",
                                    StudentUsername: "subu"})

  const ct1 = await CourseTask.create({ctaskName: "Our Actual Final Exam",
                                        cdueDate: "2023-05-03",
                                        ctaskType: "Test",
                                        ctaskPriority: "Very High",
                                        ctaskDescription: "In-class practical final exam. Working with databases and data validation.",
                                        CourseCourseid: "CPTS489"})
}

seqeuelize.sync({force: true}).then(()=>{
  console.log("Sequelize Sync Completed...")
  setup().then(()=> console.log("User setup complete"))
})

module.exports = app;
