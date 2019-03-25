
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

  hideAllTooltip();
}

function tooltipButton(e) {
  var target = e.target;
  var $divTooltipArea = $(target).parents("div.tooltip-area");

  toggleTooltip($divTooltipArea)
}

function toggleTooltip($divTooltipArea, hastohide) {
  var $buttonTooltip = $divTooltipArea.find("button.btn-tooltip");
  var $textareaTooltip = $divTooltipArea.find("textarea.tooltiptext");
  var classTTVisible = "tooltiptext-visible";
  var classBtnDescOutline = "btn-outline-dark";
  var classBtnDesc = "btn-dark";
  var $materialIcon = $buttonTooltip.find("i.material-icons");
  var textMaterialIconHelp = "help";
  var textMaterialIconCheck = "check_circle";


  if ($textareaTooltip.hasClass(classTTVisible) && !hastohide) {
    $textareaTooltip.removeClass(classTTVisible);
    $materialIcon.text(textMaterialIconCheck);
    $buttonTooltip.removeClass(classBtnDescOutline);
    $buttonTooltip.addClass(classBtnDesc);
  } else {
    $textareaTooltip.addClass(classTTVisible);
    $materialIcon.text(textMaterialIconHelp);
    $buttonTooltip.addClass(classBtnDescOutline);
    $buttonTooltip.removeClass(classBtnDesc);
  }
}

function hideAllTooltip() {
  var $divTooltipList = $("div.tooltip-area");

  $divTooltipList.each(function(index, div) {
    toggleTooltip($(div), true);
  });
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

  hideAllTooltip();
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
