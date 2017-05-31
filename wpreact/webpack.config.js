var path = require('path');
var webpack = require('webpack');

var DEBUG = process.env.NODE_ENV === 'DEBUG';
console.log('DEBUG: ' + DEBUG);

var serverEntry = DEBUG ? [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server'
]: [];
var entry = {
    index: serverEntry.concat('./src/js/index.js')
};

module.exports = {
    entry: entry,
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].bundle.js',
        publicPath: DEBUG ? '/dist/' : ''
    },
    module: {
        loaders: [
            {
                test: /\.js?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'react-hot!babel'
            },
            {
                test: /\.(tpl|ejs)$/,
                loader: 'ejs'
            },
            {
                test: /\.css$/,
                loader: 'style!css'
            },
            { test: /\.(woff|woff2)$/,  loader: "url?limit=10000&mimetype=application/font-woff" },
            { test: /\.ttf$/,    loader: "file" },
            { test: /\.eot$/,    loader: "file" },
            { test: /\.svg$/,    loader: "file" }

            /*{
                loader: 'exports'
            }*/
        ]
    },

    devtool: DEBUG ? 'source-map' : false,

    resolve: {
        alias: {
            bsroot: '../../node_modules/bootstrap/dist'
        },
        extensions: ['', '.js', '.jsx']
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin('common.bundle.js'),
        (DEBUG 
            ? new webpack.HotModuleReplacementPlugin() 
            : new webpack.optimize.UglifyJsPlugin()
        ),
        new webpack.NoErrorsPlugin()
    ]
};