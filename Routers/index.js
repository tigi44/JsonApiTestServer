const express     = require('express');
const router      = express.Router();
const Service     = require('../Class/ServiceLayer/JsonFileService')
const service     = new Service()

/* GET json path list */
router.get('/.json', async(req, res, next) => {
  var {data} = await service.getJsonFiles('./jsonFile')

  res.json(data);
});

/* GET home page. */
router.get('/', async(req, res, next) => {
  var search           = req.query.search;
  var contentType      = req.headers['content-type'];
  var rootJsonFilePath = './jsonFile'
  var {data}           = await service.getJsonFiles(rootJsonFilePath, search)

  if (contentType == 'application/json') {
    res.json(data);
  } else {
    res.render('index', {
      title             : 'JSON API TEST SERVER',
      hierarchyFiles    : data,
      search            : search
    });
  }
});

module.exports = router;
