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
