const webpack = require('webpack');
const path = require('path');

const CompressionPlugin = require("compression-webpack-plugin")

const srcPath = path.join(__dirname, 'app');
const buildPath = path.join(__dirname, 'public');

const config = {
  context: srcPath,
  entry: path.join(srcPath, 'js', 'app.js'),
  output: {
    path: buildPath,
    filename: 'bundle.js'
  }, 
  module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.scss$/,
                loaders: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    'file?hash=sha512&digest=hex&name=[hash].[ext]',
                    'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
                ]
            }
        ]
    },
    plugins: [ 
        new webpack.optimize.UglifyJsPlugin(),        
        new webpack.optimize.AggressiveMergingPlugin(),
        new CompressionPlugin({
            asset: "[path].gz[query]",
            algorithm: "gzip",
            threshold: 10240,
            minRatio: 0.8
        })
    ],
    stats: {
        colors: true
    },
};

module.exports = config;