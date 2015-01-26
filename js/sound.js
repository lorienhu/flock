//<script src="https://code.createjs.com/soundjs-0.6.0.min.js"></script></head>

//creatures
var sheep; 
var dog;
var wolf;
var river;
//sounds
var backgroundSound = "BackgroundSound";
var dogSounds = ["BarkOnce", "BarkTwice"];
var sheepSounds = ["SheepSound1", "SheepSound2"];
var wolfSounds = ["WolfGrowl", "WolvesGrowl"];
var dyingSheepSound = "DyingSheep";
var windSound = "WindSound";
var waterSound = "WaterSound"; 
var gameOverSound = "PlayGameOverSound";
var grassRustlingSound = "GrassRustlingSound";


//checks if an object is on your screen
function isOnScreen() {
	return true; 
}

//checks if an object is within a certain predetermined radius
function isNearby() {
	return true;
}

function isNotGameOver() {
	return true;
}

//connecting the sounds...NOTE: dyingSheep/gameOver sound isnt found yet.
function loadSounds() {

	function loadHandler(event) {
     // This is fired for each sound that is registered.
    	if (event.id == "backgroundSound") {
    		    playBackground();
    	}
    	else if (event.id == "windSound") {
    		    windWhooshing();
    	}
    	//instance.on("backgroundSound", createjs.proxy(this.handleComplete, this));
    	//instance.volume = 0.5;
 	}	

	createjs.Sound.addEventListener("fileload", loadHandler);
	createjs.Sound.registerSound("assets/sounds/background_sound.ogg", backgroundSound);
	createjs.Sound.registerSound({id:"backgroundSound", src:"assets/sounds/background_sound.ogg"});
	createjs.Sound.registerSound("assets/sounds/dog_bark_once.ogg", dogSounds[0]);
	createjs.Sound.registerSound("assets/sounds/dog_bark_twice.ogg", dogSounds[1]);
	createjs.Sound.registerSound("assets/sounds/sheep_bleat_001.ogg", sheepSounds[0]);
	createjs.Sound.registerSound("assets/sounds/sheep_bleat_002.ogg", sheepSounds[1]);
	createjs.Sound.registerSound("assets/sounds/wolf_low_growl.ogg", wolfSounds[0]);
	createjs.Sound.registerSound("assets/sounds/wolves_timber_wolves_howling.ogg", wolfSounds[1]);
	createjs.Sound.registerSound("assets/sounds/sheep_bleat_001.ogg", dyingSheepSound);
	createjs.Sound.registerSound("assets/sounds/wind_effect.ogg", windSound);
	createjs.Sound.registerSound({id:"windSound", src:"assets/sounds/wind_effect.ogg"});
	createjs.Sound.registerSound("assets/sounds/water_river_sound.ogg", waterSound);
	createjs.Sound.registerSound("assets/sounds/water_river_sound.ogg", gameOverSound);	
	createjs.Sound.registerSound("assets/sounds/grass_rustling.ogg", grassRustlingSound);
}

function handleFileLoad(event) {
    // A sound has been preloaded.
    //console.log("Preloaded:", event.id, event.src);
}

function playBackground(){
	//while (isNotGameOver()) 
	createjs.Sound.play("backgroundSound", {interrupt: createjs.Sound.INTERRUPT_NONE, loop:-1, data:1});		
}

//sheep making normal baaing sounds
function baa() {
	//if (sheep.isOnScreen()	)
	var i = Math.floor(Math.random() * 4);
	
	if (i == 0) {
		var instance = createjs.Sound.play(sheepSounds[0]);
		instance.volume = 0.5;
	}
   	else if (i == 1) {
   		var instance = createjs.Sound.play(sheepSounds[1], {interrupt: createjs.Sound.INTERRUPT_NONE, data:1});
   		instance.volume = 0.5;
   	}
	
}

function woof() {
	var i = Math.random();
		if (i%2 == 0) createjs.Sound.play(dogSounds[0]);
		else createjs.Sound.play(dogSounds[1]);
}

function howl() {
	if (isOnScreen()) {
		var i = Math.random();
		if (i%2==0) createjs.Sound.play(wolfSounds[0]);
		else createjs.Sound.play(wolfSounds[1]);
	}
}	

function dyingSheep() {
	if (isOnScreen()) {
		createjs.Sound.play(dyingSheepSound);
	}
}

function windWhooshing() {
	if (isOnScreen()) {
		createjs.Sound.play(windSound, {interrupt: createjs.Sound.INTERRUPT_ANY, loop:-1});
		createjs.Sound.play(grassRustlingSound, {interrupt: createjs.Sound.INTERRUPT_NONE, loop:-1, data:1});				
		//createjs.Sound.setVolume(0.3);
	}
}

function waterSplashing() {
	if (isOnScreen()) {
		createjs.Sound.play(waterSound);
	}
}

function playGameOver() {
	createjs.Sound.stop();
}
