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
        check_login(this);
        login(this);//can not be fetched by correct object
      });           //so I make "login function" as a global function
    }
  };
  function check_call(login_form,call_form) {
    if (call_form.number.value == "") {
      call_form.call_name = login_form.login_name;
      call_form.number.value = login_form.login_name;
    } else {
      call_form.call_name = call_form.number.value;
    }
    call_form.number.style.background = "#55ff5b";
  }
  function check_login(_form) {
    if (_form.username.value == '') {
      _form.login_name = "Anonymous";
      _form.username.value = "Anonymous";
    } else {
      _form.login_name = _form.username.value;
    }
    _form.username.style.background = "#55ff5b";
  }
  function login(form) {
    var peer= new Peer(form.login_name, {key: 'p89ccz2nmuzq6w29', debug: 3});
    //Emitted when a connection to the PeerServer is established
    peer.on('open', function() {
      console.log("My peer ID is: " + form.login_name);
    });
    peer.on('error', function(err){
      console.log(err.message);
      peer.disconnect();
    });
    peer.on('call', function(call) {
      console.log("HEY I GOT YOUR CALL!!!!");
      call.answer(window.localstream);
    });
    call_listening(peer,form);
  }
  function call_listening(_peer,_form) {
    var call_button = document.getElementById("call");
    call_button.addEventListener('submit', function(evt) {
      evt.preventDefault();
      check_call(_form, this);
      call_connecting(_peer, this);
    });
  }
  function call_connecting(temp_peer,call_form) {
    var call = temp_peer.call(call_form.call_name,window.localstream);
    call.on('stream', function(stream) {
      console.log("we're connected!");
      document.getElementById("remote") = stream;
    });
    call.on('error', function(err) {
      console.log(err.message);
      temp_peer.disconnect();
    });
  }
  exports.SignalChannelManager = SignalChannelManager;
})(window);
