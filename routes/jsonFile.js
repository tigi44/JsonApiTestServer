var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

router.get('/', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');

  var resultData;
  var filepath = req.originalUrl;
  filepath = path.join('./jsonFile', filepath);

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

router.delete('/', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');

  var resultData;
  var filepath = req.originalUrl;
  filepath = path.join('./jsonFile', filepath);

  try {
    fs.unlinkSync(filepath);
    resultData = 'OK';
  } catch(e) {
    // console.log(e);
    resultData = 'Fail Delete';
    res.status(500);
  }
  res.json(resultData);
});

router.post('/', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');

  var resultData;
  var json;
  var jsonData = req.body.json;
  var filepath = req.originalUrl;
  filepath = path.join('./jsonFile', filepath);

  try {
    json = JSON.parse(jsonData);
  } catch(e) {
    // console.log(e);
    res.status(500);
    res.json(e.message);
    return;
  }

  try {
    mkdirp(filepath);
    fs.writeFileSync(filepath, JSON.stringify(json), 'utf8');
    resultData = 'OK';
  } catch(e) {
    // console.log(e);
    resultData = 'Fail Add';
    res.status(500);
  }
  res.json(resultData);
});

function mkdirp(filepath) {
  var dirname = path.dirname(filepath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  mkdirp(dirname);
  fs.mkdirSync(dirname);
}

module.exports = router;
