// Javascript by Maxim Tsai
// Instructions to use:
// In the header section, add <script src="dog.js"></script>
// Add initdog() in the function init() section of the main html file
// and add stage.addChild(dog);
// If there is a function tick(event), add doginput() in the area
// Note: Requires dog.png in the folder.

function isValidDirection(x, y) {

  if (x > stage.canvas.width || x < 0) {
    return false;
  }
  if (y > stage.canvas.height || y < 0) {
    return false;
  }

  return true;
}

var Dog = function() {
    this.spriteSheet = new createjs.SpriteSheet({
      images: ["assets/img/dog.png"],
      frames: {width: 50, height: 50, regX: 25, regY: 25},
      animations: {
        moveleft: 0,
        moveright: 3,
        moveup: 1,
        movedown: 2,
      }});

    this.sprite = new createjs.Sprite(this.spriteSheet);
    this.worldx = 60;
    this.worldy = 0;
    this.sprite.x = 250;
    this.sprite.y = 200;
    this.images = ["img/dog.png"];

    this.bark = function() {
      console.log("Woof! #(o.o)#")
    };

    this.move = function () {

      var targetX = this.sprite.x;
      var targetY = this.sprite.y;

      if (key.isPressed('up') || key.isPressed('w')) {
        //targetY -= 2;
        this.worldy -= 2;
        this.worldx -= 2;
        this.sprite.gotoAndStop(1);
      }
      if (key.isPressed('down') || key.isPressed('s')) {
        //targetY += 2;
        this.worldy += 2;
        this.worldx += 2;
        this.sprite.gotoAndStop(2);
      }
      if (key.isPressed('left') || key.isPressed('a')) {
        //targetX -= 2;
        this.worldx -= 2;
        this.worldy += 2;
        this.sprite.gotoAndStop(0);
      }
      if (key.isPressed('right') || key.isPressed('d')) {
        //targetX += 2;
        this.worldx += 2;
        this.worldy -= 2;
        this.sprite.gotoAndStop(3);
      }
      if (key.isPressed(' ')) {
        this.bark();
      }

      if (isValidDirection(targetX, targetY)) {
        //this.sprite.x = targetX;
        //this.sprite.y = targetY;
      }
  }

};
