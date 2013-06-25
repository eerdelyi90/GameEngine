var stage;
var queue;
(function init() {
    stage = new createjs.Stage("myCanvas");
    window.addEventListener('resize', resize, false);
    stage.canvas.width = window.innerWidth;
    stage.canvas.height = window.innerHeight;

    var apple = new Engine.GameObject();
    apple.addAudio('pop.mp3');
    apple.setStaticSprite('daisy.png');
    var ball = new Engine.GameObject();
    ball.setShapeSprite();
    ball.getSprite().graphics.beginFill("#000000").drawCircle(0, 0, 50);
    ball.show(50, 200);
    ball.addEventListener("click", handleClick);

    doShit();

    var level = new Engine.Level("assets/xmldoc.xml");
    level.show();
    //var levelParser = new Engine.LevelParser();
    //levelParser.parse("assets/xmldoc.xml");

    function doShit(event) {
        createjs.Ticker.addEventListener("tick", tick);
    }

    function handleClick(event) {
        apple.show(Math.random() * stage.canvas.width, Math.random() * stage.canvas.height);
        apple.playAudio(0, false);
    }

    function tick(event) {
        stage.update();
    }

    function resize() {
        // Resize the canvas element
        stage.canvas.width = window.innerWidth;
        stage.canvas.height = window.innerHeight;

        // Logo: top-right position (canvasWidth - image width - 10 px padding)
        //logo.x = stage.canvas.width - logo.image.width - 120 - 10;

        // Background: full screen redraw 
        //bg.graphics.clear()
        //bg.graphics.beginFill("#222").drawRect(0, 0, stage.canvas.width, stage.canvas.height);

    }
})();