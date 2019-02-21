/**
 *@fileName webpack.prod.config.js
 *@author   Like (likeaixi@gmail.com)
 *@date     2018/3/29
 *@disc
 */
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.com.config');

module.exports = merge(common, {
    mode: "production",
    devtool: 'source-map',
    plugins: [
        new UglifyJSPlugin({
            sourceMap: true
        })
    ]
});