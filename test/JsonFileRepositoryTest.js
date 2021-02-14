const should     = require('should')
const DataSource = require('../Class/DataLayer/FileDataSource')
const Repository = require('../Class/DataLayer/JsonFileRepository')

class MockDataSource extends DataSource {
  findJsonFiles(searchPath, searchFileName) {
    return ['test.json', 'test/test.json']
  }

  createJsonFile(filePath, jsonData) {
      return true
  }

  readJsonFile(filePath) {
    return { string: 'string', number: 2, null: null, Boolean: true }
  }

  deleteJsonFile(filePath) {
    return true
  }
}

describe('** JsonFileRepository Class test **', function () {

  let repository

  before(function(){
    repository = new Repository(new MockDataSource())
  })

  it('Test createJsonFile', async () => {
    await repository.createJsonFile('filePath', 'jsonData').then((data) => {
      should(data).be.true();
    })
  });

  it('Test readJsonFile', async () => {
    await repository.readJsonFile('filePath').then((data) => {
      data.should.be.an.instanceOf(Object).and.have.property('string', 'string')
    })
  });

  it('Test deleteJsonFile', async () => {
    await repository.deleteJsonFile('filePath').then((data) => {
      should(data).be.true();
    })
  });

  it('Test findJsonFiles', async () => {
    await repository.findJsonFiles('jsonFile', 'test.json').then((data) => {
      data.should.be.an.instanceOf(Array).and.have.lengthOf(2);
    })
  });
});
