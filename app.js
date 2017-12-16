var express = require('express');
var passport=require("passport");
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var flash    = require('connect-flash');
var expressValidator=require("express-validator");
var expressSession=require("express-session");
var hbs=require("express-handlebars");
var index = require('./routes/index');
var users = require('./routes/users');
var workers=require('./routes/workers');
//var ejsLayout = require('express-ejs-layouts');

var app = express();
app.engine('hbs',hbs({extname:"hbs",defaultLayout:"layout",layoutsDir:__dirname+"/views/layouts/"}));
app.use(flash()); // use connect-flash for flash messages stored in session
//app.use(ejsLayout);
// view engine setup
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
//Authenticated Packages


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(cookieParser());
app.use(expressSession({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
  //cookie: { secure: true }
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/workers',workers);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
