var Sheep = function() {

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
    this.tileX = 5;
    this.tileY = 5;

    this.images = ["img/dog.png"];
    var sheepDir = 3; // 0 left, 3 right, 1 up, 2 down, 4(3) SE, 5(0) SW, 6(3) NE, 7(0) NW 

    this.getWorldX = function() {
      return isoToWorld(this.tileX, this.tileY)[0];
    }

    this.getWorldY = function() {
      return isoToWorld(this.tileX, this.tileY)[1];
    }

    this.baa = function() {
      console.log("Baa!")
    };

  };

var Flock = function(NumSheep) {
  var sheepFlock = [];
  var sheepState = "walking";
  var randomSheep = 0;


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
        if ((chosenOne.sheepDir == 4) || (chosenOne.sheepDir == 6)) {
          chosenOne.sprite.gotoAndStop(3);
        }
        if ((chosenOne.sheepDir == 5) || (chosenOne.sheepDir == 7)) {
          chosenOne.sprite.gotoAndStop(0);
        }
        chosenOne.sprite.gotoAndStop(chosenOne.sheepDir);
        randomSheep = 0;
      }
    }
  };

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
          sheepFlock[i].sprite.gotoAndStop(0);

      }

      if (isValidDirection(targetX, targetY)) {
        this.tileX = targetX;
        this.tileY = targetY;
      }
    }
  };


};

