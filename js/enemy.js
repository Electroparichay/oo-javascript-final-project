var Enemy = function(spritePath) {
	function getRandomCoordinates() {
		/*The Enemy's position is computed by randomly selecting a coordinate on the canvas.
		  X coordinate is selected by randomly choosing a point between the leftmost point of the screen (0)
		  and the x coordinate of the leftmost point of the canvas.
		  Y coordinate is selected by randomly choosing a grass tile row and then getting the character's
		  would-be position on that row.
		*/
		var canvasRectangle = engine.canvas.getBoundingClientRect();
		var xPosition = 0;
	    var topRow = min(Engine.STONE_ROWS);
	    var bottomRow = max(Engine.STONE_ROWS);
	    var randomRow = randomInt(topRow, bottomRow);
		var randomY = PositionFunctions.getCharacterPosition(randomRow, 0).y;

		return new Position(xPosition, randomY);
	}

	var position = getRandomCoordinates();
    Character.call(this, position, spritePath);
	this.speed = randomInt(100, 250);
};

Enemy.prototype = Object.create(Character.prototype);
Enemy.prototype.constructor = Enemy;

var canvasRight = Engine.NUM_COLS * Engine.TILE_SIZE.width;

Enemy.prototype.update = function(dt) {
	this.x = (this.x + dt * this.speed) % canvasRight;
};