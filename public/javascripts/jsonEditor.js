let container             = document.getElementById("jsoneditor");
let spanValidateResultEl  = document.getElementById('span_validate_result');
let jsonEditorMode        = ['code' /*, 'text'*/ , 'tree' /*, 'view'*/ /*, 'form'*/];
let options               = {
                              modes : jsonEditorMode,
                              onError : onError,
                              onModeChange : onModeChange
                            };
let editor               = new JSONEditor(container, options);

insertValidateHTML();

function insertValidateHTML() {
  var spanValidate = '<div style="margin-top: 10px;"><button onclick="validateJsonButton(event);" class="btn btn-success float-right">VALIDATE</button><span id="span_validate_result"></span></div>';
  container.insertAdjacentHTML('afterend',spanValidate);
  spanValidateResultEl  = document.getElementById('span_validate_result');
}

function onError(error) {
  _errorValidateResult(error);
}

function onModeChange(newMode, oldMode) {
  jsonEditorExpandAll(newMode);
}

function jsonEditorExpandAll(mode) {
  if (mode == 'tree')
    editor.expandAll();
}

function validateJsonButton(e) {
  try {
    var json             = editor.get();
    var prettyJsonString = JSON.stringify(json, undefined, 4);

    editor.set(JSON.parse(prettyJsonString));
    jsonEditorExpandAll(editor.getMode());
    successValidateResult();
  } catch(error) {
    _errorValidateResult(error);
  }
}

function successValidateResult() {
  spanValidateResultEl.style.color   = '#0a5';
  spanValidateResultEl.innerHTML     = 'Success Validation!';
}

// public

function _errorValidateResult(validateResult) {
  spanValidateResultEl.style.color   = '#f00';
  spanValidateResultEl.innerHTML     = validateResult;
}

function _getEditorText() {
  return editor.getText();
}
function _getEditorJson() {
  return editor.get();
}

function _setEditorJson(text) {
  editor.set(text);
  jsonEditorExpandAll(editor.getMode());
  _errorValidateResult('');
}
