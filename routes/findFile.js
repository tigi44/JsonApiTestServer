var fs      = require('fs');
var path    = require('path');

module.exports = {
  extJson : '.json',
  findFiles: function (startPath) {
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
          fileNames = fileNames.concat(this.findFiles(filename));
        } else {
          filename = filename.replace('jsonFile', '');
          if (path.extname(filename) == this.extJson) {
            fileNames.push(filename);
          }
        }
    }
    return fileNames;
  },
  hierarchyFiles: function (files) {
    var hierarchyFile = {};
    for (var key in files) {
      var fileName = files[key];
      var topFolderName = fileName.match(/\/([^\/]*)\//gi);

      if (topFolderName) {
        topFolderName = topFolderName[0].toString();
        topFolderName = topFolderName.replace(/^\//, "");
        topFolderName = topFolderName.replace(/\/$/, "");
      } else {
        topFolderName = "/";
      }

      if (!hierarchyFile[topFolderName]) {
        hierarchyFile[topFolderName] = [];
      }

      hierarchyFile[topFolderName].push(fileName.replace(this.extJson, ''));
    }
    return hierarchyFile;
  },
  getFileJson: function (filePath) {
    var fileString = fs.readFileSync(filePath, 'utf8');
    var resultData;
    try {
      resultData = JSON.parse(fileString);
    } catch(e) {
      resultData = {};
    }
    return resultData;
  }
};
