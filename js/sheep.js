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
    var sheepOreantation = 0; // 0 left, 3 right, 1 up, 2 down

    this.baa = function() {
      console.log("Baa!")
    };

  };

var Flock = function(NumSheep) {
  var sheepFlock = [];
  var sheepState = "grazing";
  var randomSheep = 0;


    for (i=0; i<NumSheep; i++) {
      var daSheep = new Sheep(); 
      sheepFlock.push(daSheep);
    }

  this.randomizeSheep = function () {
    if (sheepState == "grazing") {
        randomSheep++;
        if (randomSheep>10) {
        var chosenOne = sheepFlock[(Math.floor((Math.random() * sheepFlock.length) + 0))]; 
        chosenOne.sheepOreantation = (Math.floor((Math.random() * 4) + 0));
        chosenOne.sprite.gotoAndStop(chosenOne.sheepOreantation);
        randomSheep = 0;
      }
    }
  };

  this.getFlock = function() {
    return sheepFlock;
  };

  this.moveFlock = function() {
    //if () {
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
  //}
}
  };


};

