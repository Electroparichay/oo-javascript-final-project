/* global GRASS_ROWS */
/* global NUM_ROWS */
/* global NUM_COLS */
/* global Resources */
/* global ctx */

//Represents the xy coordinates of the character on the screen.
var Position = function(x, y) {
    this.x = x;
    this.y = y;
};

// Generic character
var Character = function (position, spritePath) {
    this.x = position.x;
    this.y = position.y;
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


var Player = function(position, spritePath) {
    Character.call(this, position, spritePath);
};

Player.prototype = Object.create(Character.prototype);
Player.prototype.constructor = Player;

Player.prototype.initialPosition = function() {
    var rowNumber = GRASS_ROWS[GRASS_ROWS.length - 1];
    var columnNumber = parseInt(NUM_COLS / 2);
    return new Position(columnNumber, rowNumber);
};

Player.prototype.update = function(dt) {
    throw new Error('Not yet implemented');
};


Player.prototype.BOUNDARIES = {
    left : 0,
    right : NUM_COLS - 1,
    up : 0,
    down : NUM_ROWS - 1
};

//Resets player to original position.
Player.prototype.reset = function() {
    var position = this.initialPosition();
    this.x = position.x;
    this.y = position.y;  
};

Player.prototype.handleInput = function(key) {
    switch(key){
        case 'left':
            if(this.x > this.BOUNDARIES.left) this.x--;
            break;
        case 'up':
            if(this.y > this.BOUNDARIES.up) this.y--;
            break;
        case 'right':
            if(this.x > this.BOUNDARIES.left) this.x--;
            break;
        case 'down':
            if(this.y < this.BOUNDARIES.down) this.y++;
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
