var express = require('express');
var router = express.Router();

router.all('/', function (req, res) {
	res.send('User Router...');
});

router.post('/login', function (req, res) {
	var body = req.body;

	res.json({status: '1', msg: '成功', results: {}});
});

module.exports = router;