'use strict';

(function (exports) {
	var BackGroundManager = function() {
		this.canvas = '';
		this.local = '';
		this.remote = '';
		this.context = '';
		this.opts = {};
	}

	BackGroundManager.prototype = {
		start() {
			this.canvas = document.getElementById("background");
			this.local = document.getElementById("local");
			this.remote = document.getElementById("remote");
			this.context = this.canvas.getContext("2d");

            window.addEventListener('resize', this.resizeCanvas.bind(this), false);
			this.resizeCanvas();
		},
		resizeCanvas() {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight*0.8;

			this.local.width = this.canvas.width*0.5;
			this.remote.width = this.local.width - 50;
			this.local.height = this.remote.height = this.canvas.height;

            this.redraw();
		},
		redraw() {
			this.context.strokeStyle = 'red';
  		    this.context.lineWidth = '10';
  		    this.context.strokeRect(0, 0, window.innerWidth, window.innerHeight);
  	    }
	};
	exports.BackGroundManager = BackGroundManager;
})(window);
