var forloop = require('../index.js');
  
var count = 10000000;

setTimeout(function() {
		forloop(0,
			count,
			1,
			function(i) {
				console.log(i + ' Mississippi ');
			},
			function() {
				console.log("Done! %j", count);
			}
        	);
	},
	1000);