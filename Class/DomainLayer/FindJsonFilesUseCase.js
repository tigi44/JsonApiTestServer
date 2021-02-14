const UseCase = require('./UseCase')

class FindJsonFilesUseCase extends UseCase {

  execute(searchPath, searchFileName) {
    return this.repository.findJsonFiles(searchPath, searchFileName).then((files) => {

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

        hierarchyFile[topFolderName].push(fileName.replace('.json', ''));
      }

      return hierarchyFile;
    })
  }
}

module.exports = FindJsonFilesUseCase;
