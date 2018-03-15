var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  var files = findFiles('./jsonFile');

  res.render('index', {
    title       : 'JSON API TEST',
    files       : files
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
          fileNames.push(filename);
        }
    }
    return fileNames;
}

module.exports = router;
