var Infor = require('../models/Infor.js');
module.exports = function(app) {
	app.get('/', function(req, res) {
		Infor.get(function(err, infor) {
			var nid = "jove@jov.heroku";
			var newCnt = infor.cnt + 1;
			Infor.update(newCnt, function(err) {
				if (err) {
					return res.redirect('/');
				}
				res.render('index', {
					cnt : newCnt
				});
				return;
			});
		});
	});
	app.get('/comm', function(req, res) {
		res.render('comm', {});
	});
	app.get('/ihave', function(req, res) {
		res.render('ihave', {});
	});
};
