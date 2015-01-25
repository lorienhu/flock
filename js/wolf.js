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
	this.worldx = 0;
	this.worldy = 0;
	this.sprite.x = stage.canvas.width/2 + 100;
	this.sprite.y = stage.canvas.height/2 + 100;
}
