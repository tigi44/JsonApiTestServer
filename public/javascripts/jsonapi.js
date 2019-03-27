
$(document).on('click', '.btn-modal-save', saveJsonButton);
$(document).on('click', '.btn-card-add', addJsonButton);
$(document).on('click', '.btn-card-edit', editJsonButton);
$(document).on('click', '.btn-card-delete', deleteJsonButton);

let $jsonUrlModal = $("#input_json_url");

function saveJsonButton(e) {
  var $inputTag  = $("#input_json_url");
  var requestUrl  = $inputTag.val();
  var jsonString  = _getEditorText();
  // console.log(requestUrl);

  requestXhttp(requestUrl, "PUT", jsonString,
  function(data) {
    location.reload();
  },
  function(error) {
    _errorValidateResult(error);
  });
}

function addJsonButton(e) {
  var requestUrl  = "/" + $(this).attr("data-url") + "/";

  $jsonUrlModal.val(requestUrl);
  _setEditorText({});
}

function editJsonButton(e) {
  var $aTag      = $(this).parents("td").find("a");
  var requestUrl  = $aTag.text();

  requestXhttp(requestUrl, "GET", null, function(jsonString) {
    var json = JSON.parse(jsonString);

    $jsonUrlModal.val(requestUrl);
    _setEditorText(json);
  });
}

function deleteJsonButton(e) {
  var $aTag      = $(this).parents("td").find("a");
  var requestUrl  = $aTag.text();

  if (confirm(requestUrl + " 항목을 삭제하시겠습니까?")) {
    requestXhttp(requestUrl, "DELETE", null, function(data) {
      location.reload();
    });
  }
}
