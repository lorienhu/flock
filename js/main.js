var stage, item;

var START_X = 0;
var START_Y = 0;

var tkr = new Object;
//preloader
var preloader;
var manifest;
var totalLoaded = 0;

 
// Graphics
 
//[Title View]
var bg; //The Main Background
var startB; //The Start button in the main menu

var TitleView = new createjs.Container();

function init() {

     /* Link Canvas */
     
    canvas = document.getElementById('demoCanvas');
    stage = new createjs.Stage(canvas);
	context = canvas.getContext('2d');
    stage.snapToPixelEnabled = true;     
    stage.mouseEventsEnabled = true;
	bg = new createjs.Bitmap("assets/img/start.png");
    startB = new createjs.Bitmap("assets/img/playbutton.png");

    bgImg = new Image();
    bgImg.src = "assets/img/bg.jpg";
    background = new BackgroundImage();


    grassImg = [];
    for (var i=0;i<6;i++) {
        grassImg.push(new Image());
        grassImg[i].src = "assets/img/tiles/grass"+i+".png"
    }

    // Initialize world and stage.
    worldWidth = 1400;
    worldHeight = 1000;

    tileCentreX = worldWidth/2;
    tileCentreY = worldHeight/2;


    //stage = new createjs.Stage("demoCanvas");
    
    // Create ticker.
    createjs.Ticker.setFPS(30);
   // createjs.Ticker.addEventListener("tick", tick_game);
    //createjs.Ticker.addEventListener("tick", tick_render);
    createjs.Ticker.addEventListener("tick", tick_bg);

    addTitleView();
    //tweenTitleView();

<<<<<<< HEAD
}

function tick_bg(event) {
    stage.update();
=======
    // // create wolf (1 for now)
    // wolf = new Wolf();

    stage.addChild(background.sprite);
    createTiles();
    stage.addChild(dog.sprite);
    for (i=0; i<sheep.sheepFlock.length; i++) {
        stage.addChild(sheep.sheepFlock[i].sprite);
    }
    //stage.addChild(wolf.sprite);
>>>>>>> 0c0569893483d970b6146717c4defec44ca1af28
}

function tick_game(event) {
    sheep.moveFlock();
    dog.move();
    // wolf.moveWolf();    
}

function tick_render(event) {

    camera.update();

    camera.worldToCamBG(background);

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

    // // draw wolf at a random tick 
    // camera.draw(wolf);


    stage.update(event); // important!!
}


function dist(a, b){
    dx = a.tileX - b.tileX;
    dy = a.tileY - b.tileY;
    // temporary change optimization
    return dx*dx + dy*dy;
    //return Math.sqrt(dx*dx + dy*dy);
}

function specialDist(a, b, c) {
    ds = b - a.tileX;
    dt = c - a.tileY;
    return Math.sqrt(ds*ds + dt*dt);
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
            //console.log("That isn't a direction..........");
            return -1;
    }

}

function numToDir(num) {
    //console.log("unimplemented");
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

    return Math.ceil(Math.sqrt(dx*dx + dy*dy));
}

function handleProgress(event)
{
    //use event.loaded to get the percentage of the loading
}
 
function handleComplete(event) {
         //triggered when all loading is complete
}
 
function handleFileLoad(event) {
         //triggered when an individual file completes loading
             
         switch(event.type)
         {
            case PreloadJS.IMAGE:
            //image loaded
             var img = new Image();
              img.src = event.src;
              img.onload = handleLoadComplete;
              window[event.id] = new Bitmap(img);
            break;
 
            case PreloadJS.SOUND:
            //sound loaded
            handleLoadComplete();
            break;
         }
}

function handleLoadComplete(event) 
{
   totalLoaded++;
    
   if(manifest.length==totalLoaded)
   {
       addTitleView();
   }
}

function addTitleView()
{
    baa();
    startB.x = 240-31.5;
    startB.y = 160;
    startB.name = 'startB';
     
    TitleView.addChild(bg, startB);
    stage.addChild(TitleView);
    stage.update();
	
	bg.onload = function() {
		context.drawImage(bg, 100, 100);
	}
     
    /*
    // Button Listeners
    stage.enableMouseOver;
    console.log('QQ');
    startB.click = tweenTitleView();
    */
    startB.addEventListener("click", function (event) {
        //stage.clear();
        tweenTitleView();
        console.log("adksjcnkasjcnkasn");

        
    });

 //   if (startB is pressed ) tweenTitleView();


}

function tweenTitleView()
{       
    // Start Game
    createjs.Ticker.addEventListener("tick", tick_bg);
    grassImg = [];
    for (var i=0;i<6;i++) {
        grassImg.push(new Image());
        grassImg[i] = "assets/img/tiles/grass"+i+".png"
    }

    loadSounds();
    playBackground();
    windWhooshing();

   

    //stage = new createjs.Stage("demoCanvas");
    
    // Create ticker.
    createjs.Ticker.setFPS(30);
    createjs.Ticker.addEventListener("tick", tick_game);
    createjs.Ticker.addEventListener("tick", tick_render);
    createjs.Ticker.addEventListener("tick", tick_bg);


    // Create camera.
    camera = new Camera(stage);
    camera.worldX = START_X;
    camera.worldY = START_Y;

    // Create dog and sheep.
    dog = new Dog();
    sheep = new Flock(12);

    // create wolf (1 for now)
    wolf = new Wolf();

    stage.addChild(background.sprite);
    createTiles();
    stage.addChild(dog.sprite);
    for (i=0; i<sheep.sheepFlock.length; i++) {
        stage.addChild(sheep.sheepFlock[i].sprite);
    }
    stage.addChild(wolf.sprite);


    stage.addChild(dog.sprite);
    for (i=0; i<sheep.sheepFlock.length; i++) {
        stage.addChild(sheep.sheepFlock[i].sprite);
    }


}
