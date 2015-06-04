// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var player = new Player('images/char-boy.png');

const MIN_ENEMIES = 5;
const MAX_ENEMIES = 10;
var numberOfEnemies = MIN_ENEMIES + (parseInt(Math.random()) % MAX_ENEMIES);

var allEnemies = new Array(numberOfEnemies);
allEnemies.forEach(function(value, index) {
   allEnemies[index] = new Enemy('enemy-bug.png'); 
});

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