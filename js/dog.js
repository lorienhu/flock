// Javascript by Maxim Tsai
// Instructions to use:
// In the header section, add <script src="dog.js"></script>
// Add initdog() in the function init() section of the main html file
// and add stage.addChild(dog);
// If there is a function tick(event), add doginput() in the area
// Note: Requires dog.png in the folder.

var Dog = function() {
    this.spriteSheet = new createjs.SpriteSheet({
      images: ["img/dog.png"],
      frames: {width: 50, height: 50, regX: 25, regY: 25},
      animations: {
        moveleft: 0,
        moveright: 3,
        moveup: 1,
        movedown: 2,
      }});

    this.sprite = new createjs.Sprite(dogSprites);
    this.worldx = 100;
    this.worldy = 100;
    this.images = ["img/dog.png"];

    this.bark = function() {
      console.log("Woof!")
    };

    this.movement = function () {
      if (key.isPressed('up') || key.isPressed('w')) {
        this.sprite.y -= 2;
        this.sprite.gotoAndStop(1);
      }
      if (key.isPressed('down') || key.isPressed('s')) {
        this.sprite.y += 2;
        this.sprite.gotoAndStop(2);
      }
      if (key.isPressed('left') || key.isPressed('a')) {
        this.sprite.x -= 2;
        this.sprite.gotoAndStop(0);
      }
      if (key.isPressed('right') || key.isPressed('d')) {
        this.sprite.x += 2;
        this.sprite.gotoAndStop(3);
      }
  }

};
