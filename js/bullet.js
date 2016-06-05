function critChance() {
  return getRandom(0, 500) < 30;
}

function Bullet(spriteFile, x, y, speed, damage) {
  GameObject.call(this, spriteFile, x, y);
  this.speed = speed;
  this.damage = damage;
  
  //delete the bullet when it goes out of the map
  this.update = function(delta) {
    if (this.getLeftBound() >= canvas.width)
      currentLevel.removeGameObject(this);
    if (this.getRightBound() <= 0)
      currentLevel.removeGameObject(this);
    if (this.getTopBound() >= canvas.height)
      currentLevel.removeGameObject(this);
    if (this.getBottomBound() <= 0)
      currentLevel.removeGameObject(this);
    
    //check for collision with enemies and spawn a particle system if hit.
    for (var i = 0;i < currentLevel.gameObjects.length;i++) {
      if (currentLevel.gameObjects[i] && currentLevel.gameObjects[i] instanceof Enemy) {
        if (this.rectCollide(currentLevel.gameObjects[i])) {
          var crit = critChance();
          if (crit)
            this.damage *= 2;
          //calculate the hit's damage and whether it is is critical hit
          var hit = new Hit(currentLevel.gameObjects[i].x, currentLevel.gameObjects[i].y, this.damage, crit);
          currentLevel.addGameObject(hit);
          currentLevel.addParticleSystem(new ParticleSystem(this.x, this.y, 2, BLOOD));
          currentLevel.removeGameObject(this);
          currentLevel.gameObjects[i].health -= this.damage;
        }
      }
    }
  }
}