'use strict';

(function (exports) {
  var MediaStreamManager = function() {
    navigator.getUserMedia = navigator.getUserMedia ||
    navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    navigator.video = document.getElementById("local");
  }

  MediaStreamManager.prototype = {
    start() {
      var constraints = {audio:false,video:true};
      navigator.getUserMedia(constraints,successCallback,errorCallback);
    }
  };
  function successCallback(stream) {
    window.localstream = stream;
    if (window.URL) {
      navigator.video.src = window.URL.createObjectURL(localstream);
    } else {
      navigator.video.src = localstream;
    }
  }
  function errorCallback(error) {
    console.log("navigator.getUserMedia error: ",error);
  }
  exports.MediaStreamManager = MediaStreamManager;
})(window);
