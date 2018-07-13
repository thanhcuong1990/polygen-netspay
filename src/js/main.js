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

$('.background-fade').hide();
// Instascan
let scanner = new Instascan.Scanner(
  { 
    continuous: true,
    video: document.getElementById('gum-local'),
    mirror: false,
    captureImage: false,
    backgroundScan: true,
    refractoryPeriod: 1000,
    scanPeriod: 1
  });
scanner.addListener('scan', function (content) {
  // window.alert(content);
  $('#page_camera').hide();
  $('#cards').hide();
  $('#page_wallet').show();
  $('.background-fade').fadeIn(500);
  $('.transaction-details').animate({bottom:'0%'});
  $('.body').animate({top: '10vh'});
  $('#amount_input').focus();
});
Instascan.Camera.getCameras().then(function (cameras) {
  if (cameras.length > 0) {
    scanner.start(cameras[1]);
  } else {
    window.alert('No camera found');
  }
}).catch(function (e) {
  window.alert(e);
});
