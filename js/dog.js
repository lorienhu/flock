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
      console.log("Woof! #(o.o)#")
    };

    this.move = function () {

      var targetX = this.tileX;
      var targetY = this.tileY;

      if (key.isPressed('up') || key.isPressed('w')) {
        if(!this.travelingOneDirection) {
          // pressing only one direction button
          this.tileYvel -= 0.02;
          this.tileXvel -= 0.02;
          //targetY -= 0.1;
        }
        else {
          this.tileYvel -= 0.0141;
          this.tileXvel -= 0.0141;
        }
        this.sprite.gotoAndStop(0);
      }
      if (key.isPressed('down') || key.isPressed('s')) {
        if(!this.travelingOneDirection) {
          // pressing only one direction button
          this.tileYvel += 0.02;
          this.tileXvel += 0.02;
        }
        else {
          this.tileYvel += 0.0141;
          this.tileXvel += 0.0141;
        }
        this.sprite.gotoAndStop(4);
      }
      if (key.isPressed('left') || key.isPressed('a')) {
        if(!this.travelingOneDirection) {
          // pressing only one direction button
          this.tileYvel += 0.02;
          this.tileXvel -= 0.02;
        }
        else {
          this.tileYvel += 0.0141;
          this.tileXvel -= 0.0141;
        }
        this.sprite.gotoAndStop(2);
      }
      if (key.isPressed('right') || key.isPressed('d')) {
        if(!this.travelingOneDirection) {
          // pressing only one direction button
          this.tileYvel -= 0.02;
          this.tileXvel += 0.02;
          //targetY -= 0.1;
        }
        else {
          this.tileYvel -= 0.0141;
          this.tileXvel += 0.0141;
        }
        this.sprite.gotoAndStop(6);
      }

// written for max
      if ((key.isPressed('up') || key.isPressed('w')) && (key.isPressed('left') || key.isPressed('a'))) {
        this.sprite.gotoAndStop(1);
      }
      else if ((key.isPressed('down') || key.isPressed('s'))  && (key.isPressed('left') || key.isPressed('a'))) {
        this.sprite.gotoAndStop(3);
      }
      else if ((key.isPressed('up') || key.isPressed('w')) && (key.isPressed('right') || key.isPressed('d'))) {
        this.sprite.gotoAndStop(7);
      }
      else if ((key.isPressed('down') || key.isPressed('s')) && (key.isPressed('right') || key.isPressed('d'))) {
        this.sprite.gotoAndStop(5);
      }

      if (key.isPressed(' ')) {
        this.bark();
      }
      targetX += this.tileXvel;
      targetY += this.tileYvel;
      this.tileXvel *= 0.35;
      this.tileYvel *= 0.35;

      if (isValidDirection(targetX, targetY)) {
        this.tileX = targetX;
        this.tileY = targetY;
      }
  }

};
