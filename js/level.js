function Level(args) {
  this.args = args;
  //game objects currently in use
  this.gameObjects = [];
  //particle systems currently in use
  this.particleSystems = [];

  //adds a particle system to the list
  this.addParticleSystem = function(ps) {
    this.particleSystems.push(ps);
    return ps;
  }

  //removes a particle system from the list
  this.removeParticleSystem = function(ps) {
    var index = this.particleSystems.indexOf(ps);
    if (index) {
      for (var i = 0;i < this.particleSystems[index].gameObjects.length;i++) {
       if (this.particleSystems[index].gameObjects[i])
          this.removeGameObject(this.particleSystems[index].gameObjects[i]);
      }
      delete this.particleSystems[index];
    }
  }

  //Add a game object to the game objects list
  //First searches for an open position, then if there is no open spot
  //it pushes it to the end.
  this.addGameObject = function(object) {
      var added = false;
      for (var i = 0;i < this.gameObjects.length;i++) {
        if (!this.gameObjects[i]) {
          this.gameObjects[i] = object;
          added = true;
          break;
        }
      }
      if (!added) {
        this.gameObjects.push(object);
      }
    return object;
  }

  //Gets the index of an object and removes it from use
  this.removeGameObject = function(object) {
      var index = this.gameObjects.indexOf(object);
      if (index) {
        delete this.gameObjects[index];
      }
  }

  this.updateObjects = function(delta) {
    //Update all the game objects in use
    if (this.gameObjects) {
      for (var i = 0;i < this.gameObjects.length;i++) {
        if (this.gameObjects[i]) {
          //physics update
          this.gameObjects[i].updatePhysics(delta);
          //essential update (animations)
          this.gameObjects[i]._update(delta);
          //abstract update (entity specific updates)
          this.gameObjects[i].update(delta);
        }
      }
    }

    //Update all the particle systems in use
    if (this.particleSystems) {
      for (var i = 0;i < this.particleSystems.length;i++) {
        if (this.particleSystems[i])
          this.particleSystems[i].update(delta);
      }
    }
  }

  this.renderObjects = function() {
    //Render every game object in use
    if (this.gameObjects) {
      for (var i = 0;i < this.gameObjects.length;i++) {
        if (this.gameObjects[i]) {
          this.gameObjects[i].render(ctx);
          if (DEBUG)
            drawText("idx: "+i, this.gameObjects[i].x, this.gameObjects[i].y, "#00FF00");
        }
      }
    }
  }

  //Once again, my lame solution to abstract methods that
  //can be overridden
  this.update = function(delta) {

  }

  //^ ditto
  this.render = function() {

  }

  //^ ditto
  this.onMouseDown = function() {

  }

  //^ ditto
  this.onMouseMove = function() {

  }

  //clears the current level
  this.unload = function() {
    //Delete all game objects
    if (this.gameObjects) {
      for (var i = 0;i < this.gameObjects.length;i++) {
        if (this.gameObjects[i])
          this.removeGameObject(this.gameObjects[i]);
      }
    }

    //Delete all particle systems
    if (this.particleSystems) {
      for (var i = 0;i < this.particleSystems.length;i++) {
        if (this.particleSystems[i])
          this.removeGameObject(this.particleSystems[i]);
      }
    }
  }
}
