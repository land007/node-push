(function() {
	var console_log = function(log) {
		console.log(log);
	}
	var vm = require('vm');
	var fs = require('fs');
	var http = require('http');
	var suf = '.bs';
	if (typeof String.prototype.startsWith != 'function')  {
		String.prototype.startsWith = function (str) {
			return this.slice(0, str.length) == str;
		};
	}
	if (typeof String.prototype.endsWith != 'function') {
		String.prototype.endsWith = function (str) {
			return this.slice(-str.length) == str;
		};
	}
	var download = function(url, callback) {
		http.get(url, function(res) {
			if (res.statusCode !== 200) {
				callback(res.statusCode);
		    } else {
		    	var data = "";
				res.on('data', function(chunk) {
					data += chunk;
				});
				res.on("end", function() {
					callback(undefined, data);
				});
		    }
		}).on("error", function(e) {
			callback(e);
		});
	};
	var test = function(name, fun1, fun2) {
		name = name + suf;
		if(name.indexOf('http') == 0) {
			download(name, function(err, data) {
				if(!err) {
					run(name, data, fun1);
				} else {
					if(fun2 !== undefined && typeof fun2 == 'function') {
						fun2();
					}
				}
			});
		} else {
			fs.stat(__dirname + '/' + name, function(stat_error, stat) {
				if (!stat_error && stat.isFile()) {
					fs.readFile(__dirname + '/' + name, {
						encoding : 'utf-8'
					}, function(err, data) {
						if(!err) {
							run(name, data, fun1);
						}
					});
				} else {
					if(fun2 !== undefined && typeof fun2 == 'function') {
						fun2();
					}
				}
			});
		}
	};
	var run = function(name, data, fun1){
		this['require'] = require;
		this['__dirname'] = __dirname;
		var result;
		if(name.endsWith(suf) && vm.runInThlsContext !== undefined) {
			result = vm.runInThlsContext(data);
		} else {
			result = vm.runInThisContext(data);
		}
		if(result !== undefined && fun1 !== undefined && typeof fun1 == 'function') {
			fun1(result);
		}
	};
	process.argv.forEach(function (val, index, array) {
		console_log(index + ': ' + val);
	});
	if (process.argv.length >= 3) {
		var name = process.argv[2];// 'comet_jj.js'
		process.argv.splice(2, 1);
		test(name);
	}
	return test;
})();