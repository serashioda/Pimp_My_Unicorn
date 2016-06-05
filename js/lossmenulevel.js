function LossMenuLevel(args) {
  Level.call(this, args);
  
  this.background = this.addGameObject(new GameObject("lossmenubg.png", canvas.width/2, canvas.height/2));
  this.playButton = this.addGameObject(new GameObject("playagain.png", 100, 200));
  this.mainMenuButton = this.addGameObject(new GameObject("mainmenu.png", 400, 200));
  this.leftEye = this.addParticleSystem(new ParticleSystem(224, 356, 50000, FIRE));
  this.rightEye = this.addParticleSystem(new ParticleSystem(287, 356, 50000, FIRE));

  this.update = function(delta) {
    
  }
  
  //shows how many zombies were killed in the last session
  this.render = function() {
    drawText("You killed "+this.args+" zombies!", 200, 180, "#FF0000");
  }
  
  //handles the buttons blah blah
  this.onMouseDown = function() {
    if (this.playButton.pointCollide(mousePos.x, mousePos.y)) {
      switchLevel(new GameLevel());
    }
    if (this.mainMenuButton.pointCollide(mousePos.x, mousePos.y)) {
      switchLevel(new StartMenuLevel());
    }
  }
  
  this.onMouseMove = function() {
  
  }
}