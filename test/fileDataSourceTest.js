const should     = require('should')
const DataSource = require('../Class/DataLayer/FileDataSource')

describe('** FileDataSource Class test **', function () {

  let dataSource
  let filePath = 'jsonFile/testJsonFile.json'
  let jsonData = { string: 'string', number: 2, null: null, Boolean: true }

  before(function(){
    dataSource = new DataSource()
  })

  it('Test createJsonFile', function () {
    let result = dataSource.createJsonFile(filePath, jsonData)
    should(result).be.true();
  });

  it('Test readJsonFile', function () {
    let fileJsonData = dataSource.readJsonFile(filePath)
    fileJsonData.should.be.an.instanceOf(Object).and.have.property('string', jsonData['string'])
  });

  it('Test deleteJsonFile', function () {
    let result = dataSource.deleteJsonFile(filePath)
    should(result).be.true();
  });

  it('Test findJsonFiles', function () {
    let fileNames = dataSource.findJsonFiles('jsonFile', 'test.json')
    fileNames.should.be.an.instanceOf(Array).and.have.lengthOf(1);
  });
});
