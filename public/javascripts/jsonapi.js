var _spanValidateResultEl = document.getElementById('span_validate_result');
var _inputJsonUrlEl       = document.getElementById('input_json_url');
var jsonEditorMode        = ['code' /*, 'text'*/ , 'tree' /*, 'view'*/ /*, 'form'*/];
var container             = document.getElementById("jsoneditor");
var options               = {
                              modes : jsonEditorMode,
                              onError : onError,
                              onModeChange : onModeChange
                            };
var editor                = new JSONEditor(container, options);

function onError(error) {
  errorValidateResult(error);
}

function onModeChange(newMode, oldMode) {
  jsonEditorExpandAll(newMode);
}

function jsonEditorExpandAll(mode) {
  if (mode == 'tree')
    editor.expandAll();
}

function showJsonButton(e) {
  var target      = e.target;
  var $aTag      = $(target).parents("tr").find("a");
  var requestUrl  = $aTag.text();
  //console.log(requestUrl);

  requestXhttp(requestUrl, "GET", null, function(jsonString) {
    var json = JSON.parse(jsonString);

    _inputJsonUrlEl.value = requestUrl;
    editor.set(json);
    jsonEditorExpandAll(editor.getMode());
  });
}

function deleteJsonButton(e) {
  var target      = e.target;
  var $aTag      = $(target).parents("tr").find("a");
  var requestUrl  = $aTag.text();
  //console.log(requestUrl);

  if (confirm(requestUrl + " 항목을 삭제하시겠습니까?")) {
    requestXhttp(requestUrl, "DELETE", null, function(data) {
      location.reload();
    });
  }
}

function addJsonButton(e) {
  var target      = e.target;
  var $inputTag  = $("#input_json_url");
  var requestUrl  = $inputTag.val();
  var jsonString  = editor.getText();
  // console.log(requestUrl);

  requestXhttp(requestUrl, "PUT", jsonString,
  function(data) {
    location.reload();
  },
  function(error) {
    errorValidateResult(error);
  });
}

function validateJsonButton(e) {
  try {
    var json             = editor.get();
    var prettyJsonString = JSON.stringify(json, undefined, 4);

    editor.set(JSON.parse(prettyJsonString));
    jsonEditorExpandAll(editor.getMode());
    successValidateResult();
  } catch(error) {
    errorValidateResult(error);
  }
}

function successValidateResult() {
  _spanValidateResultEl.style.color   = '#0a5';
  _spanValidateResultEl.innerHTML     = 'Success Validation!';
}
function errorValidateResult(validateResult) {
  _spanValidateResultEl.style.color   = '#f00';
  _spanValidateResultEl.innerHTML     = validateResult;
}

function requestXhttp(url, method, data, successCallback, errorCallback) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      if (successCallback) {
        successCallback(this.responseText);
      }
    } else if (this.readyState == 4 && this.status != 200) {
      if (errorCallback) {
        errorCallback(this.responseText);
      } else {
        // console.log(this);
        alert("Server Error : " + this.responseText);
      }
    }
  };
  xhttp.open(method, url, true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(data);
}
