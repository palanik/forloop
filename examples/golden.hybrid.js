var blocked = require('blocked')
  , forloop = require('../index.js');
  
var count = 10000000;

var golden = function(n) {
	return Math.sqrt(n + Math.sqrt(1));
};

setTimeout(function() {
		var n = 0;
		forloop(0,
			count,
			100,
			function(i) {
				for (var j = 0; j < 100; j++) {
				n = golden(n);
				}
			},
			function() {
				console.log("Done! %j", n);
			}
        	);
	},
	1000);

blocked(function(ms){
  console.log('BLOCKED FOR %sms', ms | 0);
});
