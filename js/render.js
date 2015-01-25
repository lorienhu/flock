

var tileW = 256;
var tileH = 128;

var Camera = function (stage) {

    this.worldX = 0;
    this.worldY = 0;
    this.width = stage.canvas.width;
    this.height = stage.canvas.height;

    this.update = function () {
    	this.worldX = dog.getWorldX() - this.width/2;
    	this.worldY = dog.getWorldY() - this.height/2;
    	//this.worldX = dog.getWorldX();
    	//this.worldY = dog.getWorldY();
    }

    this.getCamCentre = function () {
        return [this.width/2, this.height/2];
    }

    this.worldToCamBG = function (item) {

        var camX = item.worldX - this.worldX - 7.5*worldWidth/7;
        var camY = item.worldY - this.worldY - 0.16*worldHeight;

        console.log(item.sprite.x);
        console.log(item.sprite.y);


        item.sprite.x = camX;
        item.sprite.y = camY;
    }

    this.worldToCam = function (item) {

    	if (item.worldX != undefined && item.worldY != undefined) {
        	var camX = item.worldX - this.worldX;
        	var camY = item.worldY - this.worldY;
    	}
    	else {
        	var camX = item.getWorldX() - this.worldX;
        	var camY = item.getWorldY() - this.worldY;
        }

        console.log(item.sprite.x);
        console.log(item.sprite.y);


        item.sprite.x = camX;
        item.sprite.y = camY;

    }

    this.isInCam = function (item) {

    	if (item.worldX == undefined) {
			if (item.getWorldX() + tileW >= this.worldX
			            && item.getWorldX() - tileW <= this.worldX+this.width
			            && item.getWorldY() + tileH >= this.worldY
			            && item.getWorldY() - tileW <= this.worldY+this.height) {
			            	return true;
    		}
    	}
    	else {
    		if (item.worldX + tileW >= this.worldX
            && item.worldX - tileW <= this.worldX+this.width
            && item.worldY + tileH+55 >= this.worldY
            && item.worldY - tileH - 55 <= this.worldY+this.height) {
            	return true;

    		}
        }
        return false;
    }

    this.draw = function (item) {
        if (item.name=="Sheep" && item.state == "herded") {
            item.sprite.alpha = 1;
        }
        else if (item.name == "Sheep") {
            item.sprite.alpha = 0.8;
        }

    	if (this.isInCam(item)) {
    		item.sprite.visible = true;
    		this.worldToCam(item);
		}
		else {
			item.sprite.visible = false;
		}

    }
}

var BackgroundImage = function() {
    this.sprite = new createjs.Bitmap(bgImg);
    this.worldX = 0;
    this.worldY = 0;
}

var Tile = function(coords) {
    var ran = Math.floor(Math.random() * grassImg.length);
	this.sprite = new createjs.Bitmap(grassImg[ran]);
	this.worldX = coords[0];
	this.worldY = coords[1];
}

function createTiles() {

	tilemap = []
    tiles = new createjs.Container();
    tiles.x = 0;
    tiles.y = 0;

	for (var i=0;i<10;i++) {
		tilemap.push([]);
		for (var j=0;j<10;j++) {
			tilemap[i].push(new Tile((isoToWorld(i, j))));
            tiles.addChild(tilemap[i][j].sprite);
			//stage.addChild(tilemap[i][j].sprite);
		}
	}

    stage.addChild(tiles);
    //tiles.cache(0, 0, worldWidth, worldHeight);


}

function parseFlt(elem) {
    return parseFloat(elem).toFixed(1);
}

function isValidDirection(x, y) {
	valid = true;
    // map edge check
	if ((x >= 0.6 && y >= -0.4) && (x <= (tilemap.length + 0.6) && 
        y <= (tilemap[0].length) - 0.4)) {
            for (var i = 0; i<sheep.sheepFlock.length; i++) {
                // check to make sure that the two objects are the same
                if (!(parseFlt(sheep.sheepFlock[i].tileX) == parseFlt(x)) 
                    && !(parseFlt(sheep.sheepFlock[i].tileY) == parseFlt(y))) {
                    var isBoink = specialDist(sheep.sheepFlock[i], x, y);
                    if (isBoink <= 0.19) {
                        valid = false;
                    } 
                }
            }
	   }
	else {valid = false;}
    return valid;
}


function getTile(item) {
	var tile = worldToIso(item.getWorldX, item.getWorldY);
	return tilemap[tile[0][1]];
}

// takes in a tile and an item and determines if they collide with each other.
function collideTile(item) {
    var tile = worldToIso(item.getWorldX, item.getWorldY);
    return tilemap[tile[0][1]];
}

function worldToIso (worldX, worldY) {

	var isoX = ((worldX / (tileW/2) + worldY / (tileH/2)) /2) - tileCentreX;
	var isoY = ((worldY / (tileH/2) - (worldX / (tileW/2))) /2) - tileCentreY;

	return [isoX, isoY];
}

function isoToWorld (isoX, isoY) {

	var worldX = ((isoX - isoY) * (tileW/2)) + tileCentreX;
	var worldY = ((isoX + isoY) * (tileH/2)) + tileCentreY;

	return [worldX, worldY];

}