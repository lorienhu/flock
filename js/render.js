

var tileW = 128;
var tileH = 64;

var Tile = function(coords) {
	worldX = coords[0];
	worldY = coords[1];

	this.sprite = new createjs.Bitmap("assets/img/tiles/sample.png");
	this.sprite.x = worldX;
	this.sprite.y = worldY;
}

function drawTiles() {

	var tilemap = [];

	for (var i=0;i<10;i++) {
		tilemap.push([]);

		for (var j=0;j<10;j++) {
			tilemap[i].push(new Tile((isoToWorld(i, j))));
			console.log(tilemap[i][j].sprite.x);
			stage.addChild(tilemap[i][j].sprite);
		}
	}

}


function worldToIso (worldX, worldY) {

	isoX = (worldX / (tileW/2) + worldY / (tileH/2)) /2;
	isoY = (worldY / (tileH/2) - (worldX / (tileW/2))) /2

	return [isoX, isoY];
}

function isoToWorld (isoX, isoY) {

	worldX = (isoX - isoY) * (tileW/2);
	worldY = (isoX + isoY) * (tileH/2);

	return [worldX, worldY];

}