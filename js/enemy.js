var Enemy = function(spritePath) {
	function getRandomPosition() {
		/*The position is computed by randomly selecting a grass row on the on the canvas.*/
		var canvasRectangle = engine.canvas.getBoundingClientRect();
		var xPosition = 0;
	    var topRow = min(Engine.STONE_ROWS);
	    var bottomRow = max(Engine.STONE_ROWS);
	    var randomRow = randomInt(topRow, bottomRow);
		var randomY = PositionFunctions.getCharacterPosition(randomRow, 0).y;

		return new Position(xPosition, randomY);
	}

	var position = getRandomPosition();
    Character.call(this, position, spritePath);
	this.speed = randomInt(100, 250);
};

Enemy.prototype = Object.create(Character.prototype);
Enemy.prototype.constructor = Enemy;

var canvasRight = Engine.NUM_COLS * Engine.TILE_SIZE.width;

Enemy.prototype.update = function(dt) {
	this.x = (this.x + dt * this.speed) % canvasRight;
};
