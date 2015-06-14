// Generic character
var Character = function (position, spritePath) {
    this.x = position ? position.x : undefined;
    this.y = position ? position.y : undefined;
    this.sprite = spritePath;
    this.initialPosition = position;
};

Character.prototype.getBoundingClientRect = function() {
	var characterImage = Engine.getCharacterImage(this);
	var halfOfWidth = characterImage.width / 2;
	var halfOfHeight = characterImage.height / 2;
	return {
		top: this.y - halfOfHeight,
		bottom: this.y + halfOfHeight,
		left: this.x - halfOfWidth,
		right: this.x + halfOfWidth
	}
};

// Draw the character on the screen
Character.prototype.render = function() {
    engine.ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};