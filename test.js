var assert = require('assert');
var blocked = require('blocked')
  , forloop = require('./index.js');
  
var count = 20000;

var blockingFunc = function(i, c) {
	var a = Array(1000).join(c);
}

describe('blocking', function() {
	it('for loop', function(done) {
		var blockErr = null;

		blocked(function(ms){
  			blockErr = new Error("Blocked " + ms + "ms");
			done();
		});
		setTimeout(function() {
			for (var i = 0; i < count; i++) {
				blockingFunc(i, 'b');
			}
			setTimeout(function() {
				if (!blockErr) {
					done("Did not block");
				}
			}, 100);
		}, 100);
	});
});

describe('non-blocking', function() {
	it('forloop', function(done) {
		var blockErr = null;

		blocked(function(ms){
  			blockErr = new Error("Blocked " + ms + "ms");
			done(blockErr);
		});

		forloop(0,
			count,
			1,
			function(i) {
				blockingFunc(i, 'n');
			},
			function() {
				if (!blockErr) {
					done();
				}
			}
        	);
	});
});
