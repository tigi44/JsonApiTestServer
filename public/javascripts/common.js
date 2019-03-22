window.onload = function() {
  document.getElementById("btn-close-json-edit").addEventListener('click', function() {
    document.getElementById("div-edit").style.display= "none";
  });

  addEventOnBtnShowDivEdit();
  addEventOnBtnCardHeader();
};
// window.addEventListener('DOMContentLoaded', function() {  });

function addEventOnBtnShowDivEdit() {
  var elsBtnShowDivEdit = document.getElementsByClassName("btn-show-div-edit");

  for(let i = 0; i < elsBtnShowDivEdit.length; i++) {
    elsBtnShowDivEdit[i].addEventListener("click", function() {
      document.getElementById("div-edit").style.display= "block";
    })
  }
}

function addEventOnBtnCardHeader() {
  var elsBtnCardHeader = document.getElementsByClassName("btn-card-header");
  var classShow = "collapse-button-show";
  var classHide = "collapse-button-hide";
  var textWillBeShow = "expand_more";
  var textWillBeHide = "expand_less"

  for(let i = 0; i < elsBtnCardHeader.length; i++) {
    elsBtnCardHeader[i].addEventListener("click", function(e) {
      var elSpan = e.target.querySelector("i.material-icons");
      if (elSpan.classList.contains(classShow)) {
        elSpan.classList.remove(classShow);
        elSpan.classList.add(classHide);
        elSpan.innerHTML = textWillBeShow;
      } else {
        elSpan.classList.remove(classHide);
        elSpan.classList.add(classShow);
        elSpan.innerHTML = textWillBeHide;
      }
    })
  }
}
