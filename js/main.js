var stage, item;

var START_X = 0;
var START_Y = 0;

function init() {

    tileImg = new Image();
    tileImg.src = "assets/img/tiles/sample.png";

    loadSounds();
    playBackground();
    windWhooshing();

    // Initialize world and stage.
    worldWidth = 800;
    worldHeight = 400;

    tileCentreX = worldWidth/2;
    tileCentreY = worldHeight/2;

    stage = new createjs.Stage("demoCanvas");
    stage.snapToPixelEnabled = true;
    // Create ticker.
    createjs.Ticker.setFPS(30);
    createjs.Ticker.addEventListener("tick", tick_game);
    createjs.Ticker.addEventListener("tick", tick_render);

    // Create camera.
    camera = new Camera(stage);
    camera.worldX = START_X;
    camera.worldY = START_Y;

    // Create dog and sheep.
    dog = new Dog();
    sheep = new Flock(12);

    createTiles();

    stage.addChild(dog.sprite);
    for (i=0; i<sheep.sheepFlock.length; i++) {
        stage.addChild(sheep.sheepFlock[i].sprite);
    }
}

function tick_game(event) {
    sheep.moveFlock();
    dog.move();
    for (var i=0; i<sheep.sheepFlock.length; i++) {
        sheep.sheepFlock[i].changeState();
    }

}

function tick_render(event) {

    camera.update();

    // Draw tiles.
    for (var i=0;i<10;i++) {
        for (var j=0;j<10;j++) {
            camera.draw(tilemap[i][j]);
        }
    }

    // Draw dog.
    camera.draw(dog);

    // Draw sheep.
    for (i=0; i<sheep.sheepFlock.length; i++) {
        camera.draw(sheep.sheepFlock[i]);
    }

    stage.update(event); // important!!
}

function dist(a, b){
    dx = a.tileX - b.tileX;
    dy = a.tileY - b.tileY;

    return Math.sqrt(dx*dx + dy*dy);
}

// 2 left, 6 right, 0 up, 4 down, 5 SE, 3 SW, 7 NE, 1 NW 
function dirToNum(dir) {

    switch (dir) {
        case "W":
            return 2;
        case "NW":
            return 1;
        case "N":
            return 0;
        case "NE":
            return 7;
        case "E":
            return 6;
        case "SE":
            return 5;
        case "S":
            return 4;
        case "SW":
            return 3;
        default:
            console.log("That isn't a direction..........");
            return -1;
    }

}

function numToDir(num) {
    console.log("unimplemented");
    return "W";
}

function directionTo(a, b){
    dx = a.tileX - b.tileX;
    dy = a.tileY - b.tileY;

    var adx = Math.abs(dx);
    var ady = Math.abs(dy);

    if (adx > ady) {
            if(dx < 0 )
                return "SE";
            if(dx > 0)
                return "NW";
        }
        else if (adx < ady) {
            if(dy < 0)
                return "SW";
            if(dy > 0)
                return "NE";
        }
        else if(adx == ady) {
            if(dy < 0)
                return "W";
            if(dy > 0)
                return "E";
            if(dx < 0)
                return "N";
            if(dx > 0)
                return "S";
        }

    return Math.ceil(Math.sqrt(dx*dx - dy*dy));
}


