/**
 *@fileName webpack.comm.config.js
 *@author   Like (likeaixi@gmail.com)
 *@date     2018/3/29
 *@disc     通用配置
 */
const path = require('path');
// const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //html 打包
const CleanWebpackPlugin = require('clean-webpack-plugin');
// const ExtractTextPlugin = require('extract-text-webpack-plugin'); //分离 css
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //分离 css
const AutoPreFixer = require('autoprefixer');

const devMode = process.env.NODE_ENV !== 'production';
module.exports = {
    entry: {
        app: ['./src/index.js']
        // print: ['./src/print.js', HotClient]
    },
    output: {
        // filename: 'bundle.js',
        filename: '[name].[hash].js',
        path: path.resolve(process.cwd(), './dist'),
        publicPath: "/" //会在服务器脚本用到，确保资源能够在http://localhost:8000下正确访问
    },
    module: {
        rules: [
            {
                test: /\.(sa|sc|le|c)ss$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // only enable hot in development
                            hmr: devMode,
                            // if hmr does not work, this is a forceful method.
                            reloadAll: true,
                        }
                    },
                    "css-loader",
                    "postcss-loader"

                ],
            },
            {
                test: /\.(png|jpg|gif|jpeg)$/i,
                use: [
                    {
                        loader: "url-loader", // url-loader 封装了file-loader,所以不需要使用 file-loader
                        options: {
                            outputPath: 'images/',
                            limit: 500 //是把小于500B的文件打成Base64的格式，写入JS
                        }

                    }
                ]
            },
            {
                test: /\.(htm|html)$/,
                use: ['html-withimg-loader']  //解决 HTML 文件中引入 img 标签的问题
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
            },
            {
                test: /\.(jsx|js)$/,
                use: {
                    loader: 'babel-loader'
                },
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist/*'], {
            root: path.resolve(__dirname, "../")
        }),//每次打包前清空dist目录
        new HtmlWebpackPlugin({
            title: 'likeaixi', //设置页面title
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: devMode ? '[name].css' : '[name].[hash].css',
            chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
        }),
        AutoPreFixer
    ]
};
