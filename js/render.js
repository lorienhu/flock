

var tileW = 128;
var tileH = 64;

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

    this.worldToCam = function (item) {

    	if (item.worldX != undefined && item.worldY != undefined) {
        	var camX = item.worldX - this.worldX;
        	var camY = item.worldY - this.worldY;
    	}
    	else {
        	var camX = item.getWorldX() - this.worldX;
        	var camY = item.getWorldY() - this.worldY;
        }

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
            && item.worldY + tileH >= this.worldY
            && item.worldY - tileW <= this.worldY+this.height) {
            	return true;

    		}
        }
        return false;
    }

    this.draw = function (item) {

    	if (this.isInCam(item)) {
    		item.sprite.alpha = 1;
    		this.worldToCam(item);
		}
		else {
			item.sprite.alpha = 0;
		}

    }
}

var Tile = function(coords) {
	this.sprite = new createjs.Bitmap("assets/img/tiles/sample.png");
	this.worldX = coords[0];
	this.worldY = coords[1];
}

function createTiles() {

	tilemap = []

	for (var i=0;i<10;i++) {
		tilemap.push([]);
		for (var j=0;j<10;j++) {
			tilemap[i].push(new Tile((isoToWorld(i, j))));
			stage.addChild(tilemap[i][j].sprite);
		}
	}

}

function isValidDirection(x, y) {
	// Check if the tile is 
	if ((x >= 0.5 && y >= -0.6) &&
		(x <= (tilemap.length + 0.1) && y <= (tilemap[0].length) - 0.9)) {
		return true;
	}
	return false;
}

function getTile(item) {
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