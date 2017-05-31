var path = require('path');
var webpack = require('webpack');

var DEBUG = process.env.NODE_ENV === 'DEBUG';

module.exports = {
    entry: {
        index: './src/js/index.js',
        a: './src/js/a.js'
    },
    output: {
        path: path.join(__dirname, 'dist/js'),
        filename: '[name].bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel'
            },
            {
                test: /\.(tpl|ejs)$/,
                loader: 'ejs'
            },
            {
                loader: 'exports',
                exclude: /tpl/
            }
        ]
    },

    resolve: {
        extensions: ['', '.js', '.jsx']
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin('common.bundle.js'),
        (DEBUG 
            ? new webpack.SourceMapDevToolPlugin({
                filename: '[file].map'
            })
            : new webpack.optimize.UglifyJsPlugin()
        ),
        new webpack.NoErrorsPlugin()
    ]
};