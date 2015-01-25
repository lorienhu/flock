var Sheep = function() {
    this.name = "Sheep";
    this.spriteSheet = new createjs.SpriteSheet({
      images: ["assets/img/sheep.png"],
      frames: {width: 40, height: 40, regX: 20, regY: 20},
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

    this.sprite = new createjs.Sprite(this.spriteSheet);

    this.tileX = 5;
    this.tileY = 5;

    this.images = ["img/sheep.png"];
    this.sheepDir = 3; // 2 left, 6 right, 0 up, 4 down, 5 SE, 3 SW, 7 NE, 1 NW 
    this.state = "walking";
    this.grazeTime = 0;
    this.walkTime = 0;


    this.changeState = function() {
      if (this.state == "walking") {
        if (this.walkTime >= 10) {
          this.state == "grazing";
          this.walkTime = 0;
        }
        else {
          this.walkTime++;
        }
      }
      else if (this.state == "scared") {
          this.state = "walking";
        }
      else if (this.state == "grazing") {
          if (this.grazeTime >= 2000) {
            this.state = "walking";
            this.grazeTime = 0;
          }
          else {
             this.grazeTime++;
          }
      }
    };

    this.getWorldX = function() {
      return isoToWorld(this.tileX, this.tileY)[0];
    }

    this.getWorldY = function() {
      return isoToWorld(this.tileX, this.tileY)[1];
    }
  };

var Flock = function(NumSheep) {
  this.sheepFlock = [];
  var randomSheep = 0;


    for (var i=0; i<NumSheep; i++) {
      var daSheep = new Sheep(); 
      this.sheepFlock.push(daSheep);
    }

  this.randomizeSheep = function () {
        randomSheep++;
        if (randomSheep>20) {
        var chosenOne = this.sheepFlock[(Math.floor((Math.random() * this.sheepFlock.length) + 0))]; 
        chosenOne.sheepDir = (Math.floor((Math.random() * 7) + 0));
        randomSheep = 0;
    }
  };
// returnes the array of sheep
  this.getFlock = function() {
    return this.sheepFlock;
  };

  this.moveFlock = function() {

    var sheepSpeed = 0.01;

    for (var i = 0; i<this.sheepFlock.length; i++) {
      if (this.sheepFlock[i].state == "walking") {
      var targetX = this.sheepFlock[i].tileX;
      var targetY = this.sheepFlock[i].tileY;

      // ugly but works
      if (this.sheepFlock[i].sheepDir == 1){
          targetX -= sheepSpeed;
          this.sheepFlock[i].sprite.gotoAndStop(1);
        }
      else if (this.sheepFlock[i].sheepDir == 5){
          targetX += sheepSpeed;
          this.sheepFlock[i].sprite.gotoAndStop(5);
        }
      else if (this.sheepFlock[i].sheepDir == 7){
          targetY -= sheepSpeed;
          this.sheepFlock[i].sprite.gotoAndStop(7);
        }
      else if (this.sheepFlock[i].sheepDir == 3){
          targetY += sheepSpeed;
          this.sheepFlock[i].sprite.gotoAndStop(3);
        }
      else if (this.sheepFlock[i].sheepDir == 4){
          targetY += sheepSpeed;
          targetX += sheepSpeed;
          this.sheepFlock[i].sprite.gotoAndStop(4);
        }
      else if (this.sheepFlock[i].sheepDir == 2){
          targetY += sheepSpeed;
          targetX -= sheepSpeed;
          this.sheepFlock[i].sprite.gotoAndStop(2);
        }
      else if (this.sheepFlock[i].sheepDir == 6){
          targetY -= sheepSpeed;
          targetX += sheepSpeed;
          this.sheepFlock[i].sprite.gotoAndStop(6);
        }
      else if (this.sheepFlock[i].sheepDir == 0){
          targetY -= sheepSpeed;
          targetX -= sheepSpeed;
          this.sheepFlock[i].sprite.gotoAndStop(0);
      }

      if (isValidDirection(targetX, targetY)) {
        this.sheepFlock[i].tileX = targetX;
        this.sheepFlock[i].tileY = targetY;
      }
    this.randomizeSheep();
  }
}
  };
};

