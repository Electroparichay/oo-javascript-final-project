// Generic character
var Character = function (position, spritePath) {
    this.x = position ? position.x : undefined;
    this.y = position ? position.y : undefined;
    this.sprite = spritePath;
};

//Returns true if enemy is within the canvas boundaries
Character.prototype.isOnScreen = function() {
    var canvasRectangle = engine.canvas.getBoundingClientRect();	
    return this.x >= canvasRectangle.left && this.x <= canvasRectangle.right &&
        this.y <= canvasRectangle.bottom && this.y >= canvasRectangle.top;
};

Character.prototype.getBoundingClientRect = function() {
	throw new Error('Not yet implemented');
};

// Draw the character on the screen
Character.prototype.render = function() {
    engine.ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};