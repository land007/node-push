(function() {
	//npm install heapdump
	//npm install memwatch
	var heapdump = require('heapdump');//sudo kill -USR2 1154
	//chrome Profiles heapdump-8490888.442947.heapsnapshot
	var memwatch = require('memwatch');
	var start = new Date();
	function msFromStart() {
	  return new Date() - start;
	}
	// report to console postgc heap size
	memwatch.on('stats', function(d) {
	  console.log("postgc:", msFromStart(), JSON.stringify(d));//d.current_base
	});
	memwatch.on('leak', function(d) {
	  console.log("leak:", d);
	});
	//also report periodic heap size (every 10s)
	setInterval(function() {
	  console.log("naive:", msFromStart(), process.memoryUsage().heapUsed);
	}, 5000);
//	name = '1111111111111111';
//	asdf = function(){};
})();