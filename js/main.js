'use strict';

document.addEventListener('DOMContentLoaded', function (event) {
    // Background
    var todobackground = new BackGroundManager();
    todobackground.start();
    // Local media
    var todomediastream = new MediaStreamManager();
    todomediastream.start(false);
    // Start connection
    var todosignalchannel = new SignalChannelManager();
    todosignalchannel.start();
});
