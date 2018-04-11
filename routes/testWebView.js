var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('testWebView', { title: 'testWebView' });
});
router.get('/1', function(req, res, next) {
  res.render('testWebView', { title: 'testWebView' });
});
router.get('/2', function(req, res, next) {
  res.render('testWebView2', { title: 'testWebView2' });
});
router.get('/3', function(req, res, next) {
  res.render('testWebView3', { title: 'testWebView3' });
});
router.get('/4', function(req, res, next) {
  res.render('testWebView4', { title: 'testWebView4' });
});

module.exports = router;
