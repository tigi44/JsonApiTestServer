var express = require('express');
var router  = express.Router();
var fs      = require('fs');
var path    = require('path');
var url     = require('url');
var ff      = require('../routes/findFile');

// get
router.get('/', function(req, res, next) {
  var resultData;
  var reqPath  = getFilePathByRequest(req);
  var filePath = addExtNameJson(reqPath);

  try {
    if (fs.existsSync(reqPath) && fs.lstatSync(reqPath).isDirectory()) {
      resultData = ff.hierarchyFiles(ff.findFiles(reqPath));
    } else if (fs.existsSync(filePath) && fs.lstatSync(filePath).isFile()) {
      var fileString = fs.readFileSync(filePath, 'utf8');
      resultData = JSON.parse(fileString);
    } else {
      next();
    }
  } catch(e) {
    // console.log(e);
    var errorMessage = 'Fail Get';
    var err = new Error(errorMessage);
    err.status = 500;
    next(err);
  }

  res.json(resultData);
});

// post
router.post('/', function(req, res, next) {
  var resultData;
  var json = req.body;
  var filePath = getFilePathByRequest(req);
      filePath = addExtNameJson(filePath);

  try {
    if (fs.existsSync(filePath) && fs.lstatSync(filePath).isFile()) {
      var fileString = fs.readFileSync(filePath, 'utf8');
      resultData = JSON.parse(fileString);
    } else {
      mkdirp(filePath);
      fs.writeFileSync(filePath, JSON.stringify(json), 'utf8');
      resultData = json;
    }
  } catch(e) {
    // console.log(e);
    var errorMessage = 'Fail Post';
    var err = new Error(errorMessage);
    err.status = 500;
    next(err);
  }
  res.json(resultData);
});

// put
router.put('/', function(req, res, next) {
  var resultData;
  var json = req.body;
  var filePath = getFilePathByRequest(req);
      filePath = addExtNameJson(filePath);

  try {
    mkdirp(filePath);
    fs.writeFileSync(filePath, JSON.stringify(json), 'utf8');
    resultData = json;
  } catch(e) {
    // console.log(e);
    var errorMessage = 'Fail Put';
    var err = new Error(errorMessage);
    err.status = 500;
    next(err);
  }
  res.json(resultData);
});

// delete
router.delete('/', function(req, res, next) {
  var resultData;
  var filePath = getFilePathByRequest(req);
      filePath = addExtNameJson(filePath);

  try {
    fs.unlinkSync(filePath);
    resultData = 'Success Delete';
  } catch(e) {
    // console.log(e);
    var errorMessage = 'Fail Delete';
    var err = new Error(errorMessage);
    err.status = 500;
    next(err);
  }
  res.json(resultData);
});

function addExtNameJson(urlPath) {
  var resultPath;
  var extname = path.extname(urlPath);

  if (extname) {
    if (extname == ff.extJson) {
      resultPath = urlPath;
    } else {
      resultPath = urlPath.replace(extname, ff.extJson);
    }
  } else {
    resultPath = urlPath + ff.extJson;
  }

  return resultPath;
}

function getFilePathByRequest(req) {
  var urlPath = url.parse(req.originalUrl).pathname;

  return path.join('./jsonFile', urlPath.toLowerCase());
}

function mkdirp(filePath) {
  var dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  mkdirp(dirname);
  fs.mkdirSync(dirname);
}

module.exports = router;
