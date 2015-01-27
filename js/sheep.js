var Sheep = function() {
  // create Sheep Object
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

// sheep start out randomly in map  
    this.tileX = (Math.random() * 8) + 1;
    this.tileY = (Math.random() * 8) + 1;

    this.dogdist = 5;
    this.images = ["img/sheep.png"];
    this.sheepDir = Math.floor((Math.random() * 7) + 0); // 2 left, 6 right, 0 up, 4 down, 5 SE, 3 SW, 7 NE, 1 NW 
    this.sprite.gotoAndStop(this.sheepDir);

    this.grazeTime = 0;
    this.walkTime = 0;
    this.maxGraze = 10*Math.floor((Math.random() * 5) + 1);
    this.maxWalk = 10*Math.floor((Math.random() * 10) + 1);

    this.rebel = Math.floor((Math.random() * 15) + 5);


// sets it to be either 1 or 0 so sheep are picked at random 
    this.state = "walking";

// changing state variable 
    this.changeState = function() {
      this.dogdist = Math.abs(dist(this, dog));
      
      if (this.state == "walking") {
        if (this.walkTime >= this.maxWalk) {
          this.state = "grazing";
          this.walkTime = 0;
          this.maxWalk = 10*Math.floor((Math.random() * 10) + 1)+this.rebel;
        }
        else {
          this.walkTime++;
        }
      }

      if (this.dogdist < 1.4) {
        this.state = "herded";
        this.grazeTime = 0;
        this.walkTime = 0;
        this.sheepDir = dirToNum(directionTo(dog, this));
      }
      else if (this.state == "herded") {
          this.state = "walking";
      }
      else if (this.state == "grazing") {
        if (this.grazeTime >= this.maxGraze) {
          this.state = "walking";
          this.grazeTime = 0;
          this.maxGraze = 30*Math.floor((Math.random() * 10) + 1);
        }
        else {
          this.grazeTime++;
       }
     }
     else if (this.state == "scared") {
      this.state = "walking";
    }
  };

  this.getWorldX = function() {
    return isoToWorld(this.tileX, this.tileY)[0];
  }

  this.getWorldY = function() {
    return isoToWorld(this.tileX, this.tileY)[1];
  }

  this.bounceOff = function (elem) {
    // random sheep direction
      elem.sheepDir = Math.floor((Math.random() * 7) + 0);
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

  for (var i = 0; i<this.sheepFlock.length; i++) {
    this.sheepFlock[i].changeState();

    if (this.sheepFlock[i].state != "walking"
      && this.sheepFlock[i].state != "herded") {
      continue;
    }
      var sheepSpeed = 0.01;
      if (this.sheepFlock[i].state == "herded") {
          sheepSpeed *= Math.min(3.2, 1.5/this.sheepFlock[i].dogdist);
      }

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
      else {
        this.sheepFlock[i].bounceOff(this.sheepFlock[i]);
      }

      if (this.sheepFlock[i].state == "walking") {
        this.randomizeSheep();
      }
    }
  };
};

