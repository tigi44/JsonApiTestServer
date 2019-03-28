
$(document).on('click', '.btn-modal-save', saveButton);
$(document).on('click', '.btn-card-add', addButton);
$(document).on('click', '.btn-card-edit', editButton);
$(document).on('click', '.btn-card-delete', deleteButton);

let $jsonUrlModal = $("#input_json_url");

function saveButton(e) {
  var $inputTag  = $("#input_json_url");
  var requestUrl  = $inputTag.val();
  var jsonString  = _getEditorText();
  // console.log(requestUrl);

  if (requestUrl) {
    requestXhttp(requestUrl, "PUT", jsonString,
    function(data) {
      location.reload();
    },
    function(error) {
      _errorValidateResult(error);
    });
  } else {
    alert('URL은 필수값입니다.');
  }
}

function addButton(e) {
  var requestUrl  = $(this).attr("data-key");

  $jsonUrlModal.val(requestUrl);
  _setEditorJson({});
}

function editButton(e) {
  var $aTag      = $(this).parents("td").find("a");
  var requestUrl  = $aTag.text();

  requestXhttp(requestUrl, "GET", null, function(jsonString) {
    var json = JSON.parse(jsonString);

    $jsonUrlModal.val(requestUrl);
    _setEditorJson(json);
  });
}

function deleteButton(e) {
  var $aTag      = $(this).parents("td").find("a");
  var requestUrl  = $aTag.text();

  if (confirm(requestUrl + " 항목을 삭제하시겠습니까?")) {
    requestXhttp(requestUrl, "DELETE", null, function(data) {
      location.reload();
    });
  }
}
