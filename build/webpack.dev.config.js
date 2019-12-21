/**
 *@fileName webpack.dev.config.js
 *@author   Like (likeaixi@gmail.com)
 *@date     2018/3/29
 *@disc     开发环境配置
 */
const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.com.config');

module.exports = merge(common, {
    mode: "development",
    devtool: "inline-source-map",//开发环境中使用，定位错误位置
    devServer: {
        contentBase: path.join(__dirname, '../dist'), // webpack-dev-server 简单的web服务器，并可以live-reloading
        compress: true,
        port: 8000,
        hot: true
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(), //开发环境中模块热替换
    ]
});