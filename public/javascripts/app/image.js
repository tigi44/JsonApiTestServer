define(['jquery', 'module/request'], function($, REQUEST) {

  $(document).on('click', '.btn-card-delete', deleteButton);
  $(document).on('change', '.custom-file-input', fileUpload);

  function fileUpload(e) {
    var fileName = $(this).val().split("\\").pop();
    $(this).siblings(".file-upload-label").addClass("selected").html(fileName);
  }

  function deleteButton(e) {
    let $form = $("#myModal").find('form');
    let $divContents = $(this).parents("td").find("div.div-contents");
    let name = $divContents.find("img").attr("src");
        name = name.split("uploads/")[1];
    let deleteData = {
      name : name
    };

    if (confirm("\"" + name + "\" 항목을 삭제하시겠습니까?")) {
      REQUEST("/image", "DELETE", JSON.stringify(deleteData), function(data) {
        location.reload();
      });
    }
  }

  return function() {
  }

});
