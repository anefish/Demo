var express = require('express');
var router = express.Router();

router.all('/', function (req, res) {
	res.send('Index Router...');
});

module.exports = router;