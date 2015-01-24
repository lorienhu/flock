        var stage, item;
        function init() {
            initdog();
            stage = new createjs.Stage("demoCanvas");
            stage.addChild(dog);
            createjs.Ticker.setFPS(30);
            createjs.Ticker.addEventListener("tick", stage);
            createjs.Ticker.addEventListener("tick", tickfunc);
        }
        
        function tickfunc(event) {
            doginput();
            stage.update(event); // important!!
        }