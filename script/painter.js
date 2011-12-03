function Painter(canvas) {
	this.canvas = canvas;
	this.ctx = canvas.getContext("2d");
	this.ctx.globalAlpha = 0.7;
	this.shapes = [];
	this.defaultColor = "black";
	$("#canvas").mousemove($.proxy(this.mousemove, this));
	$(this.canvas).mouseup($.proxy(this.mouseup, this));
	$(this.canvas).mousedown($.proxy(this.mousedown, this));
}

Painter.prototype.addShape = function(shape) {
	shape
	this.shapes.push(shape);
};

Painter.prototype.clear = function() {
	this.shapes = [];
};

Painter.prototype.paint = function() {
	this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	
	this.ctx.fillStyle = this.defaultColor;
	
	for (var i = 0; i < this.shapes.length; i++) {		
		var shape = this.shapes[i];
		
		this.ctx.save();
		shape.draw(this.ctx);
		this.ctx.restore();
	}	
};

Painter.prototype.mousemove = function(e) {
	var point = getCoordinatesFromEvent(e);
	for (var i = 0; i < this.shapes.length; i++) {		
		var shape = this.shapes[this.shapes.length - 1 - i];
		if (shape.mousemove) {
			shape.mousemove(e);
		}
	}
}

Painter.prototype.mousedown = function(e) {
	var point = getCoordinatesFromEvent(e);
	for (var i = 0; i < this.shapes.length; i++) {		
		var shape = this.shapes[this.shapes.length - 1 - i];
		if (shape.mousedown && shape.containsPoint(this.ctx, point)) {
			shape.mousedown(e);
		}
	}
}

Painter.prototype.mouseup = function(e) {
	var point = getCoordinatesFromEvent(e);
	for (var i = 0; i < this.shapes.length; i++) {		
		var shape = this.shapes[this.shapes.length - 1 - i];
		if (shape.mouseup && shape.containsPoint(this.ctx, point)) {
			shape.mouseup(e);
		}
	}
}