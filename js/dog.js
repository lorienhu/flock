var Dog = function() {
  this.name = "Dog";
    this.spriteSheet = new createjs.SpriteSheet({
      images: ["assets/img/sheepdog.png"],
      frames: {width: 50, height: 50, regX: 25, regY: 25},
      animations: {
      moveleft: 2,
      moveright: 6,
      moveup: 0,
      movedown: 4,
      moveSE: 5,
      moveSW: 3,
      moveNE: 7,
      moveNW: 1, 
      }});

    this.travelingOneDirection = false;
    this.sprite = new createjs.Sprite(this.spriteSheet);
    this.images = ["img/sheepdog.png"];
    this.tileXvel = 0;
    this.tileYvel = 0;
    this.tileX = 5;
    this.tileY = 5;

    this.getWorldX = function() {
      return isoToWorld(this.tileX, this.tileY)[0];
    }

    this.getWorldY = function() {
      return isoToWorld(this.tileX, this.tileY)[1];
    }

    this.bark = function() {
      //console.log("Woof! #(o.o)#")
    };

    this.move = function () {

      var targetX = this.tileX;
      var targetY = this.tileY;

      if (key.isPressed('up') || key.isPressed('w')) {
        if (key.isPressed('left') || key.isPressed('a')) {
          this.tileXvel -= 0.014;
          this.sprite.gotoAndStop(1);
        }
        else if (key.isPressed('right') || key.isPressed('d')) {
          this.tileYvel -= 0.014;
        this.sprite.gotoAndStop(7);
        }
        else {
          this.tileYvel -= 0.011;
          this.tileXvel -= 0.011;
          this.sprite.gotoAndStop(0);
        }
      }
      else if (key.isPressed('down') || key.isPressed('s')) {
        if (key.isPressed('left') || key.isPressed('a')) {
          this.tileYvel += 0.014;
          this.sprite.gotoAndStop(3);
        }
        else if (key.isPressed('right') || key.isPressed('d')) {
          this.tileXvel += 0.014;
        this.sprite.gotoAndStop(5);
        }
        else {
          this.tileYvel += 0.011;
          this.tileXvel += 0.011;
          this.sprite.gotoAndStop(4);
        }
      }
      else if (key.isPressed('left') || key.isPressed('a')) {
        this.tileXvel -= 0.01;
        this.tileYvel += 0.01;
        this.sprite.gotoAndStop(2);
      }
      else if (key.isPressed('right') || key.isPressed('d')) {
        this.tileXvel += 0.01;
        this.tileYvel -= 0.01;
        this.sprite.gotoAndStop(6);
      }

      targetX += this.tileXvel;
      targetY += this.tileYvel;
      this.tileXvel *= 0.75;
      this.tileYvel *= 0.75;

      if (key.isPressed(' ')) {
        this.bark();
      }

      if (isValidDirection(targetX, targetY)) {
        this.tileX = targetX;
        this.tileY = targetY;
      }
  }

};
