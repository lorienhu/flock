var Wolf = function() {
	
	this.spriteSheet = new createjs.SpriteSheet({
		images: ["assets/img/wolf.png"],
		frames: {width: 50, height: 50, regX: 25, regY: 25},
		animations: {
			moveleft: 0,
			moveright: 3,
			moveup: 1,
			movedown: 2,
		}});

	this.sprite = new createjs.Sprite(this.spriteSheet);
	this.worldx = 500;
	this.worldy = 400;
	this.sprite.x = this.worldx;
	this.sprite.y = this.worldy;
	this.images = ["img/wolf.png"];

	this.howl = function() {
		console.log("awoooo");
	};

	this.move = function() {


	}
}
