(function(global) {
    var engine = new Engine(this);
    var player = new Player('images/char-boy.png');
    global.player = player;
    global.engine = engine;
    const MIN_ENEMIES = 5;
    const MAX_ENEMIES = 10;
    var numberOfEnemies = randomInt(MIN_ENEMIES, MAX_ENEMIES);
    
    var allEnemies = new Array(numberOfEnemies);
    for (var i = 0; i < numberOfEnemies; i++) {
    	allEnemies[i] = new Enemy('images/enemy-bug.png'); 
    }
    
    // This listens for key presses and sends the keys to your
    // Player.handleInput() method. You don't need to modify this.
    global.document.addEventListener('keyup', function(e) {
        var allowedKeys = {
            37: 'left',
            38: 'up',
            39: 'right',
            40: 'down'
        };
        player.handleInput(allowedKeys[e.keyCode]);
    });
    
    engine.setPlayer(player);
    engine.setEnemies(allEnemies);
    engine.start();
})(this);