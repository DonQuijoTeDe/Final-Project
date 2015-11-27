'use strict';

document.addEventListener('DOMContentLoaded', function (event) {
    var todoMediaStream = new MediaStreamManager();
    todoMediaStream.start();
    var todoSignalChannel = new SignalChannelManager();
    todoSignalChannel.start();
});
