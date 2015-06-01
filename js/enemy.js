var Enemy = function(position, spritePath) {
    Character.call(this, position, spritePath);
};

Enemy.prototype = Object.create(Character.prototype);
Enemy.prototype.consturctor = Enemy;

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
