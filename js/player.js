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
    var rowNumber = max(Engine.GRASS_ROWS);
    var columnNumber = parseInt(Engine.NUM_COLS / 2);
    this.row = rowNumber;
    this.column = columnNumber;
};

Player.prototype.handleInput = function(key) {
    switch(key){
        case 'left':
            if(this.column > BOUNDARIES.left) this.column--;
            break;
        case 'up':
            if(this.row > BOUNDARIES.up) {
                this.row--;
            } else {
                //Player hit the water
                this.reset();
            }
            break;
        case 'right':
            if(this.column < BOUNDARIES.right) this.column++;
            break;
        case 'down':
            if(this.row < BOUNDARIES.down) this.row++;
            break;
        default: 
            throw new ErrorEvent('Invalid input key.');
    }
};