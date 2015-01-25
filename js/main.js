var stage, item;


function init() {

    stage = new createjs.Stage("demoCanvas");
    dog = new Dog();
    sheep = new Flock(20);
    console.log(typeof(dog.sprite));

    stage.addChild(dog.sprite);
    flk = sheep.getFlock();
    for (i=0; i<flk.length; i++) {
        stage.addChild(flk[i].sprite);
    }
    createjs.Ticker.setFPS(30);
    createjs.Ticker.addEventListener("tick", stage);
    createjs.Ticker.addEventListener("tick", tick_game);
    createjs.Ticker.addEventListener("tick", tick_stage);

}

function tick_game(event) {
    dog.movement();
    sheep.moveFlock();
    sheep.randomizeSheep();
}

function tick_stage(event) {
    stage.update(event); // important!!
}