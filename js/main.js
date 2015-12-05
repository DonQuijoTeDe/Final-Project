'use strict';

document.addEventListener('DOMContentLoaded', function (event) {
    var todovediostream = new MediaStreamManager();
    todovediostream.start(false);
    var todosendstream = new MediaStreamManager();
    todosendstream.start(true);
    var todoSignalChannel = new SignalChannelManager();
    todoSignalChannel.start();
});
