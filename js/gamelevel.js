function GameLevel(args) {
  //"extends" level
  Level.call(this, args);
  //the background of the level
  this.background = this.addGameObject(new GameObject("background.png", canvas.width/2, canvas.height/2));
  //the player
  this.player = this.addGameObject(new Player("player.png", canvas.width/2, canvas.height/2, 256));
  //the hearts displaying your health as an array
  this.healthHUD = [ this.addGameObject(new GameObject("heart.png", 20, 16)) ];
  //game variables and difficulty
  this.spawnTimer = 0;
  this.spawnTime = 4;
  this.enemyHealth = 2;
  this.gunPower = 2;
  this.enemySpeed = 100;
  this.enemiesKilled = 0;
  this.playerHealth = 5;

  this.update = function(delta) {
    //update the health display
    this.updateHealth();
    //if the player is dead, switch to the loss menu passing in the amount of enemies killed
    //so it can be displayed.
    if (this.playerHealth <= 0) {
      switchLevel(new LossMenuLevel(this.enemiesKilled));
    }

    //Spawn enemies and health packs when neccessary
    if (this.spawnTimer <= 0) {
      if (getRandom(0, 40) < 3) {
          this.spawnHealthPack();
      }
      this.spawnEnemy();
      if (this.spawnTime > 2)
        this.spawnTime *= 0.95;
      if (this.enemySpeed < 210)
        this.enemySpeed += 2;
      this.enemyHealth += 1;
      this.gunPower += 1;
      this.spawnTimer = this.spawnTime;
    } else {
      this.spawnTimer -= delta;
    }
  }

  this.render = function() {
    //Draw debugging text and score
    drawText("Unicorns killed: "+this.enemiesKilled, 10, 24, "#000000");
    if (DEBUG) {
      drawText("Player position: "+this.player.x+", "+this.player.y, 10, 36, "#000000");
      drawText("Player direction: "+this.player.direction.x+", "+this.player.direction.y, 10, 48, "#000000");
      drawText("Mouse position: "+mousePos.x+", "+mousePos.y, 10, 60, "#000000");
    }
  }

  this.onMouseDown = function() {
    //When the mouse is pressed, spawn a bullet with a vector direction towards where the mouse is compared to the player
    var bullet = this.addGameObject(new Bullet("bullet.png", this.player.x, this.player.y, 300, getRandom(2, this.gunPower)));
    bullet.direction = new Vector(mousePos.x, mousePos.y).subtract(new Vector(this.player.x, this.player.y)).normalize();
  }

  //get a random location ouside the bounds of the map for enemies to spawn
  this.randomLocationOnEdge = function() {
    var location = new Vector(0, 0);
    var side = getRandom(0, 4);
    switch(side) {
      case 0:
        location.x = getRandom(0, canvas.width);
        location.y = 0;
      break;
      case 1:
        location.x = getRandom(0, canvas.width);
        location.y = canvas.height;
      break;
      case 2:
        location.x = 0;
        location.y = getRandom(0, canvas.height);
      break;
      case 3:
        location.x = canvas.width;
        location.y = getRandom(0, canvas.height);
      break;
      default:
        location.x = getRandom(0, canvas.width);
        location.y = 0;
    }
    return location;
  }

  //spawn a health pack
  this.spawnHealthPack = function() {
    var location = new Vector(getRandom(20, canvas.width-20), getRandom(20, canvas.height-20));
    this.addGameObject(new HealthPack("healthpack.png", location.x, location.y));
  }

  //spawn an enemy around the edges
  this.spawnEnemy = function() {
    var location = this.randomLocationOnEdge();

    this.addGameObject(new Enemy("enemy"+getRandom(0, 2)+".png", location.x, location.y, this.enemySpeed, this.enemyHealth));
  }

  //Update the health HUD
  this.updateHealth = function() {
    if (this.healthHUD) {
      for(var i = 0;i < this.healthHUD.length;i++) {
        if (this.healthHUD[i]) {
          this.healthHUD[i].draw = false;
        }
      }

      for(var i = 0;i < this.playerHealth;i++) {
        if (this.healthHUD[i]) {
          this.healthHUD[i].draw = true;
        } else {
          this.healthHUD[i] = this.addGameObject(new GameObject("heart.png", this.healthHUD[i-1].x+20, 16));
        }
      }
    }
  }

  //remove health from the player
  this.hitPlayer = function() {
    this.playerHealth--;
  }
}
