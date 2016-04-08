var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

console.log(__dirname + '/build');

module.exports = {
	devtool: 'inline-source-map',
	entry: [
		'webpack-dev-server/client?http://127.0.0.1:3000',
		'webpack/hot/only-dev-server',
		'./app/demo/app.js',
		'./app/sidebar/app.js'
	],
	output: {
		path: __dirname + '/build',
		filename: '[name].js',
		chunkFilename: '[id].chunk.js',
		publicPath: '/build/'
	},
	module: {
		loaders: [
			//{test: /\.css$/, loader: 'style!css'},
			{test: /\.jsx?$/, loaders: ['react-hot', 'jsx?harmony'], exclude: /node_modules/},

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
	resolve: {
		extendsions: ['', '.js', '.json', '.coffee', '.jsx', '.less','.scss']
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		new ExtractTextPlugin("global.css", []),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.optimize.CommonsChunkPlugin("common.js", [])// 是否提取公共组件 此demo项目无公共组件
		/*new HtmlWebpackPlugin(
			{// 编译html模板
				template: './index.html',
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

