var express       = require('express');
var path          = require('path');
var favicon       = require('serve-favicon');
var logger        = require('morgan');
var cookieParser  = require('cookie-parser');
var bodyParser    = require('body-parser');

var index         = require('./routes/index');
var jsonFile      = require('./routes/jsonFile');
var testWebView   = require('./routes/testWebView');

var app           = express();

// elastic-apm-node agent code
var apm = require('elastic-apm-node').start({
  // Override service name from package.json
  // Allowed characters: a-z, A-Z, 0-9, -, _,
  // and space
  serviceName: 'JsonApiTestServer',

  // Use if APM Server requires a token
  secretToken: '',

  // Set custom APM Server URL
  // Default: http://localhost:8200
  serverUrl: ''
})

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

app.use('/', index);
app.use('/testWebView', testWebView);
app.use('/*', jsonFile);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var errorMessage = 'Not Found';
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
