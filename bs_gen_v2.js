var fs = require('fs');
var crypto = require('crypto');
var hello = require('hello');
var ss = function(name, jia){
	if(jia!==undefined){
		fs.readFile(__dirname + '/' +name, {encoding: 'utf-8'}, function(err, data1) {
			fs.readFile(__dirname + '/' +jia, {encoding: 'utf-8'}, function(err, data2) {
				var md5 = crypto.createHash('md5');
//				console.log(jia + ' ' + data2);
				md5.update(data2);
			    var pass = md5.digest('hex');
			    
//				console.log(name + ' ' + data1);
				var bs = hello.hello(data1);
				bs = bs+pass;
				fs.writeFile(__dirname + '/' + jia + '.bs', bs, function(err){//会先清空原先的内容
					if (err) {
						console.error(err);
					}
				});
				console.log(bs);
			});
		});
	}else{
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
	}
};
//ss('test.js.js', 'test.js');
ss('comet_jj_v2.js.js', 'comet_jj_v2.js');
//ss('comet_jj_master_v2.js.js', 'comet_jj_master_v2.js');
//ss('iw_v2.js.js', 'iw_v2.js');
//ss('id.js.js', 'id.js');
//ss('is.js.js', 'is.js');
