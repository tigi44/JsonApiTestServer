function editButton(e) {
  var target   = e.target;
  var $form    = $(target).prev();
  var $divEdit = $("#div-edit2");
  var path     = $form.find("[name=path]").val();

  requestXhttp("/apns?path=" + path, "GET", null, function(jsonString) {
    var json = JSON.parse(jsonString);

    $divEdit.find("#path").val(path);
    $divEdit.find("#token").val(json.token);
    editor.set(json.aps);
    jsonEditorExpandAll(editor.getMode());
  });
}

function saveButton(e) {
  e.preventDefault();
  var target = e.target;
  var $form = $(target).parents("form");
  var path = $form.find("[name=path]").val();
  var token = $form.find("[name=token]").val();

  try {
    var aps = editor.get();
    var json = {
      path : path,
      token : token,
      aps : aps
    };

    requestXhttp("/apns", "POST", JSON.stringify(json),
    function(data) {
      location.reload();
    },
    function(error) {
      alert(error);
    });

    successValidateResult();
  } catch (error) {
    errorValidateResult(error);
  }
}

function deleteButton(e) {
  e.preventDefault();
  var target = e.target;
  var $form = $(target).parents("form");
  var path = $form.find("input[name=path]").val();

  if (confirm(path + " 항목을 삭제하시겠습니까?")) {
    var json = {
      path : path
    }
    requestXhttp("/apns", "DELETE", JSON.stringify(json),
    function(data) {
      location.reload();
    },
    function(error) {
      alert(error);
    });
  }
}

function sendPush(e) {
  var target   = e.target;
  var $form    = $(target).parents();
  var path = $form.find("[name=path]").val();
  var token = $form.find("[name=token]").val();

  try {
    var aps = editor.get();
    var json = {
      path : path,
      token : token,
      aps : aps
    };

    requestXhttp("/apns/sendpush", "POST", JSON.stringify(json),
    function(data) {
      alert(data);
    },
    function(error) {
      alert(error);
    });

    successValidateResult();
  } catch (error) {
    errorValidateResult(error);
  }
}
