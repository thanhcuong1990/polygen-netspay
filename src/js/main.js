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

$('#page_wallet').hide();
// $('#page_camera').hide();
// $('#button_scan').bind('click touchstart', function() {
//     $('#page_camera').show();
//     $('#page_wallet').hide();
// });

// $('#button_wallet').bind('click touchstart', function() {
//   $('#page_camera').hide();
//   $('#page_wallet').show();
// });

