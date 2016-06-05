/*
 * Creating and attaching the canvas to the webpage
 */
var gameDiv = document.createElement("div");
gameDiv.setAttribute("id", "gameDiv");
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 512;
canvas.setAttribute("id", "gameCanvas");
gameDiv.appendChild(canvas);
document.body.appendChild(gameDiv);

/*
 * Global game variables
 */
var DEBUG = false;
var FPS = 60;
var currentLevel = new StartMenuLevel();

/*
 * Keyboard and mouse handling
 */
var keysDown = {};
var mousePos = {x: 0, y: 0};

addEventListener('mousedown', function(e) {
  mousePos = getLocalMousePos(canvas, e);
  currentLevel.onMouseDown();
}, false);

addEventListener('mousemove', function(e) {
  mousePos = getLocalMousePos(canvas, e);
}, false);

function getLocalMousePos(canvas, e) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  };
}

/*
 * Keyboard event listeners
 */
addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	keysDown[e.keyCode] = false;
}, false);

/*
 * Utility functions
 */
function drawText(text, x, y, color) {
  ctx.fillStyle = color;
	ctx.font = "12px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
  ctx.fillText(text, x, y);
}

//Get a random float value
function getRandomArb(min, max) {
    return Math.random() * (max - min) + min;
}

//Get random rounded
function getRandom(min, max) {
  return Math.floor(Math.random() * max) + min;
}

//Create an array that can easily be used as a 2D array
function createArray(rows) {
  var arr = [];

  for (var i=0;i<rows;i++) {
     arr[i] = [];
  }

  return arr;
}

//Unload the current level and load the new level
function switchLevel(newLevel) {
  currentLevel.unload();
  currentLevel = newLevel;
}

//Update the game logic of the current level
function update(delta) {
  currentLevel.updateObjects(delta);
  currentLevel.update(delta);
};

//Render the current level
function render() {
  currentLevel.renderObjects();
  currentLevel.render();
};

function main() {
  //Get the time since the last frame for physics calculations
	var now = Date.now();
	var delta = now - then;

  //update the game
	update(delta / 1000);
  //render the game scene
	render();

	then = now;
};

var then = Date.now();
//Update the game at a set FPS
setInterval(main, 1000/FPS);
