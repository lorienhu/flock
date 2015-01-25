//<script src="https://code.createjs.com/soundjs-0.6.0.min.js"></script></head>

//creatures
var sheep; 
var dog;
var wolf;
var river;
//sounds
var backgroundSound = "BackgroundSound"
var dogSounds = ["BarkOnce", "BarkTwice"];
var sheepSounds = ["SheepSound1", "SheepSound2"];
var wolfSounds = ["WolfGrowl", "WolvesGrowl"];
var dyingSheepSound = "DyingSheep";
var windSound = "WindSound";
var waterSound = "WaterSound"; 

//checks if an object is on your screen
function isOnScreen() {
	return true; 
};

//checks if an object is within a certain predetermined radius
function isNearby() {
	return true;
};

//connecting the sounds...NOTE: dying sheep sound isnt found yet.
function loadSounds() {
	createjs.Sound.registerSound("assets/sounds/background_sound.ogg", backgroundSound);
	createjs.Sound.registerSound("assets/sounds/dog_bark_once.ogg", dogSounds[0]);
	createjs.Sound.registerSound("assets/sounds/dog_bark_twice.ogg", dogSounds[1]);
	createjs.Sound.registerSound("assets/sounds/sheep_bleat_001.ogg", sheepSounds[0]);
	createjs.Sound.registerSound("assets/sounds/sheep_bleat_002.ogg", sheepSounds[1]);
	createjs.Sound.registerSound("assets/sounds/wolf_low_growl.ogg", wolfSounds[0]);
	createjs.Sound.registerSound("assets/sounds/wolves_timber_wolves_howling.ogg", wolfSounds[1]);
	createjs.Sound.registerSound("assets/sounds/sheep_bleat_001.ogg", dyingSheepSound);
	createjs.Sound.registerSound("assets/sounds/eerie_wind.ogg", windSound);
	createjs.Sound.registerSound("assets/sounds/water_river_sound.ogg", waterSound);
};

function playBackground(){
	createjs.Sound.play(backgroundSound);
}

//sheep making normal baaing sounds
function baa() {
	//if (sheep.isOnScreen()	)
	if (isOnScreen()) {
	//make sound
    createjs.Sound.play(sheepSounds[0]);
   	console.log ( 'HI I AM TRYING TO BAA' );
	}
};

function woof() {
	if (isOnScreen()) {
		createjs.Sound.play(dogSounds[0]);
	}
};

function howl() {
	if (isOnScreen()) {
		createjs.Sound.play(wolfSounds[0]);
	}
};

function dyingSheep() {
	if (isOnScreen()) {
		createjs.Sound.play(dyingSheepSound);
	}
};

function windWhooshing() {
	if (isOnScreen()) {
		createjs.Sound.play(windSound);	
		console.log("wind");
	}
};

function waterSplashing() {
	if (isOnScreen()) {
		createjs.Sound.play(waterSound);
	}
};

