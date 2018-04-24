var express = require('express');
var router  = express.Router();
var fs      = require('fs');
var path    = require('path');
var url     = require('url');

// get
router.get('/', function(req, res, next) {
  var resultData;
  var filepath = getFilePathByRequest(req);

  try {
    // filepath로 해당 파일을 찾은 경우 json으로 출력
    var fileString = fs.readFileSync(filepath, 'utf8');
    resultData = JSON.parse(fileString);
  } catch(e) {
    // console.log(e);
    next();
  }
  res.json(resultData);
});

// delete
router.delete('/', function(req, res, next) {
  var resultData;
  var filepath = getFilePathByRequest(req);

  try {
    fs.unlinkSync(filepath);
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

// post
router.post('/', function(req, res, next) {
  var resultData;
  var json = req.body;
  var filepath = getFilePathByRequest(req);

  try {
    mkdirp(filepath);
    fs.writeFileSync(filepath, JSON.stringify(json), 'utf8');
    resultData = json;
  } catch(e) {
    // console.log(e);
    var errorMessage = 'Fail Post';
    var err = new Error(errorMessage);
    err.status = 500;
    next(err);
  }
  res.json(resultData);
});

function addExtNameJson(urlPath) {
  var resultPath;
  var extJson = '.json';
  var extname = path.extname(urlPath);

  if (extname) {
    if (extname == extJson) {
      resultPath = urlPath;
    } else {
      resultPath = urlPath.replace(extname, extJson);
    }
  } else {
    resultPath = urlPath + extJson;
  }

  return resultPath;
}

function getFilePathByRequest(req) {
  var urlPath = url.parse(req.originalUrl).pathname;
  urlPath     = addExtNameJson(urlPath);

  return path.join('./jsonFile', urlPath.toLowerCase());
}

function mkdirp(filepath) {
  var dirname = path.dirname(filepath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  mkdirp(dirname);
  fs.mkdirSync(dirname);
}

module.exports = router;
