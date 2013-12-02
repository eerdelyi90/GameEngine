var Engine = window.Engine || {};

Engine.Level = (function () {
    this.tileSetArray = [];
    this.tileCoordinates = [];
    this.tileWidth;
    this.tileHeight;
    this.mapWidth = 0;
    this.mapHeight;
    this.orientation;

    function Level(filename) {
        Engine.Object.call(this);
        load(filename);
    }

    function load(filename) {
        var levelParser = new Engine.LevelParser(filename);
        var levelInfo = levelParser.parse();
        this.tileSetArray = levelInfo.tilesets;
        this.tileCoordinates = levelInfo.tileCoordinates;

        this.tileWidth = levelInfo.tileWidth;
        this.tileHeight = levelInfo.tileHeight;
        this.mapWidth = levelInfo.mapWidth;
        this.mapHeight = levelInfo.mapHeight;
        this.orientation = levelInfo.orientation;
    }

    function show() {
        for (var layerNumber = 0; layerNumber < tileCoordinates.length; layerNumber++) {
            for (var spriteForX = 0; spriteForX < mapWidth; spriteForX++) {
                for (var spriteForY = 0; spriteForY < mapHeight; spriteForY++) {
                    var tileGid = tileCoordinates[layerNumber][spriteForX][spriteForY];
                    var currentTileset;
                    // only use tiles from this tileset (we get the source image from here)
                    for (var i = 0; i < tileSetArray.length; i++) {//evar tileset1:TileSet in tileSets) {
                        if (tileGid >= tileSetArray[i].firstgid - 1 && tileGid <= tileSetArray[i].lastgid) {
                            currentTileset = tileSetArray[i]; // we found the right tileset for this gid!
                            break;
                        }
                    }
                    var destY = spriteForY * tileWidth;
                    var destX = spriteForX * tileWidth;
                    // basic math to find out where the tile is coming from on the source image
                    tileGid -= currentTileset.firstgid - 1;
                    var sourceY = Math.ceil(tileGid / currentTileset.tileAmountWidth) - 1;
                    var sourceX = tileGid - (currentTileset.tileAmountWidth * sourceY) - 1;

                    // copy the tile from the tileset onto our bitmap
                    var currentTileImage = _.clone(currentTileset.bitmapData);
                    currentTileImage.sourceRect = new createjs.Rectangle(sourceX * currentTileset.tileWidth, sourceY * currentTileset.tileHeight, tileWidth, tileHeight);
                    currentTileImage.x = destX;
                    currentTileImage.y = destY;
                    currentTileImage.snapToPixel = false;
                    tileCoordinates[layerNumber][spriteForX][spriteForY] = currentTileImage;
                    stage.addChild(tileCoordinates[layerNumber][spriteForX][spriteForY]);
                }
            }
        }
    }

    function zoom(zoomAmount) {
        if (!_.isNumber(zoomAmount)) {
            throw "zoomAmount is not a number";
        }
        for (var layerNumber = 0; layerNumber < tileCoordinates.length; layerNumber++) {
            for (var spriteForX = 0; spriteForX < mapWidth; spriteForX++) {
                for (var spriteForY = 0; spriteForY < mapHeight; spriteForY++) {
                    tileCoordinates[layerNumber][spriteForX][spriteForY].scaleX = zoomAmount;
                    tileCoordinates[layerNumber][spriteForX][spriteForY].scaleY = zoomAmount;
                    tileCoordinates[layerNumber][spriteForX][spriteForY].x *= zoomAmount;
                    tileCoordinates[layerNumber][spriteForX][spriteForY].y *= zoomAmount;
                }
            }
        }
    }

    Level.prototype = new Engine.Object();
    Level.prototype.show = show;
    Level.prototype.zoom = zoom;
    return Level;
})();