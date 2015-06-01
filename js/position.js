var BOUNDARIES = {
    left : 0,
    right : NUM_COLS - 1,
    up : max(WATER_ROWS), //First water row.
    down : NUM_ROWS - 1
};

//Represents the xy coordinates.
var Position = function(x, y) {
    this.x = x;
    this.y = y;
};

var PositionFunctions = {
    getTilePosition : function (row, column) {
        var canvasRectangle = canvas.getBoundingClientRect();
        var canvasTopLeft = new Position(canvasRectangle.left, canvasRectangle.top);
        var x = canvasTopLeft.x + row * TILE_SIZE.width;
        var y = canvasTopLeft.y + column * TILE_SIZE.height;

        return Position(x, y);
    },
    /*Returns the position of the character on the tile*/
    getCharacterPosition : function(row, column) {
        var tileTopLeft = PositionFunctions.getTilePosition(row, column);
        var x = parseInt((tileTopLeft.x + TILE_SIZE.width) / 2);
        var y = parseFloat((tileTopLeft.y + TILE_SIZE.width) / 2);
        return new Position(x, y);
    }
};