var mongodb = require('mongodb').Db;
var ObjectID = require('mongodb').ObjectID;
var settings = require('../db-set');

function Infor(infor) {
	this.cnt = infor.cnt;
	this.nid = infor.nid;
};
module.exports = Infor;
// C(增)
Infor.prototype.save = function(callback) {
	var infor = {
		cnt : this.cnt,
		nid:"jove@jov.heroku"
	};
	mongodb.connect(settings.url,function(err, db) {
		if (err) {
			return callback(err);
		}
		db.collection('infors', function(err, collection) {
			if (err) {
				db.close();
				return callback(err);
			}
			collection.insert(infor, {
				safe : true
			}, function(err, infor) {
				db.close();
				if (err) {
					return callback(err);
				}
				callback(null, infor[0]);
			});
		});
	});
};
// R（查）
Infor.get = function(callback) {
	mongodb.connect(settings.url,function(err, db) {
		if (err) {
			return callback(err);
		}
		db.collection('infors', function(err, collection) {
			if (err) {
				db.close();
				return callback(err);
			}
			collection.findOne({
				nid : "jove@jov.heroku"
			}, function(err, infor) {
				db.close();
				if (err) {
					return callback(err);
				}
				callback(null, infor);
			});
		});
	});
};
//U (改)
Infor.update = function(cnt, callback) {
	mongodb.connect(settings.url,function(err, db) {
		if (err) {
			return callback(err);
		}
		db.collection('infors', function(err, collection) {
			if (err) {
				mongodb.close();
				return callback(err);
			}
			collection.update(
				{nid : "jove@jov.heroku"}, 
				{$set : {cnt : cnt}
			}, function(err) {
				db.close();
				if (err) {
					return callback(err);
				}
				callback(null);
			});
		});
	});
};

// R（查，通过ID）
Infor.getById = function(id, callback) {
	mongodb.connect(settings.url,function(err, db) {
		if (err) {
			return callback(err);
		}
		db.collection('infors', function(err, collection) {
			if (err) {
				db.close();
				return callback(err);
			}
			collection.findOne({
				_id : new ObjectID(id)
			}, function(err, infor) {
				db.close();
				if (err) {
					return callback(err);
				}
				callback(null, infor);
			});
		});
	});
};
//delete 删除（删）
Infor.removeById = function(nid,callback) {
	mongodb.connect(settings.url,function(err, db) {
		if (err) {
			return callback(err);
		}
		db.collection('infors', function(err, collection) {
			if (err) {
				db.close();
				return callback(err);
			}
			collection.remove({
				nid :nid
			},function(err) {
				db.close();
				if (err) {
					return callback(err);// 失败！返回 err 信息
				}
				callback(null);
			});
		});
	});
};