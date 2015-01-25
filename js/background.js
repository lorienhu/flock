// Javascript by Maxim Tsai
// Instructions to use:
// In the header section, add <script src="dog.js"></script>
// Add initdog() in the function init() section of the main html file
// and add stage.addChild(dog);
// If there is a function tick(event), add doginput() in the area
// Note: Requires dog.png in the folder.

var bgtile;

var Bgtile = function() {
  this.sprite = new createjs.Bitmap("assets/img/background.png");
  this.sprite.x = 0;
  this.sprite.y = 0;
  this.worldx = 0;
  this.worldy = 0;

  this.update = function(xval, yval){
    this.sprite.x = (this.worldx-xval) - (this.worldy-yval);
    this.sprite.y = (this.worldx-xval) + (this.worldy-yval);
  }
};






