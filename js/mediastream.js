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
    start(temp) {
      this.audio_set = temp;
      var constraints = {audio: Boolean(this.audio_set), video: true};
      navigator.mediaDevices.getUserMedia(constraints)
      .then(function(stream) {
        if(Boolean(this.audio_set) == false) {
          console.log("false: " + stream);
          window.video = document.getElementById('local');
          window.video.src = window.URL.createObjectURL(stream);
        } else {
          console.log("true:" + stream);
          window.localstream = stream;
        }
      }.bind(this))
      .catch(function(err) {
        console.log(err.name + ": " + err.message);
      });
    }
  };
  exports.MediaStreamManager = MediaStreamManager;
})(window);
