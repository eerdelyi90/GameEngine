var Engine = window.Engine || {};

Engine.GameObject = (function () {
    this.audioArray = [];

    //Constructor
    function GameObject() {
        Engine.Object.call(this);
        this.transform = new Engine.Transform();
        this.sprite;
    }

    //Shows object on the stage
    function show(x, y) {
        if (typeof x === 'undefined') {
        } else if (typeof y === 'undefined') {
            throw "Need 2 values for x and y.";
        } else {
            if (!_.isNumber(x) || !_.isNumber(y)) {
                throw ("X and Y need to be numbers.");
            }
            this.transform.setPositionX(x);
            this.transform.setPositionY(y);
        }
        if (!stage.contains(this.sprite)) {
            stage.addChild(this.sprite);
        }
    }

    //Hides child on the stage
    function hide() {
        stage.removeChild(this);
    }

    //Retrieves the transform
    function getTransform() {
        return this.transform;
    }

    //This is ran every frame
    function tickFunction() {
        this.sprite.x = this.transform.posX;
        this.sprite.y = this.transform.posY;
    }

    //Sets a non-animating sprite to this game object
    function setStaticSprite(filename) {
        if (!_.isString(filename)) {
            throw ("Invalid Filename.");
        }
        var sprite = new createjs.Bitmap('assets/' + filename);
        this.sprite = sprite;
        this.sprite.addEventListener('tick', tickFunction.bind(this));
    }

    //Sets a vector based non-animating sprite to this object
    function setShapeSprite() {
        var sprite = new createjs.Shape();
        this.sprite = sprite;
        this.sprite.addEventListener('tick', tickFunction.bind(this));
    }

    //Retrieves the sprite
    function getSprite() {
        return this.sprite;
    }

    //Sets an audio file to this game object. Can set more than one. e.g. hit sound, attack sound
    function addAudio(filename) {
        if (!_.isString(filename)) {
            throw ("Invalid Filename.");
        }
        var audio = createjs.Sound.createInstance('assets/' + filename);
        audioArray.push(audio);
    }

    //Gets a certain sound of a game object
    function getAudio(index) {
        return audioArray[index];
    }

    //Plays a certain sound from a game object
    function playAudio(index, loop, volume, pan) {
        var playback = 0;
        if (typeof index === 'undefined') {
            throw "Need index of sound file";
        } else if (typeof loop === 'undefined') {
            loop = false;
        } else if (typeof volume === 'undefined') {
            volume = 1;
        } else {
            pan = 0;
            if (!_.isNumber(index) || !_.isNumber(volume) || !_.isNumber(pan) || !_.isBoolean(loop)) {
                throw ("Check argument types.");
            }
        }
        if (loop == true) {
            playback = -1
        } else {
            playback = 0;
        }
        audioArray[index].play(createjs.Sound.INTERRUPT_NONE, 0, 0, playback, volume, pan);
    }

    //Stop playing a certain sound from a game object 
    function stopAudio(index) {
        audioArray[index].stop();
    }

    //Wrapper function to parse event listeners to the sprite of the game object
    function addEventListener(type, listener, useCapture) {
        this.sprite.addEventListener(type, listener, useCapture);
    }

    //public methods
    GameObject.prototype = new Engine.Object();
    //GameObject.prototype.constructor = GameObject;
    GameObject.prototype.getTransform = getTransform;
    GameObject.prototype.show = show;
    GameObject.prototype.hide = hide;
    GameObject.prototype.addAudio = addAudio;
    GameObject.prototype.getAudio = getAudio;
    GameObject.prototype.playAudio = playAudio;
    GameObject.prototype.stopAudio = stopAudio;
    GameObject.prototype.getSprite = getSprite;
    GameObject.prototype.setStaticSprite = setStaticSprite;
    GameObject.prototype.setShapeSprite = setShapeSprite;
    GameObject.prototype.addEventListener = addEventListener;

    return GameObject;
})();