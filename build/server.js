/**
 *@fileName server.js
 *@author   Like (likeaixi@gmail.com)
 *@date     2018/3/28
 *@disc
 */
const express = require('express');
const webpack = require('webpack');
const config = require('./webpack.dev.config');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const app = express();
const compiler = webpack(config);

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(webpackDevMiddleware(compiler, { //webpackDevMiddleware是个容器（wraaper），把webpack处理后的文件传递给一个服务器
    publicPath: config.output.publicPath
}));

app.use(webpackHotMiddleware(compiler, {
    // log: true,  //默认值
    // path: "/__webpack_hmr",  //默认值
    heartbeat: 20000
}));

app.listen(8000, function (err) {
    if (err) {
        console.log(err);
        return;
    }
    console.log('Listening at http://localhost:' + '8000' + '\n');
});