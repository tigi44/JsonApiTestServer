function editButton(e) {
  var target   = e.target;
  var $form    = $(target).prev();
  var $divEdit = $("#div-edit2");

  $divEdit.find("#path").val($form.find("[name=path]").val());
  $divEdit.find("#token").val($form.find("[name=token]").val());
  $divEdit.find("#title").val($form.find("[name=title]").val());
  $divEdit.find("#body").val($form.find("[name=body]").val());
  $divEdit.find("#sound").val($form.find("[name=sound]").val());
  $divEdit.find("#badge").val($form.find("[name=badge]").val());
}

function deleteButton(e) {
  e.preventDefault();
  var target = e.target;
  var $form = $(target).parents("form");
  var path = $form.find("input[name=path]").val();

  if (confirm(path + " 항목을 삭제하시겠습니까?")) {
    $(target).parents("form").submit();
  }
}

function sendPush(e) {
  var target   = e.target;
  var $form    = $(target).parents();
  var jsonString = JSON.stringify(getFormData($form));

  requestXhttp("/apns/sendpush", "POST", jsonString,
  function(data) {
    alert(data);
  },
  function(error) {
    alert(error);
  });
}

function getFormData($form){
    var unindexed_array = $form.serializeArray();
    var indexed_array = {};

    $.map(unindexed_array, function(n, i){
        indexed_array[n['name']] = n['value'];
    });

    return indexed_array;
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
