const FindJsonFilesUseCase  = require('../DomainLayer/FindJsonFilesUseCase')
const CreateJsonFileUseCase = require('../DomainLayer/CreateJsonFileUseCase')
const DeleteJsonFileUseCase = require('../DomainLayer/DeleteJsonFileUseCase')
const ReadJsonFileUseCase   = require('../DomainLayer/ReadJsonFileUseCase')
const UpdateJsonFileUseCase = require('../DomainLayer/UpdateJsonFileUseCase')

const FileDataSource        = require('../DataLayer/FileDataSource')
const JsonFileRepository    = require('../DataLayer/JsonFileRepository')

const ResponseData          = require('./ResponseData')

class JsonFileService {

  constructor() {
    let jsonFileRepository = new JsonFileRepository(new FileDataSource())

    this.findJsonFilesUseCase   = new FindJsonFilesUseCase(jsonFileRepository)
    this.createJsonFileUseCase  = new CreateJsonFileUseCase(jsonFileRepository)
    this.deleteJsonFileUseCase  = new DeleteJsonFileUseCase(jsonFileRepository)
    this.readJsonFileUseCase    = new ReadJsonFileUseCase(jsonFileRepository)
    this.updateJsonFileUseCase  = new UpdateJsonFileUseCase(jsonFileRepository)
  }

  getJsonFiles(searchPath, searchFileName) {
    return this.findJsonFilesUseCase.execute(searchPath, searchFileName).then(files => ResponseData.ok_200(files))
  }

  postJsonFile(filePath, jsonData) {
    return this.readJsonFileUseCase.execute(filePath).then(readJson => {
      if (readJson) {
        return ResponseData.ok_200(readJson)
      } else {
        return this.createJsonFileUseCase.execute(filePath, jsonData).then(createResult => createResult ? ResponseData.ok_201() : ResponseData.fail_400())
      }
    })
  }

  getJsonFile(filePath) {
    return this.readJsonFileUseCase.execute(filePath).then(getJsonData => ResponseData.ok_200(getJsonData))
  }

  putJsonFile(filePath, jsonData) {
    return this.readJsonFileUseCase.execute(filePath).then(readJson => {
      if (readJson) {
        return this.updateJsonFileUseCase.execute(filePath, jsonData).then(result => ResponseData.ok_200())
      } else {
        return this.createJsonFileUseCase.execute(filePath, jsonData).then(result => ResponseData.ok_201())
      }
    })
  }

  deleteJsonFile(filePath) {
    return this.deleteJsonFileUseCase.execute(filePath).then(deleteResult => deleteResult ? ResponseData.ok_200() : ResponseData.ok_204())
  }
}

module.exports = JsonFileService;
