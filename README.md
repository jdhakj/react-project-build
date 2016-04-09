#webpack for react project build
基于webpack的react项目构建

##Content

- [1、基于webpack搭建前端react项目,进行自动化构建](https://github.com/jdhakj/react-project-build)
- [2、通过拆分不同的业务模块来编写reactjs组件,来进行嵌套组合构建页面](https://github.com/jdhakj/react-project-build)
- [3、单页面入口，前端实现路由，通过编译时的chunk实现按需加载](https://github.com/jdhakj/react-project-build)
- [4、静态文件可以单独打包公共文件,也可以打包到js文件中](https://github.com/jdhakj/react-project-build)
- [5、支持热插拔,实时更新](https://github.com/jdhakj/react-project-build)
- [6、接口数据校验，客户端缓存接口数据（todo-->）](https://github.com/jdhakj/react-project-build)
- [7、静态文件校验缓存在app（todo-->）](https://github.com/jdhakj/react-project-build)
- [8、离线存储（todo-->）](https://github.com/jdhakj/react-project-build)



##Method

1、cd your project rote

2、git clone https://github.com/jdhakj/react-project-build.git

3、npm install

4、npm start

5、Just enjoy yourself!!!


##Tips

please visit http://localhost:3000/


## Webpack 

```js
var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

console.log('>>>>>>>>>================配置环境=================<<<<<<<<');
console.log('');
console.log('location route: '+__dirname);
console.log('location environment: '+process.env.NODE_ENV);
console.log('');
console.log('>>>>>>>>>================配置环境=================<<<<<<<<');

module.exports = {
	devtool: 'inline-source-map',
	//==========打包时的入口,数组中的文件按顺序打包,文件之间惊醒依赖的递归查找
	entry: [
		'webpack-dev-server/client?http://127.0.0.1:3000',//端口号必须与node服务的端口号一致,用以接收Webpack推送过来的代码模块
		'webpack/hot/only-dev-server',//进而可以通知所有相关React组件进行重新Render
		'./app/demo/app.js',
		'./app/sidebar/app.js'
	],
	//==========打包后的出口
	output: {
		path: __dirname + '/build',//文件存放的绝对路径
		filename: '[name].js',//打包后的文件名
		chunkFilename: '[id].chunk.js',//按需加载的子文件名
		publicPath: '/build/'//运行时的访问路径
	},
	module: {
		//加载器
		loaders: [
			//{test: /\.css$/, loader: 'style!css'},
			{test: /\.jsx?$/, loaders: ['react-hot', 'jsx?harmony'], exclude: /node_modules/},//harmony参数使其支持ES6语法

			{test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
			{test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")},
			//{test: /\.scss$/, loader:'style-loader!css-loader!sass-loader'},//样式文件打入js中
			{test: /\.scss/, loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")},//样式文件独立抽出
			{
				test: /\.((woff2?|svg)(\?v=[0-9]\.[0-9]\.[0-9]))|(woff2?|svg|jpe?g|png|gif|ico)$/,
				loaders: ['url?limit=10000&name=img/[hash:8].[name].[ext]', 'image?{bypassOnDebug:true, progressive:true,optimizationLevel:3,pngquant:{quality:"65-80",speed:4}}']
			},
			{
				test: /\.((ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9]))|(ttf|eot)$/,
				loader: 'url?limit=10000&name=fonts/[hash:8].[name].[ext]'
			},
			//{test:/\.less/,loader:'style-loader!css-loader!less-loader'},
			//{test:/\.less/,loader:ExtractTextPlugin.extract("style-loader","css-loader!less-loader")},
			//{test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel?presets[]=react,presets[]=es2015'},
			//{test:/\.js$/,exclude:/node_modules/,loader:"babel-loader",query:{presets:['react','es2015']}}
		]
	},
	//==========其它解决方案配置
	resolve: {
		//自动扩展文件后缀名，require模块时可以省略不写后缀名
		extendsions: ['', '.js', '.json', '.coffee', '.jsx', '.less','.scss'],
		//模块别名定义，方便后续直接引用别名，无须多写过长的路径地址
		alias: {
			test : ''//后续直接 require('AppStore') 即可
		}
	},
	//==========插件项
	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		new ExtractTextPlugin("global.css", []),//提取公共样式模块
		new webpack.HotModuleReplacementPlugin(),
		new webpack.optimize.CommonsChunkPlugin("common.js", [])// 提取公共js模块
		/*new HtmlWebpackPlugin(
			{// 编译html模板
				template: './index.html',//注意配置路径
				//favicon:'./src/img/favicon.ico',
				filename: 'index.html',
				inject: true,
				minify: {// 压缩HTML文件
					removeComments: true,// 移除HTML中的注释
					collapseWhitespace: false// 删除空白符与换行
				},
				chunks: ['common.js']
			}
		)*/
	]
};

/*webpack --config XXX.js   //使用另一份配置文件（比如webpack.config2.js）来打包

webpack --watch   //监听变动并自动打包

webpack -p    //压缩混淆脚本，这个非常非常重要！

webpack -d    //生成map映射文件，告知哪些模块被最终打包到哪里了

webpack --display-error-details //方便出错时能查阅更详尽的信息*/
```

## NODE_ENV SET

window: SET NODE_ENV=development

OS-X or Linux: export NODE_ENV=development