var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('testWebView/1', { title: 'testWebView' });
});
router.get('/1', function(req, res, next) {
  res.render('testWebView/1', { title: 'testWebView' });
});
router.get('/2', function(req, res, next) {
  res.render('testWebView/2', { title: 'testWebView2' });
});
router.get('/3', function(req, res, next) {
  res.render('testWebView/3', { title: 'testWebView3' });
});
router.get('/4', function(req, res, next) {
  res.render('testWebView/4', { title: 'testWebView4' });
});

router.get('/list', function(req, res, next) {
  res.render('testWebView/list/index', { title: 'test list' });
});
router.get('/list/:id', function(req, res, next) {
  var reqPath = req.params.id;
  res.render('testWebView/list/' + reqPath, { title: 'test ' + reqPath });
});

module.exports = router;
