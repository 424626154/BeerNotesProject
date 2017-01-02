var express = require('express');
var router = express.Router();

var request = require('request');
var md5 = require('md5');
var encoding = require("encoding");
//数据库
var bndb = require('./../db/bndb.js');

var push_title;
var push_content;
/*------admin------*/
router.get('/', function(req, res, next) {
	console.log('is amdin get');
	res.render('admin', {});
});

router.post('/', function(req, res) {
		console.log('is amdin post');
		res.render('admin', {});
	})
	/*------admin/push------*/
router.get('/push', function(req, res, next) {
	console.log('is amdin/push get');
	console.log(req.body);
	res.render('apush', {});
});

router.post('/push', function(req, res) {
	console.log('is amdin/push post');
	var title = req.body.title;
	var content = req.body.content;
	push_title = title;
	push_content = content;
	if (title.length > 0 && content.length > 0) {
		bndb.queryAllToken('android', queryAllTokenCallback);
		bndb.queryAllToken('ios', queryAllTokenCallback);
	}
	// sendPush(title, content);
	res.render('apush', {});
})

function queryAllTokenCallback(ostype, docs) {
	// console.log(docs);
	var tokens = assembleTokens(docs)
	if (tokens.length > 0) {
		sendPush(push_title, push_content, tokens, ostype);
	}
}

function sendPush(title, content, tokens, ostype) {
	console.log('sendPush title:', title, "content:", content, "tokens:", tokens, "ostype:", ostype)
	var appkey;
	var app_master_secret;
	var timestamp = Date.now();
	var device_token;
	console.log("timestamp:", timestamp);
	// console.log(new Date().getTime());
	var method = "POST";
	var url = "http://msg.umeng.com/api/send";


	// var ostype = "android";
	// var ostype = "ios";
	var params
	if (ostype == "ios") {
		console.log("ostype:ios");
		appkey = "5846ef9fa325116db20017b3";
		app_master_secret = "5yzwppsoszclwakverdoiihpc8dhbrme";
		params = {
			'appkey': appkey,
			'timestamp': timestamp,
			'device_tokens': tokens,
			'type': 'listcast',
			"payload": {
				"aps": {
					"alert": content
				} // 苹果必填字段
			},
			// "policy": {
			// 	"expire_time": "2013-10-30 12:00:00"
			// }
			"production_mode": "false",
			"description": "测试单播消息-iOS"
		};
	}
	if (ostype == "android") {
		console.log("ostype:android");
		appkey = "5846ec8eae1bf8125b000d7d";
		app_master_secret = "vxutm65kn7st3kdnlimltlkyvv1xssgw";
		params = {
			"appkey": appkey,
			"timestamp": timestamp,
			"type": "listcast",
			"device_tokens": tokens, // 不能超过500个, 
			//多个device_token用英文逗号分隔
			"payload": {
				"display_type": "notification", // 通知，notification
				"body": {
					"ticker": title,
					"title": title,
					"text": content,
					"after_open": "go_app"
				}
			},
			"production_mode": "false",
			"description": "测试单播消息-Android"
		};
	}

	var params_str = JSON.stringify(params);
	// var ascii_json = encoding.convert(params_str, 'ASCII', 'UTF-8');
	// console.log("ascii_json", ascii_json);
	var base_str = method + url + params_str + app_master_secret;
	var md5_str = md5(base_str);
	var sign = md5_str;
	var url = url + "?sign=" + sign;
	// console.log("params:", params);
	console.log("params_str:", params_str);
	// console.log(base_str)
	// console.log(md5_str);
	// console.log(url);

	request.post({
		url: url,
		form: params_str
	}, function(err, httpResponse, body) {
		if (!err) {
			if (httpResponse.statusCode == 200) {
				console.log(body);
			} else if (httpResponse.statusCode == 400) {
				var res_json = JSON.parse(body);
				console.log("res_json:", res_json)
				console.log("error :", res_json.data.error_code);
			} else {
				console.log("error :", httpResponse.statusCode);
			}
		} else {
			console.log("error:", err)
		}
	})
}

function assembleTokens(docs) {
	var tokens = "";
	// console.log("assembleTokens count:", docs.length)
	if (docs.length > 0) {
		for (var i = 0; i < docs.length; i++) {
			if (i == docs.length - 1) {
				tokens += docs[i].token
			} else {
				tokens += docs[i].token + ","
			}
		}
	}
	// console.log("assembleTokens:", tokens);
	return tokens;
}

module.exports = router;