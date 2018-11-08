
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

function deleteButton(e) {
  e.preventDefault();
  var target = e.target;
  var $form = $(target).parents("form");
  var path = $form.find("input[name=path]").val();
  var name = $form.find("input[name=name]").val();

  if (confirm(path + "/" + name + " 항목을 삭제하시겠습니까?")) {
    $(target).parents("form").submit();
  }
}
