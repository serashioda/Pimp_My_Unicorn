function Player(spriteFile, x, y, speed) {
  GameObject.call(this, spriteFile, x, y);
  /* Not quite sure how Javascript inheritance works, but these don't seem neccessary.*/
  //Player.prototype = new GameObject(spriteFile, x, y);
  //Player.prototype.constructor = Player;
  this.speed = speed;
  
  //updates the player moving and prevents them from going off the screen
  this.update = function(delta) {
    if (keysDown[87]) {
      this.direction.y = -1;
    } else if (keysDown[83]) {
      this.direction.y = 1;
    } else {
      this.direction.y = 0;
    }
    
    if (keysDown[65]) {
      this.direction.x = -1;
    } else if (keysDown[68]) {
      this.direction.x = 1;
    } else {
      this.direction.x = 0;
    }
    
    if (this.getRightBound() >= canvas.width)
      this.x = canvas.width-this.sprite.width/2;
    if (this.getLeftBound() <= 0)
      this.x = this.sprite.width/2;
    if (this.getBottomBound() >= canvas.height)
      this.y = canvas.height-this.sprite.height/2;
    if (this.getTopBound() <= 0)
      this.y = this.sprite.height/2;
  }
}