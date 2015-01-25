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
    var sheepDir = 3; // 2 left, 6 right, 0 up, 4 down, 5 SE, 3 SW, 7 NE, 1 NW 

    this.getWorldX = function() {
      return isoToWorld(this.tileX, this.tileY)[0];
    }

    this.getWorldY = function() {
      return isoToWorld(this.tileX, this.tileY)[1];
    }

    this.sheepDistance = function () {
      
    }

  };

var Flock = function(NumSheep) {
  this.sheepFlock = [];
  this.sheepState = "walking";
  var randomSheep = 0;
  var moveSheep = 0;


    for (i=0; i<NumSheep; i++) {
      var daSheep = new Sheep(); 
      this.sheepFlock.push(daSheep);
    }

  this.randomizeSheep = function () {
    if (this.sheepState == "walking") {
        randomSheep++;
        if (randomSheep>10) {
        var chosenOne = this.sheepFlock[(Math.floor((Math.random() * this.sheepFlock.length) + 0))]; 
        chosenOne.sheepDir = (Math.floor((Math.random() * 7) + 0));
        chosenOne.sprite.gotoAndStop(chosenOne.sheepDir);
        randomSheep = 0;
      }
    }
  };
// returnes the array of sheep
  this.getFlock = function() {
    return this.sheepFlock;
  };

  this.moveFlock = function() {

    var targetX = this.tileX;
    var targetY = this.tileY;

    for (i = 0; i<this.sheepFlock.length; i++) {
      // ugly but works
      if (this.sheepFlock[i].sheepDir == 0){
          targetX -= 2;
        }
      if (this.sheepFlock[i].sheepDir == 3){
          targetX += 2;
        }
      if (this.sheepFlock[i].sheepDir == 2){
          targetY += 2;
        }
      if (this.sheepFlock[i].sheepDir == 1){
          targetY -= 2;
        }

      if (this.sheepFlock[i].sheepDir == 4){
          targetY -= 2;
          targetX += 2;
          this.sheepFlock[i].sprite.gotoAndStop(3);
        }

      if (this.sheepFlock[i].sheepDir == 5){
          targetY -= 2;
          targetX -= 2;

        }

      if (this.sheepFlock[i].sheepDir == 6){
          targetY += 2;
          targetX += 2;

        }

      if (this.sheepFlock[i].sheepDir == 7){
          targetY += 2;
          targetX -= 2;
      }

      if (isValidDirection(targetX, targetY)) {

        console.log("AH GOT HERE" + this.name);
        this.tileX = targetX;
        this.tileY = targetY;
      }
    }
    this.randomizeSheep();
    moveSheep = 0; 
  };
};

