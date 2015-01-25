var stage, item;


function init() {

    camera = {  x: 50,
                y: 50,
            };
    stage = new createjs.Stage("demoCanvas");

    dog = new Dog();
    flock = [];

    createjs.Ticker.setFPS(30);
    createjs.Ticker.addEventListener("tick", stage);
    createjs.Ticker.addEventListener("tick", tick_game);
    createjs.Ticker.addEventListener("tick", tick_render);

    //console.log(worldToIso(64,96));
    console.log(isoToWorld(0,1));
    console.log(isoToWorld(0,2));
    console.log(isoToWorld(2,1));

    drawTiles();
    stage.addChild(dog.sprite);

    //sTile = new Tile(dog.sprite.x, dog.sprite.y);
    //stage.addChild(sTile.sprite);


}

function tick_game(event) {
    dog.move();
    //stage.update(event); // important!!
    //flock.move();
}

function tick_render(event) {
    stage.update(event); // important!!
}