function getCoordinatesFromEvent(e) {
	var offset = $(e.target).offset();
	var x = e.pageX - offset.left;
	var y = e.pageY - offset.top;
	
	return new Point(x, y);
}

function translate(point, dx, dy, dz) {
	return new Point(point.x + dx, point.y + dy, point.z + dz);
}

function rotateX(point, angle) {
	return new Point(point.x,
	                 point.y * Math.cos(angle) - point.z * Math.sin(angle),
					 point.y * Math.sin(angle) + point.z * Math.cos(angle));
}

function rotateY(point, angle) {
	return new Point(point.z * Math.sin(angle) + point.x * Math.cos(angle),
	                 point.y,
					 point.z * Math.cos(angle) - point.x * Math.sin(angle));
}

function rotateZ(point, angle) {
	return new Point(point.x * Math.cos(angle) - point.y * Math.sin(angle),
	                 point.x * Math.sin(angle) + point.y * Math.cos(angle),
					 point.z);
}

function rotateAroundEachAxis(point, origin, angle) {
	var translatedPoint = translate(point, -origin.x, -origin.y, -origin.z);
	var rotatedPoint = rotateZ(rotateY(rotateX(translatedPoint, angle), angle), angle);
	//var rotatedPoint = rotateY(translatedPoint, angle);
	var resultPoint = translate(rotatedPoint, +origin.x, +origin.y, +origin.z);
	
	return resultPoint;
}

var isNear = function(point, target) {
	return Math.abs(target.x - point.x) < 5 && Math.abs(target.y - point.y) < 5;
}