var express = require('express');
var router  = express.Router();
var fs      = require('fs');
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
    res.render('jsonapi', {
      title             : 'JSON API TEST SERVER',
      headerMenu        : 0,
      hierarchyFiles    : ff.hierarchyFiles(files),
      search            : search
    });
  }
});

router.get('/scheme', function(req, res, next) {
  var search = req.query.search;
  var filePath = "jsonScheme/scheme.json";

  res.render('scheme', {
    title             : 'WEB LINK TEST',
    scheme            : ff.getFileJson(filePath, search),
    headerMenu        : 1,
    search            : search
  });
});
router.post('/scheme', function(req, res, next) {
  var json = req.body;
  var filePath = "jsonScheme/scheme.json";
  var resultData = ff.getFileJson(filePath);

  if (json.path.length < 1 ||
      json.name.length < 1 ||
      json.uri.length < 1) {
      //throw new Error("All fields must be not empty");
      res.json("All fields must be not empty");
      return;
  }

  var pathList = resultData[json.path];
  if (!pathList) {
    pathList = {};
  }
  pathList[json.name] = json;
  resultData[json.path] = pathList;

  fs.writeFileSync(filePath, JSON.stringify(resultData), 'utf8');

  res.redirect(303, '/scheme');
});

router.get('/uriencodedecode', function(req, res, next) {
  res.render('uriencodedecode', {
    title             : 'URI ENCODE / DECODE',
    headerMenu        : 2
  });
});

router.get('/regex', function(req, res, next) {
  res.render('regex', {
    title             : 'REGULAR EXPRESSION',
    headerMenu        : 3
  });
});

module.exports = router;
