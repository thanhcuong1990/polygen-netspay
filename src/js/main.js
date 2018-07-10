var cards = new Vue({
  el: '#cards',
  data: {
    value: 'DEFAULT CARD'
  }
})

$(document).ready(function() {
  // iOS web app full screen hacks.
  if (window.navigator.standalone == true) {
    // make all link remain in web app mode.
    $('a').click(function() {
      window.location = $(this).attr('href');
      return false;
    });
  }
});

$('#button_scan').bind('click touchstart', function() {
  // window.alert('hello');
});


