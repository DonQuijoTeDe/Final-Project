'use strict';

document.addEventListener('DOMContentLoaded', function (event) {
    var todomediastream = new MediaStreamManager();
    todomediastream.start(false);
    /*var todosendstream = new MediaStreamManager();
    todosendstream.start(true);*/
    var todoSignalChannel = new SignalChannelManager();
    todoSignalChannel.start();
});
