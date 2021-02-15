const express           = require('express');
const router            = express.Router();

const JsonFileService   = require('../Class/ServiceLayer/JsonFileService')
const jsonFileService   = new JsonFileService()

const rootJsonFilePath  = './jsonFile'

/* GET json path list */
router.get('/.json', function(req, res, next) {
  jsonFileService.getJsonFiles(rootJsonFilePath).then(responseData => res.json(responseData.data))
});

/* GET home page. */
router.get('/', function(req, res, next) {
  var search         = req.query.search;
  var contentType    = req.headers['content-type'];

  jsonFileService.getJsonFiles(rootJsonFilePath, search).then(responseData => {
    if (contentType == 'application/json') {
      res.json(responseData.data);
    } else {
      res.render('index', {
        title             : 'JSON API TEST SERVER',
        hierarchyFiles    : responseData.data,
        search            : search
      });
    }
  })
});

module.exports = router;
