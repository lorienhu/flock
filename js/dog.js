var Dog = function() {
  this.name = "Dog";
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
    this.images = ["img/dog.png"];

    this.tileX = 5;
    this.tileY = 5;

    this.getWorldX = function() {
      return isoToWorld(this.tileX, this.tileY)[0];
    }

    this.getWorldY = function() {
      return isoToWorld(this.tileX, this.tileY)[1];
    }

    this.bark = function() {
      console.log("Woof! #(o.o)#")
    };

    this.move = function () {

      var targetX = this.tileX;
      var targetY = this.tileY;

      if (key.isPressed('up') || key.isPressed('w')) {
        targetY -= 0.1;
        this.sprite.gotoAndStop(1);
      }
      if (key.isPressed('down') || key.isPressed('s')) {
        targetY += 0.1;
        this.sprite.gotoAndStop(2);
      }
      if (key.isPressed('left') || key.isPressed('a')) {
        targetX -= 0.1;
        this.sprite.gotoAndStop(0);
      }
      if (key.isPressed('right') || key.isPressed('d')) {
        targetX += 0.1;
        this.sprite.gotoAndStop(3);
      }
      if (key.isPressed(' ')) {
        this.bark();
      }

      if (isValidDirection(targetX, targetY)) {
        this.tileX = targetX;
        this.tileY = targetY;
      }
  }

};
