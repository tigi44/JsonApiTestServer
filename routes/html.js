module.exports = {
  cardBody : function(name, uri, desc) {
    let cardHtml = '';
    cardHtml += '<tr><td>';
    cardHtml += '<div class="div-contents">';

    if (desc) {
      cardHtml += '<div class="tooltip-area">';
      cardHtml += '<button class="btn btn-outline-dark btn-sm"><span>설명&nbsp;</span><i class="material-icons mi-middle">help</i></button>';
      cardHtml += '<textarea class="tooltiptext tooltiptext-visible" readonly>' + name + ' : &#10;&#10;' + desc + '</textarea>';
      cardHtml += '</div>';
    }

    cardHtml += '<p>' + name + '</p>';
    cardHtml += '<a href="' + uri + '" target="_blank" class="a-text-align">' + uri + '</a>';
    cardHtml += '</div>';
    cardHtml += '<div class="btn-group float-right">';
    cardHtml += '<button class="btn btn-outline-info btn-sm float-right"><i class="material-icons mi-middle">create</i></button>';
    cardHtml += '<button class="btn btn-outline-danger btn-sm float-right"><i class="material-icons mi-middle">delete_forever</i></button>';
    cardHtml += '</div></td></tr>';
    return cardHtml;
  },
  cardDiv : function(pathKey, json, zindex, isFileJson) {
    let thisModule = this;
    let cardHtml = '';
    cardHtml += '<div class="card" style="z-index: ' + zindex + ';">';

      cardHtml += '<div class="card-header">';
      cardHtml += '<button class="btn btn-link btn-card-header" data-toggle="collapse" data-target="#' + pathKey + '" aria-expanded="false" aria-controls="collapseOne">';
      cardHtml += '<i class="collapse-button-show material-icons mi-large">expand_less</i>';
      cardHtml += pathKey;
      cardHtml += '</button>';
      cardHtml += '<button class="btn btn-outline-dark btn-sm"><i class="material-icons mi-middle">add</i></button>';
      cardHtml += '</div>';

      cardHtml += '<div id="' + pathKey + '" class="table-responsive collapse show">';
      cardHtml += '<table class="table table-striped table-sm card-body">';
      cardHtml += '<colgroup><col style="width:100%"></colgroup><thead></thead>';
      cardHtml += '<tbody>';

      if (isFileJson) {
        let files = json[pathKey];
        if (files.length > 0) {
          files.forEach(function(file) {
            cardHtml += thisModule.cardBody('', file, '');
          });
        }
      } else {
        let nameKeys = Object.keys(json[pathKey]);
        if (nameKeys.length > 0) {
          if (nameKeys.includes('token') && nameKeys.includes('notification')) {
            cardHtml += thisModule.cardBody('token : ' + json[pathKey].token, '', '');
          } else {
            nameKeys.forEach(function(nameKey) {
              cardHtml += thisModule.cardBody(json[pathKey][nameKey].name, json[pathKey][nameKey].uri, json[pathKey][nameKey].desc);
            });
          }
        }
      }

      cardHtml += '</tbody></table></div>';

    cardHtml += '</div>';

    return cardHtml;
  },
  card : function(json, isFileJson) {
    let thisModule = this;
    let cardHtml = '';

    cardHtml += '<div class="card-main-header">';
    cardHtml += '<button class="btn btn-outline-dark btn-sm float-right" data-toggle="modal" data-target="#myModal"><i class="material-icons mi-large">add</i></button>';
    cardHtml += '<div class="btn-group btn-group-toggle" data-toggle="buttons">';
    cardHtml += '<label class="btn btn-outline-secondary active"><input type="radio" name="radio-card" value="agenda" autocomplete="off" checked><i class="material-icons mi-large">view_agenda</i></label>';
    cardHtml += '<label class="btn btn-outline-secondary"><input type="radio" name="radio-card" value="headline" autocomplete="off" checked><i class="material-icons mi-large">view_headline</i></label>';
    cardHtml += '</div>';
    cardHtml += '</div>';

    let pathKeys = Object.keys(json);
    let pathKeysLength = pathKeys.length;

    if (pathKeysLength > 0) {
      let columnCount = 2;
      let rowCount = Math.ceil(pathKeysLength / columnCount);

      cardHtml += '<div class="row">';
        for(let i = 0; i < columnCount; i++) {
          cardHtml += '<div class="column">';
            for(let j = 0; j < rowCount; j++) {
              let pathIndex = i * Number(rowCount) + j;
              if (pathIndex < pathKeysLength) {
                let pathKey = pathKeys[pathIndex];

                cardHtml += thisModule.cardDiv(pathKey, json, pathKeysLength - pathIndex, isFileJson);
              }
            }
          cardHtml += '</div>';
        }
      cardHtml += '</div>';
    }

    return cardHtml;
  }
}
