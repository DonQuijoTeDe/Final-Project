'use strict';

(function(exports) {
  var SignalChannelManager = function() {
    this.login_name = '';
    this.call_name = '';
    this.peer = '';
    this.call = '';
  }
  SignalChannelManager.prototype = {
    start() {
      //listen for logining
      var content = document.getElementById("login");
      content.addEventListener('submit', function(evt) {
        evt.preventDefault();
        this.login_set(content).then(function() {
          this.register(content);
        }.bind(this));
      }.bind(this));
      //listen for calling
      var _content = document.getElementById("call");
      _content.addEventListener('submit', function(evt) {
        evt.preventDefault();
        this.callee_set(_content).then(function() {
          this.call_connecting();
          this.call_connected();
        }.bind(this));
      }.bind(this));

    },
    login_set(content) {
      return new Promise((function(resolve) {
        if (content.username.value == '') {
          alert("Please Login First !");
        } else {
          this.login_name = content.username.value;
          content.login_submit.style.visibility = "hidden";
          //here is to prevent the user from being stupid
          var next = document.getElementById("call");
          next.style.visibility = "visible";
          resolve();
        }
      }).bind(this));
    },
    callee_set(_content) {
      return new Promise((function(resolve) {
        if (_content.number.value == "") {
          alert("Please Enter A Friends Name !");
        } else {
          this.call_name = _content.number.value;
          _content.number.style.background = "#55ff5b";
          _content.call_submit.style.visibility = "hidden";
          resolve();
        }
      }).bind(this));
    },
    register(content) {
      var client = this.login_name;
      //here I cann't reference the object this.login_name
      //to the new object Peer , so I use a variable "client"
      var temp = new Peer(client, {key: 'p89ccz2nmuzq6w29', debug: 3});
      this.peer = temp;
      this.peer.on('open', function() {
        console.log("My peer ID is: " + client);
        content.username.style.background = "#55ff5b";
      });
      this.peer.on('call', function(call) {
        this.call = call;+

        console.log("Hi ,I got your call !");
        this.call.answer(window.localstream);
        this.call_connected();
      }.bind(this));
      this.peer.on('error', function(err){
        console.log(err.message);
        this.peer.disconnect();
      }.bind(this));
      this.peer.on('close', function(){
        console.log("connection ended");
      });
    },
    call_connecting() {
      console.log(window.localstream);
      this.call = this.peer.call(this.call_name,window.localstream);
    },
    call_connected() {
      this.call.on('stream', function(stream) {
        window.remotestream = stream;
        console.log("we're connected!");
        window.video = document.getElementById("remote");
        window.video.src = window.URL.createObjectURL(remotestream);
      }.bind(this));
      this.call.on('error', function(err) {
        console.log(err.message);
      }.bind(this));
      this.call.on('close', function() {
        this.peer.destroy();
      }.bind(this))
    }
  };

  exports.SignalChannelManager = SignalChannelManager;
})(window);
