// 测试页面
export default [
	{
		path: '/test',
		name: 'test',
		meta: {
			title: '测试'
		},
		component: () => import('@ac/views/test')
	}
]
