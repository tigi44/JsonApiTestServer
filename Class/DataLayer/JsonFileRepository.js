const JsonFileRepositoryInterface = require('../DomainLayer/JsonFileRepositoryInterface')

class JsonFileRepository extends JsonFileRepositoryInterface {

  findJsonFiles(searchPath, searchFileName) {
    return Promise.resolve(this.dataSource.findJsonFiles(searchPath, searchFileName))
  }

  createJsonFile(filePath, jsonData) {
      return Promise.resolve(this.dataSource.createJsonFile(filePath, jsonData))
  }

  readJsonFile(filePath) {
    return Promise.resolve(this.dataSource.readJsonFile(filePath))
  }

  deleteJsonFile(filePath) {
    return Promise.resolve(this.dataSource.deleteJsonFile(filePath))
  }
}

module.exports = JsonFileRepository;
