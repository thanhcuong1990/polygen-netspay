$('.animation-loader').hide();
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
  $('#page_wallet').show();
  $('.animation-loader').fadeIn(1000);

  setTimeout(() => {
    $('.animation-loader').fadeOut(800);
    $('#cards').hide();
    $('#ocbc_card').animate({top:'17.5vh'}, 100);
    $('.background-fade').fadeIn(1000);
    $('.transaction-details').animate({bottom:'0%'}, 100);
    $('#amount_input').focus();
  }, 2000);
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
    $('.background-fade').fadeOut(1000);
    $('.transaction-details').animate({bottom:'-70%'}, 100);
    $('.text-transaction').text('S$' + ($(this).val()/100).toFixed(2));
    $('.animation-loader').fadeIn(1000);

    setTimeout(() => {
      $('.animation-loader').fadeOut(800);
      $("#myModal").modal();
    }, 3000);
    return;
  }
  // var key = event.which-48;
  setTimeout(() => {
    var number = $(this).val()/100;
    if (Math.log(number)/Math.LN10 >= 3) return;
    $('#display_amount').text('$' + number.toFixed(2));
  }, 10);
});