const FindJsonFilesUseCase  = require('../DomainLayer/FindJsonFilesUseCase')
const CreateJsonFileUseCase = require('../DomainLayer/CreateJsonFileUseCase')
const DeleteJsonFileUseCase = require('../DomainLayer/DeleteJsonFileUseCase')
const ReadJsonFileUseCase   = require('../DomainLayer/ReadJsonFileUseCase')
const UpdateJsonFileUseCase = require('../DomainLayer/UpdateJsonFileUseCase')

const DataSource = require('../DataLayer/FileDataSource')
const Repository = require('../DataLayer/JsonFileRepository')

const ResponseData = require('./ResponseData')

class JsonFileService {

  constructor() {
    let repository = new Repository(new DataSource())

    this.findJsonFilesUseCase   = new FindJsonFilesUseCase(repository)
    this.createJsonFileUseCase  = new CreateJsonFileUseCase(repository)
    this.deleteJsonFileUseCase  = new DeleteJsonFileUseCase(repository)
    this.readJsonFileUseCase    = new ReadJsonFileUseCase(repository)
    this.updateJsonFileUseCase  = new UpdateJsonFileUseCase(repository)
  }

  async getJsonFiles(searchPath, searchFileName) {
    let files = await this.findJsonFilesUseCase.execute(searchPath, searchFileName)
    return ResponseData.ok_200(files)
  }

  async postJsonFile(filePath, jsonData) {
    let readJson = await this.readJsonFileUseCase.execute(filePath)

    if (readJson) {
      return ResponseData.ok_200(readJson)
    } else {
      let createResult = await this.createJsonFileUseCase.execute(filePath, jsonData)
      return createResult ? ResponseData.ok_201() : ResponseData.fail_400()
    }
  }

  async getJsonFile(filePath) {
    let getJsonData = await this.readJsonFileUseCase.execute(filePath)
    return ResponseData.ok_200(getJsonData)
  }

  async putJsonFile(filePath, jsonData) {
    let readJson = await this.readJsonFileUseCase.execute(filePath)

    if (readJson) {
      await this.updateJsonFileUseCase.execute(filePath, jsonData)
      return ResponseData.ok_200()
    } else {
      await this.createJsonFileUseCase.execute(filePath, jsonData)
      return ResponseData.ok_201()
    }
  }

  async deleteJsonFile(filePath) {
    let deleteResult = await this.deleteJsonFileUseCase.execute(filePath)
    return deleteResult ? ResponseData.ok_200() : ResponseData.ok_204()
  }
}

module.exports = JsonFileService;
