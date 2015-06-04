var Enemy = function(spritePath) {
	function getRandomCoordinates() {
		/*The Enemy's position is computed by randomly selecting a coordinate on the canvas.
		  X coordinate is selected by randomly choosing a point between the leftmost point of the screen (0)
		  and the x coordinate of the leftmost point of the canvas.
		  Y coordinate is selected by randomly choosing a grass tile row and then getting the character's
		  would-be position on that row.
		*/
		var canvasRectangle = canvas.getBoundingClientRect();
		var randomX =  randomInt(0, canvasRectangle.left);
	    var topRow = max(GRASS_ROWS);
	    var bottomRow = min(GRASS_ROWS);
	    var randomRow = randomInt(topRow, bottomRow);
		var randomY = PositionFunctions.getCharacterPosition(randomRow, 0;).y;

		return new Position(randomX, randomY);
	}

	var position = getRandomCoordinates();
    Character.call(this, position, spritePath);
};

Enemy.prototype = Object.create(Character.prototype);
Enemy.prototype.constructor = Enemy;

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    
};

//Returns true if enemy is within the canvas boundaries
Enemy.prototype.isOnScreen = function() {
    return this.x >= BOUNDARIES.left && this.x <= BOUNDARIES.right &&
        this.y <= BOUNDARIES.down && this.y >= BOUNDARIES.up;
};
