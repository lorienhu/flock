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
    this.tileXvel = 0; // how fast dog is moving
    this.tileYvel = 0;
    this.tileX = 5; // where dog currently is
    this.tileY = 5;

    this.speed = 0.014;
    this.speed2 = 0.0105;

    this.mouseallowed = false;
    this.tileXgoal = -1; // used for mouseclicks
    this.tileYgoal = -1;

    this.getWorldX = function() {
      return isoToWorld(this.tileX, this.tileY)[0];
    }

    this.getWorldY = function() {
      return isoToWorld(this.tileX, this.tileY)[1];
    }

    this.bark = function() {
      woof();
      //console.log("Woof! #(o.o)#")
    };
    this.mousemove = function(evt) {
      this.mouseallowed = true;
      //var coordinates = worldToIso(evt.stageX, evt.stageY);
      //this.tileXgoal = coordinates[0];
      //this.tileYgoal = coordinates[1];
    }
    this.move = function () {
      var targetX = this.tileX;
      var targetY = this.tileY;
        if(this.mouseallowed){ // handling mousemovement
          //var distX = this.tileXgoal - this.tileX;
          //var distY = this.tileYgoal - this.tileY;

          //var normalizedist = this.speed*disttrue(distX,distY);

          this.tileXvel += 0.01;///normalizedist;
          this.tileYvel += 0.01;//normalizedist; 
        }

      if (key.isPressed('up') || key.isPressed('w')) {
        this.mouseallowed = false;
        if (key.isPressed('left') || key.isPressed('a')) {
          this.tileXvel -= this.speed;
          this.sprite.gotoAndStop(1);
        }
        else if (key.isPressed('right') || key.isPressed('d')) {
          this.tileYvel -= this.speed;
          this.sprite.gotoAndStop(7);
        }
        else {
          this.tileYvel -= this.speed;
          this.tileXvel -= this.speed;
          this.sprite.gotoAndStop(0);
        }
      }
      else if (key.isPressed('down') || key.isPressed('s')) {
        this.mouseallowed = false;
        if (key.isPressed('left') || key.isPressed('a')) {
          this.tileYvel += this.speed;
          this.sprite.gotoAndStop(3);
        }
        else if (key.isPressed('right') || key.isPressed('d')) {
          this.tileXvel += this.speed;
          this.sprite.gotoAndStop(5);
        }
        else {
          this.tileYvel += this.speed2;
          this.tileXvel += this.speed2;
          this.sprite.gotoAndStop(4);
        }
      }
      else if (key.isPressed('left') || key.isPressed('a')) {
        this.mouseallowed = false;
        this.tileXvel -= this.speed2;
        this.tileYvel += this.speed2;
        this.sprite.gotoAndStop(2);
      }
      else if (key.isPressed('right') || key.isPressed('d')) {
        this.mouseallowed = false;
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
