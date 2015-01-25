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
    this.worldx = 200;
    this.worldy = 200;
    this.sprite.x = this.worldx;
    this.sprite.y = this.worldy;
    this.images = ["img/sheep.png"];
    var sheepOreantation = 0; // 2 left, 6 right, 0 up, 4 down, 5 SE, 3 SW, 7 NE, 1 NW 
    var sheepRadius = 20;

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
        chosenOne.sheepOreantation = (Math.floor((Math.random() * 7) + 0));
        chosenOne.sprite.gotoAndStop(chosenOne.sheepOreantation);
        randomSheep = 0;
      }
    }
  };
// returnes the array of sheep
  this.getFlock = function() {
    return sheepFlock;
  };

  this.moveFlock = function() {
    moveSheep++;

    if (moveSheep >= 4) {


    for (i = 0; i<sheepFlock.length; i++) {
      // ugly but works
      if (sheepFlock[i].sheepOreantation == 2){
          sheepFlock[i].sprite.x -= 2;
          sheepFlock[i].sprite.gotoAndStop(2);
        }
      if (sheepFlock[i].sheepOreantation == 6){
          sheepFlock[i].sprite.x += 2;
          sheepFlock[i].sprite.gotoAndStop(6);
        }
      if (sheepFlock[i].sheepOreantation == 0){
          sheepFlock[i].sprite.y += 2;
          sheepFlock[i].sprite.gotoAndStop(0);
        }
      if (sheepFlock[i].sheepOreantation == 4){
          sheepFlock[i].sprite.y -= 2;
          sheepFlock[i].sprite.gotoAndStop(4);
        }
// the orentation is a little messed up here but im just going along with it and not questioning it
      if (sheepFlock[i].sheepOreantation == 5){
          sheepFlock[i].sprite.y -= 2;
          sheepFlock[i].sprite.x += 2;
          sheepFlock[i].sprite.gotoAndStop(3);
        }

      if (sheepFlock[i].sheepOreantation == 3){
          sheepFlock[i].sprite.y -= 2;
          sheepFlock[i].sprite.x -= 2;
          sheepFlock[i].sprite.gotoAndStop(0);

        }

      if (sheepFlock[i].sheepOreantation == 7){
          sheepFlock[i].sprite.y += 2;
          sheepFlock[i].sprite.x += 2;
          sheepFlock[i].sprite.gotoAndStop(3);

        }

      if (sheepFlock[i].sheepOreantation == 1){
          sheepFlock[i].sprite.y += 2;
          sheepFlock[i].sprite.x -= 2;
          sheepFlock[i].sprite.gotoAndStop(0);

        }
    }
     this.randomizeSheep();
     moveSheep = 0; 
   }
  };
};

