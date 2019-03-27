$(document).ready(function() {
  adjustTooltipHeight();
});

$(document).on('click', '.btn-tooltip', tooltipButton);

function adjustTooltipHeight() {
  var $tooltips = $("textarea.tooltiptext");
  $tooltips.each(function(index, item){
     $(item).css('height', 'auto' );
     $(item).height( this.scrollHeight );
  });
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
  var classBtnDescOutline = "btn-outline-secondary";
  var classBtnDesc = "btn-secondary";
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
