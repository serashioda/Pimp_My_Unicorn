function Hit(x, y, damage, crit) {
  GameObject.call(this, (crit ? "crit.png" : "hit.png"), x, y);
  this.damage = damage;
  this.crit = crit;
  this.transparency = 1;
  this.direction = new Vector(0, -1);
  this.speed = 30;
  this.life = 1;
  
  //draw the sprite with the amount of damage on top of it as text. Also handles fading
  this.render = function(context) {
    if (this.draw) {
      context.globalAlpha = this.transparency;
      context.fillStyle = "#000000";
      context.font = "small-caps bold 12px arial,sans-serif";
      context.textAlign = "center";
      context.drawImage(this.sprite, this.x-this.sprite.width/2, this.y-this.sprite.height/2);
      context.fillText(""+this.damage, this.x+1, this.y-7);
      context.globalAlpha = 1;
    }
  }
  
  //Remove when the hit fades and update the fade
  this.update = function(delta) {
    if (this.life <= 0) {
      currentLevel.removeGameObject(this);
    } else {
      this.life -= delta;
    }
    if (this.life < 0.5) {
      if (this.transparency-0.07 > 0) {
        this.transparency -= 0.07;
      } else {
        this.transparency = 0;
      }
    }
  }
}