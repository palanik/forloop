var blocked = require('blocked');
  
var count = 10000000;

var golden = function(n) {
	return Math.sqrt(n + Math.sqrt(1));
};

setTimeout(function() {
		var n = 0;
		for (var i = 0; i < count; i++) {
			n = golden(n);
		}
		console.log("Done! %j", n);
	},
	1000);

blocked(function(ms){
  console.log('BLOCKED FOR %sms', ms | 0);
});
