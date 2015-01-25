var stage, item;

var START_X = 0;
var START_Y = 0;

function init() {

    // Initialize world and stage.
    worldWidth = 800;
    worldHeight = 400;

    tileCentreX = worldWidth/2;
    tileCentreY = worldHeight/2;

    stage = new createjs.Stage("demoCanvas");
    // Create ticker.
    createjs.Ticker.setFPS(30);
    createjs.Ticker.addEventListener("tick", stage);
    createjs.Ticker.addEventListener("tick", tick_game);
    createjs.Ticker.addEventListener("tick", tick_render);

    // Create camera.
    camera = new Camera(stage);
    camera.worldX = START_X;
    camera.worldY = START_Y;

    // Create dog and sheep.
    dog = new Dog();
    sheep = new Flock(12);
    
    loadSounds();
    playBackground();
    windWhooshing()

    createTiles();

    stage.addChild(dog.sprite);
    for (i=0; i<sheep.sheepFlock.length; i++) {
        stage.addChild(sheep.sheepFlock[i].sprite);
    }
}

function tick_game(event) {
    sheep.moveFlock();
    dog.move();
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

    //stage.update(event); // important!!
}