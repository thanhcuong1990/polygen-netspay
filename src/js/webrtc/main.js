'use strict';
// Put variables in global scope to make them available to the browser console.
const constraints = window.constraints = {
  audio: false,
  video: { 
    facingMode: { 
      exact: "environment" 
    } 
  }
};
// WebRTC
function handleSuccess(stream) {
  const video = document.querySelector('video');
  const videoTracks = stream.getVideoTracks();
  console.log('Got stream with constraints:', constraints);
  console.log(`Using video device: ${videoTracks[0].label}`);
  window.stream = stream; // make variable available to browser console
  video.srcObject = stream;
}

function handleError(error) {
  if (error.name === 'ConstraintNotSatisfiedError') {
    let v = constraints.video;
    errorMsg(`The resolution ${v.width.exact}x${v.height.exact} px is not supported by your device.`);
  } else if (error.name === 'PermissionDeniedError') {
    errorMsg('Permissions have not been granted to use your camera and ' +
      'microphone, you need to allow the page access to your devices in ' +
      'order for the demo to work.');
  }
  errorMsg(`getUserMedia error: ${error.name}`, error);
}

function errorMsg(msg, error) {
  const errorElement = document.querySelector('#errorMsg');
  errorElement.innerHTML += `<p>${msg}</p>`;
  if (typeof error !== 'undefined') {
    console.error(error);
  }
}

navigator.mediaDevices
  .getUserMedia(constraints)
  .then(handleSuccess)
  .catch(handleError);


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
  $('.background-fade').fadeIn();
  $('.transaction-details').animate({bottom:'0%'});
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


