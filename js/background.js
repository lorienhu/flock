// Javascript by Maxim Tsai
// Instructions to use:
// In the header section, add <script src="dog.js"></script>
// Add initdog() in the function init() section of the main html file
// and add stage.addChild(dog);
// If there is a function tick(event), add doginput() in the area
// Note: Requires dog.png in the folder.

var bgtile;

function initbg() {
  bgtile = new createjs.Bitmap("assets/img/background.png");
  bgtile.worldx = 0;
  bgtile.worldy = 0;
  stage.addChild(bgtile);
}

function render(dog.worldx, dog.worldy) {
  bgtile.x = (bgtile.worldx-dog.worldx) + (bgtile.worldy-dog.worldy)
  bgtile.y = (bgtile.worldx-dog.worldx) - (bgtile.worldy-dog.worldy)
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
