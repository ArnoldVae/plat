// 平台配置中心
export default [
	{
		path: '/',
		name: 'platform',
		// redirect: '/platform',
		meta: {
			title: '电力物联网配电智能综合监控系统'
		},
		component: () => import('@index/views')
	},
	{
		path: '/404',
		name: '404',
		// redirect: '/platform',
		meta: {
			title: '404'
		},
		component: () => import('@index/views/404')
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
