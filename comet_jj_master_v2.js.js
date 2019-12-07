(function (exports, require, module, __filename, __dirname) {
module.exports = (function() {
	var console_log = function(log) {
		console.log(log);
	};
	process.argv.forEach(function (val, index, array) {
		console_log(index + ': ' + val);
	});
	var cluster = require('cluster');
	var name = 'comet_jj.js';
	if (process.argv.length >= 3) {
		name = process.argv[2];//bs_start.js
		process.argv.splice(2, 1);
	}
	process.argv.splice(0, 2);
	console_log('{"name":' + name + '}');
	cluster.setupMaster({
		exec : name,
		args : process.argv,// ["8000",
					// "http://push.app.jj.cn:8088/mupush/interface/getProduct.do?callback=c&type=2"],
		silent : false
	});
	var cpus = require('os').cpus();
	var length = cpus.length - 1;
	if(length < 1) {
		length = 1;
	}
	length = 1;
	var workers = {};
	//cluster.on('fork', function(worker) {
//		workers[worker.id] = worker;
	//});
	cluster.on('exit', function(worker, code, signal) {
		var workerId = worker['workerId'];
		if(workerId === undefined) {
			workerId = worker.id;
		}
		console_log('{"worker.id":' + worker['id'] + ', "process.pid":' + worker.process.pid + ', "status":"died"}');
		var worker = cluster.fork();
		worker['workerId'] = workerId;
		console_log('{"worker.id":' + worker['id'] + ', "process.pid":' + worker.process.pid + ', "status":"start"}');
		workers[worker['workerId']] = worker;
		onMessage(worker);
	});
	var onMessage = function(worker) {
		worker.on('message', function(msg) {
			console_log("PARENT get message:", msg);
			if(msg['action'] == 'getWorkerId') {
				worker.send({
					'action' : 'returnWorkerId',
					'length' : length,
					'workerId' : worker['workerId']
			    });
			} else {
				msg['from'] = worker['id'];
				if(msg['to'] !== undefined) {
					for (var id in workers) {
//						console_log("+++++++++++++++++++++++++++++++message:",  worker['id'] + '_' +  parseInt(id) + '_' + msg['to']);
//						console_log("+++++++++++++++++++++++++++++++message:",  typeof worker['id'] + '_' + typeof parseInt(id) + '_' + typeof msg['to']);
//						console_log("+++++++++++++++++++++++++++++++message:",  (worker['id'] != parseInt(id)) + '_' + (worker['id'] == msg['to']));
						if(parseInt(id) == msg['to']) {
//							console_log("+++++++++++++++++++++++++++++++message in");
							workers[id].send(msg);
						}
					}
				} else {
					for (var id in workers) {
						if(workers[id] !== undefined && worker['id'] !== parseInt(id)) {
							workers[id].send(msg);
						}
					}
				}
			}
		});
	};
	for ( var i = 0; i < length; i++) {
		var worker = cluster.fork();
		worker['workerId'] = worker.id;
		workers[worker['workerId']] = worker;
//		console_log("+++++++++++++++++++++++++++++++", worker);
//		console_log(worker['id']);
		onMessage(worker);
	}
})();
});