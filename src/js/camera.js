
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

function processImage() {
    var subscriptionKey = "7a6d86ae0aec48ffbe5d83f4f904b028";
    var uriBase = "https://southcentralus.api.cognitive.microsoft.com/customvision/v2.0/Prediction/e6e7dba9-c7dc-4e51-a327-5cadf8467e68/image";
    // Request parameters.
    var params = {
        "visualFeatures": "Categories,Description,Color",
        "details": "",
        "language": "en",
    };
    // Display the image.
    var sourceImageUrl = document.getElementById("inputImage").value;
    document.querySelector("#sourceImage").src = sourceImageUrl;
  
    // Make the REST API call.
    $.ajax({
      url: uriBase + "?" + $.param(params),
      // Request headers.
      beforeSend: function(xhrObj){
          xhrObj.setRequestHeader("Content-Type","application/octet-stream");
          xhrObj.setRequestHeader(
              "Ocp-Apim-Subscription-Key", subscriptionKey);
      },
      type: "POST",
      // Request body.
      data: '{"url": ' + '"' + sourceImageUrl + '"}',
    }).done(function(data) {
      // Show formatted JSON on webpage.
      // $("#responseTextArea").val(JSON.stringify(data, null, 2));
    }).fail(function(jqXHR, textStatus, errorThrown) {
      // Display error message.
      var errorString = (errorThrown === "") ? "Error. " :
          errorThrown + " (" + jqXHR.status + "): ";
      errorString += (jqXHR.responseText === "") ? "" :
          jQuery.parseJSON(jqXHR.responseText).message;
      alert(errorString);
    });
  }
  
  
  
  // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  
  var videoId = 'gum-local';
  var scaleFactor = 0.25;
  var snapshots = [];
  
  /**
   * Captures a image frame from the provided video element.
   *
   * @param {Video} video HTML5 video element from where the image frame will be captured.
   * @param {Number} scaleFactor Factor to scale the canvas element that will be return. This is an optional parameter.
   * @return {Canvas}
   */
  function capture(video, scaleFactor) {
    if (scaleFactor == null) {
        scaleFactor = 1;
    }
    // var w = video.videoWidth * scaleFactor;
    // var h = video.videoHeight * scaleFactor;
    // var canvas = document.createElement('canvas');
    // canvas.width = w;
    // canvas.height = h;
    // var ctx = canvas.getContext('2d');
    // ctx.drawImage(video, 0, 0, w, h);
    // return canvas;
  }
  
  /**
   * Invokes the <code>capture</code> function and attaches the canvas element to the DOM.
  */
  function shoot() {
    var video = document.getElementById(videoId);
    var output = document.getElementById('output');
    var canvas = capture(video, scaleFactor);
    canvas.onclick = function() {
      window.open(this.toDataURL(image/jpg));
    };
    snapshots.unshift(canvas);
    output.innerHTML = '';
    for (var i = 0; i < 4; i++) {
      output.appendChild(snapshots[i]);
    }
  }
  
  (function() {
    var captureit = document.getElementById('cit');
    captureit.click();
  })();