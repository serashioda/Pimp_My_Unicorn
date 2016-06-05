function Animation(spriteFiles, animationSpeed) {
  this.spriteFiles = spriteFiles;
  this.currentIndex = 0;
  this.speed = animationSpeed;
  this.timer = 0;
  this.playing = false;

  function getCurrSprite() {
    return this.spriteFiles[this.currentIndex];
  }

  function incrementIndex(delta) {
    if (!playing) {
      return;
    }
    if (timer >= speed) {
      timer = 0;
      if (this.currentIndex > this.spriteFiles.length) {
        this.currentIndex = 0;
      } else {
        this.currentIndex++;
      }
    } else {
      timer += delta;
    }
  }
}
