var fs = require('fs');
var name = 'bs_test.js';
fs.readFile(__dirname + '/' +name, {encoding: 'utf-8'}, function(err, data) {
	console.log(data);
});