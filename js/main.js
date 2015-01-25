var stage, item;


function init() {

    camera = {  x: 50,
                y: 50,
            };
    stage = new createjs.Stage("demoCanvas");

    dog = new Dog();
    flock = [];
    bgtemp = new Bgtile();
    stage.addChild(bgtemp.sprite);
    stage.addChild(dog.sprite);

    createjs.Ticker.setFPS(30);
    createjs.Ticker.addEventListener("tick", stage);
    createjs.Ticker.addEventListener("tick", tick_game);
    createjs.Ticker.addEventListener("tick", tick_render);
    
    loadSounds();
    playBackground();
    windWhooshing()
}

function tick_game(event) {
    dog.move();
    bgtemp.update(dog.worldx, dog.worldy)
    stage.update(event); // important!!
    //flock.move();
}

function tick_render(event) {
    //stage.update(event); // important!!
}