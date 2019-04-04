requirejs.config({
    baseUrl: 'javascripts/app',
    paths: {
      jquery: 'https://code.jquery.com/jquery-3.3.1.min',
      popper: 'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min',
      bootstrap: 'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0/js/bootstrap.bundle.min',
      jsoneditor: '/javascripts/jsoneditor/dist/jsoneditor.min'
    },
    shim: {
      'bootstrap': ['jquery', 'popper']
    }
});
