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

$('#page_camera').hide();
$('#button_scan').bind('click touchstart', function() {
    $('#page_camera').show();
    $('#page_wallet').hide();
});

$('#button_wallet').bind('click touchstart', function() {
  $('#page_camera').hide();
  $('#page_wallet').show();
});

var attachMobileSafariAddressBarHelpTip = function (target) {
  var $target = $(target);
  $target.tooltip({
      title: 'Scroll up to hide Safari address bar',
      trigger: 'manual',
      placement: 'bottom'
  });
  $(window).on('resize', function () {
      var bodyHeight = document.body.offsetHeight;
      var windowHeight = window.innerHeight;
      var isLandscape = Math.abs(window.orientation) === 90;
      var showTooltip = (windowHeight < bodyHeight);
      if(!isLandscape) return;
      $target.tooltip(showTooltip ? 'show' : 'hide');
  });
}
var ua = window.navigator.userAgent;
if(ua.indexOf('iPhone') !== -1 && ua.indexOf('Safari') !== -1) {
  attachMobileSafariAddressBarHelpTip('#main-nav');
}