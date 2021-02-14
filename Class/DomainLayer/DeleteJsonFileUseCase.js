const UseCase = require('./UseCase')

class DeleteJsonFileUseCase extends UseCase {
  execute(filePath) {
    return this.repository.deleteJsonFile(filePath)
  }
}

module.exports = DeleteJsonFileUseCase;
