var express = require('express');
var router  = express.Router();
var fs      = require('fs');

/* GET scheme page. */
router.get('/', function(req, res, next) {
  res.render('scheme', {
    title       : 'PAYCO APP SCHEME URL'
  });
});

router.post('/', function(req, res, next) {
  fs.writeFileSync('./views/schemeList.ejs', req.body.schemeHtml, 'utf8');
  res.render('scheme', {
    title       : 'PAYCO APP SCHEME URL'
  });
});

module.exports = router;
