var express = require('express'),
    webpack = require('webpack'),
    webpackDevMiddleware = require('webpack-dev-middleware'),
    webpackHotMiddleware = require('webpack-hot-middleware'),
    config = require('./webpack.config')

var app = express()
var port = 3000
// var port = 80


if (process.env.NODE_ENV === 'dev') {
    var compiler = webpack(config)
    app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
    app.use(webpackHotMiddleware(compiler))

    // app.use(express.static('src'));

    var routes = require('./mockApi');
    app.use(routes);
}else{
    port = 3001
    app.use(express.static('assets'));
}


app.listen(port, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
  }
})
