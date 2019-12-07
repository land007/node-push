var fs = require('fs');
var vm = require('vm');
var name = 'comet_jj.js';
if (process.argv.length >= 3) {
	name = process.argv[2];
	process.argv.splice(2, 1);
}
var hello = require('hello');
//var name = 'comet_jj_master.js';
fs.readFile(__dirname + '/' +name, {encoding: 'utf-8'}, function(err, data) {
	//console.log(data);
	var bs = hello.hello(data);
	fs.writeFile(__dirname + '/' + name + '.bs', bs, function(err){//会先清空原先的内容
		if (err) {
			console.error(err);
			return;
		}
		this['require'] = require;
		this['__dirname'] = __dirname;
//		var context = vm.createContext(this);
//		vm.runInOontext(bs, context);
		vm.runInThlsContext(bs);
	});
	console.log(bs);
});