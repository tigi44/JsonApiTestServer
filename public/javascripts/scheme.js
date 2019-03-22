
$(document).ready(function() {
  adjustTooltip();
});

function adjustTooltip() {
  var $tooltips = $("textarea.tooltiptext");
  $tooltips.each(function(index, item){
     $(item).css('height', 'auto' );
     $(item).height( this.scrollHeight );
  });
}

function addButton(e, path) {
  var target   = e.target;
  var $divEdit = $("#div-edit");
  var $inputPath = $divEdit.find("#path");
  var $inputName = $divEdit.find("#name");
  var $inputURI  = $divEdit.find("#uri");
  var $inputDesc  = $divEdit.find("#desc");

  $inputPath.val(path);
  $inputName.val('');
  $inputURI.val('');
  $inputDesc.val('');
}

function tooltipButton(e) {
  var target = e.target;
  var $tooltipTextarea = $(target).next();
  var classTTVisible = "tooltiptext-visible";
  var textDefaultTooltip = "설명";
  var textFixTooltip = "설명 고정"; 

  if ($tooltipTextarea.hasClass(classTTVisible)) {
    $tooltipTextarea.removeClass(classTTVisible);
    $(target).text(textFixTooltip);
  } else {
    $tooltipTextarea.addClass(classTTVisible);
    $(target).text(textDefaultTooltip);
  }
}

function editButton(e) {
  var target   = e.target;
  var prevForm = $(target).prev("form");
  var $divEdit = $("#div-edit");
  var $inputPath = $divEdit.find("#path");
  var $inputName = $divEdit.find("#name");
  var $inputURI  = $divEdit.find("#uri");
  var $inputDesc  = $divEdit.find("#desc");

  $inputPath.val(prevForm.find("input[name=path]").val());
  $inputName.val(prevForm.find("input[name=name]").val());
  $inputURI.val(prevForm.find("input[name=uri]").val());
  $inputDesc.val(prevForm.find("textarea").text());
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
