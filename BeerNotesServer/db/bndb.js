var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/beernotes_db');
const db = mongoose.connection
db.on('error', console.error.bind(console, '---BNS-- MongoDB Connection error：'))
db.once('open', (callback) => {
	console.log('---BNS--MongoDB Connect successfully');
})
const uuidV4 = require('uuid/v4');

var bnconfig = require('./../config/config.js');

var TokenSchema = new mongoose.Schema({
	token: {
		type: String,
		default: ''
	},
	ostype: {
		type: String,
		default: ''
	},
	date: {
		type: Date,
		default: Date.now
	}
});
var UserSchema = new mongoose.Schema({
	uid: {
		type: String,
		default: ''
	},
	username: {
		type: String,
		default: ''
	},
	password: {
		type: String,
		default: ''
	},
	email: {
		type: String,
		default: ''
	},
	session: {
		type: String,
		default: ''
	}
});

var RelatedSchema = new mongoose.Schema({
	rid: {
		type: String,
		default: ''
	},
	title: {
		type: String,
		default: ''
	},
	brief: {
		type: String,
		default: ''
	},
	link: {
		type: String,
		default: ''
	}
});

// 创建model
var TokenSchema = mongoose.model('TokenSchema', TokenSchema);
var UserSchema = mongoose.model('UserSchema', UserSchema);
var RelatedSchema = mongoose.model('RelatedSchema', RelatedSchema);
//保存token
exports.saveToken = function(token, ostype) {
		TokenSchema.findOne({
			token: token
		}, function(err, doc) {
			if (err) {
				console.log("saveToken findOne err:", err);
				return;
			}
			var obj = new TokenSchema()
			obj.token = token;
			obj.ostype = ostype;
			obj.date = Date.now();
			if (doc == null) {
				obj.save(function(err) {
					if (err) {
						console.log("saveToken save err:", err);
						return;
					}
				})
				console.log("saveToken save succes ", obj);
			} else {
				TokenSchema.update({
					token: token
				}, {
					ostype: obj.ostype,
					date: obj.date
				}, function(error) {
					if (err) {
						console.log("saveToken update err:", err);
						return;
					}
				});
				console.log("saveToken update succes ", obj);
			}
		});
	}
	//查询所有token
exports.queryAllToken = function(ostype, callback) {
	TokenSchema.find({
		ostype: ostype
	}, function(err, docs) {
		if (err) {
			console.log("queryAllToken findOne err:", err);
			return;
		}
		callback(ostype, docs);
	});
}



exports.loginUser = function(username, password, res, callback) {
	UserSchema.findOne({
		username: username
	}, function(err, doc) {
		if (err) {
			console.log("login findOne err:", err);
			callback(bnconfig.errcode1100, '', res);
			return;
		}
		if (doc == null) {
			callback(bnconfig.errcode1105, '', res);
		} else {
			if (doc.password == password) {
				var session = username + "_" + password + "_" + Date.now();
				console.log("loging session:", session);
				UserSchema.update({
					username: username
				}, {
					session: session
				}, function(error) {
					if (err) {
						console.log("login update session err:", err);
						callback(bnconfig.errcode1100, email, res);
						return;
					}
					callback(0, session, res);
				});
			} else {
				callback(bnconfig.errcode1106, session, res);
			}
		}
	});
}


exports.registerUser = function(username, password, email, res, callback) {
	UserSchema.findOne({
		username: username
	}, function(err, doc) {
		if (err) {
			console.log("register findOne username err:", err);
			callback(bnconfig.errcode1100, null, res);
			return;
		}
		if (doc != null) {
			callback(bnconfig.errcode1101, null, res);
			return;
		}
		UserSchema.findOne({
			email: email
		}, function(err, doc) {
			if (err) {
				console.log("register findOne email err:", err);
				callback(bnconfig.errcode1100, null, res);
				return;
			}
			if (doc == null) {
				var obj = new UserSchema()
				var uid = 'bn_' + username + '_' + uuidV4();
				obj.uid = uid;
				obj.username = username;
				obj.password = password;
				obj.email = email;
				var session = username + "_" + password + "_" + Date.now();
				obj.session = session;
				obj.save(function(err) {
					if (err) {
						console.log("register save err:", err);
						callback(errcode1100, res);
						return;
					}
					callback(0, obj, res);
				})
			} else {
				callback(bnconfig.errcode1102, null, res);
			}
		});
	});
}



exports.emailUser = function(email, res, callback) {
	UserSchema.findOne({
		email: email
	}, function(err, doc) {
		if (err) {
			console.log("email findOne err:", err);
			callback(bnconfig.errcode1100, email, '', res);
			return;
		}
		if (doc == null) {
			callback(bnconfig.errcode1107, email, '', es);
		} else {
			var password = '123456';
			UserSchema.update({
				email: email
			}, {
				password: password
			}, function(error) {
				if (err) {
					console.log("email update  err:", err);
					callback(bnconfig.errcode1100, email, '', res);
					return;
				}
				callback(0, email, password, res);
			});
		}
	});
}


exports.modifylUser = function(username, password, newpass, res, callback) {
	UserSchema.findOne({
		username: username
	}, function(err, doc) {
		if (err) {
			console.log("login findOne err:", err);
			callback(bnerrcode1100, '', res);
			return;
		}
		if (doc == null) {
			callback(bnconfig.errcode1105, '', res);
		} else {
			if (doc.password == password) {
				var session = username + "_" + password + "_" + Date.now();
				console.log("modify session:", session);
				UserSchema.update({
					username: username
				}, {
					password: newpass,
					session: session
				}, function(error) {
					if (err) {
						console.log("modify update session err:", err);
						callback(bnconfig.errcode1100, email, res);
						return;
					}
					callback(0, session, res);
				});
			} else {
				callback(bnconfig.errcode1106, session, res);
			}
		}
	});
}


exports.saveRelated = function(title, brief, link, res, callback) {
	var obj = new RelatedSchema()
	var rid = uuidV4();
	obj.rid = rid;
	obj.title = title;
	obj.brief = brief;
	obj.link = link;
	obj.save(function(err) {
		if (err) {
			console.log("related save err:", err);
			callback(errcode1100, null, res);
			return;
		}
		callback(0, obj, res);
	})
}


exports.queryAllRelated = function(res, callback) {
	RelatedSchema.find({}, function(err, docs) {
		if (err) {
			callback(errcode1100, null, res);
			return;
		}
		callback(0, docs, res);
	})
}


exports.deletOneRelated = function(rid, res, callback) {
	RelatedSchema.remove({
		rid: rid
	}, function(err, docs) {
		if (err) {
			callback(errcode1100, res);
			return;
		}
		callback(0, res);
	})
}

exports.appQueryAllRelated = function(res, callback) {
	RelatedSchema.find({}, function(err, docs) {
		if (err) {
			callback(errcode1100, null, res);
			return;
		}
		callback(0, docs, res);
	})
}