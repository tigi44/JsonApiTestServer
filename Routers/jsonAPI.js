const express         = require('express');
const url             = require('url');
const path            = require('path');
const router          = express.Router();

const JsonFileService = require('../Class/ServiceLayer/JsonFileService')
const jsonFileService = new JsonFileService()


// get : read (file, directory)
router.get('/', function(req, res, next) {
  var dirPath  = getFilePathByRequest(req);
  var filePath = addExtNameJson(dirPath);

  jsonFileService.getJsonFile(filePath).then(responseData => {
    if (responseData.data) {
      res.json(responseData.data)
    } else {
      jsonFileService.getJsonFiles(dirPath).then(responseData => {
        if (Object.keys(responseData.data).length > 0) {
          res.json(responseData.data)
        } else {
          next();
        }
      })
    }
  })
});

// post : create | read
router.post('/', function(req, res, next) {
  var jsonData = req.body;
  var filePath = getFilePathByRequest(req);
      filePath = addExtNameJson(filePath);

  jsonFileService.postJsonFile(filePath, jsonData).then(responseData => {
    res.status(responseData.status)
    res.json(responseData.data)
  })
});

// put : update | create
router.put('/', function(req, res, next) {
  var jsonData = req.body;
  var filePath = getFilePathByRequest(req);
      filePath = addExtNameJson(filePath);

  jsonFileService.putJsonFile(filePath, jsonData).then(responseData => {
    res.status(responseData.status)
    res.json(responseData.data)
  })
});

// delete : delete
router.delete('/', function(req, res, next) {
  var filePath = getFilePathByRequest(req);
      filePath = addExtNameJson(filePath);

  jsonFileService.deleteJsonFile(filePath).then(responseData => {
    res.status(responseData.status)
    res.json(responseData.data)
  })
});


// private function
function addExtNameJson(urlPath) {
  var resultPath
  const extJson = '.json'
  var extname   = path.extname(urlPath);

  if (extname) {
    if (extname == extJson) {
      resultPath = urlPath;
    } else {
      resultPath = urlPath.replace(extname, extJson);
    }
  } else {
    resultPath = urlPath.endsWith(extJson) ? urlPath : urlPath + extJson;
  }

  return resultPath;
}

function getFilePathByRequest(req) {
  var urlPath = url.parse(req.originalUrl).pathname;

  return path.join('./jsonFile', urlPath.toLowerCase());
}

module.exports = router;
