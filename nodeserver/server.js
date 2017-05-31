var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('dist'));

//本地服务模拟接口，引入各个模块路由
var demo = require('./routes/demo'); //demo
var robot = require('./routes/robot'); //机器人投顾
//本地直连FAT测试环境时，注释下行即可
// app.use('/', [demo, robot]);

//-------------------请求转发 Start------------------//
var request = require('request');

//机器人投顾
app.use('/smart', function(req, res) {
  var robotUrl = 'http://10.17.193.91:30096/niushoworderapp/smart';
  var url = robotUrl + req.url;
  console.log('-----------req.url: ' + req.url);
  console.log('-----------url: ' + url);
  request.post(url, {json: req.body}).pipe(res);
});

//炒股服务
app.use('/chaogu', function(req, res) {
  var chaoguUrl = 'http://10.243.98.63:8089/niushoworderapp/chaogu';
  var url = chaoguUrl + req.url;
  console.log('-----------req.url: ' + req.url);
  console.log('-----------url: ' + url);
  request.post(url, {json: req.body}).pipe(res);
});
//-------------------请求转发 End------------------//

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
