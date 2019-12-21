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
const ExtractTextPlugin = require('extract-text-webpack-plugin'); //分离 css
const AutoPreFixer = require('autoprefixer');
const Glob = require('glob');
const PurifyCSSPlugin = require('purifycss-webpack');  //消除未使用的 CSS
console.log(__dirname);
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
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: "css-loader"
                        },
                        {
                            loader: "postcss-loader"
                        }
                    ]
                })
            },{
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: "css-loader"
                        },
                        {
                            loader: "postcss-loader"
                        },
                        {
                            loader: "less-loader"
                        }
                    ]
                })
            },{
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: "css-loader"
                        },
                        {
                            loader: "postcss-loader"
                        },
                        {
                            loader: "sass-loader"
                        }
                    ]
                })
            },
            {
                test: /\.(png|jpg|gif|jpeg)$/,
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
            // title: 'Production', //设置页面title
            template: './src/index.html'
        }),
        new ExtractTextPlugin("css/index.css"), //这里的 css/index.css 是分离后的路径
        AutoPreFixer,
        new PurifyCSSPlugin({
            paths: Glob.sync(path.join(__dirname, 'src/*.html'))
        })
    ]
};
