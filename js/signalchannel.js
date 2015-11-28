'use strict';

(function(exports) {
  var SignalChannelManager = function() {
    var login_name = '';
    var call_name = '';
  }
  SignalChannelManager.prototype = {
    start() {
      var login_button = document.getElementById("login");
      login_button.addEventListener('submit', function(evt) {
        evt.preventDefault();
        login(this).then(function() {
          call_listening();
        });
      });
    }
  };
  function login(form) {
    return new Promise((function(resolve) {
      if (form.username.value == '') {
        alert("Please Login First !");
      } else {
        window.login_name = form.username.value;
        form.username.style.background = "#55ff5b";
        resolve();
      }
    }));
  }
  function call_listening() {
    var peer= new Peer(window.login_name, {key: 'p89ccz2nmuzq6w29', debug: 3});
    //Emitted when a connection to the PeerServer is established
    peer.on('open', function() {
      console.log("My peer ID is: " + window.login_name);
    });
    peer.on('error', function(err){
      console.log(err.message);
      peer.disconnect();
    });
    peer.on('call', function(call) {
      console.log("HEY I GOT YOUR CALL!!!!");
      call.answer(window.localstream);
      call_connected(call);
    });

    var call_button = document.getElementById("call");
    call_button.addEventListener('submit', function(evt) {
      evt.preventDefault();
      call_connecting(peer,this);
    });
  }
  function call_connecting(_peer,form) {
    if (form.number.value == "") {

    } else {
      window.call_name = form.number.value;
      form.number.style.background = "#55ff5b";
    }
    var call = _peer.call(window.call_name,window.localstream);
    call_connected(call);
  }
  function call_connected(_call) {
    _call.on('stream', function(stream) {
      console.log("we're connected!");
      navigator.video = document.getElementById("remote");
      window.remotestream = stream;
      if (window.URL) {
        navigator.video.src = window.URL.createObjectURL(remotestream);
      } else {
        navigator.video.src = remotestream;
      }
    });
    _call.on('error', function(err) {//the connection is being setted , the only problem is
      console.log(err.message);     //how do I assign the localstream to another peer
    });
  }
  exports.SignalChannelManager = SignalChannelManager;
})(window);
