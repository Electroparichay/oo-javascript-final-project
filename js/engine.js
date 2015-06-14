/* Engine.js
 * This file provides the game loop functionality (update entities and render),
 * draws the initial game board on the screen, and then calls the update and
 * render methods on your player and enemy objects (defined in your app.js).
 *
 * A game engine works by drawing the entire game screen over and over, kind of
 * like a flipbook you may have created as a kid. When your player moves across
 * the screen, it may look like just that image/character is moving or being
 * drawn but that is not the case. What's really happening is the entire "scene"
 * is being drawn over and over, presenting the illusion of animation.
 *
 * This engine is available globally via the Engine variable and it also makes
 * the canvas' context (ctx) object globally available to make writing app.js
 * a little simpler to work with.
 */

var Engine = function(global) {
    /* Predefine the variables we'll be using within this scope,
     * create the canvas element, grab the 2D context for that canvas
     * set the canvas elements height/width and add it to the DOM.
     */
     "using strict";
    this.canvas = global.document.createElement('canvas'); //Refactor code to provide
        //Functions to read values from the canvas instead of making it public.
    var self = this;
    this.ctx = this.canvas.getContext('2d');
    this.characters = {};
    var lastTime;

    this.canvas.width = Engine.TILE_SIZE.width * Engine.NUM_COLS;
    this.canvas.height = Engine.ACTUAL_TILE_SIZE.height * Engine.NUM_ROWS;
    global.document.body.appendChild(this.canvas);
    
    this.start = function() {
        Resources.onReady(init);
    };

    /* This function serves as the kickoff point for the game loop itself
     * and handles properly calling the update and render methods.
     */
    function main() {
        /* Get our time delta information which is required if your game
         * requires smooth animation. Because everyone's computer processes
         * instructions at different speeds we need a constant value that
         * would be the same for everyone (regardless of how fast their
         * computer is) - hurray time!
         */
        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;

        /* Call our update/render functions, pass along the time delta to
         * our update function since it may be used for smooth animation.
         */
        update(dt);
        render();

        /* Set our lastTime variable which is used to determine the time delta
         * for the next time this function is called.
         */
        lastTime = now;

        /* Use the browser's requestAnimationFrame function to call this
         * function again as soon as the browser is able to draw another frame.
         */
        global.window.requestAnimationFrame(main);
    };

    /* This function does some initial setup that should only occur once,
     * particularly setting the lastTime variable that is required for the
     * game loop.
     */
    function init() {
        //reset();
        lastTime = Date.now();
        main();
    }

    function enemyCollidedWithPlayer(enemy) {
        // Here we assume both character images are the same size.       
        var enemyRectangle = enemy.getBoundingClientRect();
        var playerRectangle = self.getPlayer().getBoundingClientRect();
        var rectangleWidth = enemyRectangle.right - enemyRectangle.left;
        // shareYRange logic is only valid because both rectangles are the same size.
        var shareYRange = playerRectangle.top == enemyRectangle.top && playerRectangle.bottom == enemyRectangle.bottom;
        var distanceBetweenCenters = Math.abs(self.getPlayer().x - enemy.x);
        // This makes the collision to only be detected after some significant contact.
        // This is an improvement over comparing exact coordinates because it makes the 
        // game seem more fluid. Otherwise the collision would occur as soon as the images
        // overlap, which seems too sudden to  the user.
        var shareXrange = distanceBetweenCenters <= rectangleWidth / 3;
        return shareYRange && shareXrange;
    };

    /* This function is called by main (our game loop) and itself calls all
     * of the functions which may need to update entity's data. Based on how
     * you implement your collision detection (when two entities occupy the
     * same space, for instance when your character should die), you may find
     * the need to add an additional function call here. For now, we've left
     * it commented out - you may or may not want to implement this
     * functionality this way (you could just implement collision detection
     * on the entities themselves within your app.js file).
     */
    function update(dt) {
        updateEntities(dt);
    }

    /* This is called by the update function  and loops through all of the
     * objects within your allEnemies array as defined in app.js and calls
     * their update() methods. It will then call the update function for your
     * player object. These update methods should focus purely on updating
     * the data/properties related to  the object. Do your drawing in your
     * render methods.
     */
    function updateEntities(dt) {
        var player = self.getPlayer();
        var enemies = self.getEnemies();
        player.update();
        enemies.forEach(function(enemy) {
            enemy.update(dt);
            if (enemyCollidedWithPlayer(enemy)) {
                player.reset();
            }
        });
    }

    /* This function initially draws the "game level", it will then call
     * the renderEntities function. Remember, this function is called every
     * game tick (or loop of the game engine) because that's how games work -
     * they are flipbooks creating the illusion of animation but in reality
     * they are just drawing the entire screen over and over.
     */
    function render() {
        /* This array holds the relative URL to the image used
         * for that particular row of the game level.
         */
        var rowImages = [
            'images/water-block.png',   
            'images/stone-block.png',
            'images/stone-block.png',
            'images/stone-block.png',
            'images/grass-block.png',
            'images/grass-block.png' 
        ];

        /* Loop through the number of rows and columns we've defined above
         * and, using the rowImages array, draw the correct image for that
         * portion of the "grid"
         */
        for (var row = 0; row < Engine.NUM_ROWS; row++) {
            for (var col = 0; col < Engine.NUM_COLS; col++) {
                var rowImage = Resources.get(rowImages[row]);
                self.ctx.drawImage(rowImage, col * Engine.TILE_SIZE.width, 
                    row * Engine.TILE_SIZE.height);
            }
        }
        renderEntities();
    }

    /* This function is called by the render function and is called on each game
     * tick. It's purpose is to then call the render functions you have defined
     * on your enemy and player entities within app.js
     */
    function renderEntities() {
        /* Loop through all of the objects within the allEnemies array and call
         * the render function you have defined.
         */
        self.getEnemies().forEach(function(enemy) {
            enemy.render();
        });

        self.getPlayer().render();
    }

    /* This function does nothing but it could have been a good place to
     * handle game reset states - maybe a new game menu or a game over screen
     * those sorts of things. It's only called once by the init() method.
     */
    function reset() {
        throw new Error('Not implemented');
    }

    /* Go ahead and load all of the images we know we're going to need to
     * draw our game level. Then set init as the callback method, so that when
     * all of these images are properly loaded our game will start.
     */
    Resources.load([
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/enemy-bug.png',
        'images/char-boy.png'
    ]);
};

Engine.prototype.setPlayer = function(player) {
    this.characters.player = player;
    Resources.load([this.characters.player.sprite]);
};

Engine.prototype.setEnemies = function(enemiesArray) {
    this.characters.enemies = enemiesArray;
    var enemiesSprites= enemiesArray.map(function (enemy) {
        return enemy.sprite;
    });
    Resources.load(enemiesSprites);
};

Engine.prototype.getPlayer = function() {
    return this.characters.player;
};

Engine.prototype.getEnemies = function() {
    return this.characters.enemies;
};

Engine.getCharacterImage = function(character) {
    return Resources.get(character.sprite);
};

Engine.TILE_SIZE = { height: 83, width: 101 }; //TODO: Read the values from a tile image instead of hardcoding them.
Engine.ACTUAL_TILE_SIZE = { height: 101, width: 171 };
Engine.NUM_ROWS = 6;
Engine.NUM_COLS = 5;
Engine.WATER_ROWS = [0];
Engine.STONE_ROWS = [1, 2, 3];
Engine.GRASS_ROWS = [4, 5];