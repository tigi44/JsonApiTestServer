var express = require('express');
var router  = express.Router();
var fs      = require('fs');
var path    = require('path');

/* GET json path list */
router.get('/.json', function(req, res, next) {
  var files = findFiles('./jsonFile');

  res.json(hierarchyFiles(files));
});

/* GET home page. */
router.get('/', function(req, res, next) {
  var files = findFiles('./jsonFile');

  res.render('jsonapi', {
    title             : 'JSON API TEST SERVER',
    headerMenu        : 0,
    hierarchyFiles    : hierarchyFiles(files)
  });
});

router.get('/scheme', function(req, res, next) {
  var filepath = "jsonScheme/scheme.json";

  res.render('scheme', {
    title             : 'SCHEME',
    scheme            : getFileJson(filepath),
    headerMenu        : 1
  });
});
router.post('/scheme', function(req, res, next) {
  var json = req.body;
  var filepath = "jsonScheme/scheme.json";
  var resultData = getFileJson(filepath);

  if (json.path.length < 1 ||
      json.name.length < 1 ||
      json.scheme.length < 1) {
      //throw new Error("All fields must be not empty");
      res.json("All fields must be not empty");
      return;
  }

  var pathList = resultData[json.path];
  if (!pathList) {
    pathList = {};
  }
  pathList[json.name] = json;
  resultData[json.path] = pathList;

  fs.writeFileSync(filepath, JSON.stringify(resultData), 'utf8');

  res.redirect(303, '/scheme');
});

router.get('/uriencodedecode', function(req, res, next) {
  res.render('uriencodedecode', {
    title             : 'URI ENCODE / DECODE',
    headerMenu        : 2
  });
});

router.get('/regex', function(req, res, next) {
  res.render('regex', {
    title             : 'REGULAR EXPRESSION',
    headerMenu        : 3
  });
});

function findFiles(startPath) {
  if (!fs.existsSync(startPath)){
      console.log("No file dir ", startPath);
      return;
  }

  var fileNames = [];
  var files = fs.readdirSync(startPath);
  for(var i = 0; i < files.length; i++){
      var filename = path.join(startPath, files[i]);
      var stat = fs.lstatSync(filename);
      if (stat.isDirectory()) {
        fileNames = fileNames.concat(findFiles(filename));
      } else {
        filename = filename.replace('jsonFile', '');
        if (path.extname(filename) == '.json') {
          fileNames.push(filename);
        }
      }
  }
  return fileNames;
}

function hierarchyFiles(files) {
  var hierarchyFile = {};
  for (var key in files) {
    var fileName = files[key];
    var topFolderName = fileName.match(/\/.*\//gi);

    if (topFolderName) {
      topFolderName = topFolderName.toString();
      topFolderName = topFolderName.replace(/^\//, "");
      topFolderName = topFolderName.replace(/\/$/, "");
    } else {
      topFolderName = "/";
    }

    if (!hierarchyFile[topFolderName]) {
      hierarchyFile[topFolderName] = [];
    }

    hierarchyFile[topFolderName].push(fileName);
  }
  return hierarchyFile;
}

function getFileJson(filepath) {
  var fileString = fs.readFileSync(filepath, 'utf8');
  var resultData;
  try {
    resultData = JSON.parse(fileString);
  } catch(e) {
    resultData = {};
  }
  return resultData;
}

module.exports = router;
