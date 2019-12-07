var fs = require('fs');
var vm = require('vm');
var hello = require('hello');
var name = 'bs_test.js';
fs.readFile(__dirname + '/' +name, {encoding: 'utf-8'}, function(err, data) {
	console.log(data);
	var bs = hello.hello(data);
	fs.writeFile(__dirname + '/' + name + '.bs', bs, function(err){//会先清空原先的内容
		fs.readFile(__dirname + '/' + name + '.bs', {encoding: 'utf-8'}, function(err, data) {
			//context['global'] = global;
//			context['process'] = process;
//			context['console'] = console;
//			context['setInterval'] = setInterval;
//			context['clearInterval'] = clearInterval;
//			context['setTimeout'] = setTimeout;
//			context['clearTimeout'] = clearTimeout;
//			context['exports'] = exports;
//			context['module'] = module;
//			context['__filename'] = __filename;
			this['__dirname'] = __dirname;
			this['require'] = require;
			var context = vm.createContext(this);//(exports, require, module, __filename, __dirname);
			if(vm.runInOontext(data, context) === undefined){
				console.log('isStarted');
			}
		});
	});
});