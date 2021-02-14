const fs   = require('fs');
const path = require('path');

class FileDataSource {

  _makeDirectory(filePath) {
    var dirname = path.dirname(filePath);

    if (fs.existsSync(dirname)) {
      return false;
    }

    this._makeDirectory(dirname);
    fs.mkdirSync(dirname);

    return true;
  }

  isDirectory(dirPath) {
    return fs.existsSync(dirPath) && fs.lstatSync(dirPath).isDirectory();
  }

  isExistFile(filePath) {
    return fs.existsSync(filePath) && fs.lstatSync(filePath).isFile();
  }

  findJsonFiles(searchPath, searchFileName) {
    searchFileName = (searchFileName) ? searchFileName : "";

    if (!fs.existsSync(searchPath)){
        return [];
    }

    var fileNames = [];
    var files = fs.readdirSync(searchPath);

    for(var i = 0; i < files.length; i++){
        var filename = path.join(searchPath, files[i]);

        if (this.isDirectory(filename)) {
          fileNames = fileNames.concat(this.findJsonFiles(filename, searchFileName));
        } else {
          filename = filename.replace('jsonFile', '');

          if (path.extname(filename) == '.json') {
            if (filename.toLowerCase().indexOf(searchFileName.toLowerCase()) > -1) {
              fileNames.push(filename);
            }
          }
        }
    }

    return fileNames;
  }

  createJsonFile(filePath, jsonData) {
    let result = false

    if (jsonData) {
      this._makeDirectory(filePath)
      fs.writeFileSync(filePath, JSON.stringify(jsonData), 'utf8')

      result = this.readJsonFile(filePath) ? true : false
    } else {
      result = false
    }

    return result
  }

  readJsonFile(filePath) {
    let resultJson

    if (this.isExistFile(filePath)) {
      let fileString = fs.readFileSync(filePath, 'utf8')
      resultJson = JSON.parse(fileString)
    } else {
      resultJson = null
    }

    return resultJson;
  }

  deleteJsonFile(filePath) {
    let result = false

    if (this.isExistFile(filePath)) {
      fs.unlinkSync(filePath);
      result = this.readJsonFile(filePath) ? false : true
    } else {
      result = false
    }

    return result
  }
}

module.exports = FileDataSource;
