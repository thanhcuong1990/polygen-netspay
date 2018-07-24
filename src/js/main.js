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

$('#page_camera').hide();
$('#button_scan').bind('click touchstart', function() {
    $('#page_camera').show();
    $('#page_wallet').hide();
});

$('#button_wallet').bind('click touchstart', function() {
  $('#page_camera').hide();
  $('#page_wallet').show();
});

$('#button_wallet').bind('click touchstart', function() {
  $('#page_camera').hide();
  $('#page_wallet').show();
});

$('#button_settings').on('click touchstart', function() {
  var QRdata = 'NETSqpay0050123456789311220880011111350361000106tester02083503610303080000120007083503610314480280D8DF7A3C87D35C6A8C8EECDDB9E96661707DA425DC2C179606419357';
  var app2app = `netspay://payment/QRCode?qrdata=${QRdata}&source={bundle_id}&urlscheme={merchant_url_scheme}`;
  location.href = app2app;
});

$('#amount_input').on('keydown', function(event) {
  if (event.which ==  13) {
    var transaction_amount = $(this).val();
    if (transaction_amount >= 300) transaction_amount -= 50;
    $('.text-transaction').text('S$' + (transaction_amount/100).toFixed(2));
    $('.animation-loader').fadeIn(1000);
    $(this).blur();
    
    setTimeout(() => {
      $('.animation-loader').fadeOut(800);
      $("#myModal").modal();

      document.activeElement.blur();
    }, 3000);
    return;
  }
  // var key = event.which-48;
  setTimeout(() => {
    //take user input and convert it into 2 decimal points currency
    var userInput = $(this).val();
    //limit to DECIMAL(5, 2);
    if (Math.log(userInput/100)/Math.LN10 >= 3) {
      $(this).val(userInput/10);
      return;
    }  
    //display discount if there is discount
    if (userInput >= 300) var discount = $(this).val() - 50;
    if (discount == null) $('#discount_field').text('');
    else $('#discount_field').text(`Discount $0.50: $${(discount/100).toFixed(2)}`);
    //keep the userinput in 2 decimal points
    $('#display_amount').text('$' + (userInput/100).toFixed(2));
  }, 10);
});

$(document).ready(function(){
  var _originalSize = $(window).width() + $(window).height()
  $(window).resize(function(){
    if($(window).width() + $(window).height() == _originalSize){
      $('#ocbc_card').animate({top:'13vh'});
      $('#cards').show();
      $('.background-fade').fadeOut(1000);
      $('.transaction-details').animate({bottom:'-70%'}, 100);
    }
  });
});
