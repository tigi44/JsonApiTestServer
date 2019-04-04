define(['jquery'], function($) {

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
    var $btnTooltip = $(this);

    toggleTooltip($btnTooltip)
  }

  function toggleTooltip($btnTooltip) {
    var $textareaTooltip = $btnTooltip.find("textarea.tooltiptext");
    var classTTVisible = "tooltiptext-visible";
    var classBtnDescOutline = "btn-outline-secondary";
    var classBtnDesc = "btn-secondary";
    var $materialIcon = $btnTooltip.find("i.material-icons");
    var textMaterialIconHelp = "help";
    var textMaterialIconCheck = "check_circle";


    if ($textareaTooltip.hasClass(classTTVisible)) {
      $textareaTooltip.removeClass(classTTVisible);
      $materialIcon.text(textMaterialIconCheck);
      $btnTooltip.removeClass(classBtnDescOutline);
      $btnTooltip.addClass(classBtnDesc);
    } else {
      $textareaTooltip.addClass(classTTVisible);
      $materialIcon.text(textMaterialIconHelp);
      $btnTooltip.addClass(classBtnDescOutline);
      $btnTooltip.removeClass(classBtnDesc);
    }
  }
});
