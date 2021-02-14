const UseCase = require('./UseCase')

class ReadJsonFileUseCase extends UseCase {
  
  execute(filePath) {
    return this.repository.readJsonFile(filePath)
  }
}

module.exports = ReadJsonFileUseCase;
