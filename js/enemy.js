function Enemy(spriteFile, x, y, speed, health) {
  GameObject.call(this, spriteFile, x, y);
  this.speed = speed;
  this.health = health;
  this.totalHealth = health;
  
  //Render the health bar of the enemy
  this.renderExtra = function(context) {
    context.fillStyle = "#FF0000";
    context.fillRect(this.x-this.sprite.width/2, this.y-this.sprite.height/2-10, 30, 5);
    context.fillStyle = "#00FF00";
    context.fillRect(this.x-this.sprite.width/2, this.y-this.sprite.height/2-10, (this.health/this.totalHealth)*30, 5);
  }
  
  //Check if the enemies are colliding with the player and removes health from the player if they are colliding
  this.update = function(delta) {
    if (this.health <= 0) {
      currentLevel.removeGameObject(this);
      currentLevel.enemiesKilled++;
    }
    if (currentLevel instanceof GameLevel) {
      this.direction = new Vector(currentLevel.player.x, currentLevel.player.y).subtract(new Vector(this.x, this.y)).normalize();
    
      if (this.rectCollide(currentLevel.player)) {
        currentLevel.removeGameObject(this);
        currentLevel.addParticleSystem(new ParticleSystem(currentLevel.player.x, currentLevel.player.y, 2, BLOOD));
        currentLevel.hitPlayer();
      }
    }
  }
}