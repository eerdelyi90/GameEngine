var Engine = window.Engine || {};

Engine.TileSet = (function () {

    function TileSet(firstgid, name, tileWidth, tileHeight, source, imageWidth, imageHeight) {
        Engine.Object.call(this);
        if (!_.isNumber(firstgid) || !_.isNumber(tileWidth) || !_.isNumber(tileHeight) || !_.isNumber(imageWidth) || !_.isNumber(imageHeight)) {
            throw "Some arguments need to be a number.";
        }

        this.firstgid = firstgid;
        this.name = name;
        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;
        this.source = source;
        this.imageWidth = imageWidth;
        this.imageHeight = imageHeight;
        this.tileAmountWidth = Math.floor(imageWidth / tileWidth);
        this.tileAmountHeight = Math.floor(this.imageHeight / this.tileHeight);
        this.lastgid = (this.tileAmountWidth * this.tileAmountHeight) + this.firstgid - 1;

        this.bitmapData = new createjs.Bitmap('assets/' + source);
    }

    TileSet.prototype = new Engine.Object();

    return TileSet;
})();