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
    var canvas = global.document.createElement('canvas');
    this.ctx = canvas.getContext('2d');
    this.characters = {};
    var lastTime;

    canvas.width = 505;
    canvas.height = 606;
    global.document.body.appendChild(canvas);

    this.start = function() {
        init();
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
        reset();
        lastTime = Date.now();
        main();
    }

    function enemyCollidedWithPlayer(enemy) {
        function rectanglesIntersect(rect1, rect2) {
            //This method detects if {rect2} is within {rect1}. TODO: Rewrite to account for the case
            //when {rect1} is within {rect2}.
            var rect1TopLeft = new Position(rect1.left, rect1.top);
            var rect1BottomRight = new Position(rect1.right, rect1.bottom);
            var rect2TopLeft = new Position(rect1.left, rect1.top);
            var rect2BottomRight = new Position(rect1.right, rect1.bottom);
            
            var shareYRange = (rect1TopLeft.y <= rect2TopLeft.y && rect1BottomRight.y >= rect2TopLeft.y) ||
                (rect1TopLeft.y <= rect2BottomRight.y && rect1BottomRight.y >= rect2BottomRight.y);
            var shareXRange = (rect1TopLeft.x <= rect2TopLeft.x && rect1BottomRight.x >= rect2TopLeft.x) ||
                (rect1TopLeft.x <= rect2BottomRight.x && rect1BottomRight.x >= rect2BottomRight.x) ||
                (rect1TopLeft.x > rect2BottomRight.x && rect1BottomRight.x < rect2BottomRight.x);

            return shareYRange && shareXRange;
        }

        var enemyRectangle = enemy.getBoundingClientRect();
        var playerRectangle = this.getPlayer().sprite.getBoundingClientRect();
        var playerAndEnemyIntersected = rectanglesIntersect(playerRectangle, enemyRectangle) ||
            rectanglesIntersect(enemyRectangle, playerRectangle);

        return playerAndEnemyIntersected;
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
        var player = this.getPlayer();
        var enemies = this.getEnemies();
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
            'images/water-block.png',   // Top row is water
            'images/stone-block.png',   // Row 1 of 3 of stone
            'images/stone-block.png',   // Row 2 of 3 of stone
            'images/stone-block.png',   // Row 3 of 3 of stone
            'images/grass-block.png',   // Row 1 of 2 of grass
            'images/grass-block.png'    // Row 2 of 2 of grass
        ];

        /* Loop through the number of rows and columns we've defined above
         * and, using the rowImages array, draw the correct image for that
         * portion of the "grid"
         */
        for (var row = 0; row < Engine.NUM_ROWS; row++) {
            for (var col = 0; col < Engine.NUM_COLS; col++) {
                this.ctx.drawImage(Resources.get(rowImages[row]), col * Engine.TILE_SIZE.width, 
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
        this.getEnemies().forEach(function(enemy) {
            enemy.render();
        });

        this.getPlayer().render();
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
    Resources.onReady(init);
};

Engine.prototype.setPlayer = function(player) {
    this.characters.player = player;
};

Engine.prototype.setEnemies = function(enemiesArray) {
    this.characters.enemies = enemiesArray;
};

Engine.prototype.getPlayer = function() {
    return this.characters.player;
};

Engine.prototype.getEnemies = function() {
    return this.characters.enemies;
};

Engine.TILE_SIZE = { height: 83, width: 101};
Engine.NUM_ROWS = 6;
Engine.NUM_COLS = 5;
Engine.WATER_ROWS = [0];
Engine.STONE_ROWS = [1, 2, 3];
Engine.GRASS_ROWS = [4, 5];