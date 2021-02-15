class JsonFileRepositoryInterface {
  
  constructor(dataSource) {
    this.dataSource = dataSource;
  }

  findJsonFiles(searchPath, searchFileName) {}
  createJsonFile(filePath, jsonData) {}
  readJsonFile(filePath) {}
  deleteJsonFile(filePath) {}
}

module.exports = JsonFileRepositoryInterface;
