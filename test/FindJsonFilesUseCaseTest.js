const should              = require('should')
const RepositoryInterface = require('../Class/DomainLayer/JsonFileRepositoryInterface')
const UseCase             = require('../Class/DomainLayer/FindJsonFilesUseCase')

class MockRepository extends RepositoryInterface {
  findJsonFiles(searchPath, searchFileName) {
    return Promise.resolve(['/test.json', '/test/test.json'])
  }
}

describe('** FindJsonFilesUseCase Class test **', function () {

  let useCase

  before(function(){
    useCase = new UseCase(new MockRepository())
  })

  it('Test findJsonFiles', async () => {
    await useCase.execute().then((data) => {
      data.should.be.an.instanceOf(Object).and.have.property('/').be.an.instanceOf(Array).lengthOf(1);
    })
  });
});
