var Engine = window.Engine || {};

Engine.Transform = (function () {

    function Transform() {
        this.posX = 0;
        this.posY = 0;
        this.rotation = 0;
        this.scaleX = 1;
        this.scaleY = 1;
    }

    function getPositionX() {
        return this.posX;
    }

    function getPositionY() {
        return this.posY;
    }

    function getRotation() {
        return this.rotation;
    }

    function getScaleX() {
        return this.scaleX;
    }

    function getScaleY() {
        return this.scaleY;
    }

    function setPositionX(value) {
        this.posX = value;
    }

    function setPositionY(value) {
        this.posY = value;
    }

    function setRotation(value) {
        this.rotation = value;
    }

    function setScaleX(value) {
        this.scaleX = value;
    }

    function setScaleY(value) {
        this.scaleY = value;
    }

    Transform.prototype.getPositionX = getPositionX;
    Transform.prototype.getPositionY = getPositionY;
    Transform.prototype.getRotation = getRotation;
    Transform.prototype.getScaleX = getScaleX;
    Transform.prototype.getScaleY = getScaleY;
    Transform.prototype.setPositionX = setPositionX;
    Transform.prototype.setPositionY = setPositionY;
    Transform.prototype.setRotation = setRotation;
    Transform.prototype.setScaleX = setScaleX;
    Transform.prototype.setScaleY = setScaleY;

    return Transform;
})();