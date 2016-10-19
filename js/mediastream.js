'use strict';

(function (exports) {
  var MediaStreamManager = function() {
      // Constructor
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
          /* In order to solve the echo problem
             my implementation is that
             1. Open the user's camera only first
             and this action will provide the media
             (video only) in the user's window
             2. Open the user's camera and microphone
             and send this stream(both audio and
             video) to remote side */
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
