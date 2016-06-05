/*
 * Vector object for basic movement physics
 */
function Vector(x, y) {
  this.x = x;
  this.y = y;
  
  //normalizes the vector for easier speed scaling
  this.normalize = function () {
    var mag = Math.sqrt((this.x*this.x)+(this.y*this.y));
    if (mag != 0) {
      this.x /= mag;
      this.y /= mag;
    }
    return this;
  };
  
  //gets the dot product of this vector and another vector
  this.dot = function (vec2) {
    return (this.x*vec2.x)+(this.y*vec2.y);
  }
  
  //adds another vector to this vector
  this.add = function (vec2) {
    this.x += vec2.x;
    this.y += vec2.y;
    return this;
  };
  
  //subtracts another vector from this vector
  this.subtract = function (vec2) {
    this.x -= vec2.x;
    this.y -= vec2.y;
    return this;
  };
  
  //multiplies this vector by a scalar value (for reflection and speed)
  this.multiplyByScalar = function (scalar) {
    this.x *= scalar;
    this.y *= scalar;
    return this;
  }
  
  //reflects this vector off of another vector such as an edge of the map or another object
  this.reflect = function (direction) {
		direction.multiplyByScalar(2 * (this.dot(direction)));
		this.subtract(direction);
		this.normalize();
		return this;
  }
}