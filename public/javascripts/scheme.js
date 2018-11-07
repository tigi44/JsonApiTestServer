
function editButton(e, path, name, uri) {
  var target   = e.target;
  var $divEdit = $("#div-edit");
  var $inputPath = $divEdit.find("#path");
  var $inputName = $divEdit.find("#name");
  var $inputURI  = $divEdit.find("#uri");

  $inputPath.val(path);
  $inputName.val(name);
  $inputURI.val(uri);
}
