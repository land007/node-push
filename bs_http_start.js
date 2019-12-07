var http = require('http');
var vm = require('vm');
var name = 'worker';
if (process.argv.length >= 3) {
	name = process.argv[2];
	process.argv.splice(2, 1);
}
var req = require('http').request({
	host : 'www.qhkly.com',
	method : 'get',
	path : '/book_lastone.jsp?bookname=' + name,
	headers : {
		'Content-Type' : 'application/x-www-form-urlencoded'
	}
}, function(res) {
	res.on('data', function(data) {
		var content = data.toString();
		console.log();
		this['process'] = process;
		this['console'] = console;
		this['require'] = require;
		var context = vm.createContext(this);
		vm.runInOontext(content, context);
	});
});
req.end();