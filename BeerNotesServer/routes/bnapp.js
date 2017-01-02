var express = require('express');
var router = express.Router();
//数据库
var bndb = require('./../db/bndb.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.send('is app');
});

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
		res_json.errcode = 1001;
		res_json.errmsg = "parameter error";
	}
	console.log("post uploadtoken res:", res_json);
	res.json(res_json);
})

module.exports = router;