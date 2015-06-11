var BOUNDARIES = {
    left : 0,
    right : Engine.NUM_COLS - 1,
    up : max(Engine.WATER_ROWS) + 1, //First water row.
    down : Engine.NUM_ROWS - 1
};

//Represents the xy coordinates.
var Position = function(x, y) {
    this.x = x;
    this.y = y;
};

var PositionFunctions = {
    getTilePosition : function (row, column) {
        var x = ((column - 1) * Engine.TILE_SIZE.width);
        var y = ((row - 1) * Engine.TILE_SIZE.height);
        return new Position(x, y);
    },
    /*Returns the position of the character on the tile*/
    getCharacterPosition : function(row, column) {
        var tileTopLeft = PositionFunctions.getTilePosition(row, column);
        var x = ( tileTopLeft.x + (tileTopLeft.x + Engine.ACTUAL_TILE_SIZE.width) ) / 2;
        var y = ( tileTopLeft.y + (tileTopLeft.y + Engine.ACTUAL_TILE_SIZE.height) ) / 2;
        return new Position(x, y);
    }
};