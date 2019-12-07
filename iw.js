(function() {
	if (global.isWorker) {
		var cc = function(msg, actname, object, req, ret) {
//			var object = global.sessions;
//			var req = 'sessionid';
//			var ret = 'sessionid';
			if (msg['action'] == 'get' + actname) {
				var value;
				value = object[req];
				if (value !== undefined) {
					var message = msg;
					message['action'] = 'return' + actname;
					message['to'] = msg['from'];
					message['value'] = value;
					process.send(message);
					console.log('['+global.id+']['+msg['from']+']get' + req + '[' + global.id + ']have value:', value);
				}
				return true;
			} else if (msg['action'] == 'return' + actname) {
				var value = msg['value'];
				object[ret] = value;
				console.log('['+global.id+']['+msg['from']+']return object[' + ret + ']:', value);
				return true;
			}
			return false;
		};
		process.on('message', function(msg) {
			console.log('[' + global.id + ']CHILD goto message:', msg);
			if (msg['action'] == 'returnWorkerId') {
				var isWorker = msg['length'] > 1 ? true : false;
				global.ep0.emit("WorkerId", {isWorker: isWorker, workerId: msg['workerId']});
				console.log('return {isWorker: ' + isWorker + ', workerId: ' + msg['workerId'] + '}');
			} else if (msg['action'] == 'sendMsg') {
				global.messages['/talkgadget/dch/bind'][global.messages['/talkgadget/dch/bind'].length] = msg['msg'];
			} else if (cc(msg, 'Count', global.counts, global.id, msg['from'])) {
//			} else if (msg['action'] == 'getCount') {
//				process.send({
//					'action' : 'returnCount',
//					'to' : msg['from'],
//					'count': global.counts[global.id]
//			    });
//			} else if (msg['action'] == 'returnCount') {
//				global.counts[msg['from']] = msg['count'];
//				console.log('[' + msg['from'] + ']return [count]:' + msg['count']);
//			} else if (cc(msg, 'Session', global.sessions, msg['sessionid'], msg['sessionid'])) {
			} else if (msg['action'] == 'getSession') {
				var sessionid = msg['sessionid'];
				var session = global.sessions[sessionid];
				if (session !== undefined) {
					console.log('['+global.id+']['+msg['from']+']getSession[' + global.id + ']have session:', session);
					process.send({
						'action' : 'returnSession',
						'to' : msg['from'],
						'sessionid': sessionid,
				    	'session' : session
				    });
				}
			} else if (msg['action'] == 'returnSession') {
				var sessionid = msg['sessionid'];
				var session = msg['session'];
				if (global.sessions[sessionid] === undefined) {
					global.sessions[sessionid] = session;
				} else {
					if (session['noop'] >= global.sessions[sessionid]['noop'] && session['n'] > global.sessions[sessionid]['n']) {
						global.sessions[sessionid] = session;
					}
				}
				console.log('['+global.id+']return session['+sessionid+']:', session);
			} else if (msg['action'] == 'signUser') {
				var uuid = msg['uuid'];
				var userid = msg['userid'];
				for (var sessionid in global.sessions) {
					var session = global.sessions[sessionid];
					if (uuid == session['uuid']) {
						session['userid'] = userid;
						console.log('['+global.id+']ReceiveUser['+uuid+']:', userid);
					}
				}
			} else if (msg['action'] == 'signOut') {
				var uuid = msg['uuid'];
				for (var sessionid in global.sessions) {
					var session = global.sessions[sessionid];
					if (uuid == session['uuid']) {
						delete session['userid'];
						console.log('['+global.id+']signOut:', uuid);
					}
				}
			} else if (msg['action'] == 'misfiring') {
				var uuid = msg['uuid'];
				for (var sessionid in global.sessions) {
					var session = global.sessions[sessionid];
					if (uuid == session['uuid']) {
						session['fire'] = false;
						console.log('['+global.id+']Misfiring:', uuid);
					}
				}
			} else if (msg['action'] == 'fire') {
				var uuid = msg['uuid'];
				for (var sessionid in global.sessions) {
					var session = global.sessions[sessionid];
					if (uuid == session['uuid']) {
						session['fire'] = true;
						console.log('['+global.id+']Fire:', uuid);
					}
				}
			} else if (msg['action'] == 'getUuidUser') {
				var uuid = msg['uuid'];
				var user = global.uuidUsers[uuid];
				if (user !== undefined) {
					process.send({
						'action' : 'returnUuidUser',
						'to' : msg['from'],
						'uuid': uuid,
				    	'user' : user
				    });
				}
			} else if (msg['action'] == 'returnUuidUser') {
				var uuid = msg['uuid'];
				var user = msg['user'];
				for (var sessionid in global.sessions) {
					var session = global.sessions[sessionid];
					if (session['uuid'] == uuid) {
						session['userid'] = user['userid'];
						console.log('['+global.id+']ReceiveUser['+uuid+']:', user['userid']);
					}
				}
			} else if (msg['action'] == 'getUser') {
				var userid = msg['userid'];
				var uuids = [];
				for (var uuid in global.uuidUsers) {
					var user = global.uuidUsers[uuid];
					if (user['userid'] == userid) {
						uuids[uuids.length] = uuid;
					}
				}
				if (uuids.length > 0) {
					process.send({
						'action' : 'returnUser',
						'to' : msg['from'],
						'userid': userid,
				    	'uuids' : uuids
				    });
				}
			} else if (msg['action'] == 'returnUser') {
				var userid = msg['userid'];
				var uuids = msg['uuids'];
				for (var i in uuids) {
					if (global.users[userid] === undefined) {
						global.users[userid] = [];
					}
					global.users[userid][global.users[userid].length] = uuids[i];
				}
			} else if (msg['action'] == 'getMessage') {
				var app = msg['app'];
				var userid = msg['userid'];
				var uuid = msg['uuid'];
				var uuidMessages = [];
				userMsgsdb.find({ app: app, userid: userid, valid: true }, function (err, docs) {
					if (!err) {
						console.log('userMsgsdb.docs.length:' + docs.length);
						for (var i = 0; i < docs.length; i++) {
							if (docs[i]['_id'] !== undefined) {
								docs[i]['valid'] = false;
								userMsgsdb.update({ _id: docs[i]['_id'] }, docs[i], {}, function (err, numReplaced) {
									if (err) {
										console.error(err);
									}
								});
							}
							var timeout = docs[i]['time'] + docs[i]['out'];
							if (now > timeout) {
								continue;
							}
							uuidMessages[uuidMessages.length] = docs[i]['msg'];
						}
					}
				});
				if (uuidMessages.length > 0) {
					process.send({
						'action' : 'returnUser',
						'to' : msg['from'],
						'uuid' : uuid,
				    	'uuidMessages' : uuidMessages
				    });
				}
			} else if (msg['action'] == 'returnMessage') {
				var uuid = msg['uuid'];
				var uuidMessages = msg['uuidMessages'];
//				var from = msg['from'];
//				uuidMessages['from'] = from;
				for (var i in uuidMessages) {
					global.uuidMessages[uuid][global.uuidMessages[uuid].length] = uuidMessages[i];
				}
				console.log('['+global.id+']return uuidMessages['+uuid+']:', uuidMessages);
//			} else if (msg['action'] == 'sendUserMsg') {
//				var app = msg['app'];
//				var userid = msg['userid'];
//				var _msg = msg['msg'];
//				var now = msg['now'];
//				var out = msg['out'];
//				var have = false;
//				for (var uuid in global.uuidUsers) {
//					var user = global.uuidUsers[uuid];
//					if (user['userid'] == userid) {
//						have = true;
//						break;
//					}
//				}
//				if (have) {
//					var _userMsg = {'app':app, 'userid':userid, 'msg':_msg, 'time':now, 'out':out, 'valid': true};
//					userMsgsdb.insert(_userMsg, function (err, newMsg) {
//			        	if (err) {
//			        		response.writeHead(200, headers);
//			    			response.end('{"result":0, "err":"' + err + '"}\n');
//			    		} else {
//			    			response.writeHead(200, headers);
//			    			response.end('{"result":1, "msg":"' + msg + '"}\n');
//			    		}
//		        	});
//				}
//			} else if (msg['action'] == 'spentMessage') {
//				var sessionuuid = msg['sessionuuid'];
////				var messageid = msg['messageid'];
//				delete global.uuidMessages[sessionuuid];
//				//删除数据库相应uuid消息函数调用
//				console.log('['+global.id+']return spentMessage[sessionuuid]:', sessionuuid);
//			} else if (msg['action'] == 'sendUser') {
//				var uuid = msg['uuid'];
//				var userid = msg['userid'];
//				for (var sessionid in global.sessions) {
//					var session = global.sessions[sessionid];
//					if (uuid == session['uuid']) {
//						session['userid'] = userid;
//						console.log('['+global.id+']ReceiveUser['+uuid+']:', userid);
//					}
//				}
//			} else if (msg['action'] == 'remoteUser') {
//				var uuid = msg['uuid'];
//				for (var sessionid in global.sessions) {
//					var session = global.sessions[sessionid];
//					if (uuid == session['uuid']) {
//						delete session['userid'];
//						console.log('['+global.id+']RemoteUser:', uuid);
//					}
//				}
			} else {
				
			}
		});
		process.send({
    		'action' : 'getWorkerId'
        });
		console.log('['+global.id+']getWorkerId');
	}
	global.testids = function(ids, uuid) {
		var now = new Date().getTime();
		var msgs = global.messages['/talkgadget/dch/bind'];
		for (var i in msgs) {
			if (msgs[i]['_id'] !== undefined) {
				for (var j in ids) {
					 if (msgs[i]['_id'] == ids[j]) {
						 msgs[i]['player'][uuid] = 0;
						 msgs[i]['modify'] = now;
					 }
				}
			}
		}
	}
})();