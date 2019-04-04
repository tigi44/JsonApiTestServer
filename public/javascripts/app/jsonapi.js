define(['jquery', 'module/request', 'module/jsonEditor'], function($, REQUEST, JSONEDITOR) {

  $(document).on('click', '.btn-modal-save', saveButton);
  $(document).on('click', '.btn-card-add', addButton);
  $(document).on('click', '.btn-card-edit', editButton);
  $(document).on('click', '.btn-card-delete', deleteButton);

  let _jsonEditor = new JSONEDITOR();
  let $jsonUrlModal = $("#input_json_url");

  function saveButton(e) {
    var $inputTag  = $("#input_json_url");
    var requestUrl  = $inputTag.val();
    var jsonString  = _jsonEditor.getEditorText();
    // console.log(requestUrl);

    if (requestUrl) {
      REQUEST(requestUrl, "PUT", jsonString,
      function(data) {
        location.reload();
      },
      function(error) {
        _jsonEditor.errorValidateResult(error);
      });
    } else {
      alert('URL은 필수값입니다.');
    }
  }

  function addButton(e) {
    var requestUrl  = $(this).attr("data-key");

    $jsonUrlModal.val(requestUrl);
    _jsonEditor.setEditorJson({});
  }

  function editButton(e) {
    var $aTag      = $(this).parents("td").find("a");
    var requestUrl  = $aTag.text();

    REQUEST(requestUrl, "GET", null, function(jsonString) {
      var json = JSON.parse(jsonString);

      $jsonUrlModal.val(requestUrl);
      _jsonEditor.setEditorJson(json);
    });
  }

  function deleteButton(e) {
    var $aTag      = $(this).parents("td").find("a");
    var requestUrl  = $aTag.text();

    if (confirm(requestUrl + " 항목을 삭제하시겠습니까?")) {
      REQUEST(requestUrl, "DELETE", null, function(data) {
        location.reload();
      });
    }
  }

  return function() {
    this.jsonEditor = _jsonEditor;
  };
});
