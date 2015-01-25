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
    this.worldx = 200;
    this.worldy = 200;
    this.sprite.x = this.worldx;
    this.sprite.y = this.worldy;
    this.images = ["img/dog.png"];
    var sheepOreantation = 3; // 0 left, 3 right, 1 up, 2 down, 4(3) SE, 5(0) SW, 6(3) NE, 7(0) NW 

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
        chosenOne.sheepOreantation = (Math.floor((Math.random() * 7) + 0));
        if ((chosenOne.sheepOreantation == 4) || (chosenOne.sheepOreantation == 6)) {
          chosenOne.sprite.gotoAndStop(3);
        }
        if ((chosenOne.sheepOreantation == 5) || (chosenOne.sheepOreantation == 7)) {
          chosenOne.sprite.gotoAndStop(0);
        }
        chosenOne.sprite.gotoAndStop(chosenOne.sheepOreantation);
        randomSheep = 0;
      }
    }
  };

  this.getFlock = function() {
    return sheepFlock;
  };

  this.moveFlock = function() {
    for (i = 0; i<sheepFlock.length; i++) {
      // ugly but works
      if (sheepFlock[i].sheepOreantation == 0){
          sheepFlock[i].sprite.x -= 2;
        }
      if (sheepFlock[i].sheepOreantation == 3){
          sheepFlock[i].sprite.x += 2;
        }
      if (sheepFlock[i].sheepOreantation == 2){
          sheepFlock[i].sprite.y += 2;
        }
      if (sheepFlock[i].sheepOreantation == 1){
          sheepFlock[i].sprite.y -= 2;
        }

      if (sheepFlock[i].sheepOreantation == 4){
          sheepFlock[i].sprite.y -= 2;
          sheepFlock[i].sprite.x += 2;
          sheepFlock[i].sprite.gotoAndStop(3);
        }

      if (sheepFlock[i].sheepOreantation == 5){
          sheepFlock[i].sprite.y -= 2;
          sheepFlock[i].sprite.x -= 2;

        }

      if (sheepFlock[i].sheepOreantation == 6){
          sheepFlock[i].sprite.y += 2;
          sheepFlock[i].sprite.x += 2;

        }

      if (sheepFlock[i].sheepOreantation == 7){
          sheepFlock[i].sprite.y += 2;
          sheepFlock[i].sprite.x -= 2;
          sheepFlock[i].sprite.gotoAndStop(0);

        }
    }
  };


};

