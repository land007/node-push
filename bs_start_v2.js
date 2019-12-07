(function() {
	if (process.argv.length >= 3) {
		var name = process.argv[2];
		process.argv.splice(2, 1);
		require(name);
	}
})();