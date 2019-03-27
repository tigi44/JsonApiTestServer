// window.addEventListener('DOMContentLoaded', function() {  });
window.onload = function() {
  addEventOnBtnCardHeader();
  addEventOnRadioCardAgenda();
};

function addEventOnBtnCardHeader() {
  var elsBtnCardHeader = document.getElementsByClassName("btn-card-header");
  var classShow = "collapse-button-show";
  var classHide = "collapse-button-hide";
  var textWillBeShow = "expand_more";
  var textWillBeHide = "expand_less"

  for(let i = 0; i < elsBtnCardHeader.length; i++) {
    elsBtnCardHeader[i].addEventListener("click", function(e) {
      var elIcons = e.target.querySelector("i.material-icons");
      if (elIcons.classList.contains(classShow)) {
        elIcons.classList.remove(classShow);
        elIcons.classList.add(classHide);
        elIcons.innerHTML = textWillBeShow;
      } else {
        elIcons.classList.remove(classHide);
        elIcons.classList.add(classShow);
        elIcons.innerHTML = textWillBeHide;
      }
    })
  }
}

function addEventOnRadioCardAgenda() {
  $(document).on('change', 'input:radio[name=radio-card]', function (e) {
    var $btnCardHeader = $('.btn-card-header');

    if ($(e.target).val() === 'agenda') {
      $btnCardHeader.each(function(index, target) {
        var $target = $(target);
        if ($target.hasClass('collapsed')) {
         $target.click();
        }
      });
    } else {
      $btnCardHeader.each(function(index, target) {
        var $target = $(target);
        if (!$target.hasClass('collapsed')) {
         $target.click();
        }
      });
    }
  });
}