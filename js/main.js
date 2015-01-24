var stage, item;


function init() {

    camera = {  x: 50,
                y: 50,
            };
    stage = new createjs.Stage("demoCanvas");

    dog = new Dog();
    flock = [];

    stage.addChild(dog.sprite);

    createjs.Ticker.setFPS(30);
    createjs.Ticker.addEventListener("tick", stage);
    createjs.Ticker.addEventListener("tick", tick_game);
    createjs.Ticker.addEventListener("tick", tick_render);

}

function tick_game(event) {
    dog.move();
    //flock.move();
}

function tick_render(event) {
    stage.update(event); // important!!
}