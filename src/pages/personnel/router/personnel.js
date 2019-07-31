// 立体巡检
export default [
	{
		path: '/',
		redirect: '/personnel'
	},
	{
		path: '/personnel',
		name: 'personnel',
		meta: {
			title: '人员管理'
		},
		component: () => import('@personnel/views'),
		children: [
			{
				path: 'notFind',
				name: 'notFind',
				meta: {
					title: '404'
				},
				component: () => import('@ac/views/notFind')
			}
		]
	}
]
