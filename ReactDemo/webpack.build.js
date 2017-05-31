var path = require('path'),
    webpack = require('webpack'),
    precss = require('precss'),
    autoprefixer = require('autoprefixer'),
    // del = require('del'),
    entry = require('./entry'),
//     ExtractTextPlugin = require("extract-text-webpack-plugin")

// var extractCSS = new ExtractTextPlugin('css/[name].css', {allTrunks: true}),
    HtmlWebpackPlugin = require('html-webpack-plugin')

var env = process.env.NODE_ENV

module.exports = {
    // devtool: 'cheap-module-eval-source-map',
    entry: entry,
    output: {
        path: path.join(__dirname, 'assets'),
        filename: '[name].bundle.js',
        // publicPath: '/assets/'
        publicPath: './'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                // loaders: [ 'babel' ],
                loader: 'babel',
                exclude: /node_modules/,
                include: __dirname,
                query: {
                    presets: ['es2015', 'react']
                }
            },
            /*{
                test: /\.css?$/,
                loaders: [ 'style', 'raw' ],
                include: __dirname
            },*/
            {
                test: /\.(css|scss)$/,
                loaders: ["style", "css", "postcss", "sass"]
                // loader: extractCSS.extract(["css", "postcss", "sass"])
            },
            {
                test: /\.(png|jpg)$/,
                // loader: 'file?name=imgs/[name].[ext]',
                loaders: [
                    'file?name=imgs/[name].[ext]',
                    'image-webpack'
                ],
                include: path.join(__dirname, 'src')
            }
        ]
    },
    resolve: {
        alias: {
            extensions: ['', '.js', '.jsx', '.scss'],
            company: path.join(__dirname, 'src/company')
        }
    },
    postcss: function () {
        return [precss, autoprefixer]
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        // new webpack.HotModuleReplacementPlugin()

        // new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
          'process.env': { 'NODE_ENV': JSON.stringify('production') }
        }),
        // new webpack.optimize.CommonsChunkPlugin({
        //   name: 'common',
        //   minChunks: 2,
        // }),
        
        // new ExtractTextPlugin('assets/css/style.css', {allTrunks: true}),
        // extractCSS,
        new HtmlWebpackPlugin({
            env: env,
            filename: 'company.html',
            template: 'src/company.html',
            minify: {
                collapseWhitespace: true,
                minifyCSS: true,
                minifyJS: true
            }
        }),

        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin()
    ]
}