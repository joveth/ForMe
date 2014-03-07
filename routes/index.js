var Infor = require('../models/Infor.js');

//trim方法
function trimStr(str){
	if(str){
		return str.replace(/(^\s*)|(\s*$)/g,"");
	}
}
module.exports = function(app) {
  app.get('/', function (req, res) {
	  Infor.get(function(err, infor) {
		  var nid =  "jove@jov.heroku";
		  var newCnt = infor.cnt+1;
		  Infor.update(newCnt,function(err){
			  if (err) {
					return res.redirect('/');
			  }
			  res.render('index',{cnt:newCnt});
			  return;
		  });
	  });
  });
};

/*
 app.get('/', function (req, res) {
	  Infor.get(function(err, infor) {
		  if(err||!infor){
			var newInfor = new Infor({
			  	cnt : 1
			});
			// 如果不存在则新增用户
			newInfor.save(function(err, infor) {
				if (err) {
					return res.redirect('/');
				}
				res.render('index',{cnt:infor.cnt});
				return;
			});
		  }else{
			  var nid =  "jove@jov.heroku";
			  var newCnt = infor.cnt+1;
			  Infor.update(newCnt,function(err){
				  if (err) {
						return res.redirect('/');
				  }
				  res.render('index',{cnt:newCnt});
				  return;
			  });
		  }
	  });
  });
*/

