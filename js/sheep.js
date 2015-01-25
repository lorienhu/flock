var Sheep = function() {

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

    this.images = ["img/dog.png"];
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
  var sheepFlock = [];
  var sheepState = "walking";
  var randomSheep = 0;
  var moveSheep = 0;


    for (i=0; i<NumSheep; i++) {
      var daSheep = new Sheep(); 
      sheepFlock.push(daSheep);
    }

  this.randomizeSheep = function () {
    if (sheepState == "walking") {
        randomSheep++;
        if (randomSheep>10) {
        var chosenOne = sheepFlock[(Math.floor((Math.random() * sheepFlock.length) + 0))]; 
        chosenOne.sheepDir = (Math.floor((Math.random() * 7) + 0));
        chosenOne.sprite.gotoAndStop(chosenOne.sheepDir);
        randomSheep = 0;
      }
    }
  };
// returnes the array of sheep
  this.getFlock = function() {
    return sheepFlock;
  };

  this.moveFlock = function() {

    var targetX = this.tileX;
    var targetY = this.tileY;

    for (i = 0; i<sheepFlock.length; i++) {
      // ugly but works
      if (sheepFlock[i].sheepDir == 0){
          targetX -= 2;
        }
      if (sheepFlock[i].sheepDir == 3){
          targetX += 2;
        }
      if (sheepFlock[i].sheepDir == 2){
          targetY += 2;
        }
      if (sheepFlock[i].sheepDir == 1){
          targetY -= 2;
        }

      if (sheepFlock[i].sheepDir == 4){
          targetY -= 2;
          targetX += 2;
          sheepFlock[i].sprite.gotoAndStop(3);
        }

      if (sheepFlock[i].sheepDir == 5){
          targetY -= 2;
          targetX -= 2;

        }

      if (sheepFlock[i].sheepDir == 6){
          targetY += 2;
          targetX += 2;

        }

      if (sheepFlock[i].sheepDir == 7){
          targetY += 2;
          targetX -= 2;

      }

      if (isValidDirection(targetX, targetY)) {
        this.tileX = targetX;
        this.tileY = targetY;
      }
    }
     this.randomizeSheep();
     moveSheep = 0; 
  };
};

