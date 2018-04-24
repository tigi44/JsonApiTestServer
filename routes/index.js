var express = require('express');
var router  = express.Router();
var fs      = require('fs');
var path    = require('path');
var extJson = '.json';

/* GET json path list */
router.get('/' + extJson, function(req, res, next) {
  var files = findFiles('./jsonFile');

  res.json(hierarchyFiles(files));
});

/* GET home page. */
router.get('/', function(req, res, next) {
  var contentType = req.headers['content-type'];
  var files = findFiles('./jsonFile');

  if (contentType == 'application/json') {
    res.json(hierarchyFiles(files));
  } else {
    res.render('index', {
      title       : 'JSON API TEST SERVER',
      hierarchyFiles   : hierarchyFiles(files)
    });
  }
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
        if (path.extname(filename) == extJson) {
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

    hierarchyFile[topFolderName].push(fileName.replace(extJson, ''));
  }
  return hierarchyFile;
}

module.exports = router;
