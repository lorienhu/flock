var stage, item;


function init() {

    stage = new createjs.Stage("demoCanvas");
    dog = new Dog();
    console.log(typeof(dog.sprite));

    stage.addChild(dog.sprite);
    createjs.Ticker.setFPS(30);
    createjs.Ticker.addEventListener("tick", stage);
    createjs.Ticker.addEventListener("tick", tick_game);
    createjs.Ticker.addEventListener("tick", tick_stage);

}

function tick_game(event) {
    dog.movement();
}

function tick_stage(event) {
    stage.update(event); // important!!
}