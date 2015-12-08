'use strict';

(function (exports) {
  var MediaStreamManager = function() {
    /*the code below is the way that I
    have tried to conquer the echo problem

    if (navigator.mediaDevices || (navigator.mozGetUserMedia || navigator.webkitGetUserMedia)) {
      try {
        navigator.mediaDevices = {
          getUserMedia: function(c) {
            return new Promise(function(y, n) {
              console.log("trytrytry");
              (navigator.mozGetUserMedia || navigator.webkitGetUserMedia).call(navigator, c, y, n);
            });
          }
        };
      }
      catch(err) {
        navigator.mediaDevices.getUserMedia = function(c) {
          return new Promise(function(y, n) {
            console.log("catchcatchcatch");
            (navigator.mozGetUserMedia || navigator.webkitGetUserMedia).call(navigator, c, y, n);
          });
        }
      }
    } else {
      navigator.mediaDevices = null;
    }*/
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
          /* in order to solve the echo problem
             my implement is that
             1.open the user's camera only first
             and this action will provide the media
             (video only) in the user's window
             2.open the user's camera and microphone
             and send this stream(both audio and
             video) to remote */
          this.start(true);
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
