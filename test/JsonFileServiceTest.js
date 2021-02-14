const should     = require('should')
const Service    = require('../Class/ServiceLayer/JsonFileService')

describe('** JsonFileService Class test **', function () {

  let service
  let filePath       = 'jsonFile/testService.json'
  let jsonData       = { string: 'string', number: 1, null: null, Boolean: true }
  let updateJsonData = { string: 'string2', number: 2, null: null, Boolean: true }

  before(function(){
    service = new Service()
  })

  it('Test postJsonFile', async () => {
    let data = await service.postJsonFile(filePath, jsonData)

    if (data.status == 200) {
      should(data.data).be.ok()
    } else {
      let readData = await service.getJsonFile(filePath)
      should(readData.status).be.exactly(200)
      should(readData.data.string).be.exactly(jsonData.string)
    }
  });

  it('Test getJsonFile', async () => {
    let data = await service.getJsonFile(filePath)
    should(data.status).be.exactly(200)
    should(data.data).be.an.instanceOf(Object)
  });

  it('Test putJsonFile', async () => {
    let data = await service.putJsonFile(filePath, updateJsonData)

    if (data.status == 200) {
      let readData = await service.getJsonFile(filePath)
      should(readData.status).be.exactly(200)
      should(readData.data.string).be.exactly(updateJsonData.string)
    } else {
      let readData = await service.getJsonFile(filePath)
      should(readData.status).be.exactly(200)
      should(readData.data.string).be.exactly(updateJsonData.string)
    }
  });

  it('Test deleteJsonFile', async () => {
    let data = await service.deleteJsonFile(filePath)
    should(data.status).be.exactly(200)
  });

  it('Test getJsonFiles', async () =>  {
    let data = await service.getJsonFiles('jsonFile', 'test.json')
    should(data.status).be.exactly(200)
    should(data.data).be.an.instanceOf(Object).and.have.property('/').be.an.instanceOf(Array).lengthOf(1);
  });
});
