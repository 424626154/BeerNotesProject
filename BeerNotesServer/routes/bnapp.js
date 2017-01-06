var express = require('express');
var router = express.Router();
var request = require('request');
//数据库
var bndb = require('./../db/bndb.js');

var nodemailer = require('nodemailer');

var bnconfig = require('./../config/config.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.send('is app');
});
//上传token
router.get('/uploadtoken', function(req, res, next) {
	var res_json = {
		"errcode": 0,
		"errmsg": "",
		"data": "uploadtoken"
	}
	res.json(res_json);
});

router.post('/uploadtoken', function(req, res) {
	// console.log(req.headers['content-type'])
	// console.log('post uploadtoken req.body:', req.body);
	var ostype = req.body.ostype;
	var token = req.body.token;
	console.log("post uploadtoken ostype:", ostype, "token:", token);
	var res_json = {
		"errcode": 0,
		"errmsg": "",
		"data": "uploadtoken"
	}
	if (ostype.length > 0 & token.length > 0) {
		bndb.saveToken(token, ostype);
		res_json.errcode = 0;
		res_json.data = "save token success";
	} else {
		res_json.errcode = bnconfig.errcode1103;
		res_json.errmsg = bnconfig.errmsg1103;
	}
	console.log("post uploadtoken res:", res_json);
	res.json(res_json);
})


//登录
router.get('/login', function(req, res, next) {
	var res_json = {
		"errcode": bnconfig.errcode1104,
		"errmsg": bnconfig.errmsg1104,
		"data": ""
	}
	res.json(res_json);
});
router.post('/login', function(req, res) {
	// console.log(req.headers['content-type'])
	console.log('post login req.body:', req.body);
	var username = req.body.username;
	var password = req.body.password;
	console.log("post login username:", username, "password:", password);
	var res_json = {
		"errcode": 0,
		"errmsg": "",
		"data": ""
	}
	if (username.length > 0 & password.length > 0) {
		bndb.loginUser(username, password, res, loginCallback);
	} else {
		res_json.errcode = bnconfig.errcode1104;
		res_json.errmsg = bnconfig.errmsg1104;
		console.log("post login res:", res_json);
		res.json(res_json);
	}
})

function loginCallback(code, session, res) {
	var res_json = {
		"errcode": 0,
		"errmsg": "",
		"data": ""
	}
	if (code == 0) {
		res_json.errcode = 0;
		res_json.data = session
	} else if (code == bnconfig.errcode1100) {
		res_json.errcode = bnconfig.errcode1100;
		res_json.errmsg = bnconfig.errmsg1100;
	} else if (code == bnconfig.errcode1105) {
		res_json.errcode = bnconfig.errcode1105;
		res_json.errmsg = bnconfig.errmsg1105;
	} else if (code == bnconfig.errcode1106) {
		res_json.errcode = bnconfig.errcode1106;
		res_json.errmsg = bnconfig.errmsg1106;
	}
	console.log("post login res:", res_json);
	res.json(res_json);
}

//注册
router.get('/register', function(req, res, next) {
	var res_json = {
		"errcode": 1001,
		"errmsg": "parameter error",
		"data": ""
	}
	res.json(res_json);
});
router.post('/register', function(req, res) {
	// console.log(req.headers['content-type'])
	console.log('post register req.body:', req.body);
	var username = req.body.username;
	var password = req.body.password;
	var email = req.body.email;
	console.log("post register username:", username, "password:", password, "email:", email);
	var res_json = {
		"errcode": 0,
		"errmsg": "",
		"data": ""
	}
	if (username.length > 0 & password.length > 0 & email.length > 0) {
		bndb.registerUser(username, password, email, res, registerCallback);
	} else {
		res_json.errcode = bnconfig.errcode1104;
		res_json.errmsg = bnconfig.errmsg1104;
		console.log("post register res:", res_json);
		res.json(res_json);
	}
})

function registerCallback(code, obj, res) {
	var res_json = {
		"errcode": 0,
		"errmsg": "",
		"data": ""
	}
	console.log('registerCallback:', code);
	if (code == 0) {
		res_json.errcode = 0;
		res_json.data = obj
	} else if (code == bnconfig.errcode1100) {
		res_json.errcode = code;
		res_json.errmsg = bnconfig.errmsg1100;
	} else if (code == bnconfig.errcode1101) {
		res_json.errcode = code;
		res_json.errmsg = bnconfig.errmsg1101;
	} else if (code == bnconfig.errcode1102) {
		res_json.errcode = code;
		res_json.errmsg = bnconfig.errmsg1102;
	}
	console.log("post register res:", res_json);
	res.json(res_json);
}


//邮箱
router.get('/email', function(req, res, next) {
	var res_json = {
		"errcode": bnconfig.errcode1104,
		"errmsg": bnconfig.errmsg1104,
		"data": ""
	}
	res.json(res_json);
});
router.post('/email', function(req, res) {
	// console.log(req.headers['content-type'])
	console.log('post email req.body:', req.body);
	var email = req.body.email;
	console.log("post email :", email);
	var res_json = {
		"errcode": 0,
		"errmsg": "",
		"data": ""
	}
	if (email.length > 0) {
		bndb.emailUser(email, res, emailCallback);

	} else {
		res_json.errcode = bnconfig.errcode1102;
		res_json.errmsg = bnconfig.errmsg1104;
		console.log("post register res:", res_json);
		res.json(res_json);
	}
})

