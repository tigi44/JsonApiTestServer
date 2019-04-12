var fs      = require('fs');

module.exports = {
  uploadDirName: 'uploads',
  splitString  : '__',
  cardJson     : function (files, protocol, host) {
    let cardJson = {};
    for (let index in files) {
      let fileStat = fs.statSync(files[index]);
      let fileName = files[index];
      let filePath = fileName.split(this.splitString)[0];
          filePath = filePath.replace('uploads/', '');
      let fileUrl  = protocol + '://' + host + '/' + fileName;
      let fileImgHtml = '<ul class="image-flex">';
          fileImgHtml +='<li><img src="' + fileUrl + '" onerror="this.onerror=null;this.src=\'/logo_black_128.png\';" class="img-fileUpload"></li>';
          fileImgHtml +='<li>';
          fileImgHtml +='<ul>';
          fileImgHtml +='<li>File Size : ' + fileStat.size + ' Byte</li>';
          fileImgHtml +='<li>File Upload Date : ' + fileStat.birthtime.toString() + '</li>';
          fileImgHtml +='</ul></li></ul>';
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

    return cardJson;
  }
};
