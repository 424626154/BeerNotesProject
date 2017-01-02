var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/beernotes_db');
const db = mongoose.connection
db.on('error', console.error.bind(console, '---BNS-- MongoDB Connection error：'))
db.once('open', (callback) => {
	console.log('---BNS--MongoDB Connect successfully');
})


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

// 创建model
var TokenSchema = mongoose.model('TokenSchema', TokenSchema);
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