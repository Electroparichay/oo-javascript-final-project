/* global WATER_ROWS */
/* global max */
/* global canvas */
/* global TILE_SIZE */
/* global GRASS_ROWS */
/* global NUM_ROWS */
/* global NUM_COLS */
/* global Resources */
/* global ctx */

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
    /*Returns the position of the player on the tile*/
    getPlayerPosition : function(row, column) {
        var tileTopLeft = PositionFunctions.getTilePosition(row, column);
        var x = parseInt((tileTopLeft.x + TILE_SIZE.width) / 2);
        var y = parseFloat((tileTopLeft.y + TILE_SIZE.width) / 2);
        return new Position(x, y);
    }
};

// Generic character
var Character = function (position, spritePath) {
    this.x = position ? position.x : undefined;
    this.y = position ? position.y : undefined;
    this.sprite = spritePath;
};

// Draw the enemy on the screen, required method for game
Character.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Enemies our player must avoid
var Enemy = function(position, spritePath) {
    Character.call(this, position, spritePath);
};

Enemy.prototype = Object.create(Character.prototype);
Enemy.prototype.consturctor = Enemy;

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};


var Player = function(row, column, spritePath) {
    Character.call(this, null, spritePath);
    this.row = row;
    this.column = column;
};

Player.prototype = Object.create(Character.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function(dt) {
    throw new Error('Not yet implemented');
};

Player.prototype.BOUNDARIES = {
    left : 0,
    right : NUM_COLS - 1,
    up : max(WATER_ROWS), //First water row.
    down : NUM_ROWS - 1
};

//Resets player to original position.
Player.prototype.reset = function() {
    var rowNumber = GRASS_ROWS[GRASS_ROWS.length - 1];
    var columnNumber = parseInt(NUM_COLS / 2);
    this.row = rowNumber;
    this.column = columnNumber;
};

Player.prototype.handleInput = function(key) {
    switch(key){
        case 'left':
            if(this.row > this.BOUNDARIES.left) this.row--;
            break;
        case 'up':
            if(this.column > this.BOUNDARIES.up) {
                this.column--;
            } else {
                //Player hit the water
                this.reset();
            }
            break;
        case 'right':
            if(this.row < this.BOUNDARIES.left) this.row++;
            break;
        case 'down':
            if(this.column < this.BOUNDARIES.down) this.column++;
            break;
        default: 
            throw new ErrorEvent('Invalid input key.');
    }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});