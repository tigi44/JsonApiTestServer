function requestXhttp(url, method, data, successCallback, errorCallback) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      if (successCallback) {
        successCallback(this.responseText);
      }
    } else if (this.readyState == 4 && this.status != 200) {
      if (errorCallback) {
        errorCallback(!this.responseText ? 'SERVER ERROR' : this.responseText);
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
