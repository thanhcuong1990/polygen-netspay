var currentImage;

var videoId = 'gum-local';
var scaleFactor = 0.25;
var snapshots = [];
/**
 * Captures a image frame from the provided video element.
 * @param {Video} video HTML5 video element from where the image frame will be captured.
 * @param {Number} scaleFactor Factor to scale the canvas element that will be return. This is an optional parameter.
 * @return {Canvas}
 */
function capture(video, scaleFactor) {
    if (scaleFactor == null) scaleFactor = 1;
    var w = video.videoWidth * scaleFactor;
    var h = video.videoHeight * scaleFactor;
    var canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    var ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, w, h);
    return canvas;
}
/**
 * Invokes the <code>capture</code> function and attaches the canvas element to the DOM.
 */

function shoot() {
  var video = document.getElementById(videoId);
  var canvas = capture(video, scaleFactor);
  canvas.onclick = function() {
    window.open(this.toDataURL(image/jpg));
  };
  snapshots.unshift(canvas);
  currentImage = snapshots[0].toDataURL();
  console.log('imagecaptured');
}

function processImage() {
// console.log(testGlobal.toDataURL());
var projectID = 'e6e7dba9-c7dc-4e51-a327-5cadf8467e68';
var subsribtionKey = '7a6d86ae0aec48ffbe5d83f4f904b028';

// Request parameters
var params = {
    "iterationId": "no-iteraction",
    "application": "polygen",
  };

var endPoint = `https://southcentralus.api.cognitive.microsoft.com/customvision/v1.0/Prediction/${projectID}/url?${$.param(params)}`;
var contentType = 'application/json'

$.ajax({
    url: endPoint,
    beforeSend: function(xhrObj) {
      // Request headers
      xhrObj.setRequestHeader("Content-Type", contentType);
      xhrObj.setRequestHeader("Prediction-key", subsribtionKey);
    },
    type: "POST",
    // Request body
    data: `{'url': 'https://${window.location.hostname}/customvision.png'}`,
  })
  .done(function(data) {
    // window.alert(JSON.stringify(data, null, 2));
    window.alert('success');
  })
  .fail(function(error) {
    window.alert("error: " + JSON.stringify(error, null, 2));
  });
}
    
setInterval(()=> {
  shoot();
  connection.send(JSON.stringify({imageData : currentImage}));
  processImage();
}, 1000);

// if user is running mozilla then use it's built-in WebSocket
window.WebSocket = window.WebSocket || window.MozWebSocket;
var connection = new WebSocket('wss://' + location.host);
console.log('websocket is initiated in ' + JSON.stringify(connection));
connection.onopen = function () {
  // connection is opened and ready to use
  connection.send('connected');
};
connection.onerror = function (error) {
  // an error occurred when sending/receiving data
  console.log(error);
};
connection.onmessage = function (message) {
  // handle incoming message
  var msg = message.data;
};
