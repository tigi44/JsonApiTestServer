var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var Ajv = require('ajv');

router.get('/', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');

  var resultData;
  var filepath = req.originalUrl;
  filepath = path.join('./jsonFile', filepath);

  try {
    // filepath로 해당 파일을 찾은 경우 json으로 출력
    resultData = fs.readFileSync(filepath, 'utf8');
  } catch(e) {
    // console.log(e);
    // filepath로 해당 파일이 없는 경우 404에러
    resultData = 'Not Found';
    res.status(404);
  }
  res.send(resultData);
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
  res.send(resultData);
});

router.post('/', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');

  var resultData;
  var json = req.body.json;
  var filepath = req.originalUrl;
  filepath = path.join('./jsonFile', filepath);

  try {
    JSON.parse(json);
  } catch(e) {
    // console.log(e);
    res.status(500);
    res.send(e.message);
    return;
  }

  try {
    mkdirp(filepath);
    fs.writeFileSync(filepath, json, 'utf8');
    resultData = 'OK';
  } catch(e) {
    // console.log(e);
    resultData = 'Fail Add';
    res.status(500);
  }
  res.send(resultData);
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
