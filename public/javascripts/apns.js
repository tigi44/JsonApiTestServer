$(document).on('click', '.btn-modal-save', saveButton);
$(document).on('click', '.btn-modal-sendpush', sendpushButton);
$(document).on('click', '.btn-card-add', addButton);
$(document).on('click', '.btn-card-edit', editButton);
$(document).on('click', '.btn-card-delete', deleteButton);

function saveButton(e) {
  let $modal = $("#myModal");
  var path = $modal.find("[name=path]").val();
  var token = $modal.find("[name=token]").val();
  var production = $modal.find("[name=production]:checked").val();

  try {
    var notification = _getEditorJson();
    var json = {
      path : path,
      token : token,
      production : Number(production),
      notification : notification
    };

    requestXhttp("/apns", "POST", JSON.stringify(json),
    function(data) {
      location.reload();
    },
    function(error) {
      alert(error);
    });
  } catch (error) {
    _errorValidateResult(error);
  }
}

function sendpushButton(e) {
  let $modal = $("#myModal");
  var path = $modal.find("[name=path]").val();
  var token = $modal.find("[name=token]").val();
  var production = $modal.find("[name=production]:checked").val();
  var notification = _getEditorJson();

  var json = {
    path : path,
    token : token,
    production : Number(production),
    notification : notification
  };

  requestXhttp("/apns/sendpush", "POST", JSON.stringify(json),
  function(data) {
    alert(data);
  },
  function(error) {
    alert(error);
  });
}

function addButton(e) {
  var path  = $(this).attr("data-key");
  let $modal = $("#myModal");
  $modal.find("[name=path]").val(path);
  $modal.find("[name=token]").val('');
  $modal.find("[name=production]").eq(0).prop('checked', true);
  _setEditorJson({});
}

function editButton(e) {
  var path = $(this).attr("data-key");
  let $modal = $("#myModal");

  requestXhttp("/apns?path=" + path, "GET", null, function(jsonString) {
    var json = JSON.parse(jsonString);

    $modal.find("[name=path]").val(path);
    $modal.find("[name=token]").val(json.token);
    $modal.find("input[name=production]").eq(json.production).prop("checked", true);
    try {
      _setEditorJson(json.notification);
    } catch(e) {
      _setEditorJson({});
    }
  });
}

function deleteButton(e) {
  var path = $(this).attr("data-key");

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
