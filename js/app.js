/* global Resources */
/* global ctx */


// Generic character
var Character = function (xCoordiante, yCoordinate, spritePath) {
    this.x = xCoordiante;
    this.y = yCoordinate;
    this.sprite = spritePath;
};

// Draw the enemy on the screen, required method for game
Character.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Enemies our player must avoid
var Enemy = function(xCoordiante, yCoordinate, spritePath) {
    Character.call(this, xCoordiante, yCoordinate, spritePath);
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

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(xCoordiante, yCoordinate, spritePath) {
    Character.call(this, xCoordiante, yCoordinate, spritePath);
};
Player.prototype = Object.create(Character.prototype);
Player.prototype.consturctor = Player;

Player.prototype.update = function(dt) {
    throw new Error('Not yet implemented');
};

//Resets player to original position.
Player.prototype.reset = function() {
    throw new Error('Not yet implemented');    
};

Player.prototype.handleInput = function(key) {
    throw new Error('Not yet implemented');
    switch(key){
        case 'left':
            //Move left, if possible
            break;
        case 'up':
            //Move up, if possible
            break;
        case 'right':
            //Move right, if possible
            break;
        case 'down':
            //Move down, if possible
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
