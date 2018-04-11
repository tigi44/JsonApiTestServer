var express       = require('express');
var path          = require('path');
var favicon       = require('serve-favicon');
var logger        = require('morgan');
var cookieParser  = require('cookie-parser');
var bodyParser    = require('body-parser');

var index         = require('./routes/index');
var jsonFile      = require('./routes/jsonFile');
var scheme        = require('./routes/scheme');
var testWebView   = require('./routes/testWebView');

var app           = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// set response header
app.use(function(req, res, next) {
  if (path.extname(req.path) == '.json') {
    res.setHeader('Content-Type', 'application/json');
  }
  next();
});

app.use('/', index);
app.use('/scheme', scheme);
app.use('/testWebView', testWebView);
app.use('/*.json', jsonFile);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var errorMessage = 'Not Found';
  var contentType = req.headers['content-type'];

  if (contentType == 'application/json' && path.extname(req.path) != '.json') {
    errorMessage += ' : the postfix of url must be \'.json\' for using a json file';
  }

  var err = new Error(errorMessage);
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  var contentType = req.headers['content-type'];
  
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  if (path.extname(req.path) == '.json' || contentType == 'application/json') {
    // .json error result
    res.json(err.message);
  } else {
    // error page render
    res.render('error');
  }
});

module.exports = app;
