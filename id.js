(function() {
	//npm install jsontoxml
	var jsontoxml = require('jsontoxml');
	var dat = {};
	var setDat = function(name, data) {
		dat[name] = [];
		if (data instanceof Array) {
			for ( var i = 0; i < data.length; i++) {
				dat[name][i] = jsontoxml.cdata(JSON.stringify(data[i]));// jsontoxml.escape(
			}
		} else {
			if (typeof data == 'object') {
				var i = 0;
				for ( var da in data) {
					dat[name][i] = jsontoxml.cdata(da + ':' + JSON.stringify(data[da]));
					i++;
				}
				if (i == 0) {
					dat[name][0] = jsontoxml.cdata(JSON.stringify(data));
				}
			} else {
				dat[name][0] = jsontoxml.cdata(JSON.stringify(data));
			}
		}
	};
	setDat('messages', global.messages['/talkgadget/dch/bind']);
	setDat('uuidMessages', global.uuidMessages);
	setDat('users', global.users);
	setDat('tokens', global.tokens);
	setDat('id', global.id);
//	var count = 0;
//	var ucount = 0;
//	for(var sessionid in global.sessions) {
//		var session = global.sessions[sessionid];
//		if(session['userid'] !== undefined) {
//			ucount++;
//		}
//		count++;
//	}
//	setDat('count', count);
//	setDat('ucount', ucount);
	var count = 0;
	var counts = [];
	for(var c in global.counts) {
		if (global.counts[c] !== undefined) {
			count += global.counts[c];
			counts[counts.length] = {id : c, count : global.counts[c]};
		}
	}
//	setDat('count', count + ' ' + str);
	setDat('counts', counts);
	setDat('uuidUsers', global.uuidUsers);
	setDat('sessions', global.sessions);
	setDat('users', global.users);
//	setDat('str', _global.str);
//	console.log('-----------------------------'+JSON.stringify(asdf));
	var str = '<?xml version="1.0" encoding="UTF-8"?>\n' + jsontoxml({
		'data' : dat
	});
	return str;
})();