function emailCallback(code, email, pass, res) {
	var res_json = {
		"errcode": 0,
		"errmsg": "",
		"data": ""
	}

	if (code == 0) {
		res_json.errcode = 0;
		res_json.data = "email success";
		sendEmail(email, pass);
		// var encode_email = encodeURIComponent(email);
		// console.log('encode_email:', encode_email);
		// var url = "http://v.juhe.cn/verifyemail/query?key=" + "aa76973d5d0be677ab73a6f1d9ca8acd" + "&email=" + encode_email;
		// console.log('email url:', url);
		// request.get(url, function(err, httpResponse, body) {
		// 	if (!err) {
		// 		if (httpResponse.statusCode == 200) {
		// 			var res_json = JSON.parse(body);
		// 			console.log("res_json:", res_json);
		// 			console.log("res_json reason:", res_json.reason);
		// 			if (res_json.reason == 'success') {
		// 				console.log("res_json result:", res_json.result);
		// 				var result_json = res_json.result;
		// 				var status = result_json.status;
		// 				console.log("res_json status:", status);
		// 				if (status == 1) {
		// 					sendEmail(email, pass);
		// 				}
		// 			}
		// 		} else if (httpResponse.statusCode == 400) {
		// 			var res_json = JSON.parse(body);
		// 			console.log("res_json:", res_json)
		// 			console.log("error :", res_json.data.error_code);
		// 		} else {
		// 			console.log("error :", httpResponse.statusCode);
		// 		}
		// 	} else {
		// 		console.log("error:", err)
		// 	}
		// })
	} else if (code == bnconfig.errcode1100) {
		res_json.errcode = bnconfig.errcode1100;
		res_json.errmsg = bnconfig.errmsg1100;
	} else if (code == bnconfig.errcode1107) {
		res_json.errcode = bnconfig.errcode1107;
		res_json.errmsg = bnconfig.errmsg1107;
	}
	console.log("post email res:", res_json);
	res.json(res_json);
}

function sendEmail(eamil, pass) {
	console.log("sendEmail:", eamil);
	var text = '精酿笔记重置密码成功，新密码为:' + pass;
	console.log(text);
	// create reusable transporter object using the default SMTP transport
	// var transporter = nodemailer.createTransport('smtps://user%40gmail.com:pass@smtp.gmail.com');
	// pfxaltvraqxhbgeh
	var transporter = nodemailer.createTransport({
		//https://github.com/andris9/nodemailer-wellknown#supported-services 支持列表
		host: 'smtp.163.com',
		port: 465, // SMTP 端口
		secureConnection: true, // 使用 SSL
		auth: {
			user: '13671172337@163.com',
			//这里密码不是qq密码，是你设置的smtp密码
			pass: 's123456'
		}
	});
	// setup e-mail data with unicode symbols
	var mailOptions = {
		from: '13671172337@163.com', // sender address
		to: '424626154@qq.com', // list of receivers
		subject: '精酿啤酒重置密码', // Subject line
		text: text, // plaintext body
		html: '<b>' + text + '</b>' // html body
	};

	// send mail with defined transport object
	transporter.sendMail(mailOptions, function(error, info) {
		if (error) {
			return console.log(error);
		}
		console.log('Message sent: ' + info.response);
	});
}


//修改密码
router.get('/modify', function(req, res, next) {
	var res_json = {
		"errcode": 1001,
		"errmsg": "parameter error",
		"data": ""
	}
	res.json(res_json);
});
router.post('/modify', function(req, res) {
	// console.log(req.headers['content-type'])
	console.log('post login req.body:', req.body);
	var username = req.body.username;
	var password = req.body.password;
	var newpass = req.body.newpass;
	console.log("post login username:", username, "password:", password, "newpass:", newpass);
	var res_json = {
		"errcode": 0,
		"errmsg": "",
		"data": ""
	}
	if (username.length > 0 & password.length > 0 & newpass.length > 0) {
		bndb.modifylUser(username, password, newpass, res, modifyCallback);
	} else {
		res_json.errcode = bnconfig.errcode1104;
		res_json.errmsg = bnconfig.errmsg1104;
		console.log("post login res:", res_json);
		res.json(res_json);
	}
})

function modifyCallback(code, session, res) {
	var res_json = {
		"errcode": 0,
		"errmsg": "",
		"data": ""
	}
	if (code == 0) {
		res_json.errcode = 0;
		res_json.data = session
	} else if (code == bnconfig.errcode1100) {
		res_json.errcode = bnconfig.errcode1100;
		res_json.errmsg = bnconfig.errmsg1100;
	} else if (code == bnconfig.errcode1105) {
		res_json.errcode = bnconfig.errcode1105;
		res_json.errmsg = bnconfig.errmsg1105;
	} else if (code == bnconfig.errcode1106) {
		res_json.errcode = bnconfig.errcode1106;
		res_json.errmsg = bnconfig.errmsg1106;
	}
	console.log("post login res:", res_json);
	res.json(res_json);
}

//相关资料
router.get('/related', function(req, res, next) {
	var res_json = {
		"errcode": bnconfig.errcode1104,
		"errmsg": bnconfig.errmsg1104,
		"data": ""
	}
	res.json(res_json);
});
router.post('/related', function(req, res) {
	// console.log(req.headers['content-type'])
	console.log('post related req.body:', req.body);
	bndb.appQueryAllRelated(res, queryRelatedCallback);
})

function queryRelatedCallback(code, docs, res) {
	var res_json = {
		"errcode": 0,
		"errmsg": "",
		"data": ""
	}
	if (code == 0) {
		res_json.errcode = 0;
		res_json.data = docs
	} else if (code == bnconfig.errcode1100) {
		res_json.errcode = bnconfig.errcode1100;
		res_json.errmsg = bnconfig.errmsg1100;
	}
	console.log("post related res:", res_json);
	res.json(res_json);
}

module.exports = router;