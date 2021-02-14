const express = require('express');
const url     = require('url');
const path    = require('path');
const router  = express.Router();
const Service = require('../Class/ServiceLayer/JsonFileService')
const service = new Service()

// get : read (file, directory)
router.get('/', async(req, res, next) => {
  var dirPath  = getFilePathByRequest(req);
  var filePath = addExtNameJson(dirPath);

  var {data} = await service.getJsonFile(filePath)

  if (data) {
    res.json(data)
  } else {
    var {data} = await service.getJsonFiles(dirPath)

    if (Object.keys(data).length > 0) {
      res.json(data)
    } else {
      next();
    }
  }
});

// post : create | read
router.post('/', async(req, res, next) => {
  var jsonData = req.body;
  var filePath = getFilePathByRequest(req);
      filePath = addExtNameJson(filePath);

  var {status, data} = await service.postJsonFile(filePath, jsonData)

  res.status(status)
  res.json(data)
});

// put : update | create
router.put('/', async(req, res, next) => {
  var jsonData = req.body;
  var filePath = getFilePathByRequest(req);
      filePath = addExtNameJson(filePath);

  var {status, data} = await service.putJsonFile(filePath, jsonData)

  res.status(status)
  res.json(data)
});

// delete : delete
router.delete('/', async(req, res, next) => {
  var filePath = getFilePathByRequest(req);
      filePath = addExtNameJson(filePath);

  var {status, data} = await service.deleteJsonFile(filePath)

  res.status(status)
  res.json(data)
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
