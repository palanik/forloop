var blocked = require('blocked');
  
var count = 10000000;

var golden = function(φ) {
	return Math.sqrt(φ + Math.sqrt(1));
};

setTimeout(function() {
		var φ = 0;
		for (var i = 0; i < count; i++) {
			φ = golden(φ);
		}
		console.log("φ ≈ %d", φ);
	},
	1000);

blocked(function(ms){
  console.log('BLOCKED FOR %sms', ms | 0);
});
