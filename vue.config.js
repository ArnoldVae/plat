const path = require('path')
const resolve = dir => {
	return path.join(__dirname, dir)
}

const CompressionPlugin = require('compression-webpack-plugin')

let getPagesConfig = require('./pages.config.js')

let pages = {}
let projectname = process.argv[3] // 获取执行哪个文件(命令参数)

if (process.env.NODE_ENV == 'development') {
	pages = getPagesConfig.init()
} else {
	pages[projectname] = getPagesConfig.init()[projectname]
}

let outputDir = ''
if (projectname == 'index') {
	outputDir = 'dsa5200web/'
} else {
	outputDir = 'dsa5200web/' + projectname
}

module.exports = {
	// 兼容低版本浏览器依赖包（只处理当前包语言）
	transpileDependencies: ['webpack-dev-server/client'],
	//默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存。如果你无法使用 Vue CLI 生成的 index HTML，你可以通过将这个选项设为 false 来关闭文件名哈希。
	filenameHashing: true,

	// publicPath: './',

	publicPath: '/dsa5200web/',

	// publicPath: process.env.NODE_ENV === 'production' ? '' : '/',

	outputDir,

	pages,

	// 生产环境 sourceMap
	productionSourceMap: false,

	// 如果你不需要使用eslint，把lintOnSave设为false即可
	lintOnSave: false,

	devServer: {
		open: false, // 项目构建成功之后，自动弹出页面
		// host: 'localhost', // 主机名，也可以127.0.0.0 || 做真机测试时候0.0.0.0
		port: 5200, // 端口号，默认8080
		https: false, // 协议
		hotOnly: false // 没啥效果，热模块，webpack已经做好了
	},

	chainWebpack: config => {
		config.resolve.alias
			.set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
			.set('_p', resolve('public'))
			.set('_c', resolve('src/components'))
			.set('_m', resolve('src/mock'))
			.set('@ac', resolve('src/pages/ac')) // 智辅
			.set('@as', resolve('src/pages/as')) // 巡检
			.set('@fire', resolve('src/pages/fire')) // 消防
			.set('@index', resolve('src/pages/index')) // 框架
			.set('@personnel', resolve('src/pages/personnel')) // 人员管理
	},

	css: {
		loaderOptions: {
			less: {
				javascriptEnabled: true
			}
		},
		extract: false
	},

	assetsDir: 'pack',

	pluginOptions: {
		webpackBundleAnalyzer: {
			openAnalyzer: false,
			analyzerPort: 5201
		}
	},

	/*configureWebpack: config => {
		if (process.env.NODE_ENV === 'production') {
			return {
				plugins: [
					new CompressionPlugin({
						filename: '[path].br[query]',
						algorithm: 'brotliCompress',
						test: /\.(js|css|html|svg)$/,
						compressionOptions: { level: 11 },
						threshold: 10240,
						minRatio: 0.8,
						deleteOriginalAssets: false,
					}),
				]
			}
		}
	}*/
}
