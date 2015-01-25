var stage, item;


var Camera = function (stage) {

    var worldX = 0;
    var worldY = 0;
    var width = stage.canvas.width;
    var height = stage.canvas.height;

    this.worldToCam = function (worldX, worldY) {

        var camX = worldX - this.worldX;
        var camY = worldY - this.worldY;

        return [camX, camY];
    }

    this.isInCam = function (worldX, worldY) {

        if (worldX >= this.worldX
            && worldX <= this.worldX+this.width
            && worldY >= this.worldY
            && worldY <= this.worldY+this.height) {
            return true;
        }
        return false;
    }
}

function init() {

    loadSounds();
    playBackground();
    windWhooshing();

    worldWidth = 6600;
    worldHeight = 3500;
    stage = new createjs.Stage("demoCanvas");
    camera = new Camera(stage);
    camera.worldX = isoToWorld(4,4)[0] + camera.width/2;
    camera.worldY = isoToWorld(4,4)[1] + camera.height/2;
    console.log(camera.worldX);
    console.log(camera.worldY);

    dog = new Dog();
    sheep = new Flock(3);
    console.log(typeof(dog.sprite));

    createjs.Ticker.setFPS(30);
    createjs.Ticker.addEventListener("tick", stage);
    createjs.Ticker.addEventListener("tick", tick_game);
    createjs.Ticker.addEventListener("tick", tick_render);

    tilemap = drawTiles();

    stage.addChild(dog.sprite);
    flk = sheep.getFlock();

    for (i=0; i<flk.length; i++) {
        stage.addChild(flk[i].sprite);
    }
}

function tick_game(event) {
    sheep.moveFlock();
    sheep.randomizeSheep();
    dog.move();

    for (var i=0;i<10;i++) {
        for (var j=0;j<10;j++) {
            tilemap[i][j].move();
        }
    }
}

function tick_render(event) {
    stage.update(event); // important!!
}