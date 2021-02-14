const UseCase = require('./UseCase')

class CreateJsonFileUseCase extends UseCase {

  execute(filePath, jsonData) {
    return this.repository.createJsonFile(filePath, jsonData)
  }
}

module.exports = CreateJsonFileUseCase;
