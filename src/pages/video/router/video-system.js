// test-module
export default [
	{
		path: '/',
		name: 'video-system',
		// redirect: '/testModule',
		meta: {
			title: '模块首页名称'
		},
		component: () => import('@video/views')
	}
	/*{
		path: '/testModule',
		name: 'testModule',
		meta: {
			title: '模块首页名称'
		},
		component: () => import('@index/views'),
		children: [
			{
				path: 'testModule2',
				name: 'testModule2',
				meta: {
					title: 'testModule2模块'
				},
				component: () => import('@index/views/testModule2')
			}
		]
	}*/
]
