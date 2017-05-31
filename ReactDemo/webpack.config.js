var path = require('path'),
    webpack = require('webpack'),
    precss = require('precss'),
    autoprefixer = require('autoprefixer'),
    entry = require('./entry'),
    ExtractTextPlugin = require("extract-text-webpack-plugin")

var extractCSS = new ExtractTextPlugin('css/[name].css', {allTrunks: true}),
    HtmlWebpackPlugin = require('html-webpack-plugin')

var env = process.env.NODE_ENV

var client = 'webpack-hot-middleware/client'
for(var k in entry){
    entry[k].push(client)
}

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: entry,
    output: {
        path: path.join(__dirname, 'assets'),
        filename: '[name].bundle.js',
        // publicPath: '/assets/'
        publicPath: 'http://172.19.194.253:3000/'
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
                    presets: ['es2015', 'react', 'react-hmre']
                }
            },
            /*{
                test: /\.css?$/,
                loaders: [ 'style', 'raw' ],
                include: __dirname
            },*/
            {
                test: /\.(css|scss)$/,
                loaders: ["style", "css?sourceMap", "postcss", "sass?sourceMap"]
                // loader: extractCSS.extract(["css?sourceMap", "postcss", "sass?sourceMap"])
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'file?name=imgs/[name].[ext]',
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
        new webpack.HotModuleReplacementPlugin(),
        // new webpack.ProvidePlugin({
        //     $: 'zepto-webpack'
        // })
        
        // extractCSS,
        new HtmlWebpackPlugin({
            env: env,
            filename: 'company.html',
            template: 'src/company.html'
        })
    ]
}
