function StartMenuLevel(args) {
  Level.call(this, args);

  //buttons and background
  this.background = this.addGameObject(new GameObject("menubg.png", canvas.width/2, canvas.height/2));
  this.playButton = this.addGameObject(new GameObject("play.png", 100, 200));
  this.controlsButton = this.addGameObject(new GameObject("controls.png", 400, 200));
  //rainbow butt rocket
  this.leftEye = this.addParticleSystem(new ParticleSystem(337, 319, 50000, RAINBOW));

  this.update = function(delta) {

  }

  this.render = function() {

  }

  //Handles buttons for level flow
  this.onMouseDown = function() {
    if (this.playButton.pointCollide(mousePos.x, mousePos.y)) {
      switchLevel(new GameLevel());
    }
    if (this.controlsButton.pointCollide(mousePos.x, mousePos.y)) {
      switchLevel(new ControlsMenuLevel());
    }
  }

  this.onMouseMove = function() {

  }
}
