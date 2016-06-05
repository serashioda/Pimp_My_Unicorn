/*
 * The controls menu
 */
function ControlsMenuLevel(args) {
  Level.call(this, args);

  this.hitTimer = 0;
  this.background = this.addGameObject(new GameObject("controlsmenubg.png", canvas.width/2, canvas.height/2));
  this.mainMenuButton = this.addGameObject(new GameObject("mainmenu.png", 59, 41));

  this.enemy0 = this.addGameObject(new GameObject("enemy0.png", 179, 297));
  this.enemy1 = this.addGameObject(new GameObject("enemy1.png", 239, 297));
  this.player = this.addGameObject(new GameObject("player.png", 190, 359));
  this.healthpack = this.addGameObject(new GameObject("healthpack.png", 449, 225));
  this.health = this.addGameObject(new GameObject("heart.png", 388, 359));

  this.update = function(delta) {
    //Emulates fake hits every 1.4 seconds to show the player how hits work
    if (this.hitTimer > 0) {
      this.hitTimer -= delta;
    } else {
      var normal = new Hit(230, 220, getRandom(5, 40), false);
      var crit = new Hit(230, 246, getRandom(5, 40), true);
      this.addGameObject(normal);
      this.addGameObject(crit);
      this.hitTimer = 1.4;
    }
  }

  this.render = function() {
    //If I don't do this, there is a bug with the hit text. No idea why and I am too lazy to fix it.
    drawText("3", -20, -20, "#000000");
  }

  this.onMouseDown = function() {
    if (this.mainMenuButton.pointCollide(mousePos.x, mousePos.y)) {
      switchLevel(new StartMenuLevel());
    }
  }

  this.onMouseMove = function() {

  }
}
