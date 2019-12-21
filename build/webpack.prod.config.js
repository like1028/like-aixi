/**
 *@fileName webpack.prod.config.js
 *@author   Like (likeaixi@gmail.com)
 *@date     2018/3/29
 *@disc     生产环境配置
 */

const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.com.config');

module.exports = merge(common, {
    mode: "production",
    devtool: 'source-map',
    plugins: [
        new UglifyJSPlugin({
            sourceMap: true
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production') // 为所有依赖定义环境变量
        })
    ]
});