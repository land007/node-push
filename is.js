if(port == 80){
	var options = {
			key: require('fs').readFileSync('/Volumes/jiayq/Documents/17Fox/公司APK签名/server.key'),
			cert: require('fs').readFileSync('/Volumes/jiayq/Documents/17Fox/公司APK签名/server.crt')
		};
	require('https').createServer(options, connectionListener).listen(443);
}