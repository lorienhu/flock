// Javascript by Maxim Tsai
// Instructions to use:
// In the header section, add <script src="dog.js"></script>
// Add initdog() in the function init() section of the main html file
// and add stage.addChild(dog);
// If there is a function tick(event), add doginput() in the area
// Note: Requires dog.png in the folder.

var dog;
var dogSprites;
var worldx;
var worldy;

function initdog() {
  dogSprites = new createjs.SpriteSheet({
  images: ["img/dog.png"],
  frames: {width: 50, height: 50, regX: 25, regY: 25},
    animations: {
      moveleft: 0,
      moveright: 3,
      moveup: 1,
      movedown: 2,
    }
  });
  dog = new createjs.Sprite(dogSprites);
  dog.x = 100;
  dog.y = 100;
  worldx = 100;
  worldy = 100;
}

function doginput() {
  if (key.isPressed('up') || key.isPressed('w')) {
    dog.y -= 2;
    dog.gotoAndStop(1);
  }
  if (key.isPressed('down') || key.isPressed('s')) {
    dog.y += 2;
    dog.gotoAndStop(2);
  }
  if (key.isPressed('left') || key.isPressed('a')) {
    dog.x -= 2;
    dog.gotoAndStop(0);
  }
  if (key.isPressed('right') || key.isPressed('d')) {
    dog.x += 2;
    dog.gotoAndStop(3);
  }
}
