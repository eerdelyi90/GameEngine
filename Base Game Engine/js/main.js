var stage;
var queue;
(function init() {
    stage = new createjs.Stage("myCanvas");

    var apple = new Engine.GameObject();
    apple.addAudio('pop.mp3');
    apple.setStaticSprite('daisy.png');
    var ball = new Engine.GameObject();
    ball.setShapeSprite();
    ball.getSprite().graphics.beginFill("#000000").drawCircle(0, 0, 50);
    ball.show(50, 200);
    ball.addEventListener("click", handleClick);

    doShit();

    function doShit(event) {
        createjs.Ticker.addEventListener("tick", tick);
    }

    function handleClick(event) {
        apple.show(Math.random() * 500, Math.random() * 500);
        apple.playAudio(0, false);
    }

    function tick(event) {
        stage.update();
    }
})();