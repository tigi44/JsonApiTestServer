var express = require('express');
var router  = express.Router();
var fs      = require('fs');
var ff      = require('../routes/findFile');
var apn     = require('../routes/apns');
var html    = require('../routes/html');

var renderView = function(req, viewName) {
  var renderView = viewName;
  var viewVersionParam = req.query.view;

  if (viewVersionParam !== 'new') {
    renderView += '_old';
  }

  return renderView;
};

var darkmodeView = function(req) {
  let darkmodeCookie = req.cookies.darkmode;

  return darkmodeCookie;
}

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
    res.render(renderView(req, 'jsonapi'), {
      title             : 'JSON API TEST SERVER',
      headerMenu        : 0,
      hierarchyFiles    : ff.hierarchyFiles(files),
      cardHtml          : html.card(ff.hierarchyFiles(files), true),
      search            : search,
      darkmode          : darkmodeView(req)
    });
  }
});

router.get('/scheme', function(req, res, next) {
  var search = req.query.search;
  var filePath = "jsonScheme/scheme.json";

  res.render(renderView(req, 'scheme'), {
    title             : 'SCHEME TEST',
    scheme            : ff.getFileJson(filePath, search),
    cardHtml          : html.card(ff.getFileJson(filePath, search), false),
    headerMenu        : 1,
    search            : search,
    darkmode          : darkmodeView(req)
  });
});
router.post('/scheme', function(req, res, next) {
  var json = req.body;
  var filePath = "jsonScheme/scheme.json";
  var resultData = ff.getFileJson(filePath);

  if (json.path.length < 1 ||
      json.name.length < 1 ||
      json.uri.length < 1) {
      res.status(422);
      res.json("All fields must be not empty");
      return;
  }

  var pathList = resultData[json.path];
  if (!pathList) {
    pathList = {};
  }
  if (json.delete) {
    pathList[json.name] = undefined;
  } else {
    pathList[json.name] = json;
  }
  resultData[json.path] = pathList;

  fs.writeFileSync(filePath, JSON.stringify(resultData), 'utf8');

  res.redirect(303, '/scheme');
});
router.post('/schemePost', function(req, res, next) {
  console.log(req.body);
  var json = req.body;
  var filePath = "jsonScheme/scheme.json";
  var resultData = ff.getFileJson(filePath);

  if (!json.path ||
      !json.name ||
      !json.uri) {
      res.status(422);
      res.json("분류, 명칭, URI는 모두 필수값입니다.");
      return;
  }

  var pathList = resultData[json.path];
  if (!pathList) {
    pathList = {};
  }
  pathList[json.name] = json;
  resultData[json.path] = pathList;

  fs.writeFileSync(filePath, JSON.stringify(resultData), 'utf8');

  res.json("ok");
});
router.delete('/scheme', function(req, res, next) {
  var json = req.body;
  var filePath = "jsonScheme/scheme.json";
  var resultData = ff.getFileJson(filePath);
  var apnsJson = {};

  if (!json.path ||
      !json.name) {
      res.status(422);
      res.json("A path and a name must be not empty");
      return;
  }

  var pathList = resultData[json.path];
  if (!pathList) {
    pathList = {};
  }
  delete pathList[json.name];
  resultData[json.path] = pathList;

  fs.writeFileSync(filePath, JSON.stringify(resultData), 'utf8');

  res.json("ok");
});

router.get('/apns', function(req, res, next) {
  var search = req.query.search;
  var path   = req.query.path;
  var filePath = "jsonApns/apns.json";

  if (path) {
    var resultData = ff.getFileJson(filePath);
    res.json(resultData[path]);
  } else {
    res.render(renderView(req, 'apns'), {
      title             : 'APNS TEST',
      apns              : ff.getFileJson(filePath, search),
      cardHtml          : html.card(ff.getFileJson(filePath, search), false),
      headerMenu        : 2,
      search            : search,
      darkmode          : darkmodeView(req)
    });
  }
});
router.post('/apns', function(req, res, next) {
  var json = req.body;
  var filePath = "jsonApns/apns.json";
  var resultData = ff.getFileJson(filePath);
  var apnsJson = {};

  if (!json.path ||
      !json.token) {
      res.status(422);
      res.json("A path and token must be not empty");
      return;
  }

  apnsJson = {
    path : json.path,
    token : json.token,
    production : json.production,
    notification : json.notification
  };

  resultData[json.path] = apnsJson;

  fs.writeFileSync(filePath, JSON.stringify(resultData), 'utf8');

  res.json("ok");
});
router.delete('/apns', function(req, res, next) {
  var json = req.body;
  var filePath = "jsonApns/apns.json";
  var resultData = ff.getFileJson(filePath);
  var apnsJson = {};

  if (!json.path) {
      res.status(422);
      res.json("A path must be not empty");
      return;
  }

  delete resultData[json.path];

  fs.writeFileSync(filePath, JSON.stringify(resultData), 'utf8');

  res.json("ok");
});
router.post('/apns/sendpush', function(req, res, next) {
  var json = req.body;

  if (json.token) {
    apn.push(json.production, json.token, json.notification, function(errorMessage){
      if (errorMessage) {
        res.status(205);
        res.json(errorMessage);
      } else {
        res.json("푸쉬 전송 완료!!");
      }
    });
  } else {
    res.json("토큰값은 필수입니다.");
  }
});

router.get('/uriencodedecode', function(req, res, next) {
  res.render(renderView(req, 'uriencodedecode'), {
    title             : 'URI ENCODE / DECODE',
    headerMenu        : 3,
    darkmode          : darkmodeView(req)
  });
});

router.get('/regex', function(req, res, next) {
  res.render('regex', {
    title             : 'REGULAR EXPRESSION',
    headerMenu        : 4,
    darkmode          : darkmodeView(req)
  });
});

module.exports = router;
