var COLLISION_LEFT =	 0x00000001;
var COLLISION_RIGHT =  0x00000002;
var COLLISION_TOP = 	 0x00000004;
var COLLISION_BOTTOM = 0x00000008;

//Checks if a point is within a rectangle
function pointToRectangle(pointX, pointY, rectX, rectY, width, height) {
	var left = rectX; var right = rectX+width; // create values for the furthest left and right points
	var top = rectY; var bottom = rectY+height; // create values for the highest and lowest points

	return !(pointX < left || pointX > right || pointY < top || pointY > bottom);
}

//Checks collision between and circle and a rectangle
function circleToRectangle(centerX, centerY, diameter, rectX, rectY, width, height) {
	var left = rectX; var right = rectX+width;
	var top = rectY; var bottom = rectY+height;
	return !(centerX+diameter < left || centerX > right || centerY < top || centerY+diameter > bottom);
}

//Checks collision between two rectangles and returns a hash with collision flags on which sides are colliding
function rectangleToRectangle(rect1X, rect1Y, width1, height1, rect2X, rect2Y, width2, height2) {
	var flag = 0;
  
	var x, y;

	x = rect1X; y = rect1Y-height1/4;
	if (pointToRectangle(x, y, rect2X, rect2Y, width1, width2)) {
		flag |= COLLISION_LEFT;
	}

	y = rect1Y-height1+(height1/4);
	if (pointToRectangle(x, y, rect2X, rect2Y, width1, width2)) {
		flag |= COLLISION_LEFT;
	}

	x = rect1X+width1; y = rect1Y-height1/4;
	if (pointToRectangle(x, y, rect2X, rect2Y, width1, width2)) {
		flag |= COLLISION_RIGHT;
	}

	y = rect1Y-height1+(height1/4);
	if (pointToRectangle(x, y, rect2X, rect2Y, width1, width2)) {
		flag |= COLLISION_RIGHT;
	}

	x = rect1X+width1/4; y = rect1Y;
	if (pointToRectangle(x, y, rect2X, rect2Y, width1, width2)) {
		flag |= COLLISION_TOP;
	}

	x = rect1X+width1-(width1/4);
	if (pointToRectangle(x, y, rect2X, rect2Y, width1, width2)) {
		flag |= COLLISION_TOP;
	}

	x = rect1X+width1/4; y = rect1Y-height1;
	if (pointToRectangle(x, y, rect2X, rect2Y, width1, width2)) {
		flag |= COLLISION_BOTTOM;
	}

	x = rect1X+width1-(width1/4);
	if (pointToRectangle(x, y, rect2X, rect2Y, width1, width2)) {
		flag |= COLLISION_BOTTOM;
	}

	return flag;
}