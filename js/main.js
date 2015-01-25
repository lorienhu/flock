var stage, item;

var START_X = 0;
var START_Y = 0;

var tkr = new Object;
//preloader
var preloader;
var manifest;
var totalLoaded = 0;

 
// Graphics
//[Background]
 
var bg; //The background graphic
 
//[Title View]
var main; //The Main Background
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
    startB = new createjs.Bitmap("assets/img/tiles/sand.png");

	/*
    //these are loading the start screen
	manifest = [
		{src: "assets/img/start.png", id: "bg"},
		{src: "assets/img/tiles/sand.png", id: "startB"}
	];
	

	preloader = new PreloadJS();
    preloader.onProgress = handleProgress;
    preloader.onComplete = handleLoadComplete; //***VS HANDLECOMPLETE?
    preloader.onFileLoad = handleFileLoad;
    preloader.loadManifest(manifest);
    */


    // Initialize world and stage.
    worldWidth = 800;
    worldHeight = 400;

    tileCentreX = worldWidth/2;
    tileCentreY = worldHeight/2;


    //stage = new createjs.Stage("demoCanvas");
    
    // Create ticker.
    createjs.Ticker.setFPS(30);
   // createjs.Ticker.addEventListener("tick", tick_game);
    //createjs.Ticker.addEventListener("tick", tick_render);

    addTitleView();
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
    startB.x = 240-31.5;
    startB.y = 160;
    startB.name = 'startB';
     
    TitleView.addChild(bg, startB);
    stage.addChild(TitleView);
    stage.update(event);
	
	bg.onload = function() {
		context.drawImage(bg, 100, 100);

	}
     
    /*
    // Button Listeners
    stage.enableMouseOver;
    console.log('QQ');
    startB.click = tweenTitleView();
    */
    var hi;
    startB.addEventListener("click", function (event) {
        alert("clicked");
        hi = true;
    });

    if (hi) {
        console.log('i am in hi');
        tweenTitleView();
    }

 //   if (startB is pressed ) tweenTitleView();


}

function tweenTitleView()
{       
    // Start Game
         
    grassImg = [];
    for (var i=0;i<6;i++) {
        grassImg.push(new Image());
        grassImg[i] = "assets/img/tiles/grass"+i+".png"
    }

    loadSounds();
    playBackground();
    windWhooshing();

    // Initialize world and stage.
    worldWidth = 800;
    worldHeight = 400;

    tileCentreX = worldWidth/2;
    tileCentreY = worldHeight/2;


    //stage = new createjs.Stage("demoCanvas");
    
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