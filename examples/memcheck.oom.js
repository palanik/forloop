var count = 10000000;

setTimeout(function() {
		for (var i = 0; i < count; i++) {
			console.log(i + " Missouri");
		}
		console.log("Done! %j", count);
	},
	1000);