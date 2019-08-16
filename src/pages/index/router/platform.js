// 平台配置中心
export default [
	{
		path: '/',
		name: 'platform',
		// redirect: '/platform',
		meta: {
			title: '变电信息综合处理系统'
		},
		component: () => import('@index/views')
	}
	/*{
		path: '/platform/:module?',
		name: 'platform',
		meta: {
			title: '5200'
		},
		component: () => import('@index/views'),
		children: [
			{
				path: 'config',
				name: 'config',
				meta: {
					title: '平台配置'
				},
				component: () => import('@index/views/config')
			}
		]
	}*/
]
