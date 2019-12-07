//(function (exports, require, module, __filename, __dirname) {
module.exports = (function() {
	var console_log = function(log) {
		console.log(log);
	};
	var console_error = function(log) {
		console.error(log);
	};
	process.argv.forEach(function (val, index, array) {
		console_log(index + ': ' + val);
	});
	//npm install nedb
	//npm install jsonp-client
	//npm install jsontoxml
	//npm install eventproxy
//	var child_process = require('child_process');
	var cluster = require('cluster');
	var url = require('url');
	var querystring = require('querystring');
	var crypto = require('crypto');
	var fs = require('fs');
	var vm = require('vm');
	var path = require('path'), normalize = path.normalize, join = path.join, sep = path.sep;
	var zlib = require('zlib');
	var http = require('http');
	var EventProxy = require('eventproxy');
	var Datastore = require('nedb');
	//, db = new Datastore({ filename: 'data/'+global.id });
	var jsonpClient = require('jsonp-client');
	/**
	 * 推送服务
	 * @author jiayiqiu
	 */
	var port = 8000;
	var www = 'public';
	var root = __dirname + sep + www;
	var d_html = root + sep + 'd.html';
	var apserver = 'http://push.app.jj.cn:8088/mupush/interface/getProduct.do?callback=c&type=2';//http://192.168.15.181:8080/mupush/interface/getProduct.do?callback=c&type=2
	if (process.argv.length >= 3) {
		port = process.argv[2];
	}
	if (process.argv.length >= 4) {
		apserver = process.argv[3];
	}
	console_log('{"start port":' + port + ', "start time":' + new Date() + '}');
	var tickTime = 1000;
	var waitTime = 100;
	var resetTime = 10000;
	global.id = 1;
	global.isWorker = cluster.isWorker;
	global.ep1 = EventProxy.create('LoadMsgs', 'LoadUsers', 'LoadUserMsgs', "LoadJsonp", function (msgsdb, usersdb, userMsgsdb, data) {
		global.tick = 40000;
		global.template = {
			'ae' : '\n[[#version,[\'c\',[\'C306FC0C0D6C4500\',[\'ae\',#message]\n]]\n]\n]\n',
			'noop' : '\n[[#version,[#message]\n]\n]\n',
			'join' : '\n[[#version,[\'c\',[\'C306FC0C0D6C4500\',[\'sus\',[[\'defaultMuvcRoom\',\'\']\n,[\'displayOob\',\'true\']\n,[\'displayRemotingOob\',\'true\']\n,[\'fullscreenBrowserAlways\',\'true\']\n,[\'gus\',\'\']\n,[\'hangoutsAbuseRecordingTermsAgreed\',\'false\']\n,[\'hangoutsAllowLogsUpload\',\'false\']\n,[\'hangoutsCapturePromoDialogAcked\',\'false\']\n,[\'hangoutsChatExpanded\',\'false\']\n,[\'hangoutsHdOptOutPromoBubbleAcked\',\'false\']\n,[\'hangoutsOnAirDirectorHostGuideAcked\',\'false\']\n,[\'hangoutsOnAirDirectorPromoAcked\',\'false\']\n,[\'hangoutsOnAirQuestionsHostGuideAcked\',\'false\']\n,[\'hangoutsOnAirQuestionsPromoAcked\',\'false\']\n,[\'hangoutsOnAirTermsAgreed\',\'false\']\n,[\'hangoutsOnAirV2NewCountryPromoAcked\',\'false\']\n,[\'hangoutsOnAirV2PromoAcked\',\'false\']\n,[\'hangoutsQualityPromoBubbleAcked\',\'false\']\n,[\'hangoutsWaverlyHelpDisplayed\',\'false\']\n,[\'hangoutsWaverlySidebarCollapsed\',\'false\']\n,[\'hasSentMessage\',\'false\']\n,[\'highResolutionEnabled\',\'false\']\n,[\'introPromo\',\'false\']\n,[\'jmiQuality\',\'true\']\n,[\'lastFriendSuggestionPrompt\',\'0\']\n,[\'licensing\',\'\']\n,[\'moleAvatars\',\'false\']\n,[\'muvcRoomHistory\',\'\']\n,[\'namedRoomHistory\',\'\']\n,[\'pluginHelpPaneState\',\'ok\']\n,[\'rosterSortOption\',\'MOST_POPULAR\']\n,[\'showChatUpdated\',\'true\']\n,[\'showFriendSuggestionPrompts\',\'true\']\n,[\'signedOut\',\'false\']\n,[\'skipHangoutsExtrasPromo\',\'false\']\n,[\'soundEnabled\',\'true\']\n,[\'troubleshootingCaseId\',\'\']\n,[\'troubleshootingIssues\',\'\']\n,[\'troubleshootingStartTime\',\'0\']\n,[\'useChatCircles\',\'\']\n,[\'userCircleSetting\',\'\']\n]\n]\n]]\n]\n]\n'
		};
		global.post_template = {
			'/talkgadget/dch/bind' : '\n[[0,[\'c\',\'#SID\',,8]\n]\n,[1,[\'b\']\n]\n,[2,[\'c\',[\'#CID\',[\'ei\',\'6h2kpJGvhcI\',\'1389641456\',0,28800000,57600000,28800000]\n]]\n]\n]\n'
		};
		global.messages = {
			'/talkgadget/dch/bind' : [{'app' : 'PsMonkey', 'msg' : 'helloworld1', 'tmp' : 'ae', 'time' : new Date().getTime(), 'out' : 10000, 'player' : {}, 'valid' : true},
			                          {'app' : 'PsMonkey', 'msg' : 'helloworld2', 'tmp' : 'ae', 'time' : new Date().getTime(), 'out' : 10000, 'player' : {}, 'valid' : true},
			                          {'msg':'noop', 'tmp' : 'noop', 'time' : new Date().getTime(), 'in' : global.tick, 'valid' : true}]
		};
		global.appUsers = {};// {appid_userid:[uuid,uuid],appid_userid:[uuid,uuid]}
		global.uuidUsers = {};// {uuid:{uuid,userid,time,fire},uuid:{uuid,userid,time,fire}}
		global.uuidMessages = {};// {uuid:[msg,msg],uuid:[msg,msg]}
//		global.uuidTimeout = {};// {uuid:timeout,uuid:timeout}
		global.uuidInterval = {};// {uuid:interval,uuid:interval}
		global.tokens = {'AHRlWrpNWFYtAArqSsowDEA4PC2QDqYDGC0Rqd8nsSlDkV81BZaitZ_8zYawO_4tokRI3rQ7_dx-cbc1XnVbXeIcxfxD81EyLq0qcvxhg_qnSS5HB_wXBhQ' : 'PsMonkey'};
		global.sessions = {};//'11ac559bfa6f8661':{"uuid":"b3a4287a-368b-4c64-9e6b-f21d24388305", "time":1397467618473, "noop":1398069973423, "n":14915, "app":"androidHelperDev", "token":"0e1137508a574ebeb06a137d48f4f23b"}
		global.counts = [];
//		global.counts[global.id] = 0;
		console_log(data);
//		{ total: 2,
//		  rows: 
//		   [ { productid: '03413f4d0c544bb6a70c042f0b214bb1',
//		       productname: 'androidTest',
//		       keystorepath: '',
//		       keystorepassword: '',
//		       flag: 0,
//		       id: 13,
//		       type: 2,
//		       insertedtime: 1393402973000,
//		       updatedtime: 1393402973000 },
//		     { productid: '0e1137508a574ebeb06a137d48f4f23b',
//		       productname: 'androidHelperDev',
//		       keystorepath: '',
//		       keystorepassword: '',
//		       flag: 0,
//		       id: 17,
//		       type: 2,
//		       insertedtime: 1393557170000,
//		       updatedtime: 1393557170000 } ] }
		for (var i = 0; i < data.rows.length; i++) {
			global.tokens[data.rows[i]['productid']] = data.rows[i]['id'];
		}
		msgsdb.find({ valid: true }, function (err, docs) {
			if (!err) {
				console_log('{"msgsdb.docs.length":' + docs.length + '}');
				for (var i = 0; i < docs.length; i++) {
					global.messages['/talkgadget/dch/bind'][global.messages['/talkgadget/dch/bind'].length] = docs[i];
				}
			}
		});
		usersdb.find({ valid: true }, function (err, docs) {
			if (!err) {
				console_log('{"usersdb.docs.length":' + docs.length + '}');
				for (var i = 0; i < docs.length; i++) {
					global.uuidUsers[docs[i]['uuid']] = docs[i];
					if (global.uuidUsers[docs[i]['uuid']]['userid'] !== undefined && global.uuidUsers[docs[i]['uuid']]['app'] === undefined) {
						global.uuidUsers[docs[i]['uuid']]['app'] = 22;
						usersdb.update({ _id: global.uuidUsers[docs[i]['uuid']]['_id'] }, global.uuidUsers[docs[i]['uuid']], {}, function (err, numReplaced) {
							if (err) {
				        		console_error('{"usersdb.update err":"' + err + '"}');
				    		}
						});
					}
				}
			}
		});
		var sessionTimeOut = 30 * 60;//秒
		setInterval(function() {
			var now = new Date().getTime();
			console_log('{"clean session time":' + now + '}');
			var i = 0;
			for (var session in global.sessions) {
        		if (now - global.sessions[session]['noop'] > sessionTimeOut * 1000) {
        			delete global.sessions[session];
        			i++;
        		} 
			}
			console_log('{"clean session count":' + i + '}');
			var messages = global.messages['/talkgadget/dch/bind'];
			for (var i = 0; i < messages.length; i++) {
				var message = messages[i];
				if (message['out'] !== undefined) {
					var timeout = message['time'] + message['out'];
					if (now > timeout) {
						if (message['_id'] !== undefined) {
							message['valid'] = false;
							delete message['modify'];
							msgsdb.update({ _id: message['_id'] }, message, {}, function (err, numReplaced) {
								if (err) {
									console_error('{"msgsdb.update err":"' + err + '"}');
								}
							});
						}
						messages.splice(i, 1);
						i--;
						console_log('{"splice":"' + JSON.stringify(message) + '", "messages.length":"' + messages.length + '"}');
						continue;
					} else {
						if (message['modify'] !== undefined) {
							if (message['_id'] !== undefined) {
								delete message['modify'];
								msgsdb.update({ _id: message['_id'] }, message, {}, function (err, numReplaced) {
									if (err) {
										console_error('{"msgsdb.update err":"' + err + '"}');
									}
								});
							}
						}
					}
				}
			}
		}, sessionTimeOut * 1000);
		setInterval(function() {
			var sum = 0;
			var usr = 0;
			for(var sessionid in global.sessions) {
				var session = global.sessions[sessionid];
				if(session['app'] != 'PsMonkey') {
					sum++;
					if(session['userid'] !== undefined) {
						usr++;
					}
				}
			}
			for(var sessionid in global.sessions) {
				var session = global.sessions[sessionid];
				if(session['app'] == 'PsMonkey') {
					if (global.uuidMessages[session.uuid] === undefined) {
						global.uuidMessages[session.uuid] = [];
					}
					global.uuidMessages[session.uuid][global.uuidMessages[session.uuid].length] = {id: 'count', msg: {'sum': sum, 'usr': usr}};
				}
			}
		}, 10 * 1000);
//		var pushlength = 1454;//1907
//		var pushchar = function(length) {
//			if (length === undefined) {
//				length = 0;
//			}
//			var i = 0;
//			var arr = [];
//			var l = pushlength - length;
//			for (i = 0; i < l; i++) {
//				arr.push(' ');
//			}
//			return arr.join('') + '\n';
//		};
		var zip = true;
		var setStaticContentType = function(headers) {
			headers['Status'] = '200 OK';
			headers['Content-Type'] = 'text/plain; charset=utf-8';
			headers['Cache-Control'] = 'no-cache, no-store, max-age=0, must-revalidate';
			headers['Pragma'] = 'no-cache';
			headers['X-Content-Type-Options'] = 'nosniff';
			headers['X-Xss-Protection'] = '1; mode=block';
		};
		var getClientIp = function(req) {
		    return req.headers['x-forwarded-for'] ||
		    req.connection.remoteAddress ||
		    req.socket.remoteAddress ||
		    (req.connection.socket?'not-know-ip':req.connection.socket.remoteAddress);
		};
		var getClientPort = function(req) {
		    return req.connection.remotePort ||
		    req.socket.remotePort ||
		    (req.connection.socket?'not-know-port':req.connection.socket.remotePort);
		};
		var setContentType = function(fileName, request, headers) {
			headers['Status'] = '200 OK';
			var acceptEncoding = request.headers['accept-encoding'];
			if (!acceptEncoding) {
				acceptEncoding = '';
			}
			switch (fileName) {
			case '.html':
				if (zip) {
	        		if (acceptEncoding.match(/\bgzip\b/)) {
						headers['Content-Encoding'] = 'gzip';
					} else if (acceptEncoding.match(/\bdeflate\b/)) {
						headers['Content-Encoding'] = 'deflate';
					}
	        	}
				headers['Content-Type'] = 'text/html; charset=UTF-8';
				break;
			case '.xml':
				if (zip) {
	        		if (acceptEncoding.match(/\bgzip\b/)) {
						headers['Content-Encoding'] = 'gzip';
					} else if (acceptEncoding.match(/\bdeflate\b/)) {
						headers['Content-Encoding'] = 'deflate';
					}
	        	}
				headers['Content-Type'] = 'application/xml';
				break;
			case '.log':
				headers['Content-Type'] = 'application/json';
				headers['Access-Control-Allow-Origin'] = '*';
				break;
			case '.sign':
				headers['Content-Type'] = 'application/json';
				headers['Access-Control-Allow-Origin'] = '*';
				break;
			case '.js':
				if (zip) {
	        		if (acceptEncoding.match(/\bgzip\b/)) {
						headers['Content-Encoding'] = 'gzip';
					} else if (acceptEncoding.match(/\bdeflate\b/)) {
						headers['Content-Encoding'] = 'deflate';
					}
	        	}
				headers['Content-Type'] = 'text/javascript; charset=UTF-8';
				headers['Cache-Control'] = 'private, max-age=0';
				cacheControl = 'private, max-age=0';
				break;
			case '.css':
				if (zip) {
	        		if (acceptEncoding.match(/\bgzip\b/)) {
						headers['Content-Encoding'] = 'gzip';
					} else if (acceptEncoding.match(/\bdeflate\b/)) {
						headers['Content-Encoding'] = 'deflate';
					}
	        	}
				headers['Content-Type'] = 'text/css';
				break;
			case '.gif':
				headers['Content-Type'] = 'image/gif';
				break;
			case '.jpg':
				headers['Content-Type'] = 'image/jpeg';
				break;
			case '.png':
				headers['Content-Type'] = 'image/png';
				break;
			case '.json':
				headers['Content-Type'] = 'application/json;charset=UTF-8';
				headers['Access-Control-Allow-Origin'] = '*';
				break;
			case '.apk':
				headers['Content-Type'] = 'application/octet-stream';
				break;
			case '.txt':
				if (zip) {
	        		if (acceptEncoding.match(/\bgzip\b/)) {
						headers['Content-Encoding'] = 'gzip';
					} else if (acceptEncoding.match(/\bdeflate\b/)) {
						headers['Content-Encoding'] = 'deflate';
					}
	        	}
				headers['Content-Type'] = 'text/plain; charset=utf-8';
				break;
			default:
				headers['Content-Type'] = 'application/octet-stream';
			}
		};
		var send = function(data, headers, response) {
			if (typeof data === 'string') {// || Buffer.isBuffer(data)
				if (zip && headers['Content-Encoding'] !== undefined) {
					if (headers['Content-Encoding'] == 'gzip') {
						zlib.gzip(data, function(err, buffer) {
			        		if (!err) {
			        			headers['Content-Length'] = buffer.length;
			        			response.writeHead(200, headers);
								response.end(buffer);
			        		}
		        		});
					} else if (headers['Content-Encoding'] == 'deflate') {
						zlib.deflate(data, function(err, buffer) {
			        		if (!err) {
			        			headers['Content-Length'] = buffer.length;
			        			response.writeHead(200, headers);
								response.end(buffer);
			        		}
		        		});
					}
	        	} else {
	        		headers['Content-Length'] = data.length;
        			response.writeHead(200, headers);
					response.end(data);
	        	}
			} else {
				if (headers['Content-Encoding'] !== undefined) {
					response.writeHead(200, headers);
					if (headers['Content-Encoding'] == 'gzip') {
						data.pipe(zlib.createGzip()).pipe(response);
					} else if (headers['Content-Encoding'] == 'deflate') {
						data.pipe(zlib.createDeflate()).pipe(response);
					}
				} else {
					response.writeHead(200, headers);
					data.pipe(response);
				}
			}
		};
		var http_method_funs = {
			'GET' : function(resid, data, request, response) {
				var pathname = url.parse(request.url).pathname;
				pathname = normalize(join(root, pathname));
			    root = normalize(root + sep);
			    // malicious path
			    if ((pathname + sep).substr(0, root.length) !== root) {
			    	console_error('malicious path "' + pathname + '"');
			    	response.writeHead(403, headers);
					response.end('malicious path "' + pathname + '"\n');
			    	return;
			    }
//				var pathname = __dirname + url.parse(request.url).pathname;
				var headers = {};
				headers['Server'] = 'JSE';
				headers['Version'] = 'HTTP/1.1';
				fs.stat(pathname, function(stat_error, stat) {
					if (!stat_error && stat.isFile()) {
//						console_log('{"GET Request file":"' + pathname + '"}');
						setContentType(path.extname(pathname), request, headers);
						send(fs.createReadStream(pathname), headers, response);
//						fs.readFile(pathname, {encoding: 'utf-8'}, function(err, data) {
//							response.end(data);
//						});
					} else {
//						console_log('{"GET Request path":"' + resid + '"}');
						var arg = url.parse(request.url).query; //arg => name=a&id=5  
//				        console_log('{"GET Request arg":"' + arg + '"}');
				        var args = querystring.parse(arg);
						if (global.messages[resid] !== undefined) {
							var token = args['token'];
							var clid = args['clid'];
							var sid = args['SID'];
							var sessionid = args['gsessionid'];
							if (token !== undefined && clid !== undefined && sid !== undefined && sessionid !== undefined) {
								if (global.isWorker) {
						        	process.send({
						        		'action' : 'getSession',
						        		'sessionid' : sessionid
							        });
						        }
			        			setTimeout(function() {
			        				if (global.sessions[sessionid] !== undefined) {
										var session = global.sessions[sessionid];
//										console_log('{"global.uuidInterval[session.uuid]":"' + global.uuidInterval[session.uuid] + '"}');
										if (global.uuidInterval[session.uuid] !== undefined) {
//											console_log('{"connect":"reset","sessionid":"' + sessionid + '","ip":"' + global.uuidInterval[session.uuid]['ip'] + '"}');
											clearInterval(global.uuidInterval[session.uuid]['interval']);
											global.uuidInterval[session.uuid]['response'].end();
											delete global.sessions[global.uuidInterval[session.uuid]['sessionid']];
											delete global.uuidInterval[session.uuid];
//											global.counts[global.id]--;
										}
										if (global.isWorker) {
								        	process.send({
								        		'action' : 'getUuidUser',
								        		'uuid' : session.uuid
									        });
								        }
										setTimeout(function() {
											if (global.uuidUsers[session.uuid] !== undefined) {
												if (global.uuidUsers[session.uuid]['userid'] !== undefined) {
													session['userid'] = global.uuidUsers[session.uuid]['userid'];
													session['usertime'] = global.uuidUsers[session.uuid]['time'];
//													console_log('{"userid":"' + session['userid'] + '", "usertime":"' + session['usertime'] + '"}');
												}
												session['fire'] = global.uuidUsers[session.uuid]['fire'];
											}
					        			}, waitTime);
										var ip = getClientIp(request) + ':' + getClientPort(request);
//										console_log('{"connect":"open","sessionid":"' + sessionid + '","ip":"' + ip + '"}');
										session['ip'] = ip;
										setStaticContentType(headers);
										response.writeHead(200, headers);
										var myoutput = function(first) {
											if (session.assert !== undefined) {
//												console_log('{"connect":"end","sessionid":"' + sessionid + '","ip":"' + global.uuidInterval[session.uuid]['ip'] + '"}');
												clearInterval(global.uuidInterval[session.uuid]['interval']);
												global.uuidInterval[session.uuid]['response'].end();
												delete global.sessions[global.uuidInterval[session.uuid]['sessionid']];
												delete global.uuidInterval[session.uuid];
//												global.counts[global.id]--;
												return;
											}
											var now = new Date().getTime();
											var messages = global.messages[resid];
											for (var i = 0; i < messages.length; i++) {
												var message = messages[i];
												if (message['out'] !== undefined) {
													var timeout = message['time'] + message['out'];
													if (now > timeout) {
														if (message['_id'] !== undefined) {
															message['valid'] = false;
															delete message['modify'];
															msgsdb.update({ _id: message['_id'] }, message, {}, function (err, numReplaced) {
																if (err) {
																	console_error('{"msgsdb.update err":"' + err + '"}');
																}
															});
														}
														messages.splice(i, 1);
														i--;
														console_log('{"splice":"' + JSON.stringify(message) + '", "messages.length":"' + messages.length + '"}');
														continue;
													}
												}
												if (message['in'] !== undefined) {
//																if (!first) {// 第一次发送
//																	var timein = message['time'] + message['in'];
//																	if (now < timein) {
//																		continue;
//																	} else {
//																		message['time'] = now;
//																	}
//																}
													var timein = session['noop'] + message['in'];
													if (now < timein) {
														continue;
													}
												}
												var template = global.template[message['tmp']];
												if (template !== undefined
														&&
														(message['in'] !== undefined 
																|| 
																((message['player'] === undefined  || (message['player'] !== undefined && (message['player'][session.uuid] === undefined || (message['player'][session.uuid] !== undefined && message['player'][session.uuid] != 0 && (now - message['player'][session.uuid]) > resetTime))))
																				&& 
																				(message['app'] === undefined || (message['app'] !== undefined && session['app'] == message['app']))))) {
													if (message['tmp'] === 'noop') {
														var str = template;//.join('\n\n\n') + '\n\n\n';
														str = str.replace('#version', session['n']);
														str = str.replace('#message', '\''+message['msg']+'\'');
														str = (str.length-1) + str;
														if (first) {
//															str = (str.length < pushlength) ? (str + pushchar(str.length)) : str; // for MTU
															var join = global.template['join'];
															join = join.replace('#version', session['n']);
															join = (join.length-1) + join;
															str = str + join;
														}
//														console_log(str);
														response.write(str);
														session['n']++;
														session['noop'] = now;
													} else if (message['tmp'] === 'ae') {
														if (session['fire'] === undefined || (session['fire'] !== undefined && session['fire'])) {
															if (global.uuidMessages[session.uuid] === undefined) {
																global.uuidMessages[session.uuid] = [];
															}
															global.uuidMessages[session.uuid][global.uuidMessages[session.uuid].length] = {id: message['_id'], msg: message['msg']};
														}
													}
													if (message['player'] !== undefined) {
														if (global.testids === undefined) {
															message['player'][session.uuid] = 0;
														} else {
															message['player'][session.uuid] = now;
														}
														message['modify'] = now;
													}
												}
											}
											if (session['userid'] !== undefined) {
												if (global.isWorker) {
													process.send({
										        		'action' : 'getMessage',
										        		'app' : session['app'],
										        		'userid' : session['userid'],
										        		'uuid' : session['uuid']
											        });
										        }
												var opt = { app: session['app'], userid: session['userid'], time: {$gte: session['usertime']}, sends: {$in: [session['uuid']]}, valid: true};
//												opt['uuids.' + session['uuid']] = {$exists: false};
												opt['$or'] = [];//, $or: [{ 'uuids.9464aea9-3ae0-4f01-9d01-dc4a79521d19147f382f-3bc3-4738-98ec-65ff3398cb01.time': {$gte: 1399530163605} }, { 'uuids.9464aea9-3ae0-4f01-9d01-dc4a79521d19147f382f-3bc3-4738-98ec-65ff3398cb01' : {$exists: false} }]
												opt['$or'][0] = {};
												opt['$or'][0]['uuids.' + session['uuid'] + '.time'] = {$lte: (now - resetTime)};//10秒重发,resetTime * session['n'],Math.pow(resetTime, session['n'])
												opt['$or'][1] = {};
												opt['$or'][1]['uuids.' + session['uuid']] = {$exists: false};
												userMsgsdb.find(opt, function (err, docs) {
													if (!err) {
														for (var i = 0; i < docs.length; i++) {
															if (docs[i]['_id'] !== undefined) {
																if (docs[i]['uuids'][session['uuid']] === undefined) {
																	docs[i]['uuids'][session['uuid']] = {'ip': ip, 'time': now, 'n': 1};
																} else {
																	docs[i]['uuids'][session['uuid']]['ip'] = ip;
																	var tc = now - docs[i]['uuids'][session['uuid']]['time'];
																	docs[i]['uuids'][session['uuid']]['time'] = now;
																	if (docs[i]['uuids'][session['uuid']]['n'] === undefined || tc > 45 * 1000) {
																		docs[i]['uuids'][session['uuid']]['n'] = 1;
																	} else {
																		docs[i]['uuids'][session['uuid']]['n']++;
																		if (docs[i]['uuids'][session['uuid']]['n'] > 3) {
																			session['assert'] = true;
																		}
																	}
																}
//																for (var n in docs[i]['sends']) {
//																	if (docs[i]['sends'][n] == session['uuid']) {
//																		docs[i]['sends'].splice(n, 1);
//																	}
//																}
																var del = false;
																var timeout = docs[i]['time'] + docs[i]['out'];
																if (docs[i]['sends'].length == 0) {
																	del = true;
																}
																if (now > timeout) {
																	del = true;
																} else {
																	if (session['fire'] === undefined || (session['fire'] !== undefined && session['fire'])) {
																		if (global.uuidMessages[session.uuid] == undefined) {
																			global.uuidMessages[session.uuid] = [];
																		}
																		global.uuidMessages[session.uuid][global.uuidMessages[session.uuid].length] = {id: docs[i]['_id'], msg: docs[i]['msg']};
																		console_log('{"global.uuidMessages":"' + docs[i]['msg'] + '"}');
																	}
																}
																(function(id, doc, del) {
																	userMsgsdb.update({ _id: id }, doc, {}, function (err, numReplaced) {
																		if (err) {
																			console_error('{"userMsgsdb.update":"' + err + '"}');
																		} else {
																			if (del) {
																				console_log('{"userMsgsdb.id":"' + id + '"}');
																				userMsgsdb.remove({ _id: id }, function (err, numRemoved) {
																					if (err) {
																						console_error('{"userMsgsdb.remove":"' + err + '"}');
																					} else {
																						console_log('{"userMsgsdb.remove":"' + id + '"}');
																					}
																				});
																			}
																		}
																	});
																})(docs[i]['_id'], docs[i], del);
															}
														}
													}
												});
											}
//											var timeout = 
											setTimeout(function() {
												if (global.uuidMessages[session.uuid] !== undefined) {//  && global.uuidTimeout[session.uuid] === undefined
													var ids = [];
													var msgs = [];
													for (var n in global.uuidMessages[session.uuid]) {
														if (global.uuidMessages[session.uuid][n]['id'] !== undefined) {
															ids[ids.length] = global.uuidMessages[session.uuid][n]['id'];
														}
														msgs[msgs.length] = global.uuidMessages[session.uuid][n]['msg'];
													}
													var _message = JSON.stringify(ids).replace(new RegExp('"', 'g'),'') + JSON.stringify(msgs);
													_message = _message.replace(new RegExp("'", 'g'),'‘');
													var str = global.template['ae'];
													str = str.replace('#version', session['n']);
													str = str.replace('#message', '\''+_message+'\'');
													str = (str.length-1) + str;
//													console_log('{"session.uuid":"' + session.uuid + '", "msg":"' + str + '"}');
													response.write(str);
													session['n']++;
													session['noop'] = now;
//													delete global.uuidTimeout[session.uuid];
													delete global.uuidMessages[session.uuid];
//													var froms = {};
//													var local = false;
//													for (var i in global.uuidMessages[session.uuid]) {
//														var uuidMessage = global.uuidMessages[session.uuid][i];
//														if (uuidMessage['from'] !== undefined) {
//															froms[uuidMessage['from']] = now;
//														} else {
//															local = true;
//														}
//													}
//													if (global.isWorker) {
//														for (var from in froms) {
//															process.send({
//												        		'action' : 'spentMessage',
//												        		'to' : from,
//												        		'sessionuuid' : session.uuid
//													        });
//														}
//											        }
//													if (local) {
//														//删除数据库相应uuid消息函数调用
//													}
												}
											}, waitTime);//5000
//											global.uuidTimeout[session.uuid] = timeout;
										};
										var interval = setInterval(myoutput, tickTime);
										global.uuidInterval[session.uuid] = {interval:interval,sessionid:sessionid,ip:ip,response:response};
//										global.counts[global.id]++;
										response.connection.on('end', function() {
//											console_log('{"connect":"closed","sessionid":"' + sessionid + '","ip":"' + ip + '"}');
											clearInterval(interval);
											delete global.sessions[sessionid];
											if (global.uuidInterval[session.uuid] !== undefined && global.uuidInterval[session.uuid]['ip'] == ip) {
												delete global.uuidInterval[session.uuid];
											}
//											global.counts[global.id]--;
										});
										myoutput(true);
									} else {
//										console_error('{"GET Request unknown session":"' + sessionid + '", "global.id":' + global.id+'}');
										response.writeHead(400, headers);
										response.end('unknown session\n');
									}
			        			}, waitTime);
							} else {
								response.writeHead(400, headers);
								response.end('unknown token clid sid\n');
							}
						} else {
							if (resid == '/') {
								headers['Cache-Control'] = 'no-store';
								headers['Expires'] = 0;
								headers['WWW-authenticate'] = 'Basic Realm=\"You are not logged JSE\"';
								response.writeHead(401, headers);
								response.end('\n');
							} else if (resid == '/_ah/channel/dev') {
//								var count = global.counts[global.id];
								var sum = 0;
		        				var usr = 0;
		        				for(var sessionid in global.sessions) {
		        					var session = global.sessions[sessionid];
		        					sum++;
		        					if(session['userid'] !== undefined) {
		        						usr++;
		        					}
		        				}
								global.counts = [];
								global.counts[global.id] = {'sum': sum, 'usr': usr};
			        			if (global.isWorker) {
						        	process.send({
						        		'action' : 'getCount'
							        });
						        }
			        			setTimeout(function() {
			        				global.counts[0] = {'sum': 0, 'usr': 0};
			        				for (var c in global.counts) {
			        					if (c > 0) {
			        						if (global.counts[0] !== undefined) {
			        							global.counts[0]['sum'] += global.counts[c]['sum'];
			        							global.counts[0]['usr'] += global.counts[c]['usr'];
			        						}
			        					}
			        				}
			        				var jse = args['jse'];
			        				if(jse !== undefined) {
			        					test(jse, function(data) {
					        				setContentType('.xml', request, headers);
					        				send(data, headers, response);
					        			}, function() {
					        				var cb = args['callback'];
					        				if(cb !== undefined) {
					        					var str = cb+'(' + JSON.stringify(global.counts[0]) + ')\n';
					        					setContentType('.json', request, headers);
							        			send(str, headers, response);
					        				} else {
					        					var str = 'session.count=' + JSON.stringify(global.counts[0]) + '\n';
												str += JSON.stringify(global.messages) + '\n';//var obj2 = JSON.parse(str);
//												str += JSON.stringify(global.tokens) + '\n';
//												str += JSON.stringify(global.sessions) + '\n';
//										        var messages = global.messages['/talkgadget/dch/bind'];
//												for (var i = 0; i < messages.length; i++) {
//													var message = messages[i];
//													str += message['msg'];
//												}
												setContentType('.txt', request, headers);
							        			send(str, headers, response);
					        				}
					        			});
			        				}
			        			}, waitTime);
							} else if (resid == '/destroy/msg') {
								var id = args['id'];
								var uuid = args['uuid'];
								response.writeHead(200, headers);
								if (id !== undefined && uuid !== undefined) {
									var ids = id.split(',');//JSON.parse(id);
									var now = new Date().getTime();
									if (global.testids !== undefined) {
										global.testids(ids, uuid);
									}
									userMsgsdb.find({ _id: {$in: ids} }, function (err, docs) {
										if (!err) {
											for (var i = 0; i < docs.length; i++) {
												if (docs[i]['_id'] !== undefined) {
													for (var n in docs[i]['sends']) {
														if (docs[i]['sends'][n] == uuid) {
															docs[i]['sends'].splice(n, 1);
														}
													}
													var del = false;
													var timeout = docs[i]['time'] + docs[i]['out'];
													if (docs[i]['sends'].length == 0) {
														del = true;
													}
													if (now > timeout) {
														del = true;
													}
													(function(id, doc, del) {
														userMsgsdb.update({ _id: id }, doc, {}, function (err, numReplaced) {
															if (err) {
																console_error('{"userMsgsdb.update":"' + err + '"}');
															} else {
																if (del) {
																	console_log('{"userMsgsdb.id":"' + id + '"}');
																	userMsgsdb.remove({ _id: id }, function (err, numRemoved) {
																		if (err) {
																			console_error('{"userMsgsdb.remove":"' + err + '"}');
																		} else {
																			console_log('{"userMsgsdb.remove":"' + id + '"}');
																		}
																	});
																}
															}
														});
													})(docs[i]['_id'], docs[i], del);
												}
											}
										}
									});
									response.end('{"result":"destroy ok"}');
						        } else {
									response.end('{"result":"unknown id or uuid"}');
						        }
							} else if (resid == '/_ah/channel/jsapi') {
								headers['Location'] = '/channel.js';///channel_local.js
								headers['Content-Type'] = 'text/html; charset=UTF-8';
								delete headers['Version'];
						        response.writeHead(302, headers);
						        response.end('');
							} else if (resid == '/send') {
						        var msg = args['msg'];
						        var out = args['out'];
						        var cb = args['callback'];
						        if (out === undefined) {
						        	out = 24 * 60 * 60 * 1000;// 一天
						        }
						        var token = args['token'];
						        if (token === undefined) {
						        	token = 'AHRlWrpNWFYtAArqSsowDEA4PC2QDqYDGC0Rqd8nsSlDkV81BZaitZ_8zYawO_4tokRI3rQ7_dx-cbc1XnVbXeIcxfxD81EyLq0qcvxhg_qnSS5HB_wXBhQ';
						        }
						        var app = global.tokens[token];
						        response.writeHead(200, headers);
						        if (app !== undefined) {
						        	var _msg = {'app' : app, 'msg' : msg, 'tmp' : 'ae', 'time' : new Date().getTime(), 'out' : parseInt(out), 'player' : {}, 'valid' : true};
							        if (global.isWorker) {
							        	process.send({
							        		'action' : 'sendMsg',
								        	'msg' : _msg
								        });
							        }
							        msgsdb.insert(_msg, function (err, newMsg) {   // Callback is optional
							        	if (err) {
							    			response.end(cb+'({"result":0, "err":"' + err + '"})\n');
							    		} else {
							    			global.messages['/talkgadget/dch/bind'][global.messages['/talkgadget/dch/bind'].length] = newMsg;
							    			if (cb !== undefined) {
									        	response.end(cb+'({"result":1})\n');
									        } else {
									        	response.end('{"result":1}\n');
									        }
							    		}
							        	// newDoc is the newly inserted document, including its _id
							        	// newDoc has no key called notToBeSaved since its value was undefined
						        	});
						        } else {
						        	response.end(cb+'({"result":0, "err":"unknown token"})\n');
						        }
							} else if (resid == '/talkgadget/d') {
						        var token = args['token'];
						        var xpc = args['xpc'];
						        if (token !== undefined && xpc !== undefined && global.tokens[token] !== undefined) {
						        	//console_log('{"xpc":"' + xpc + '"}');
						        	var cntype = '"cn":"';
						        	var cnvalue = xpc.substring(xpc.indexOf(cntype)+cntype.length);
						        	var cn = cnvalue.substring(0,cnvalue.indexOf('"'));
						        	//var xobj = JSON.parse(xpc);
						        	//var cn = xobj.cn;
						        	crypto.randomBytes(8, function(ex, buf0) {
						        		crypto.randomBytes(8, function(ex, buf1) {
							        		var clid = buf0.toString('hex');
							        		var sessionid = buf1.toString('hex');
							        		global.sessions[sessionid] = {};//{'uuid' : xobj.cn, 'time' : new Date().getTime(), 'noop' : new Date().getTime(), 'n': 1};
							        		global.sessions[sessionid]['uuid'] = cn;
							        		global.sessions[sessionid]['time'] = new Date().getTime();
							        		global.sessions[sessionid]['noop'] = 0;
							        		global.sessions[sessionid]['n'] = 1;
							        		global.sessions[sessionid]['app'] = global.tokens[token];
//							        		global.sessions[sessionid]['token'] = token;
									        var strVar = "";
									        strVar += "          var a = new chat.WcsDataClient(\"http:\/\/127.0.0.1\/talkgadget\/\",\n";
									        strVar += "              \"\",\n";
									        strVar += "              \"" + clid + "\",\n";//9D6CBAE40D6C4500
									        strVar += "              \"" + sessionid + "\",\n";//SessionID
									        strVar += "              \"" + new Date().getTime() + "\",\n";//1369099329 2013年5月21日 上午9:22:09
									        strVar += "              \"WCX\",\n";
									        strVar += "              \"" + token + "\"\n";//AHRlWroIfLEBUSOlStbjYsDC6EnM8p-dPVs-XQqtl-Yl8Q9nnJz83ewGqd8OBVtN2HpPYURlxonLcAB8A_BCxRKQbMIjjkvQ4TTTjMehxsUm4g-R_uo2UBw
									        strVar += "              );\n";
									        if (cn.length == 36) {
									        	headers['Content-Length'] = strVar.length;
									        	response.writeHead(200, headers);
												response.end(strVar);
									        } else {
									        	setContentType(path.extname(d_html), request, headers);
									        	fs.readFile(d_html, {encoding: 'utf-8'}, function(err, data) {
										        	strVar = data.replace('#scriptcontents', strVar);
										        	send(strVar, headers, response);
												});
									        }
							        	});
						        	});
						        } else {
						        	response.writeHead(400, headers);
									response.end('unknown token\n');
						        }
							} else if (resid == '/talkgadget/dch/test') {
//								response.writeHead(200, headers);
//								response.end('[]');
								setContentType('.txt', request, headers);
								send('[]', headers, response);
							} else if (resid == '/signUser') {//http://127.0.0.1:8000/signUser?uuid=1d636524-85e2-4973-9fe5-29b20a029e7d&userid=jiayq
								var uuid = args['uuid'];
								var userid = args['userid'];
								response.writeHead(200, headers);
								if (uuid === undefined || userid === undefined) {
									response.end('{"result":0, "err":"no uuid or userid"}\n');
									return;
								}
								var token = args['token'];
								if(token === undefined) {
									token = 'eb6d40e89d114bf49d3313ca6c3993c2';
								}
								var app = global.tokens[token];
								if (app === undefined) {
									response.end('{"result":0, "err":"token get app undefined"}\n');
									return;
								}
								var now = new Date().getTime();
								if (global.uuidUsers[uuid] === undefined) {
									global.uuidUsers[uuid] = {};
									global.uuidUsers[uuid]['uuid'] = uuid;
									global.uuidUsers[uuid]['userid'] = userid;
									global.uuidUsers[uuid]['time'] = now;
									global.uuidUsers[uuid]['fire'] = true;
									global.uuidUsers[uuid]['valid'] = true;
									global.uuidUsers[uuid]['app'] = app;
									usersdb.insert(global.uuidUsers[uuid], function (err, newMsg) {
							        	if (err) {
							        		console_error('{"usersdb.insert err":"' + err + '"}');
							    			response.end('{"result":0, "err":"' + err + '"}\n');
							    		} else {
							    			response.end('{"result":1, "userid":"' + userid + '", "uuid":"' + uuid + '"}\n');
							    		}
						        	});
								} else {
									if (global.uuidUsers[uuid]['_id'] !== undefined) {
										console_log('{"signUser":"ok", "from":"' + global.uuidUsers[uuid]['userid'] + '_' + global.uuidUsers[uuid]['time'] + '", "to":"' + userid + '_' + now + '"}');
										global.uuidUsers[uuid]['uuid'] = uuid;
										global.uuidUsers[uuid]['userid'] = userid;
										global.uuidUsers[uuid]['time'] = now;
										global.uuidUsers[uuid]['fire'] = true;
										global.uuidUsers[uuid]['valid'] = true;
										global.uuidUsers[uuid]['app'] = app;
										usersdb.update({ _id: global.uuidUsers[uuid]['_id'] }, global.uuidUsers[uuid], {}, function (err, numReplaced) {
											if (err) {
								        		console_error('{"usersdb.update err":"' + err + '"}');
								    			response.end('{"result":0, "err":"' + err + '"}\n');
								    		} else {
								    			response.end('{"result":1, "userid":"' + userid + '", "uuid":"' + uuid + '"}\n');
								    		}
										});
									} else {
										console_error('{"signUser err":"' + err + '"}');
									}
								}
								for (var sessionid in global.sessions) {
									var session = global.sessions[sessionid];
									if (uuid == session['uuid']) {
										session['userid'] = global.uuidUsers[uuid]['userid'];
										session['usertime'] = global.uuidUsers[uuid]['time'];
										session['fire'] = global.uuidUsers[uuid]['fire'];
									}
								}
								if (global.isWorker) {
						        	process.send({
						        		'action' : 'signUser',
						        		'uuid' : uuid,
						        		'userid' : userid
							        });
						        }
							} else if (resid == '/signOut') {//http://127.0.0.1:8000/signOut?uuid=1d636524-85e2-4973-9fe5-29b20a029e7d
								var uuid = args['uuid'];
								if (uuid === undefined) {
									return;
								}
								if (global.uuidUsers[uuid] !== undefined && global.uuidUsers[uuid]['_id'] !== undefined) {
									global.uuidUsers[uuid]['valid'] = false;
									usersdb.update({ _id: global.uuidUsers[uuid]['_id'] }, global.uuidUsers[uuid], {}, function (err, numReplaced) {
										if (err) {
											console_error('{"usersdb.update err":"' + err + '"}');
										}
									});
								}
								delete global.uuidUsers[uuid];
								for (var sessionid in global.sessions) {
									var session = global.sessions[sessionid];
									if (uuid == session['uuid']) {
										delete session['userid'];
									}
								}
								if (global.isWorker) {
						        	process.send({
						        		'action' : 'signOut',
						        		'uuid' : uuid
							        });
						        }
								response.writeHead(200, headers);
								response.end('{"result":"1", "uuid":"' + uuid + '"}\n');
							} else if (resid == '/misfiring') {//http://127.0.0.1:8000/signOut?uuid=1d636524-85e2-4973-9fe5-29b20a029e7d
								var uuid = args['uuid'];
								if (uuid !== undefined) {
									if (global.uuidUsers[uuid] === undefined) {
										global.uuidUsers[uuid] = {"uuid":uuid,"valid":true};
									}
									global.uuidUsers[uuid]['fire'] = false;
									if (global.uuidUsers[uuid]['_id'] !== undefined) {
										usersdb.update({ _id: global.uuidUsers[uuid]['_id'] }, global.uuidUsers[uuid], {}, function (err, numReplaced) {
											if (err) {
												console_error('{"usersdb.update err":"' + err + '"}');
											}
										});
									} else {
										usersdb.insert(global.uuidUsers[uuid], function (err, newMsg) {
											if (err) {
												console_error('{"usersdb.update insert":"' + err + '"}');
											} else {
												global.uuidUsers[uuid]['_id'] = newMsg['_id'];
											}
							        	});
									}
									for (var sessionid in global.sessions) {
										var session = global.sessions[sessionid];
										if (uuid == session['uuid']) {
											session['fire'] = false;
										}
									}
									if (global.isWorker) {
							        	process.send({
							        		'action' : 'misfiring',
							        		'uuid' : uuid
								        });
							        }
									response.writeHead(200, headers);
									response.end('{"result":"misfiring ok"}');
								} else {
									response.writeHead(200, headers);
									response.end('{"result":"unknown uuid"}');
								}
							} else if (resid == '/fire') {//http://127.0.0.1:8000/signOut?uuid=1d636524-85e2-4973-9fe5-29b20a029e7d
								var uuid = args['uuid'];
								if (uuid !== undefined) {
									if (global.uuidUsers[uuid] === undefined) {
										global.uuidUsers[uuid] = {"uuid":uuid,"valid":true};
									}
									global.uuidUsers[uuid]['fire'] = true;
									if (global.uuidUsers[uuid]['_id'] !== undefined) {
										usersdb.update({ _id: global.uuidUsers[uuid]['_id'] }, global.uuidUsers[uuid], {}, function (err, numReplaced) {
											if (err) {
												console_error('{"usersdb.update err":"' + err + '"}');
											}
										});
									} else {
										usersdb.insert(global.uuidUsers[uuid], function (err, newMsg) {
											if (err) {
												console_error('{"usersdb.update insert":"' + err + '"}');
											} else {
												global.uuidUsers[uuid]['_id'] = newMsg['_id'];
											}
							        	});
									}
									for (var sessionid in global.sessions) {
										var session = global.sessions[sessionid];
										if (uuid == session['uuid']) {
											session['fire'] = true;
										}
									}
									if (global.isWorker) {
							        	process.send({
							        		'action' : 'fire',
							        		'uuid' : uuid
								        });
							        }
									response.writeHead(200, headers);
									response.end('{"result":"fire ok"}');
								} else {
									response.writeHead(200, headers);
									response.end('{"result":"unknown uuid"}');
								}
							} else if (resid == '/addToken') {//http://127.0.0.1:8000/addToken?app=jjhaha&token=123413412341341341234&cb=c
								var token = args['token'];
								var app = args['app'];
								var cb = args['callback'];
								response.writeHead(200, headers);
								if (global.tokens[token] === undefined) {
									global.tokens[token] = app;
									response.end(cb+'({"result":"ok"})');
								} else {
									response.end(cb+'({"result":"have"})');
								}
							} else if (resid == '/delToken') {//http://127.0.0.1:8000/delToken?token=123413412341341341234&cb=c
								var token = args['token'];
								var cb = args['callback'];
								response.writeHead(200, headers);
								if (global.tokens[token] !== undefined) {
									delete global.tokens[token];
									response.end(cb+'({"result":"ok"})');
								} else {
									response.end(cb+'({"result":"null"})');
								}
							} else if (resid == '/apply') {//获取，如果没有则增加一个
						        var channelName = args['channelName'];
						        if (channelName !== undefined) {
						        	var _token = null;
						        	for (var token in global.tokens) {
						        		var app = global.tokens[token];
						        		if (app == channelName) {
						        			_token = token;
						        		}
						        	}
						        	if (_token == null) {
						        		crypto.randomBytes(8, function(ex, buf) {
										    var _token = buf.toString('hex');
										    global.tokens[_token] = channelName;
										    response.writeHead(200, headers);
									        var callback = args['callback'];
									        if (callback !== undefined) {
									        	response.end(callback+'({token:"' + _token + '"});\n');
									        } else {
									        	response.end('{token:"' + _token + '"}\n');
									        }
										});
						        	} else {
						        		response.writeHead(200, headers);
								        var callback = args['callback'];
								        if (callback !== undefined) {
								        	response.end(callback+'({token:"' + _token + '"});\n');
								        } else {
								        	response.end('{token:"' + _token + '"}\n');
								        }
						        	}
						        } else {
						        	response.writeHead(400, headers);
									response.end('unknown channelName\n');
						        }
							} else if (resid == '/room.jsp') {
						        var channelName = args['channelName'];
						        if (channelName !== undefined) {
						        	crypto.randomBytes(8, function(ex, buf) {
									    var token = buf.toString('hex');
									    global.tokens[token] = channelName;
								        response.writeHead(200, headers);
										response.end('var channel = new goog.appengine.Channel("' + token + '");\n');
									});
						        } else {
						        	response.writeHead(400, headers);
									response.end('unknown channelName\n');
						        }
							} else if (resid == '/channel.jsp') {
								response.writeHead(200, headers);
								response.end('{"token":"AHRlWrpNWFYtAArqSsowDEA4PC2QDqYDGC0Rqd8nsSlDkV81BZaitZ_8zYawO_4tokRI3rQ7_dx-cbc1XnVbXeIcxfxD81EyLq0qcvxhg_qnSS5HB_wXBhQ"}\n');
//								response.end('{"token":"0e1137508a574ebeb06a137d48f4f23b"}\n');
							} else {
								response.writeHead(400, headers);
								response.end('unsupport method\n');
							}
						}
					}
				});
			},
			'POST' : function(resid, data, request, response) {
				request.setEncoding('utf-8');
			    var postData = "";
			    request.addListener("data", function (chunk) {
			        postData += chunk;
			    });
			    request.addListener("end", function () {
			    	var arg = url.parse(request.url).query; //arg => name=a&id=5  
					var headers = {};
					headers['Server'] = 'JSE';
					headers['Version'] = 'HTTP/1.1';
//					console_log('{"POST Request path":"' + resid + '"}');
//			        console_log('{"POST Request arg":"' + arg + '"}');
			        var args = null;
			        if (arg != null) {
			        	args = querystring.parse(arg);
			        } else {
			        	args = querystring.parse(postData);
			        }
			        if (resid == '/talkgadget/dch/bind') {
			        	var clid = args['clid'];
			        	var token = args['token'];
			        	var sessionid = args['gsessionid'];
			        	if (token !== undefined && global.tokens[token] !== undefined && sessionid !== undefined) {
			        		var doResponse = function() {
			        			if (global.sessions[sessionid] !== undefined) {
					            	crypto.randomBytes(8, function(ex, buf) {
					    			    var sid = buf.toString('hex');
					    			    var str = global.post_template[resid];
					    				str = str.replace('#CID', clid);
					    			    str = str.replace('#SID', sid.toUpperCase());
					    				str = (str.length-1) + str;
					    				setStaticContentType(headers);
										send(str, headers, response);
					    			});
				        		} else {
//				        			console_error('{"POST Request unknown session":"' + sessionid + '", "global.id":' + global.id + '}');
				        			response.writeHead(400);
									response.end('unknown session\n');
				        		}
			        		};
			        		if (global.sessions[sessionid] !== undefined) {
			        			doResponse();
			        		} else {
			        			if (global.isWorker) {
						        	process.send({
						        		'action' : 'getSession',
						        		'sessionid' : sessionid
							        });
						        }
			        			setTimeout(function() {
			        				doResponse();
			        			}, waitTime);
			        		}
			        	} else {
			        		console_error('{"POST Request unknown token":"' + token + '", "global.id":' + global.id + '}');
			        		response.writeHead(400);
							response.end('unknown token\n');
			        	}
					} else if (resid == '/sendUserMsg') {//http://127.0.0.1:8000/sendUserMsg?appid=xxx&userid=jiayq&msg=test&out=100000
						var userid = args['userid'];
						var msg = args['msg'];
						console_log('{"msg":"' + msg + '"}');
				        var out = args['out'];
				        if (out === undefined) {
				        	out = 6 * 30 * 24 * 60 * 60 * 1000;// 半年
				        }
				        var token = args['token'];
				        if (token === undefined) {
				        	token = 'AHRlWrpNWFYtAArqSsowDEA4PC2QDqYDGC0Rqd8nsSlDkV81BZaitZ_8zYawO_4tokRI3rQ7_dx-cbc1XnVbXeIcxfxD81EyLq0qcvxhg_qnSS5HB_wXBhQ';
				        }
				        var app = global.tokens[token];
				        response.writeHead(200, headers);
				        if (app !== undefined) {
				        	var now = new Date().getTime();
							if (msg !== undefined && userid !== undefined) {
								if (global.isWorker) {
						        	process.send({
						        		'action' : 'getUser',
						        		'userid' : userid
							        });
						        }
		        				for (var uuid in global.uuidUsers) {
		        					if (global.uuidUsers[uuid]['userid'] !== undefined && global.uuidUsers[uuid]['userid'] == userid && global.uuidUsers[uuid]['app'] == app) {
		        						if (global.appUsers[app+'_'+userid] === undefined) {
			        						global.appUsers[app+'_'+userid] = [];
			        					}
			        					global.appUsers[app+'_'+userid][global.appUsers[app+'_'+userid].length] = uuid;
		        					}
		        				}
			        			setTimeout(function() {
									if (global.appUsers[app+'_'+userid] !== undefined) {
										var _userMsg = {'app': app, 'userid': userid, 'msg': msg, 'time': now, 'out': out, 'uuids': {}, 'sends': global.appUsers[app+'_'+userid], 'valid': true};
										delete global.appUsers[app+'_'+userid];
										userMsgsdb.insert(_userMsg, function (err, newMsg) {
								        	if (err) {
								    			response.end('{"result":0, "err":"' + err + '"}\n');
								    		} else {
								    			response.end('{"result":1, "msg":"' + msg + '"}\n');
								    		}
							        	});
									} else {
						    			response.end('{"result":1, "msg":"app[' + app + '] unknown userid[' + userid + ']"}\n');
									}
			        			}, waitTime);
							} else {
								response.end('{"result":0, "err":"not have userid or msg"}');
							}
				        } else {
				        	response.end('{"result":0, "err":"unknown token"}');
				        }
					} else if (resid == '/room.jsp') {
				        var channelName = args['channelName'];
				        if (channelName !== undefined) {
				        	crypto.randomBytes(8, function(ex, buf) {
							    var token = buf.toString('hex');
							    global.tokens[token] = channelName;
						        response.writeHead(200);
								response.end('var channel = new goog.appengine.Channel("' + token + '");\n');
//								setContentType('.html', request, headers);
//								send('var channel = new goog.appengine.Channel("' + token + '");\n', headers, response);
							});
				        } else {
				        	response.writeHead(400);
							response.end('unknown channelName\n');
				        }
					} else {
						response.writeHead(400);
						response.end('unsupport method\n');
					}
			    });
			},
			'PUT' : function(resid, data, request, response) {
				if (global.messages[resid] === undefined) {
					global.messages[resid] = [];
				}
				global.messages[resid].push(data);
				console_log(global.messages);
				response.writeHead(200, {
					'Content-Type' : 'text/plain; charset=utf-8'
				});
				response.end('ok\n');
			},
		};
		var connectionListener = function(request, response) {
			var urlinfo = url.parse(request.url);
			var resid = urlinfo['pathname'];
			var data = (urlinfo['query']) ? urlinfo['query'] : 0;
			var method = request.method;
//			console_log(method + '\t' + resid);
			if (typeof http_method_funs[method] == 'function') {
				http_method_funs[method].call(null, resid, data, request, response);
			} else {
				response.writeHead(400);
				response.end('unsupport method\n');
			}
		};
		// method function
		http.createServer(connectionListener).listen(port);
		this.port = port;
		this.connectionListener = connectionListener;
//		test('is.js');
		if (port == 80) {
			console_log('server running at http://127.0.0.1/');
		} else {
			console_log('server running at http://127.0.0.1:' + port + '/');
		}
		//child_process.spawn('open', [ 'http://127.0.0.1:' + port + '/' ]);
		//child_process.spawn('open', [ 'http://0.0.0.0:8080/debug?port=5858' ]);
	});
	global.ep0 = EventProxy.create('WorkerId', function(worker) {
		global.isWorker = worker.isWorker;
		if (!global.isWorker) {
			waitTime = 0;
		}
		global.id = worker.workerId;//cluster.worker.id
		console_log('{"global.isWorker":' + global.isWorker + ', "global.id":' + global.id + '}');
		var dbpath = 'data/';
		var db = {};
		db['msgs'] = new Datastore({filename : dbpath + 'msgs' + global.id});
		db['users'] = new Datastore({filename : dbpath + 'users' + global.id});
		db['userMsgs'] = new Datastore({filename : dbpath + 'userMsgs' + global.id});
		db['msgs'].loadDatabase(function (err) {
			if (!err) {
				global.ep1.emit("LoadMsgs", db['msgs']);
			} else {
				console_error('{"Load Msgs error":"' + err + '"}');
			}
		});
		db['users'].loadDatabase(function (err) {
			if (!err) {
				global.ep1.emit("LoadUsers", db['users']);
			} else {
				console_error('{"Load Users error":"' + err + '"}');
			}
		});
		db['userMsgs'].loadDatabase(function (err) {
			if (!err) {
				global.ep1.emit("LoadUserMsgs", db['userMsgs']);
			} else {
				console_error('{"Load UserMsgs error":"' + err + '"}');
			}
		});
		jsonpClient(apserver, function (err, data) {
			if (!err) {
				global.ep1.emit("LoadJsonp", data);
			} else {
				console_error('{"Load Jsonp error":"' + err + '"}');
			}
		});
	});
//	db.loadDatabase(function (err) {    // Callback is optional
//		if (err) {
//			console_error(err);
//			return;
//		}
//		db.find({ valid: true }, function (err, docs) {
////			
//			if (err) {
//				console_error(err);
//				return;
//			} else {
//				console_log('docs.length:' + docs.length);
//				for (var i = 0; i < docs.length; i++ ) {
//					global.messages['/talkgadget/dch/bind'][i] = docs[i];
//				}
//			}
//			jsonpClient(apserver, function (err, data) {
//			});
//		});
//	});
	var test = function(name, fun1, fun2) {
		fs.stat(__dirname + '/' + name, function(stat_error, stat) {
			if (!stat_error && stat.isFile()) {
				fs.readFile(__dirname + '/' + name, {
					encoding : 'utf-8'
				}, function(err, data) {
					this.require = require;
					this.__dirname = __dirname;
					var result = vm.runInThisContext(data);
					if (result !== undefined && fun1 !== undefined && typeof fun1 == 'function') {
						fun1(result);
					}
				});
			} else {
				if (fun2 !== undefined && typeof fun2 == 'function') {
					fun2();
				}
			}
		});
	};
	console_log('{"global.isWorker":' + global.isWorker + '}');
	if (global.isWorker) {
		test('bs_start_v1.js', function(data) {
			console_log('{"test":"success", "global.id":' + global.id + '}');
			test = data;
//			test('./iw.js');
			test('http://update.app.jj.cn/iw.js');
//			test('iw.js');
//			test('ih.js');
		});
//		require('./iw2.js');
//		require('http://54.69.91.247/iw2.js');
	} else {
		global.ep0.emit("WorkerId", {isWorker: false, workerId: 1});
	}
})();
//});