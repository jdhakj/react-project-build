var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');//加载运行时模块替换功能(HMR)
var config = require('./webpack.config');//读取webpack的配置信息
var port = 3000;//监听端口号

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true
}).listen(port, 'localhost', function (err, result) {
  if (err) {
    console.log(err);
  }
  console.log('================监听地址=================');
  console.log('Listening at localhost:'+port);
  console.log('================监听地址=================');
});