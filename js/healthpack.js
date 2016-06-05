function HealthPack(spriteFile, x, y) {
  GameObject.call(this, spriteFile, x, y);
  
  this.draw = true;
  
  //if the health pack is colliding with the player, remove it and give the player health
  this.update = function(delta) {
    if (currentLevel instanceof GameLevel) {
      if (this.rectCollide(currentLevel.player)) {
        currentLevel.removeGameObject(this);
        currentLevel.playerHealth++;
      }
    }
  }
}