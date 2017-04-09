/**
 * Created by summer on 17/4/9.
 */
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var path = require('path')
var webpack = require('webpack');

var config = require('./webpack.config');

config.plugins = [
  new webpack.LoaderOptionsPlugin({
    test: /\.vue$/, // may apply this only for some modules
    options: {
      vue: 'vue-style-loader'
    }
  }),
  new HtmlWebpackPlugin({
    filename: '../index.html',
    template: path.resolve(__dirname, './app/index/index.html'),
    inject: true
  })
];

module.exports = config;