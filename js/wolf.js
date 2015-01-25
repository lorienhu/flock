var Wolf = function() {
	//sheep 
	this.spriteSheet = new createjs.SpriteSheet({
		images: ["assets/img/wolf.png"],
		frames: {width: 50, height: 50, regX: 25, regY: 25},
		animations: {
			W: 0,
			E: 3,
			N: 1,
			S: 2,
		}});

	this.sprite = new createjs.Sprite(this.spriteSheet);
	this.tileX = 3;
	this.tileY = 2;
	this.images = ["img/wolf.png"];
	this.speed = 0.01;

	this.getWorldX = function() {
      return isoToWorld(this.tileX, this.tileY)[0];
    }

    this.getWorldY = function() {
      return isoToWorld(this.tileX, this.tileY)[1];
    }

	this.howl = function() {
		console.log("awoooo");
	};

	//is there a sheep within 10 tiles close to the wolf? 
	//if so, that sheep is lunch. The wolf shall have lunch.
	function whatLunch(){
		var closeLunch = 10;
		var lunch = null;
		var len = sheep.sheepFlock.length;
		for(var i = 0; i< len; i++)
		{
			var currRad = dist(sheep.sheepFlock[i], this);
			if(currRad<=closeLunch)
				lunch = sheep.sheepFlock[i];
		}
		return lunch;
	}
	
	//what direction the wolf needs to move in to eat the chosen one
	function getDir(nom){
		var dx = this.tileX - nom.tileX;
		var dy = this.tileY - nom.tileY;

		//absolute values for deciding which axis to prioritize movement
		var adx = Math.abs(dx);
		var ady = Math.abs(dy);

		//The dog failed and a sheep is dead. 
		//For every sheep that dies, a soul is sacrificed to cthulhu.
		if (dx == 0 && dy == 0)
			return null;

		//you still have time to save the sheep


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
	}

	//The wolf is now stalking the chosen sheep. 
	//May the player have mercy on the sheep's soul.
	this.moveWolf = function(){
		var nearSheep = whatLunch();
		if(nearSheep == null)
			return;
		var lDist = dist(nearSheep, this);
		if(lDist <= 5)
			this.speed *= 2;
		var dir = getDir(nearSheep);
		
		//if the dir =  null then there's nowhere to go
		if(dir == null)
			return;

		//otherwise just move at a regular pace defined by speed.
		switch(dir)
		{
			case "SW": this.tileX += this.speed;
						break;
			case "NE": this.tileX -= this.speed;
						break;
			case "SE": this.tileY += this.speed;
						break;
			case "NW": this.tileY -= this.speed;
						break;
			case "N" : this.tileX -= this.speed;
						this.tileY -= this.speed;
						break;
			case "S" :this.tileX += this.speed;
						this.tileY += this.speed;
						break;
			case "E" :this.tileX += this.speed;
						this.tileY -= this.speed;
						break;
			case "w" :this.tileX -= this.speed;
						this.tileY += this.speed;
						break;
		}
	}
}
