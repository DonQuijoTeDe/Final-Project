'use strict';

(function(exports) {
  var SignalChannelManager = function() {
    var login_name = '';
    var call_name = '';
  }
  SignalChannelManager.prototype = {
    start() {
      document.getElementById("login").addEventListener('submit', function(evt) {
        evt.preventDefault();
        login_set(this).then(function() {
          call_listening(this);
        }.bind(this));
      });
    }
  };
  function login_set(form) {
    return new Promise((function(resolve) {
      if (form.username.value == '') {
        alert("Please Login First !");
      } else {
        window.login_name = form.username.value;
        resolve();
      }
    }));
  }
  function callee_set(form) {
    return new Promise((function(resolve) {
      if (form.number.value == "") {
        alert("Please Enter A Callee !");
      } else {
        window.call_name = form.number.value;
        form.number.style.background = "#55ff5b";
        resolve();
      }
    }));
  }
  function call_connecting(_peer,form) {
    var call = _peer.call(window.call_name,window.localstream);
    console.log(call);
    call_connected(_peer,call);
  }
  function call_connected(temp_peer,_call) {
    _call.on('stream', function(stream) {
      window.remotestream = stream;
      console.log("we're connected!");
      window.video = document.getElementById("remote");
      window.video.src = window.URL.createObjectURL(remotestream);
    });
    _call.on('error', function(err) {
      console.log(err.message);
    });
    _call.on('close', function() {
      temp_peer.destroy();
    })
  }
  function call_listening(form) {
    var peer= new Peer(window.login_name, {key: 'p89ccz2nmuzq6w29', debug: 3});
    peer.on('open', function() {
      console.log("My peer ID is: " + window.login_name);
      form.username.style.background = "#55ff5b";
    });
    peer.on('call', function(call) {
      console.log("Hi " + window.call_name + " ,I got your call !");
      call.answer(window.localstream);
      call_connected(peer,call);
    });
    peer.on('error', function(err){
      console.log(err.message);
      peer.disconnect();
    });

    document.getElementById("call").addEventListener('submit', function(evt) {
      evt.preventDefault();
      callee_set(this).then(function() {
        call_connecting(peer,this);
      }.bind(this));
    });
  }
  exports.SignalChannelManager = SignalChannelManager;
})(window);
