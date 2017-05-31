var express = require('express');
var router = express.Router();

// demo
router.post('/getIndex', function (req, res) {
	var body = req.body;

	console.log('name: ' + body.body.name + ', age: ' + body.body.age);

	res.json({
		data :{
			total:20, //累计提供建议次数
			follow: 10,   // 跟随次数
			earn: 50000, //赚了多少钱
			nofollow:10,  //未跟随次数
			lessEarn: 50000,//少赚多少钱
			tasteDate: "1457666090194",//创建时间,开始体验时间
			position : "43.3", //当前仓位
			replaced : 1 //是否换股 1为是 0为否
		},
		err : 0,
		msg : ""
  });

});

module.exports = router;
