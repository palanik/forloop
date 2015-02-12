var blocked = require('blocked')
  , forloop = require('../index.js');
  
var count = 10000000;

var golden = function(φ) {
	return Math.sqrt(φ + Math.sqrt(1));
};

setTimeout(function() {
		var φ = 0;
		forloop(0, count, 1,
			function(i) {
				φ = golden(φ);
			},
			function() {
				console.log("φ ≈ %d", φ);
			}
        	);
	},
	1000);

blocked(function(ms){
  console.log('BLOCKED FOR %sms', ms | 0);
});
