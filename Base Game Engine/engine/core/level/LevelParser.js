var Engine = window.Engine || {};

Engine.LevelParser = (function () {
    //this.level = new Engine.Level();

    function LevelParser(filename) {
        //Engine.Object.call(this);
        this.filename = filename;
    }

    function parse() {
        var mapData;
        var xmlRequestObject = new XMLHttpRequest();
        if (xmlRequestObject) {
            xmlRequestObject.open("GET", this.filename, false);
            xmlRequestObject.onreadystatechange = function () {
                if (xmlRequestObject.readyState == 4 && xmlRequestObject.status == 200) {
                    var xmlDocument = xmlRequestObject.responseXML;
                    mapData = display(xmlDocument);
                }
            }
            xmlRequestObject.send(null);
        }
        return mapData;
    }

    function display(xmlDocument) {
        var map = xmlDocument.getElementsByTagName("map")[0];
        var mapWidth = map.getAttribute('width');
        var mapHeight = map.getAttribute('height');
        var orientation = map.getAttribute('orientation');
        var tileWidth = map.getAttribute('tilewidth');
        var tileHeight = map.getAttribute('tileheight');

        var tilesets = [];
        for (i = 0; i < map.getElementsByTagName("tileset").length; i++) {
            var tileset = map.getElementsByTagName("tileset")[i];
            var firstGid = parseInt(tileset.getAttribute('firstgid'));
            var tilesetName = tileset.getAttribute('name');
            var tilesetTileWidth = parseInt(tileset.getAttribute('tilewidth'));
            var tilesetTileHeight = parseInt(tileset.getAttribute('tileheight'));
            var tilesetImage = tileset.getElementsByTagName("image")[0];
            var tilesetImagePath = tilesetImage.getAttribute('source');
            var imageWidth = parseInt(tilesetImage.getAttribute('width'));
            var imageHeight = parseInt(tilesetImage.getAttribute('height'));

            for (j = 0; j < tileset.getElementsByTagName("tile").length; j++) {
                var tile = tileset.getElementsByTagName("tile")[j]; //not sure what its used for
                var properties = tileset.getElementsByTagName("properties");
            }
            //this.level.tileSetArray.push(new Engine.TileSet(firstGid, tilesetName, tilesetTileWidth, tilesetTileHeight, tilesetImagePath, imageWidth, imageHeight));
            var tileset1 = new Engine.TileSet(firstGid, tilesetName, tilesetTileWidth, tilesetTileHeight, tilesetImagePath, imageWidth, imageHeight);
            tilesets.push(tileset1);
            //var proyear = pro.getElementsByTagName("year")[0].childNodes[0].nodeValue;
        }

        var tileGIDs = [];
        var tileCoordinates = [];
        for (i = 0; i < map.getElementsByTagName("layer").length; i++) {
            var layer = map.getElementsByTagName("layer")[i];
            var name = layer.getAttribute('name');
            var width = layer.getAttribute('width');
            var height = layer.getAttribute('height');
            var data = layer.getElementsByTagName("data")[0];

            //this.level.tileGIDs[i] = [];
            //this.level.tileCoordinates[i] = [];
            tileGIDs[i] = [];
            tileCoordinates[i] = [];

            for (j = 0; j < data.getElementsByTagName("tile").length; j++) {
                var tile = data.getElementsByTagName("tile")[j];
                var gid = tile.getAttribute('gid');
                if (gid > 0) {
                    tileGIDs[i][j] = gid;
                }
            }

            for (var tileX= 0; tileX < mapWidth; tileX++) {
                //this.level.tileCoordinates[i][tileX] = new Array();
                tileCoordinates[i][tileX] = new Array();
                //this.level.tileCoordinates[i][tileX][2] = new Array(); //fishy
                for (var tileY = 0; tileY < mapHeight; tileY++) {
                    //this.level.tileCoordinates[i][tileX][tileY] = this.level.tileGIDs[i][(tileX + (tileY * mapWidth))];
                    tileCoordinates[i][tileX][tileY] = tileGIDs[i][(tileX + (tileY * mapWidth))];
                }
            }
        }

        for (i = 0; i < map.getElementsByTagName("objectgroup").length; i++) {
            var objectGroup = map.getElementsByTagName("objectgroup")[i];
            var object = objectGroup.getElementsByTagName("object");
        }

        var blah = tilesets[0];

        return {
            'tilesets': tilesets,
            'tileGIDs': tileGIDs,
            'tileCoordinates': tileCoordinates,
            'mapWidth': mapWidth,
            'mapHeight': mapHeight,
            'orientation': orientation,
            'tileWidth': tileWidth,
            'tileHeight': tileHeight
        };
    }

    //LevelParser.prototype = new Engine.Object();

    LevelParser.prototype.parse = parse;

    return LevelParser;
})();