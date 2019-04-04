define(['jquery'], function($) {

  $(document).on('click', '#encode_uri', encodeUri);
  $(document).on('click', '#decode_uri', decodeUri);

  var $textarea = $("#textarea_uri");

  function encodeUri(e) {
    var url = $textarea.val();
    var encodedUrl = encodeURIComponent(url);
    $textarea.val(encodedUrl);
    return false;
  }

  function decodeUri(e) {
    var url = $textarea.val();
    var decodedUrl = decodeURIComponent(url);
    $textarea.val(decodedUrl);
    return false;
  }

  return function() {
  };

});
