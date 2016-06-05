var BLOOD = 0;
var FIRE = 1;
var RAINBOW = 2;

/*
 * Particle system object. The most important object because something as
 * simple as particles make people go completely crazy and think the game
 * looks wayyy more impressive than it really is if there are tons of
 * particles.
 */
function ParticleSystem(x, y, lifetime, type) {
  this.x = x;
  this.y = y;
  this.lifetime = lifetime;
  this.type = type;
  this.gameObjects = [];
  this.created = false;
  this.hasLife = true;

  if (this.lifetime == 0)
    this.hasLife = false;

  this.update = function(delta) {
    if (this.hasLife) {
      if (this.lifetime <= 0) {
        currentLevel.removeParticleSystem(this);
      } else {
        this.lifetime -= delta;
      }
    }

    //Handle's the blood particle's logic
    //Basically just shoots out and fades in different
    //directions.
    if (type == BLOOD) {
      for (var i = 0;i < this.gameObjects.length;i++) {
        if (this.gameObjects[i]) {
          if (this.gameObjects[i].transparency-0.01 > 0) {
            this.gameObjects[i].transparency -= 0.01;
          } else {
            this.gameObjects[i].transparency = 0;
          }
        }
      }
      if (!this.created) {
        for (var i = 0;i < 30;i++) {
          var particle = new Particle("blood.png", this.x, this.y, getRandomArb(10, 100), getRandomArb(3, 10));
          particle.direction = new Vector(getRandomArb(-50, 50), getRandomArb(-50, 50));
          this.gameObjects.push(particle);
          currentLevel.addGameObject(particle);
        }
        this.created = true;
      }
    //handles the fire particles for the cheesy and stupid looking eyes of the skull
    //on the loss screen and start menu.
    //Basically just floats the particles upwards in random directions with fade
    //worst looking fire particles I have ever made in any game I have ever done period.
    } else if (type == FIRE) {
      for (var i = 0;i < this.gameObjects.length;i++) {
        if (this.gameObjects[i]) {
          if (this.gameObjects[i].transparency-0.01 > 0) {
            this.gameObjects[i].transparency -= 0.01;
          } else {
            this.gameObjects[i].transparency = 0;
          }
        }
      }
      for (var i = 0;i < 2;i++) {
        var particle = new Particle("fire.png", this.x, this.y, getRandomArb(10, 100), getRandomArb(3, 10));
        particle.direction = new Vector(getRandomArb(-50, 50), getRandomArb(-50, -100));
        particle.setLife(1.4);
        this.gameObjects.push(particle);
        currentLevel.addGameObject(particle);
      }
    } else if (type == RAINBOW) {
       for (var i = 0;i < this.gameObjects.length;i++) {
         if (this.gameObjects[i]) {
           if (this.gameObjects[i].transparency-0.01 > 0) {
             this.gameObjects[i].transparency -= 0.01;
           } else {
             this.gameObjects[i].transparency = 0;
           }
         }
       }
       for (var i = 0;i < 2;i++) {
         var particle = new Particle("rainbow.png", this.x, this.y, getRandomArb(10, 100), getRandomArb(3, 10));
         particle.direction = new Vector(getRandomArb(25, 100), getRandomArb(-20, 20));
         particle.setLife(1.4);
         this.gameObjects.push(particle);
         currentLevel.addGameObject(particle);
       }
    } else {
      currentLevel.removeParticleSystem(this);
    }
  }
}
