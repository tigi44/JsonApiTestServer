var express = require('express');
var router  = express.Router();
var fs      = require('fs');
var path    = require('path');
var multer  = require('multer');
var ff      = require('../routes/findFile');
var apn     = require('../routes/apns');
var html    = require('../routes/html');
var fileUploadSplit = "__";
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, 'uploads/')
  }
  ,
  filename: function (req, file, callback) {
    let extension = path.extname(file.originalname);
    let basename = path.basename(file.originalname, extension);
    callback(null, basename + fileUploadSplit + Date.now() + extension);
  }
});
var upload = multer({ storage: storage });


var renderView = function(req, viewName) {
  var renderView = viewName;
  var viewVersionParam = req.query.view;

  if (viewVersionParam) {
    renderView = viewVersionParam + '/' +renderView;
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

router.get('/image', function(req, res, next) {
  let fileUploadDir = './uploads';

  if (!fs.existsSync(fileUploadDir)){
      fs.mkdirSync(fileUploadDir);
  }

  let files = ff.findAnyFile(fileUploadDir);

  // make a json for a card
  let cardJson = {};
  for (let index in files) {
    let fileStat = fs.statSync(files[index]);
    let fileName = files[index];
    let filePath = fileName.split(fileUploadSplit)[0];
        filePath = filePath.replace('uploads/', '');
    let fileUrl  = req.protocol + '://' + req.headers.host + '/' + fileName;
    let fileImgHtml = '<img class="img-fileUpload" src="' + fileUrl + '" /><div class="file-stat">File Size : ' + fileStat.size + ' Byte</div><div class="file-stat">File Upload Date : ' + fileStat.birthtime.toString() + '</div><br>';
    let fileJson = {
      "path" : filePath,
      "name" : fileImgHtml,
      "uri"  : fileUrl
    }

    if (!cardJson[filePath]) {
      cardJson[filePath] = {};
    }
    cardJson[filePath][fileName] = fileJson;
  }

  res.render('image', {
    title             : 'IMAGE UPLOAD SERVER',
    imageFiles        : files,
    cardHtml          : html.card(cardJson, false),
    headerMenu        : 4,
    darkmode          : darkmodeView(req)
  });
});
router.post('/image', upload.single('fileUpload'), function(req, res, next) {
  res.redirect(303, '/image');
});
router.delete('/image', function(req, res, next) {
  var json = req.body;

  if (!json.name) {
      res.status(422);
      res.json("A file name must be not empty");
      return;
  }

  try {
    let filePath = 'uploads/' + json.name;
    fs.unlinkSync(filePath);
  } catch (err) {
  }

  res.json("ok");
});

module.exports = router;
