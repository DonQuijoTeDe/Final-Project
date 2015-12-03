'use strict';

document.addEventListener('DOMContentLoaded', function (event) {
    var todovediostream = new MediaStreamManager();
    todovediostream.start(false);
    var todomediastream = new MediaStreamManager();
    todomediastream.start(true);
    var todoSignalChannel = new SignalChannelManager();
    todoSignalChannel.start();
});
