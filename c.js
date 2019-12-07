(function() {
	var cluster = require('cluster');
	//console.log('cluster.isWorker:'+cluster.isWorker+' cluster.isMaster:'+cluster.isMaster);
	isCluster = true;
	if (isCluster && cluster.isMaster) {
		var numCPUs = require('os').cpus().length - 1;
		// Fork workers.
		for ( var i = 0; i < numCPUs; i++) {
			cluster.fork();
		}
	
		cluster.on('exit', function(worker, code, signal) {
			console.log('worker ' + worker.process.pid + ' died');
		});
	}
})();