/**
 *@fileName webpack.comm.config.js
 *@author   Like (likeaixi@gmail.com)
 *@date     2018/3/29
 *@disc
 */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
// const HotClient = require('webpack-hot-middleware/client');
module.exports = {
    entry: {
        app: ['./src/index.js', 'webpack-hot-middleware/client']
        // print: ['./src/print.js', HotClient]
    },
    output: {
        // filename: 'bundle.js',
        filename: '[name].[hash].js',
        path: path.resolve(__dirname, '../dist'),
        publicPath: "/" //会在服务器脚本用到，确保资源能够在http://localhost:8000下正确访问
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            // name: '[name].[ext]'
                            outputPath: 'img/'
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            // name: '[name].[ext]',
                            outputPath: 'fonts/'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['../dist']),//每次打包前清空dist目录
        new HtmlWebpackPlugin({
            title: 'Likeaixi', //设置页面title
            template: 'index.html'
        })
    ]
};