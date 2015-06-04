
/* Returns the largest number in {numberArray}*/
var max = function(numberArray) {
	Math.max.apply(null, numberArray);
};

var min = function(numberArray) {
	Math.min.apply(null, numberArray);
};

/* Returns a random number between {from} and {to}, inclusive.*/
var randomInt = function(from, to) {
	randomNumber = ( Math.random()* (max-min+1) ) + min;
	return parseInt(randomNumber);
};