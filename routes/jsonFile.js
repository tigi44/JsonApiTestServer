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
    // filepath로 해당 파일이 없는 경우 404에러
    resultData = 'Not Found';
    res.status(404);
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
    resultData = 'Fail Delete';
    res.status(500);
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
    resultData = 'Fail Post';
    res.status(500);
  }
  res.json(resultData);
});

function getFilePathByRequest(req) {
  var urlPath = url.parse(req.originalUrl).pathname;
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
