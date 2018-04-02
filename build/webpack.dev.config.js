/**
 *@fileName webpack.dev.config.js
 *@author   Like (likeaixi@gmail.com)
 *@date     2018/3/29
 *@disc
 */
const merge = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.com.config');

module.exports = merge(common, {
    mode: "development",
    devtool: "inline-source-map",//开发环境中使用，定位错误位置
    devServer: {
        contentBase: './dist' // webpack-dev-server 简单的web服务器，并可以live-reloading
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(), //开发环境中模块热替换
    ]
});