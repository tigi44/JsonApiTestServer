var express = require('express');
var router  = express.Router();
var ff      = require('../routes/findFile');

/* GET json path list */
router.get('/' + ff.extJson, function(req, res, next) {
  var files = ff.findFiles('./jsonFile');

  res.json(ff.hierarchyFiles(files));
});

/* GET home page. */
router.get('/', function(req, res, next) {
  var search = req.query.search;
  var contentType = req.headers['content-type'];
  var files = ff.findFiles('./jsonFile', search);

  if (contentType == 'application/json') {
    res.json(ff.hierarchyFiles(files));
  } else {
    res.render('index', {
      title             : 'JSON API TEST SERVER',
      hierarchyFiles    : ff.hierarchyFiles(files),
      search            : search
    });
  }
});

module.exports = router;
