var express = require('express');
var router  = express.Router();
var fs      = require('fs');
var path    = require('path');
var url     = require('url');
var ff      = require('../routes/findFile');

// get : read
router.get('/', function(req, res, next) {
  var resultData;
  var reqPath  = getFilePathByRequest(req);
  var filePath = addExtNameJson(reqPath);

  try {
    if (isExistFile(filePath)) {
      resultData = readData(filePath);
    } else if (isDirectory(reqPath)) {
      resultData = ff.hierarchyFiles(ff.findFiles(reqPath));
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

// post : create | read
router.post('/', function(req, res, next) {
  var resultData;
  var json = req.body;
  var filePath = getFilePathByRequest(req);
      filePath = addExtNameJson(filePath);

  try {
    if (isExistFile(filePath)) {
      resultData = readData(filePath);
    } else {
      resultData = createData(filePath, json);
      res.status(201);
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

// put : update | create
router.put('/', function(req, res, next) {
  var resultData;
  var json = req.body;
  var filePath = getFilePathByRequest(req);
      filePath = addExtNameJson(filePath);

  try {
    if (isExistFile(filePath)) {
      resultData = updateData(filePath, json);
    } else {
      resultData = createData(filePath, json);
      res.status(201);
    }
  } catch(e) {
    // console.log(e);
    var errorMessage = 'Fail Put';
    var err = new Error(errorMessage);
    err.status = 500;
    next(err);
  }

  res.json(resultData);
});

// delete : delete
router.delete('/', function(req, res, next) {
  var resultData;
  var filePath = getFilePathByRequest(req);
      filePath = addExtNameJson(filePath);

  try {
    if (isExistFile(filePath)) {
      resultData = deleteData(filePath);
    } else {
      res.status(204);
    }
  } catch(e) {
    // console.log(e);
    var errorMessage = 'Fail Delete';
    var err = new Error(errorMessage);
    err.status = 500;
    next(err);
  }

  res.json(resultData);
});


// private function

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
    resultPath = urlPath.endsWith(ff.extJson) ? urlPath : urlPath + ff.extJson;
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
    return false;
  }

  mkdirp(dirname);
  fs.mkdirSync(dirname);

  return true;
}

function isDirectory(reqPath) {
  return fs.existsSync(reqPath) && fs.lstatSync(reqPath).isDirectory();
}

function isExistFile(filePath) {
  return fs.existsSync(filePath) && fs.lstatSync(filePath).isFile();
}


// function : create, read, update, delete

function createData(filePath, json) {
  let resultData;

  mkdirp(filePath);
  fs.writeFileSync(filePath, JSON.stringify(json), 'utf8');
  resultData = json;

  return resultData;
}

function readData(filePath) {
  let resultData;

  let fileString = fs.readFileSync(filePath, 'utf8');
  resultData = JSON.parse(fileString);

  return resultData;
}

function updateData(filePath, json) {
  return createData(filePath, json);
}

function deleteData(filePath) {
  let resultData;

  fs.unlinkSync(filePath);
  resultData = 'Success Delete';

  return resultData;
}

module.exports = router;
