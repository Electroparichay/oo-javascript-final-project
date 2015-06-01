// Generic character
var Character = function (position, spritePath) {
    this.x = position ? position.x : undefined;
    this.y = position ? position.y : undefined;
    this.isOnScreen = true;
    this.sprite = spritePath;
};

// Draw the character on the screen
Character.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};