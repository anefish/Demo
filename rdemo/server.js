var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var getConfig = require('./webpack.config');

const webpackDevHost = 'localhost';

var webpackDevServer = {
    listen: (serverPort) => {
        const webpackDevPort = serverPort + 1;
        const config = getConfig(webpackDevPort);

        const webpackDevServer = new WebpackDevServer(
            webpack(config),
            {
                publicPath: config.output.publicPath,
                hot: true,
                historyApiFallback: true
            }
        )

        webpackDevServer.listen(
            webpackDevPort,
            webpackDevHost,
            function (err, result) {
                if (err) {
                    console.log(err);
                }

                console.log('Listening at ' + webpackDevHost + ':' + webpackDevPort)
            }
        )
    }
}

//------------------------------------------

import http from 'http'

var server = http.createServer(function (req, res) {
    res.write(
        `<!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,minimum-scale=1" />
            <meta name="format-detection" content="telephone=no" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content="black" />
            <meta http-equiv="Pragma" content="no-cache" />
            <meta http-equiv="x-rim-auto-match" content="none" />
            <title>Demo</title>
        </head>
        <body>
            <div id="wrapper"></div>
            <script type="text/javascript" src="http://localhost:5051/static/bundle.js"></script>
        </body>
        </html>`
    )

    res.end()
})

//--------------------------------------------

const port = 5050
webpackDevServer.listen(port)
server.listen(port)

console.log(`Server is listening on http://127.0.0.1:${port}`)