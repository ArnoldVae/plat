module.exports = {
	presets: [
		[
			'@vue/app',
			{
				useBuiltIns: 'entry'
			}
		]
	],
	plugins: [
		[
			'component',
			{
				libraryName: 'element-ui',
				styleLibraryName: 'theme-chalk'
			}
		],
		[
			'component',
			{
				libraryName: '@/components/singletons',
				libDir: './',
				style: false
			},
			'@/components/singletons'
		],
		[
			'component',
			{
				libraryName: '@/components/stateless',
				libDir: './',
				style: false
			},
			'@/components/stateless'
		],
		[
			'component',
			{
				libraryName: '@/components/iview-dev',
				libDir: 'components',
				style: false
			},
			'@/components/iview-dev'
		],
		[
			'component',
			{
				libraryName: '@/components/element-dev',
				libDir: './',
				style: false
			},
			'@/components/element-dev'
		],
		// import 暂时不支持本地按需引入
		[
			'import',
			{
				libraryName: 'ant-design-vue',
				libraryDirectory: 'es',
				style: true
			}
		],
		// iview 按需引入接入, 低版本浏览器不可用
		[
			'import',
			{
				libraryName: 'iview',
				libraryDirectory: 'src/components',
				style: false
			},
			'iview'
		]
	]
}
