var express = require('express');
var router = express.Router();

// demo
router.post('/getIndex', function (req, res) {
	var body = req.body;

	console.log('name: ' + body.body.name + ', age: ' + body.body.age);

	res.json({
		data :{
			//...
		},
		err : 0,
		msg : ""
  });

});

module.exports = router;
