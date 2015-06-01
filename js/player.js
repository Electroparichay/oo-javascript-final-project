var Player = function(spritePath) {
    Character.call(this, null, spritePath);
    this.reset();
};

Player.prototype = Object.create(Character.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function() {
    var currentPosition = PositionFunctions.getCharacterPosition(this.row, this.column);
    this.x = currentPosition.x;
    this.y = currentPosition.y;
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
            if(this.row > BOUNDARIES.left) this.row--;
            break;
        case 'up':
            if(this.column > BOUNDARIES.up) {
                this.column--;
            } else {
                //Player hit the water
                this.reset();
            }
            break;
        case 'right':
            if(this.row < BOUNDARIES.left) this.row++;
            break;
        case 'down':
            if(this.column < BOUNDARIES.down) this.column++;
            break;
        default: 
            throw new ErrorEvent('Invalid input key.');
    }
};