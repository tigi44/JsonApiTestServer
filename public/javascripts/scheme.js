
$(document).on('click', '.btn-modal-save', saveButton);
$(document).on('click', '.btn-card-add', addButton);
$(document).on('click', '.btn-card-edit', editButton);
$(document).on('click', '.btn-card-delete', deleteButton);

function saveButton(e) {
  let $form = $("#myModal").find('form');
  let $inputPath = $form.find("[name=path]");
  let $inputName = $form.find("[name=name]");
  let $inputURI  = $form.find("[name=uri]");
  let $inputDesc  = $form.find("[name=desc]");
  let postData = {
    path : $inputPath.val(),
    name : $inputName.val(),
    uri : $inputURI.val(),
    desc : $inputDesc.val()
  };

  requestXhttp("/schemePost", "POST", JSON.stringify(postData), function(data) {
    location.reload();
  });
}

function addButton(e) {
  let $form = $("#myModal").find('form');
  let $inputPath = $form.find("[name=path]");
  let $inputName = $form.find("[name=name]");
  let $inputURI  = $form.find("[name=uri]");
  let $inputDesc  = $form.find("[name=desc]");

  let path = $(this).attr("data-key");

  $inputPath.val(path);
  $inputName.val('');
  $inputURI.val('');
  $inputDesc.val('');
}

function editButton(e) {
  let $form = $("#myModal").find('form');
  let $inputPath = $form.find("[name=path]");
  let $inputName = $form.find("[name=name]");
  let $inputURI  = $form.find("[name=uri]");
  let $inputDesc  = $form.find("[name=desc]");

  let $divContents = $(this).parents("td").find("div.div-contents");
  let path = $(this).attr("data-key");
  let name = $divContents.find("p").text();
  let uri  = $divContents.find("a").text();
  let desc = $divContents.find(".tooltip-area>textarea").text();

  $inputPath.val(path);
  $inputName.val(name);
  $inputURI.val(uri);
  $inputDesc.val(desc);
}

function deleteButton(e) {
  let $form = $("#myModal").find('form');
  let $divContents = $(this).parents("td").find("div.div-contents");
  let path = $(this).attr("data-key");
  let name = $divContents.find("p").text();
  let deleteData = {
    path : path,
    name : name
  };

  if (confirm("\"" + path + " / " + name + "\" 항목을 삭제하시겠습니까?")) {
    requestXhttp("/scheme", "DELETE", JSON.stringify(deleteData), function(data) {
      location.reload();
    });
  }
}
