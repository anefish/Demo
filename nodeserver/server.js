var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('dist'));

//本地服务模拟接口，引入各个模块路由
var demo = require('./routes/demo'); //demo
var robot = require('./routes/robot'); //
//本地直连FAT测试环境时，注释下行即可
// app.use('/', [demo, robot]);

//-------------- 请求转发 start -----------------------//
var bodyParser = require('body-parser');
var request = require('request');
app.use(bodyParser.json()); // for parsing application/json
// app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use('/test', function(req, res) {
  var forwardUrl = 'http://demo.com/test';
  var url = forwardUrl + req.url;
  console.log('-----------req.url: ', req.url);
  console.log('-----------url: ', url);
  console.log('-----------req.method: ', req.method);
  console.log('-----------req.body: ', req.body);
  // console.log('>>>>>>>>>>req: ', req);
  // request.post(url, {json: req.body}).pipe(res);
  // request.get(url).pipe(res);
  request({
    url: url,
    method: req.method,
    json: req.body
  }).pipe(res);
});
//-------------- 请求转发 end -----------------------//

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
