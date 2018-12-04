var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var expressPug = require('express-pug');
var mongoose = require('mongoose');
var validator = require('express-validator');
var passport = require('passport');
var session = require('express-session');
var connflash = require('connect-flash');
var MongoStore = require('connect-mongo')(session);

var indexRouter = require('./routes/index');
//var userRoutes = require('./routes/user');
//var usersRouter = require('./routes/users');

var app = express();

mongoose.connect('mongodb://localhost:27017/ecommerce', { useNewUrlParser: true });
require('./config/passport');

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.engine('.pug', expressPug({defaultLayout: 'layout', extname: '.pug'}));
app.set('view engine', '.pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(validator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'idk', resave: false, saveUninitialized: false, store: new MongoStore({ mongooseConnection: mongoose.connection}), cookie: {maxAge: 7200000}}));
app.use(connflash());
app.use(passport.initialize());
app.use(passport.session());


app.use(function(req, res, next){
  res.locals.login = req.isAuthenticated();
  res.locals.session = req.session;
  next();
})

//app.use('/user', userRoutes);
app.use('/', indexRouter);


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

module.exports = app;
