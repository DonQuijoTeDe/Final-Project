'use strict';

(function (exports) {
  var MediaStreamManager = function() {
    if (navigator.mediaDevices || (navigator.mozGetUserMedia || navigator.webkitGetUserMedia)) {
      try {
        navigator.mediaDevices = {
          getUserMedia: function(c) {
            return new Promise(function(y, n) {
              (navigator.mozGetUserMedia || navigator.webkitGetUserMedia).call(navigator, c, y, n);
            });
          }
        };
      }
      catch(err) {
        navigator.mediaDevices.getUserMedia = function(c) {
          return new Promise(function(y, n) {
            (navigator.mozGetUserMedia || navigator.webkitGetUserMedia).call(navigator, c, y, n);
          });
        }
      }
    } else {
      navigator.mediaDevices = null;
    }
  }
  MediaStreamManager.prototype = {
    start() {
      var constraints = {audio: false, video: true};
      navigator.mediaDevices.getUserMedia(constraints)
      .then(function(stream) {
        window.video = document.getElementById('local');
        window.video.src = window.URL.createObjectURL(stream);
        window.localstream = stream;
      })
      .catch(function(err) {
        console.log(err.name + ": " + err.message);
      });
    }
  };
  exports.MediaStreamManager = MediaStreamManager;
})(window);
