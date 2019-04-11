var fs      = require('fs');
var path    = require('path');

module.exports = {
  extJson : '.json',
  findAnyFile: function (startPath, search, fileExt) {
    search = (search) ? search : "";
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
          fileNames = fileNames.concat(this.findFiles(filename, search));
        } else {
          filename = filename.replace('jsonFile', '');
          if (!fileExt || path.extname(filename) == fileExt) {
            if (filename.toLowerCase().indexOf(search.toLowerCase()) > -1) {
              fileNames.push(filename);
            }
          }
        }
    }
    return fileNames;
  },
  findFiles: function (startPath, search) {
    return this.findAnyFile(startPath, search, this.extJson)
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
  getFileJson: function (filePath, search) {
    var fileString = fs.readFileSync(filePath, 'utf8');
    var resultData;
    try {
      resultData = JSON.parse(fileString);
    } catch(e) {
      resultData = {};
    }

    return this.searchSchemeJson(resultData, search);
  },
  searchSchemeJson: function (obj, search) {
    if (!search) {
      return obj;
    }

    var resultJson = {};
    for (var k in obj) {
      if (typeof obj[k] == 'object') {
        var searchJson = this.searchSchemeJson(obj[k], search);
        if (Object.keys(searchJson).length > 0) {
          resultJson[k] = searchJson;
        }
      } else if (typeof obj[k] == 'string') {
        if (obj[k].toLowerCase().indexOf(search.toLowerCase()) > -1) {
          resultJson = obj;
          break;
        }
      } else {
        continue;
      }
    }
    return resultJson;
  }
};
