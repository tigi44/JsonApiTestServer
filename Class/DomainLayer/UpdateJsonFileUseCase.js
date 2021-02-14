const UseCase = require('./UseCase')

class UpdateJsonFileUseCase extends UseCase {
  
  execute(filePath, jsonData) {
    return this.repository.createJsonFile(filePath, jsonData)
  }
}

module.exports = UpdateJsonFileUseCase;
