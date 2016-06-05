function GameObject(spriteFile, x, y, animations) {
  this.sprite = new Image();
  this.sprite.src = "sprites/"+spriteFile;
  this.x = x;
  this.y = y;
  //should the object be rendered or not
  this.draw = true;
  this.speed = 0;
  this.direction = new Vector(0.0, 0.0);
  //freezes the object on the spot
  this.frozen = false;

  if (animations) {
    this.animations = animations;
  }

  //Non-overridable function for essential updates
  this._update = function(delta) {
    if (this.animations) {
      animations.incrementIndex(delta);
    }
  }

  //Update the required physics if the object is not frozen
  this.updatePhysics = function(delta) {
    if (!this.frozen) {
      this.direction.normalize();

      this.x += this.direction.x*this.speed*delta;
      this.y += this.direction.y*this.speed*delta;
    }
  }

  this.changeSprite = function(newSpriteFile) {
    this.sprite = new Image();
    this.sprice.src = "sprites/"+newSpriteFile;
  }

  //My only solution to "abstract" functions in javascript
  this.update = function(delta) {
  }

  //^ ditto
  this.renderExtra = function(context) {

  }

  //Render the sprite so the x, y position is the center of the image
  this.render = function(context) {
    if (this.draw) {
      this.renderExtra(context);
      if (!this.animations) {
        context.drawImage(this.sprite, this.x-this.sprite.width/2, this.y-this.sprite.height/2);
      } else {
        context.drawImage(this.animations.getCurrSprite(), this.x-this.sprite.width/2, this.y-this.sprite.height/2);
      }
    }
  }

  //get the left bound of the sprite
  this.getLeftBound = function() {
    return this.x-this.sprite.width/2;
  }

  //get the right bound of the sprite
  this.getRightBound = function() {
    return this.x+this.sprite.width/2;
  }

  //get the top bound of the sprite
  this.getTopBound = function() {
    return this.y-this.sprite.height/2;
  }

  //get the bottom bound of the sprite
  this.getBottomBound = function() {
    return this.y+this.sprite.height/2;
  }

  //check if a point is colliding with the object
  this.pointCollide = function(x, y) {
    if (this.getLeftBound() <= x && x <= this.getRightBound() &&
        this.getTopBound() <= y && y <= this.getBottomBound()) {
      return true;
    } else {
      return false;
    }
  };

  //check if another object is colliding recangularly with this one
  this.rectCollide = function(otherObject) {
    if (this.getLeftBound() <= otherObject.getRightBound() &&
        otherObject.getLeftBound() <= this.getRightBound() &&
        this.getTopBound() <= otherObject.getBottomBound() &&
        otherObject.getTopBound() <= this.getBottomBound()) {
      return true;
    } else {
      return false;
    }
  };
}
