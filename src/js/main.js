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
  $('#ocbc_card').animate({top:'17.5vh'});
  $('.background-fade').fadeIn(500);
  $('.transaction-details').animate({bottom:'0%'});
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

$('#display_amount').on('click touchstart', function() {
  $('#amount_input').focus();
});

$('#amount_input').on('keydown', function(event) {
  if (event.which ==  13) {
    document.activeElement.blur();
    $('#ocbc_card').animate({top:'13vh'});
    $('#cards').show();
    $('.background-fade').fadeOut(500);
    $('.transaction-details').animate({bottom:'-70%'});
  }
  // var key = event.which-48;
  setTimeout(() => {
    var number = $(this).val()/100;
    if (Math.log(number)/Math.LN10 >= 3) return;
    $('#display_amount').text('$' + number.toFixed(2));
  }, 100);
});