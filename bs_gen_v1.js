var fs = require('fs');
var hello = require('hello');
var name = 'comet_jj.js';
var ss = function(name){
	fs.readFile(__dirname + '/' +name, {encoding: 'utf-8'}, function(err, data) {
		//console.log(data);
		var bs = hello.hello(data);
		fs.writeFile(__dirname + '/' + name + '.bs', bs, function(err){//会先清空原先的内容
			if (err) {
				console.error(err);
			}
		});
		console.log(bs);
	});
};
ss('comet_jj_v1.js');
ss('comet_jj_master_v1.js');
//ss('iw.js');
//ss('id.js');
//ss('is.js');